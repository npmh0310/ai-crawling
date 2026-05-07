import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import type { FeedItem } from "../components/types"
import { FEED_ENDPOINTS } from "../constants/endpoints"

// ─── Types ────────────────────────────────────────────────────────────────────

export type FeedQuery = {
  company?: string
  sourceType?: "news" | "social"
  category?: string
  unreadOnly?: boolean
  lang?: "en" | "vi"
  page?: number
  take?: number
}

type InfiniteFeedQuery = Omit<FeedQuery, "page" | "take">

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "" && value !== false) {
      search.set(key, String(value))
    }
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ""
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const feedApiService = {
  getFeeds: (params?: FeedQuery) =>
    api.get<FeedItem[]>(FEED_ENDPOINTS.list + buildQueryString({ ...params })),

  searchFeeds: (q: string, lang?: string, page = 1) =>
    api.get<FeedItem[]>(FEED_ENDPOINTS.search + buildQueryString({ q, lang, page })),

  getFeedById: (id: string) =>
    api.get<FeedItem>(FEED_ENDPOINTS.detail(id)),

  markFeedRead: (id: string) =>
    api.patch<void>(FEED_ENDPOINTS.markRead(id)),

  markAllRead: () =>
    api.patch<{ updated: number }>(FEED_ENDPOINTS.readAll),
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
}
