import { Suspense } from "react"

import { NeuralFeed } from "@/app/(home)/neural-feed"
import { AppShell } from "@/components/providers/app-shell"

const RESEARCH_KEYWORDS = ["research", "paper", "study", "arxiv"]

export default function ResearchPage() {
  return (
    <AppShell>
      <Suspense>
        <NeuralFeed
          categoryKeywords={RESEARCH_KEYWORDS}
          lockFilters
          titleKey="research.title"
          subtitleKey="research.subtitle"
        />
      </Suspense>
    </AppShell>
  )
}
