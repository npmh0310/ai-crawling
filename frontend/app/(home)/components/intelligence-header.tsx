"use client"

import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CheckCheckIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { toast } from "@/lib/toast"

import { feedApiService, feedQueryKeys } from "../services/feed"
import { type SourceType } from "./types"

// =============================================================================
// Types
// =============================================================================

type Props = {
  sourceFilter: SourceType
  titleKey?: string
  subtitleKey?: string
  showMarkAllRead?: boolean
}

// =============================================================================
// Helpers
// =============================================================================

function computeTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function computeCountdown(dateStr: string | null): string {
  if (!dateStr) return "—"
  const diff = new Date(dateStr).getTime() - Date.now()
  if (diff <= 0) return "soon"
  const totalMins = Math.floor(diff / 60_000)
  const days = Math.floor(totalMins / 1440)
  const hrs = Math.floor((totalMins % 1440) / 60)
  const mins = totalMins % 60
  if (days > 0) return `${days}d ${hrs}h`
  if (hrs === 0) return `${mins}m`
  return `${hrs}h ${mins}m`
}

// =============================================================================
// Component
// =============================================================================

export function IntelligenceHeader({
  sourceFilter,
  titleKey,
  subtitleKey,
  showMarkAllRead = true,
}: Props) {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("neuralFeed")
  // root namespace `t` for cross-namespace title/subtitle overrides
  const tRoot = useTranslations()
  const queryClient = useQueryClient()

  const { data: crawlResponse } = useQuery(feedQueryKeys.crawlStats())
  const stats = crawlResponse?.data

  const [timeAgo, setTimeAgo] = useState<string>("")
  const [nextCrawl, setNextCrawl] = useState<string>("—")

  useEffect(() => {
    if (stats?.lastCrawledAt) setTimeAgo(computeTimeAgo(stats.lastCrawledAt))
    setNextCrawl(computeCountdown(stats?.nextCrawlAt ?? null))
  }, [stats?.lastCrawledAt, stats?.nextCrawlAt])

  useEffect(() => {
    const tick = () => {
      if (stats?.lastCrawledAt) setTimeAgo(computeTimeAgo(stats.lastCrawledAt))
      setNextCrawl(computeCountdown(stats?.nextCrawlAt ?? null))
    }
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [stats?.lastCrawledAt, stats?.nextCrawlAt])

  const markAllReadMutation = useMutation({
    mutationFn: () => feedApiService.markAllRead(),
    onSuccess: (res) => {
      const count = res.data?.updated ?? 0
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.lists() })
      toast.success(t("markedAllRead", { count }))
    },
    onError: () => toast.error(t("markAllReadFailed")),
  })

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleMarkAllRead() {
    markAllReadMutation.mutate()
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const title = titleKey ? tRoot(titleKey) : t("title")
  const subtitle = subtitleKey ? tRoot(subtitleKey) : t("subtitle")

  const itemCount = stats
    ? sourceFilter === "news"
      ? stats.news
      : sourceFilter === "social"
        ? stats.social
        : stats.all
    : null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="px-4 py-4 md:px-10 md:py-6">
      {/* Title + LIVE + Mark all read */}
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <h1 className="text-sm font-semibold uppercase tracking-widest">{title}</h1>

        <div className="flex items-center gap-3">
          {showMarkAllRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={markAllReadMutation.isPending}
              className="hidden h-7 gap-1.5 px-2 text-xs sm:flex"
            >
              <CheckCheckIcon className="size-3.5" />
              {t("markAllRead")}
            </Button>
          )}

          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {t("live")}
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="mb-4 line-clamp-2 text-xs text-muted-foreground md:mb-5 md:line-clamp-none">{subtitle}</p>

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-stretch sm:gap-2">
          {/* Items collected — full width on mobile, inline on desktop */}
          <div className="col-span-2 flex items-center gap-2.5 rounded-md border px-3 py-2 sm:col-span-1">
            <span
              key={itemCount}
              className="text-base font-semibold tabular-nums text-foreground"
            >
              {itemCount ?? "—"}
            </span>
            <div className="text-xs leading-tight text-muted-foreground">
              <div>{t("itemsCollected")}</div>
              <div className="text-[10px] uppercase tracking-wide opacity-70">
                {sourceFilter === "all" ? t("sourceAll") : sourceFilter === "news" ? t("sourceNews") : t("sourceSocial")}
                {" · "}{stats.sourcesCount} {t("sources")}
              </div>
            </div>
          </div>

          {/* Separator — desktop only */}
          <div className="hidden w-px self-stretch bg-border sm:block" />

          {/* Last crawl */}
          <div className="flex items-center rounded-md border px-3 py-2 text-xs text-muted-foreground sm:border-0 sm:px-1 sm:py-0">
            <div>
              <div className="text-[10px] uppercase tracking-wide">{t("lastCrawl")}</div>
              <div className="font-medium text-foreground">{timeAgo || "—"}</div>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-border sm:block" />

          {/* Next crawl */}
          <div className="flex items-center rounded-md border px-3 py-2 text-xs text-muted-foreground sm:border-0 sm:px-1 sm:py-0">
            <div>
              <div className="text-[10px] uppercase tracking-wide">{t("nextCrawl")}</div>
              <div className="font-medium text-foreground">{nextCrawl}</div>
            </div>
          </div>

          <div className="hidden w-px self-stretch bg-border sm:block" />

          {/* Sort — desktop only */}
          <div className="hidden items-center px-1 text-xs text-muted-foreground sm:flex">
            <div>
              <div className="text-[10px] uppercase tracking-wide">Sort</div>
              <div className="font-medium text-foreground">{t("sortedByRecent")}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
