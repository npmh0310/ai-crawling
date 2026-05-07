"use client"

import { SlidersHorizontalIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { COMPANIES, Company, SourceType } from "./types"

type Props = {
  sourceFilter: SourceType
  activeCompany: Company | null
  onSourceChange: (source: SourceType) => void
  onCompanyChange: (company: Company | null) => void
  onReset: () => void
}

export function StreamFilter({ sourceFilter, activeCompany, onSourceChange, onCompanyChange, onReset }: Props) {
  const t = useTranslations("neuralFeed")

  return (
    <div>
      <div className="mb-3 flex items-center justify-between py-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <SlidersHorizontalIcon className="size-3.5" />
          {t("streamConfiguration")}
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold uppercase tracking-widest text-blue-500 hover:text-blue-400"
        >
          {t("resetFilters")}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-6 rounded-lg border px-4 py-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t("sources")}</span>
          <div className="flex items-center gap-1">
            {(["all", "news", "social"] as SourceType[]).map((s) => (
              <button
                key={s}
                onClick={() => onSourceChange(s)}
                className={cn(
                  "rounded px-3 py-1 text-xs font-medium transition-colors",
                  sourceFilter === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(s === "all" ? "sourceAll" : s === "news" ? "sourceNews" : "sourceSocial")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t("filterByCompany")}</span>
          <div className="flex flex-wrap items-center gap-1">
            {COMPANIES.map((c) => (
              <button
                key={c}
                onClick={() => onCompanyChange(activeCompany === c ? null : c)}
                className={cn(
                  "rounded border px-2.5 py-0.5 text-xs font-medium transition-colors",
                  activeCompany === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
