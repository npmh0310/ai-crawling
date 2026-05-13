"use client"

import { useEffect, useRef } from "react"
import { InboxIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { FeedItem } from "./types"

type Props = {
  items: FeedItem[]
  onItemClick: (item: FeedItem) => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  isLoading?: boolean
  onLoadMore?: () => void
}

const SVG_CDN = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons"
const SKELETON_ROWS = 6

function getSourceIcon(item: FeedItem): string {
  if (item.sourceType === "news") return `${SVG_CDN}/rss/default.svg`
  if (item.company === "Reddit") return `${SVG_CDN}/reddit/default.svg`
  return `${SVG_CDN}/x/default.svg`
}

function FeedListSkeleton() {
  return (
    <div className="flex-1 overflow-hidden border-t">
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <div
          key={i}
          className={cn("flex items-start gap-4 px-4 py-4 sm:px-6", i > 0 && "border-t")}
        >
          <Skeleton className="mt-0.5 size-4 shrink-0 rounded" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function FeedListEmpty() {
  const t = useTranslations("neuralFeed")
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 border-t px-6 py-16 text-center">
      <InboxIcon className="size-8 text-muted-foreground" />
      <p className="text-sm font-medium">{t("emptyTitle")}</p>
      <p className="text-xs text-muted-foreground">{t("emptyHint")}</p>
    </div>
  )
}

export function FeedList({
  items,
  onItemClick,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  onLoadMore,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onLoadMore || !hasNextPage) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onLoadMore() },
      { threshold: 0.1 },
    )
    const el = sentinelRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [onLoadMore, hasNextPage])

  if (isLoading) return <FeedListSkeleton />
  if (items.length === 0) return <FeedListEmpty />

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto border-t">
      {items.map((item, i) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          className={cn(
            "flex cursor-pointer items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/50 sm:px-6",
            i > 0 && "border-t",
            item.isRead && "opacity-60",
          )}
        >
          <div className="mt-0.5 shrink-0">
            <img
              src={getSourceIcon(item)}
              alt=""
              width={16}
              height={16}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="size-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide text-foreground">{item.company}</span>
                <span>{item.category}</span>
                <span>{item.timeAgo}</span>
              </div>
              {item.handle && (
                <span className="min-w-0 truncate text-xs text-muted-foreground">{item.handle}</span>
              )}
            </div>
            <p className={cn("mb-1 text-sm wrap-break-word", item.isRead ? "font-normal" : "font-medium")}>{item.title}</p>
            {item.body && <p className="text-sm text-muted-foreground wrap-break-word">{item.body}</p>}
            {item.quote && (
              <blockquote className="border-l-2 pl-3 text-sm italic text-muted-foreground wrap-break-word">{item.quote}</blockquote>
            )}
          </div>
        </div>
      ))}

      <div ref={sentinelRef} className="py-4 text-center text-xs text-muted-foreground">
        {isFetchingNextPage ? "Loading…" : hasNextPage ? "" : items.length > 0 ? "No more items" : ""}
      </div>
    </div>
  )
}
