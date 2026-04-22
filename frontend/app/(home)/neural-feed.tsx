"use client"

import { useState } from "react"

import { FeedDetailSheet } from "./components/feed-detail-sheet"
import { FeedList } from "./components/feed-list"
import { IntelligenceHeader } from "./components/intelligence-header"
import { Company, FEED_ITEMS, FeedItem, SourceType } from "./components/types"

export function NeuralFeed() {
  const [sourceFilter, setSourceFilter] = useState<SourceType>("all")
  const [activeCompanies, setActiveCompanies] = useState<Set<Company>>(new Set())
  const [selectedItem, setSelectedItem] = useState<FeedItem | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function handleCompanyToggle(company: Company) {
    setActiveCompanies((prev) => {
      const next = new Set(prev)
      if (next.has(company)) next.delete(company)
      else next.add(company)
      return next
    })
  }

  function handleReset() {
    setSourceFilter("all")
    setActiveCompanies(new Set())
  }

  function handleItemClick(item: FeedItem) {
    setSelectedItem(item)
    setIsSheetOpen(true)
  }

  const filtered = FEED_ITEMS.filter((item) => {
    if (sourceFilter !== "all" && item.sourceType !== sourceFilter) return false
    if (activeCompanies.size > 0 && !activeCompanies.has(item.company)) return false
    return true
  })

  return (
    <div className="flex h-full flex-col">
      <IntelligenceHeader />
      {/* <StreamFilter
        sourceFilter={sourceFilter}
        activeCompanies={activeCompanies}
        onSourceChange={setSourceFilter}
        onCompanyToggle={handleCompanyToggle}
        onReset={handleReset}
      /> */}
      <FeedList items={filtered} onItemClick={handleItemClick} />
      <FeedDetailSheet
        item={selectedItem}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  )
}
