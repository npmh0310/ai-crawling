import { AppShell } from "@/components/providers/app-shell"

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
    </AppShell>
  )
}
