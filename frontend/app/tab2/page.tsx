import { AppShell } from "@/components/providers/app-shell"

export default function Tab2Page() {
  return (
    <AppShell>
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Tab 2</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đây là nội dung cho tab 2.
        </p>
      </div>
    </AppShell>
  )
}
