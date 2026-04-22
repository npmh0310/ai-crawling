# Skill: new-page

Create a new page in the Next.js App Router following project conventions.

## Trigger

Use when asked to "create a new page", "add a route", or "add a screen".

## Steps

1. Create the folder `app/<route>/` with a `page.tsx` file
2. Default export must be an `async` Server Component unless the page clearly needs client state
3. Add a `loading.tsx` if the page fetches data
4. If the page has significant layout, add a `layout.tsx` scoped to that route
5. Co-locate page-specific sub-components inside `app/<route>/` — only extract to `components/` if reused elsewhere
6. Add i18n namespace to `messages/vi.json` and `messages/en.json` for any user-visible strings

## Template

```tsx
// app/<route>/page.tsx
import { getTranslations } from "next-intl/server";

export default async function <Name>Page() {
  const t = await getTranslations("<Namespace>");

  return (
    <main>
      <h1>{t("title")}</h1>
    </main>
  );
}
```

## Checklist

- [ ] No hardcoded strings
- [ ] Server Component by default
- [ ] Route folder matches URL segment exactly
