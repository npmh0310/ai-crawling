# Coding Style Rules

## Naming (JS/TS)

- Variables/functions: `camelCase`
- Components/types/classes: `PascalCase`
- True constants: `UPPER_SNAKE_CASE`
- Booleans: prefix with `is`, `has`, `can`, `should`
- Event handlers: prefix with `handle` (definition) or `on` (prop)
- Files: `kebab-case.ts` for modules, `PascalCase.tsx` for React components

## File Organization

- One primary export per file; split if multiple unrelated exports
- Keep files under 300 lines; extract sub-modules when longer
- Import order: external packages → internal absolute (`@/`) → relative → type-only (blank line between groups)

## Code Discipline

- No comments unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- No abstractions for hypothetical reuse — three similar lines beats a premature helper
- No error handling for impossible scenarios; trust internal guarantees
- No `any`, no commented-out code, no unused imports
- Keep functions ≤ 40 lines; ≤ 3 parameters (use an options object for more)
- No nested ternaries — use `if/else` or extract a helper

## Component File Structure (Strict Order)

Every `.tsx` file must follow this top-to-bottom order without exception:

```tsx
"use client" // 1. Directive — only when needed

// 2. Imports — three groups, blank line between each
// External
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
// Internal absolute
import { toast } from "@/lib/toast"
import { ComponentA } from "./components/ComponentA"
// Types
import { type MyType } from "./types"

// 3. Types / Interfaces — Props and local types only
interface Props {
  id: string
}

// 4. Constants & Helpers — pure, stateless, defined OUTSIDE the component
const MAX_ITEMS = 10
function formatLabel(value: string) { ... }

// =============================================================================
// 5. Main Component
// =============================================================================
export function MyComponent({ id }: Props) {

  // 5a. Hooks — TanStack Query first, then React hooks
  const { data, isLoading } = useQuery(myQueryKeys.detail(id))
  const [open, setOpen] = useState(false)

  // 5b. Handlers — event functions only, no logic leaking in
  function handleSubmit() { ... }

  // 5c. Derived state — computed values, filters, transforms
  const items = data?.data ?? []

  // 5d. Early returns — loading / error / empty — before main JSX
  if (isLoading) return <Spinner />
  if (!items.length) return <Empty />

  // 5e. Main JSX — always last
  return (
    <div>...</div>
  )
}
```

Rules within the component body:
- **Never** reorder sections — hooks must come before handlers, derived state before early returns
- **Never** define constants or pure helpers inside the component — move them above
- Mutations go in the Hooks section, their `onSuccess`/`onError` callbacks are inline (not extracted)
- Early returns must cover all non-happy-path states before the main `return`
