"use client"

import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { feedQueryKeys } from "../services/feed"
import { type SourceType } from "./types"

// =============================================================================
// Types
// =============================================================================

type Props = {
  sourceFilter: SourceType
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

function computeNextCrawl(): string {
  const now = new Date()
  const next = new Date(now)
  if (now.getHours() < 12) {
    next.setHours(12, 0, 0, 0)
  } else {
    next.setDate(next.getDate() + 1)
    next.setHours(0, 0, 0, 0)
  }
  const diff = next.getTime() - now.getTime()
  const hrs = Math.floor(diff / 3_600_000)
  const mins = Math.floor((diff % 3_600_000) / 60_000)
  if (hrs === 0) return `${mins}m`
  return `${hrs}h ${mins}m`
}

// =============================================================================
// Component
// =============================================================================

export function IntelligenceHeader({ sourceFilter }: Props) {
  const t = useTranslations("neuralFeed")

  // ── Hooks ──────────────────────────────────────────────────────────────────
  const { data: crawlResponse } = useQuery(feedQueryKeys.crawlStats())
  const stats = crawlResponse?.data

  const [timeAgo, setTimeAgo] = useState<string>("")
  const [nextCrawl, setNextCrawl] = useState(computeNextCrawl)

  useEffect(() => {
    if (stats?.lastCrawledAt) setTimeAgo(computeTimeAgo(stats.lastCrawledAt))
  }, [stats?.lastCrawledAt])

  useEffect(() => {
    const tick = () => {
      setNextCrawl(computeNextCrawl())
      if (stats?.lastCrawledAt) setTimeAgo(computeTimeAgo(stats.lastCrawledAt))
    }
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [stats?.lastCrawledAt])

  // ── Derived state ──────────────────────────────────────────────────────────
  const itemCount = stats
    ? sourceFilter === "news"
      ? stats.news
      : sourceFilter === "social"
        ? stats.social
        : stats.all
    : null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="px-10 py-6">
      {/* Title + LIVE */}
      <div className="mb-1.5 flex items-center justify-between">
        <h1 className="text-sm font-semibold uppercase tracking-widest">{t("title")}</h1>

        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-500">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          {t("live")}
        </div>
      </div>

      {/* Subtitle */}
      <p className="mb-5 text-xs text-muted-foreground">{t("subtitle")}</p>

      {/* Stats row */}
      {stats && (
        <div className="flex flex-wrap items-stretch gap-2">
          {/* Items collected */}
          <div className="flex items-center gap-2.5 rounded-md border px-3 py-2">
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

          {/* Separator */}
          <div className="w-px self-stretch bg-border" />

          {/* Last crawl */}
          <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
            <div>
              <div className="text-[10px] uppercase tracking-wide">{t("lastCrawl")}</div>
              <div className="font-medium text-foreground">{timeAgo || "—"}</div>
            </div>
          </div>

          <div className="w-px self-stretch bg-border" />

          {/* Next crawl */}
          <div className="flex items-center gap-2 px-1 text-xs text-muted-foreground">
            <div>
              <div className="text-[10px] uppercase tracking-wide">{t("nextCrawl")}</div>
              <div className="font-medium text-foreground">{nextCrawl}</div>
            </div>
          </div>

          <div className="w-px self-stretch bg-border" />

          {/* Sort */}
          <div className="flex items-center px-1 text-xs text-muted-foreground">
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
