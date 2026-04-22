import { AppShell } from "@/components/providers/app-shell"

export default function Home() {
  return (
    <AppShell>
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đây là dashboard route `/`.
        </p>
      </div>
    </AppShell>
  )
}
