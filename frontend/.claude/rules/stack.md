# Stack Rules

## Next.js App Router

- Default to **Server Components**; add `"use client"` only when required (event handlers, hooks, browser APIs)
- Use **Server Actions** for mutations — no separate API routes unless a client can't use actions
- Co-locate page-specific components inside `app/<route>/`; shared components go in `components/`
- Check `node_modules/next/dist/docs/` before using any Next.js API — version 16 has breaking changes

## TypeScript

- No `any` — use `unknown` + narrow, or define the type
- Use `zod` schemas at API/form boundaries; infer types with `z.infer<>`
- Export types from the same file as their implementation

## i18n (next-intl)

- Never hardcode user-visible strings — use `useTranslations()` (client) or `getTranslations()` (server)
- Update **both** `messages/vi.json` and `messages/en.json` at the same time
- Key convention: `PascalCaseNamespace.camelCaseKey`

## Components (shadcn/ui)

- Extend via `className` + `cn()` — never fork a shadcn component
- New shared UI → `components/common/`; layout pieces → `components/layouts/`
- Use `cva` for variants, not inline ternaries
