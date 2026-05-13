"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { feedQueryKeys } from "@/app/(home)/services/feed"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

// =============================================================================
// Helpers
// =============================================================================

function computeTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "now"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
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

export function GlobalStatsPill({ className }: Props) {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("neuralFeed")

  const { data: crawlResponse } = useQuery(feedQueryKeys.crawlStats())
  const stats = crawlResponse?.data

  const [timeAgo, setTimeAgo] = useState<string>("—")
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

  // ── Early returns ──────────────────────────────────────────────────────────
  if (!stats) return null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex shrink-0 items-center gap-2 text-xs md:gap-2.5", className)}>
      {/* Live pulse */}
      <span className="flex shrink-0 items-center gap-1.5 font-semibold uppercase tracking-widest text-emerald-500">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="hidden md:inline">{t("live")}</span>
      </span>

      <span className="shrink-0 text-muted-foreground/40">·</span>

      {/* Items collected */}
      <span className="flex shrink-0 items-baseline gap-1">
        <span className="font-semibold tabular-nums text-foreground">{stats.all}</span>
        <span className="text-muted-foreground">{t("itemsShort")}</span>
      </span>

      <span className="shrink-0 text-muted-foreground/40">·</span>

      {/* Last sync */}
      <span className="flex shrink-0 items-baseline gap-1 text-muted-foreground">
        <span className="hidden text-[10px] uppercase tracking-wide md:inline">{t("lastCrawl")}</span>
        <span className="font-medium text-foreground">{timeAgo}</span>
      </span>

      <span className="shrink-0 text-muted-foreground/40">·</span>

      {/* Next crawl */}
      <span className="flex shrink-0 items-baseline gap-1 text-muted-foreground">
        <span className="hidden text-[10px] uppercase tracking-wide md:inline">{t("nextCrawl")}</span>
        <span className="font-medium text-foreground">{nextCrawl}</span>
      </span>
    </div>
  )
}
