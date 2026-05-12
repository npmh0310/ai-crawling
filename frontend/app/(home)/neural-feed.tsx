"use client"

import { useCallback, useMemo, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useLocale } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

import { FeedDetailSheet } from "./components/feed-detail-sheet"
import { FeedList } from "./components/feed-list"
import { IntelligenceHeader } from "./components/intelligence-header"
import { StreamFilter } from "./components/stream-filter"
import { type Company, type FeedItem, type SourceType } from "./components/types"

import { feedQueryKeys } from "./services/feed"

// =============================================================================
// Types
// =============================================================================

type Props = {
  defaultSource?: SourceType
  categoryKeywords?: string[]
  lockFilters?: boolean
  titleKey?: string
  subtitleKey?: string
}

// =============================================================================
// Helpers
// =============================================================================

function dedupeById(items: FeedItem[]): FeedItem[] {
  const seen = new Set<string>()
  const out: FeedItem[] = []
  for (const item of items) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    out.push(item)
  }
  return out
}

function matchesAnyKeyword(value: string, keywords: string[]): boolean {
  const lower = value.toLowerCase()
  return keywords.some((k) => lower.includes(k.toLowerCase()))
}

// =============================================================================
// Component
// =============================================================================

export function NeuralFeed({
  defaultSource,
  categoryKeywords,
  lockFilters = false,
  titleKey,
  subtitleKey,
}: Props) {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const sourceFilter: SourceType =
    defaultSource ?? ((searchParams.get("source") as SourceType) || "all")
  const activeCompanies = (searchParams.get("company") ?? "")
    .split(",")
    .filter(Boolean) as Company[]
  const unreadOnly = searchParams.get("unread") === "1"

  const setParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key)
      else params.set(key, value)
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const feedQuery = {
    ...(activeCompanies.length > 0 && { company: activeCompanies }),
    ...(sourceFilter !== "all" && { sourceType: sourceFilter as "news" | "social" }),
    ...(unreadOnly && { unreadOnly: true }),
    lang: locale as "en" | "vi",
  }

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(feedQueryKeys.infinite(feedQuery))

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleItemClick(item: FeedItem) {
    setSelectedItem(item)
    setIsSheetOpen(true)
  }

  function handleSourceChange(source: SourceType) {
    setParams({ source: source === "all" ? null : source })
  }

  function handleApply(companies: Company[]) {
    setParams({ company: companies.join(",") || null })
  }

  function handleUnreadToggle(next: boolean) {
    setParams({ unread: next ? "1" : null })
  }

  function handleReset() {
    setParams({ source: null, company: null, unread: null })
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const items = useMemo(() => {
    const merged = dedupeById(data?.pages.flatMap((p) => p.data ?? []) ?? [])
    if (!categoryKeywords?.length) return merged
    return merged.filter((i) => matchesAnyKeyword(i.category ?? "", categoryKeywords))
  }, [data, categoryKeywords])

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      <IntelligenceHeader
        sourceFilter={sourceFilter}
        titleKey={titleKey}
        subtitleKey={subtitleKey}
        showMarkAllRead={!lockFilters}
      />

      {!lockFilters && (
        <div className="border-b px-4 md:px-10">
          <StreamFilter
            key={activeCompanies.join(",")}
            sourceFilter={sourceFilter}
            activeCompanies={activeCompanies}
            unreadOnly={unreadOnly}
            onSourceChange={handleSourceChange}
            onApply={handleApply}
            onUnreadToggle={handleUnreadToggle}
            onReset={handleReset}
          />
        </div>
      )}

      <FeedList
        items={items}
        onItemClick={handleItemClick}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        onLoadMore={fetchNextPage}
      />

      <FeedDetailSheet
        item={selectedItem}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  )
}
