"use client"

// ─── External ─────────────────────────────────────────────────────────────────
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// ─── Internal ─────────────────────────────────────────────────────────────────
import { toast } from "@/lib/toast"
import { FeedDetailSheet } from "./components/feed-detail-sheet"
import { FeedList } from "./components/feed-list"
import { IntelligenceHeader } from "./components/intelligence-header"
import { feedApiService, feedQueryKeys } from "./services/feed"

// ─── Types ────────────────────────────────────────────────────────────────────
import { type FeedItem } from "./components/types"

// =============================================================================
// Component
// =============================================================================

export function NeuralFeed() {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  const queryClient = useQueryClient()
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const { data, isLoading, isFetching } = useQuery(feedQueryKeys.list())

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => feedApiService.markFeedRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKeys.lists() })
      toast.success("Marked as read")
    },
    onError: () => {
      toast.error("Failed to mark as read")
    },
  })

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleItemClick(item: FeedItem) {
    setSelectedItem(item)
    setIsSheetOpen(true)
    markRead(item.id)
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const items = data?.data ?? []

  // ── Early returns ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      <IntelligenceHeader />
      {isFetching && (
        <p className="px-4 py-1 text-xs text-muted-foreground">Refreshing…</p>
      )}
      <FeedList items={items} onItemClick={handleItemClick} />
      <FeedDetailSheet
        item={selectedItem}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  )
}
