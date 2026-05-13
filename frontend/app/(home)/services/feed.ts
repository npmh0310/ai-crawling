import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import type { FeedItem } from "../components/types"
import { FEED_ENDPOINTS } from "../constants/endpoints"

// ─── Types ────────────────────────────────────────────────────────────────────

export type CrawlStats = {
  all: number
  news: number
  social: number
  sourcesCount: number
  lastCrawledAt: string | null
  nextCrawlAt: string | null
}

export type FeedQuery = {
  company?: string[]
  sourceType?: "news" | "social"
  category?: string
  unreadOnly?: boolean
  lang?: "en" | "vi"
  page?: number
  take?: number
}

type InfiniteFeedQuery = Omit<FeedQuery, "page" | "take">

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildQueryString(params: Record<string, string | string[] | number | boolean | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === false) continue
    if (key === "company" && Array.isArray(value)) {
      value.forEach((v) => search.append("company", v))
    } else {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ""
}

// ─── Service ──────────────────────────────────────────────────────────────────

export type HotFeedItem = FeedItem & { score: number; isHot: boolean }

export const feedApiService = {
  getFeeds: (params?: FeedQuery) =>
    api.get<FeedItem[]>(FEED_ENDPOINTS.list + buildQueryString({ ...params })),

  searchFeeds: (q: string, lang?: string, page = 1) =>
    api.get<FeedItem[]>(FEED_ENDPOINTS.search + buildQueryString({ q, lang, page })),

  getHotFeeds: (lang?: string, limit = 5) =>
    api.get<HotFeedItem[]>(FEED_ENDPOINTS.hot + buildQueryString({ lang, limit })),

  getFeedById: (id: string) =>
    api.get<FeedItem>(FEED_ENDPOINTS.detail(id)),

  markFeedRead: (id: string) =>
    api.patch<void>(FEED_ENDPOINTS.markRead(id)),

  markAllRead: () =>
    api.patch<{ updated: number }>(FEED_ENDPOINTS.readAll),

  getCrawlStats: () =>
    api.get<CrawlStats>(FEED_ENDPOINTS.crawlStats),
}

// ─── Query keys ───────────────────────────────────────────────────────────────

export const feedQueryKeys = {
  all: ["feed"] as const,
  lists: () => [...feedQueryKeys.all, "list"] as const,
  list: (params?: FeedQuery) =>
    queryOptions({
      queryKey: [...feedQueryKeys.lists(), params],
      queryFn: () => feedApiService.getFeeds(params),
    }),
  infinite: (params?: InfiniteFeedQuery) =>
    infiniteQueryOptions({
      queryKey: [...feedQueryKeys.lists(), "infinite", params],
      queryFn: ({ pageParam }) =>
        feedApiService.getFeeds({ ...params, page: pageParam as number, take: 10 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta?.hasNextPage ? lastPage.meta.page + 1 : undefined,
    }),
  search: (q: string, lang?: string) =>
    queryOptions({
      queryKey: [...feedQueryKeys.all, "search", q, lang],
      queryFn: () => feedApiService.searchFeeds(q, lang),
      enabled: q.trim().length >= 2,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...feedQueryKeys.all, "detail", id],
      queryFn: () => feedApiService.getFeedById(id),
      enabled: Boolean(id),
    }),
  crawlStats: () =>
    queryOptions({
      queryKey: [...feedQueryKeys.all, "crawl-stats"],
      queryFn: () => feedApiService.getCrawlStats(),
      staleTime: 5 * 60 * 1000,
    }),
  hot: (lang?: string, limit = 5) =>
    queryOptions({
      queryKey: [...feedQueryKeys.all, "hot", lang, limit] as const,
      queryFn: () => feedApiService.getHotFeeds(lang, limit),
      staleTime: 60_000,
    }),
}
