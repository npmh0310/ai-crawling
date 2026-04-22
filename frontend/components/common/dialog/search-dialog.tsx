"use client"

import * as React from "react"
import { ArrowRightIcon, CornerDownLeftIcon, SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"

type SearchItem = {
  id: string
  label: string
  href: string
}

type SearchSection = {
  id: string
  title: string
  items: SearchItem[]
}

export function SearchDialog() {
  const t = useTranslations("header")
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)

  const tNav = useTranslations("navigation")
  const tDocs = useTranslations("documents")

  const sections: SearchSection[] = [
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

  React.useEffect(() => {
    if (!open) {
      setQuery("")
      setActiveIndex(0)
    }
  }, [open])

  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0)

  const allItems = filteredSections.flatMap((s) => s.items)

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, allItems.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && allItems[activeIndex]) {
      setOpen(false)
    }
  }

  return (
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
            <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="max-h-80 overflow-y-auto py-2">
            {filteredSections.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("searchNoResults")}
              </p>
            ) : (
              filteredSections.map((section) => (
                <div key={section.id}>
                  <p className="px-4 pb-1 pt-2 text-xs font-medium text-muted-foreground">
                    {section.title}
                  </p>
                  {section.items.map((item) => {
                    const globalIndex = allItems.findIndex(
                      (i) => i.id === item.id
                    )
                    const isActive = globalIndex === activeIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {allItems.length > 0 && (
            <div className="flex items-center gap-1.5 border-t px-4 py-2 text-xs text-muted-foreground">
              <CornerDownLeftIcon className="size-3" />
              <span>{t("searchGoToPage")}</span>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
