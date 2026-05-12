import { Suspense } from "react"

import { NeuralFeed } from "@/app/(home)/neural-feed"
import { AppShell } from "@/components/providers/app-shell"

export default function FlashAlertsPage() {
  return (
    <AppShell>
      <Suspense>
        <NeuralFeed
          defaultSource="social"
          lockFilters
          titleKey="flashAlerts.title"
          subtitleKey="flashAlerts.subtitle"
        />
      </Suspense>
    </AppShell>
  )
}
