import { getTranslations } from "next-intl/server"

import { AppShell } from "@/components/providers/app-shell"

import { CrawlLogsTable } from "./components/crawl-logs-table"
import { LogoutButton } from "./components/logout-button"
import { SourcesTable } from "./components/sources-table"
import { StatsCards } from "./components/stats-cards"

export default async function AdminPage() {
  const t = await getTranslations("admin")

  return (
    <AppShell>
      <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6 md:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-widest">{t("title")}</h1>
            <p className="mt-1 text-xs text-muted-foreground">{t("subtitle")}</p>
          </div>
          <LogoutButton />
        </div>

        <StatsCards />

        <section className="space-y-3">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("sources")}
          </h2>
          <SourcesTable />
        </section>

        <section className="space-y-3">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("crawlLogs")}
          </h2>
          <CrawlLogsTable />
        </section>
      </div>
    </AppShell>
  )
}
