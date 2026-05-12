"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { FeedItem } from "./types"

type Props = {
  items: FeedItem[]
  onItemClick: (item: FeedItem) => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  onLoadMore?: () => void
}

const SVG_CDN = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons"

function getSourceIcon(item: FeedItem): string {
  if (item.sourceType === "news") return `${SVG_CDN}/rss/default.svg`
  if (item.company === "Reddit") return `${SVG_CDN}/reddit/default.svg`
  return `${SVG_CDN}/x/default.svg`
}

export function FeedList({ items, onItemClick, hasNextPage, isFetchingNextPage, onLoadMore }: Props) {
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

  return (
    <div className="flex-1 overflow-y-auto border-t">
      {items.map((item, i) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item)}
          className={cn("flex cursor-pointer items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/50", i > 0 && "border-t")}
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
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide text-foreground">{item.company}</span>
                <span>{item.category}</span>
                <span>{item.timeAgo}</span>
              </div>
              {item.handle && <span className="text-xs text-muted-foreground">{item.handle}</span>}
            </div>
            <p className="mb-1 text-sm font-medium">{item.title}</p>
            {item.body && <p className="text-sm text-muted-foreground">{item.body}</p>}
            {item.quote && (
              <blockquote className="border-l-2 pl-3 text-sm italic text-muted-foreground">{item.quote}</blockquote>
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
