"use client"

import { useCallback, useState } from "react"
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
// Component
// =============================================================================

export function NeuralFeed() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const sourceFilter = (searchParams.get("source") as SourceType) ?? "all"
  const activeCompany = (searchParams.get("company") as Company | null) ?? null

  const setParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) params.delete(key)
      else params.set(key, value)
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const feedQuery = {
    ...(activeCompany && { company: activeCompany }),
    ...(sourceFilter !== "all" && { sourceType: sourceFilter as "news" | "social" }),
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

  function handleCompanyChange(company: Company | null) {
    setParams({ company })
  }

  function handleReset() {
    setParams({ source: null, company: null })
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const items = data?.pages.flatMap((p) => p.data ?? []) ?? []

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      <IntelligenceHeader items={items} />

      <div className="px-10">
        <StreamFilter
          sourceFilter={sourceFilter}
          activeCompany={activeCompany}
          onSourceChange={handleSourceChange}
          onCompanyChange={handleCompanyChange}
          onReset={handleReset}
        />
      </div>

      <FeedList
        items={items}
        onItemClick={handleItemClick}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
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
