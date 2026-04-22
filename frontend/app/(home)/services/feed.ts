import { queryOptions } from "@tanstack/react-query"

import { api } from "@/lib/api-client"
import type { FeedItem } from "../components/types"
import { FEED_ENDPOINTS } from "../constants/endpoints"

// ─── Service ──────────────────────────────────────────────────────────────────

export const feedApiService = {
  getFeeds: () =>
    api.get<FeedItem[]>(FEED_ENDPOINTS.list),

  getFeedById: (id: string) =>
    api.get<FeedItem>(FEED_ENDPOINTS.detail(id)),

  markFeedRead: (id: string) =>
    api.patch<void>(FEED_ENDPOINTS.markRead(id)),
}

// ─── Query options ────────────────────────────────────────────────────────────

export const feedQueryKeys = {
  all: ["feed"] as const,
  lists: () => [...feedQueryKeys.all, "list"] as const,
  list: () =>
    queryOptions({
      queryKey: feedQueryKeys.lists(),
      queryFn: () => feedApiService.getFeeds(),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...feedQueryKeys.all, "detail", id],
      queryFn: () => feedApiService.getFeedById(id),
      enabled: Boolean(id),
    }),
}
