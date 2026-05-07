import { Suspense } from "react"
import { AppShell } from "@/components/providers/app-shell"
import { NeuralFeed } from "./(home)/neural-feed"

export default function HomePage() {
  return (
    <AppShell>
      <Suspense>
        <NeuralFeed />
      </Suspense>
    </AppShell>
  )
}
