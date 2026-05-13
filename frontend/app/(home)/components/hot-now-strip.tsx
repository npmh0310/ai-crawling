"use client"

import { useQuery } from "@tanstack/react-query"
import { FlameIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { feedQueryKeys } from "../services/feed"
import { FeedItem } from "./types"

type Props = {
  onItemClick: (item: FeedItem) => void
}

const SKELETON_CARDS = 5

function HotNowSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-2 md:px-10">
      {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-64 shrink-0 rounded-lg" />
      ))}
    </div>
  )
}

export function HotNowStrip({ onItemClick }: Props) {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("neuralFeed")
  const locale = useLocale()
  const { data, isLoading } = useQuery(feedQueryKeys.hot(locale, 5))

  // ── Derived state ──────────────────────────────────────────────────────────
  const items = data?.data ?? []

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="border-b py-3">
        <div className="mb-2 flex items-center gap-1.5 px-4 md:px-10">
          <FlameIcon className="size-3.5 text-orange-500" />
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
            {t("hotNow")}
          </h2>
        </div>
        <HotNowSkeleton />
      </section>
    )
  }

  if (items.length === 0) return null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <section className="border-b py-3">
      <div className="mb-2 flex items-center gap-1.5 px-4 md:px-10">
        <FlameIcon className="size-3.5 text-orange-500" />
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
          {t("hotNow")}
        </h2>
        <span className="text-[10px] tabular-nums text-muted-foreground">{items.length}</span>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 pb-2 md:px-10">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item)}
            className={cn(
              "group flex w-64 shrink-0 flex-col gap-1.5 rounded-lg border bg-card p-3 text-left transition-colors hover:border-orange-500/40 hover:bg-muted/40",
              item.isRead && "opacity-60",
            )}
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              <span className="font-semibold text-foreground">{item.company}</span>
              <span>·</span>
              <span>{item.timeAgo}</span>
            </div>

            <p className="line-clamp-2 text-sm font-medium leading-snug">{item.title}</p>

            {item.category && (
              <span className="mt-auto text-[10px] uppercase tracking-wide text-muted-foreground/80">
                {item.category}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
