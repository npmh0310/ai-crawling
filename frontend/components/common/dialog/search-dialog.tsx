"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { ArrowRightIcon, CornerDownLeftIcon, Loader2Icon, SearchIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { FeedDetailSheet } from "@/app/(home)/components/feed-detail-sheet"
import { type FeedItem } from "@/app/(home)/components/types"
import { feedQueryKeys } from "@/app/(home)/services/feed"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  href: string
}

type NavSection = {
  id: string
  title: string
  items: NavItem[]
}

export function SearchDialog() {
  const t = useTranslations("header")
  const tNav = useTranslations("navigation")
  const tDocs = useTranslations("documents")
  const locale = useLocale()

  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [debouncedQuery, setDebouncedQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [selectedArticle, setSelectedArticle] = React.useState<FeedItem | null>(null)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  // Debounce query 300ms
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  // Reset on close
  React.useEffect(() => {
    if (!open) {
      setQuery("")
      setDebouncedQuery("")
      setActiveIndex(0)
    }
  }, [open])

  // Cmd+K shortcut
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const isSearchMode = debouncedQuery.trim().length >= 2

  const { data: searchData, isFetching: isSearching } = useQuery(
    feedQueryKeys.search(debouncedQuery, locale),
  )
  const articleResults = searchData?.data ?? []

  const navSections: NavSection[] = [
    {
      id: "main-stream",
      title: tNav("mainStream"),
      items: [
        { id: "neural-feed", label: tNav("neuralFeed"), href: "/" },
        { id: "flash-alerts", label: tNav("flashAlerts"), href: "/flash-alerts" },
        { id: "research", label: tNav("research"), href: "/research" },
      ],
    },
    {
      id: "collections",
      title: tDocs("title"),
      items: [
        { id: "saved-intel", label: tNav("savedIntel"), href: "#" },
        { id: "compute-trends", label: tNav("computeTrends"), href: "#" },
      ],
    },
  ]

  const filteredNavSections = navSections
    .map((s) => ({ ...s, items: s.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) }))
    .filter((s) => s.items.length > 0)

  const allNavItems = filteredNavSections.flatMap((s) => s.items)

  function openArticleDetail(item: FeedItem) {
    setSelectedArticle(item)
    setOpen(false)
    setIsSheetOpen(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const total = isSearchMode ? articleResults.length : allNavItems.length
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, total - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      if (isSearchMode && articleResults[activeIndex]) {
        openArticleDetail(articleResults[activeIndex])
      }
    }
  }

  return (
    <>
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        render={
          <button
            type="button"
            className="flex flex-1 cursor-pointer items-center gap-2 text-left text-muted-foreground"
          />
        }
      >
        <SearchIcon className="size-4 shrink-0" />
        <span className="text-sm">{t("searchPlaceholder")}</span>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border bg-popover text-popover-foreground shadow-xl outline-none transition-all duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex items-center gap-3 border-b px-4 py-3">
            {isSearching
              ? <Loader2Icon className="size-4 shrink-0 animate-spin text-muted-foreground" />
              : <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            }
            <input
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
              onKeyDown={handleKeyDown}
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="max-h-80 overflow-y-auto py-2">
            {isSearchMode ? (
              articleResults.length === 0 && !isSearching ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  {t("searchNoResults")}
                </p>
              ) : (
                articleResults.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => openArticleDetail(item)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                      i === activeIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <SearchIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.company} · {item.category} · {item.timeAgo}
                      </p>
                    </div>
                  </button>
                ))
              )
            ) : (
              filteredNavSections.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  {t("searchNoResults")}
                </p>
              ) : (
                filteredNavSections.map((section) => (
                  <div key={section.id}>
                    <p className="px-4 pb-1 pt-2 text-xs font-medium text-muted-foreground">
                      {section.title}
                    </p>
                    {section.items.map((item) => {
                      const idx = allNavItems.findIndex((i) => i.id === item.id)
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors",
                            idx === activeIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                ))
              )
            )}
          </div>

          <div className="flex items-center gap-1.5 border-t px-4 py-2 text-xs text-muted-foreground">
            <CornerDownLeftIcon className="size-3" />
            <span>{isSearchMode ? t("searchOpenDetail") : t("searchPages")}</span>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>

    <FeedDetailSheet
      item={selectedArticle}
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    />
    </>
  )
}
