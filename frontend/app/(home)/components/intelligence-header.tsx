"use client"

import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { FEED_ITEMS } from "./types"

export function IntelligenceHeader() {
  const t = useTranslations("neuralFeed")

  return (
    <div className="m-10">
      <div className="flex items-center justify-between py-3 mb-4 ">
        <span className="text-xs font-semibold uppercase tracking-widest">{t("title")}</span>
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-500">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
          {t("activeMonitoring")}
        </div>
      </div>

      <div className="mb-4 rounded-lg border">
        {FEED_ITEMS.slice(0, 3).map((item, i) => (
          <div key={item.id} className={cn("flex items-start gap-3 px-4 py-3", i < 2 && "border-b")}>
            <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
