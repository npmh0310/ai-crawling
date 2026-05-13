"use client"

import { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRightIcon, FlameIcon, ZapIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

import { feedQueryKeys } from "../services/feed"
import { FeedItem } from "./types"

// =============================================================================
// Types
// =============================================================================

type Props = {
  onItemClick: (item: FeedItem) => void
}

type HotTier = "top" | "hot" | "breaking"

// =============================================================================
// Constants
// =============================================================================

const AUTOPLAY_DELAY_MS = 6000
const MAX_TAGS_VISIBLE = 3
const SCORE_BREAKING = 90
const SCORE_HOT = 75

// =============================================================================
// Helpers
// =============================================================================

function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

function getTier(score: number): HotTier {
  if (score >= SCORE_BREAKING) return "breaking"
  if (score >= SCORE_HOT) return "hot"
  return "top"
}

function getCategoryEmoji(category: string): string | null {
  const c = (category ?? "").toLowerCase()
  if (/release|launch|product/.test(c)) return "🚀"
  if (/breakthrough|research|paper|study/.test(c)) return "💡"
  if (/funding|acquisition|invest/.test(c)) return "💰"
  if (/benchmark|sota|state of the art|eval/.test(c)) return "📊"
  if (/feature|update/.test(c)) return "🔧"
  if (/opinion|discussion|thought/.test(c)) return "💬"
  return null
}

// =============================================================================
// Loading
// =============================================================================

function HotCarouselSkeleton() {
  return (
    <div className="border-b px-4 pt-4 pb-5 md:px-10 md:pt-6">
      <Skeleton className="h-40 w-full rounded-xl sm:h-52" />
    </div>
  )
}

// =============================================================================
// Component
// =============================================================================

export function HotNowStrip({ onItemClick }: Props) {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const t = useTranslations("neuralFeed")
  const locale = useLocale()
  const { data, isLoading } = useQuery(feedQueryKeys.hot(locale, 5))

  const autoplayRef = useRef(Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true }))
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrentIndex(api.selectedScrollSnap())
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  // ── Derived state ──────────────────────────────────────────────────────────
  const items = data?.data ?? []

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) return <HotCarouselSkeleton />
  if (items.length === 0) return null

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <section className="overflow-hidden border-b px-4 pt-4 pb-5 md:px-10 md:pt-6" aria-label={t("hotNow")}>
      <Carousel
        setApi={setApi}
        plugins={[autoplayRef.current]}
        opts={{ loop: true, align: "start" }}
        className="relative"
      >
        <CarouselContent>
          {items.map((item, i) => {
            const tier = getTier(item.score)
            const emoji = getCategoryEmoji(item.category)
            const isBreaking = tier === "breaking"
            const isHotTier = tier === "hot"

            return (
              <CarouselItem key={item.id}>
                <button
                  type="button"
                  onClick={() => onItemClick(item)}
                  className={cn(
                    "group relative flex h-40 w-full flex-col gap-2 overflow-hidden rounded-xl border p-4 text-left transition-all sm:h-52 sm:gap-4 sm:p-6",
                    // Tier 1 — default
                    tier === "top" && "bg-linear-to-br from-card via-card to-orange-500/5 hover:border-orange-500/40 hover:shadow-lg",
                    // Tier 2 — Hot: orange glow border + tinted bg
                    isHotTier && "border-orange-500/60 bg-linear-to-br from-card via-card to-orange-500/15 shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20",
                    // Tier 3 — Breaking: red→orange gradient, white text, animated
                    isBreaking && "border-transparent bg-linear-to-br from-red-600 via-orange-500 to-amber-500 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40",
                    item.isRead && "opacity-70",
                  )}
                >
                  {/* Top row: tier label + emoji + meta + counter */}
                  <div
                    className={cn(
                      "flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-widest",
                      isBreaking ? "text-white/85" : "text-muted-foreground",
                    )}
                  >
                    {/* Tier label */}
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-1 font-semibold",
                        isBreaking ? "text-white" : "text-orange-500",
                      )}
                    >
                      {isBreaking ? (
                        <ZapIcon className="size-3 animate-pulse" />
                      ) : (
                        <FlameIcon className={cn("size-3", isHotTier && "animate-pulse")} />
                      )}
                      {isBreaking ? t("hotBreaking") : t("hotNow")}
                    </span>

                    {/* Category emoji */}
                    {emoji && (
                      <span className="shrink-0 text-sm leading-none" aria-hidden>
                        {emoji}
                      </span>
                    )}

                    <span className={cn(isBreaking ? "text-white/40" : "text-muted-foreground/40")}>·</span>
                    <span className={cn("truncate font-semibold", isBreaking ? "text-white" : "text-foreground")}>
                      {item.company}
                    </span>
                    <span className="shrink-0">{item.timeAgo}</span>
                    <span className="ml-auto shrink-0 tabular-nums">
                      {pad2(i + 1)} / {pad2(items.length)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "line-clamp-2 text-sm font-semibold leading-snug sm:text-lg",
                      isBreaking && "sm:text-xl",
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Body preview — desktop only to keep mobile compact */}
                  {(item.body || item.quote) && (
                    <div className="hidden min-w-0 sm:block">
                      <p
                        className={cn(
                          "line-clamp-2 text-sm leading-relaxed wrap-break-word",
                          isBreaking ? "text-white/85" : "text-muted-foreground",
                        )}
                      >
                        {item.body ?? item.quote}
                      </p>
                    </div>
                  )}

                  {/* Bottom row: tags + read more */}
                  <div className="mt-auto flex items-end justify-between gap-3">
                    {item.tags && item.tags.length > 0 ? (
                      <div className="flex min-w-0 flex-wrap gap-1.5 overflow-hidden">
                        {item.tags.slice(0, MAX_TAGS_VISIBLE).map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[10px]",
                              isBreaking
                                ? "border-white/30 text-white/90"
                                : "text-muted-foreground",
                            )}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wide",
                          isBreaking ? "text-white/80" : "text-muted-foreground/80",
                        )}
                      >
                        {item.category}
                      </span>
                    )}

                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-widest transition-transform group-hover:translate-x-0.5",
                        isBreaking ? "text-white" : "text-orange-500",
                      )}
                    >
                      {t("hotReadMore")}
                      <ArrowRightIcon className="size-3" />
                    </span>
                  </div>
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
            )}
          />
        ))}
      </div>
    </section>
  )
}
