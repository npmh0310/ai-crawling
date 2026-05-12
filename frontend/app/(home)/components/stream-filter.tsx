"use client"

import { useState } from "react"
import { ChevronDownIcon, RotateCcwIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { COMPANIES, Company, SourceType } from "./types"

// =============================================================================
// Types
// =============================================================================

type Props = {
  sourceFilter: SourceType
  activeCompanies: Company[]
  onSourceChange: (source: SourceType) => void
  onApply: (companies: Company[]) => void
  onReset: () => void
}

// =============================================================================
// Constants
// =============================================================================

const SOURCE_OPTIONS: { value: SourceType; labelKey: "sourceAll" | "sourceNews" | "sourceSocial" }[] = [
  { value: "all", labelKey: "sourceAll" },
  { value: "news", labelKey: "sourceNews" },
  { value: "social", labelKey: "sourceSocial" },
]

// =============================================================================
// Component
// =============================================================================

export function StreamFilter({ sourceFilter, activeCompanies, onSourceChange, onApply, onReset }: Props) {
  const t = useTranslations("neuralFeed")

  // ── Hooks ──────────────────────────────────────────────────────────────────
  const [draftCompanies, setDraftCompanies] = useState<Company[]>(activeCompanies)
  const [open, setOpen] = useState(false)

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleOpenChange(next: boolean) {
    if (next) setDraftCompanies(activeCompanies)
    setOpen(next)
  }

  function handleCompanyToggle(company: Company) {
    setDraftCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    )
  }

  function handleApply() {
    onApply(draftCompanies)
    setOpen(false)
  }

  function handleReset() {
    setDraftCompanies([])
    onReset()
  }

  // ── Derived state ──────────────────────────────────────────────────────────
  const hasActiveFilters = sourceFilter !== "all" || activeCompanies.length > 0

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
      {/* Source tabs — full width on mobile */}
      <div className="flex w-full items-center gap-0.5 rounded-lg bg-muted/60 p-0.5 sm:w-auto">
        {SOURCE_OPTIONS.map(({ value, labelKey }) => (
          <button
            key={value}
            onClick={() => onSourceChange(value)}
            className={cn(
              "flex-1 rounded-md px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-150 sm:flex-none",
              sourceFilter === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Divider — desktop only */}
      <div className="hidden h-5 w-px bg-border sm:block" />

      {/* Bottom row on mobile: dropdown + reset side-by-side */}
      <div className="flex items-center gap-3 sm:contents">
        {/* Company multi-select dropdown */}
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger
            className={cn(
              "flex h-8 flex-1 items-center justify-between gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors outline-none sm:flex-none sm:justify-start",
              activeCompanies.length > 0
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-1.5">
              {t("filterByCompany")}
              {activeCompanies.length > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-background/20 text-[10px] font-bold leading-none">
                  {activeCompanies.length}
                </span>
              )}
            </span>
            <ChevronDownIcon className="size-3 opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-44">
            <div className="px-1.5 pb-1 pt-0.5 text-xs font-medium text-muted-foreground">
              {t("filterByCompany")}
            </div>
            <DropdownMenuSeparator />
            {COMPANIES.map((company) => (
              <DropdownMenuCheckboxItem
                key={company}
                checked={draftCompanies.includes(company)}
                onCheckedChange={() => handleCompanyToggle(company)}
                closeOnClick={false}
              >
                {company}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <div className="p-1">
              <button
                onClick={handleApply}
                className="w-full rounded-md bg-foreground py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-80"
              >
                {t("applyFilters")}
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reset — only when active */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcwIcon className="size-3" />
            {t("resetFilters")}
          </button>
        )}
      </div>
    </div>
  )
}
