# Architecture Overview

## 1. High-level goal

This website aggregates RSS feeds from major AI companies, enriches them with AI-generated summaries, and presents them in a clean reading experience for users.

## 2. System architecture

```text
Users
  ↓
Frontend (Next.js)
  - feed dashboard
  - article detail view
  - filters and navigation
  - read/unread states
  ↓
Backend API (NestJS)
  - feed endpoints
  - ingestion scheduler
  - AI summarization pipeline
  - persistence layer
  ↓
PostgreSQL + Prisma
  - FeedSource
  - FeedItem
  - CrawlLog
  ↓
External services
  - RSS sources
  - AI API (key-based)
```

## 3. Data flow

### RSS ingestion
1. Cron job runs 2-4 times per day.
2. Backend fetches RSS from configured sources.
3. Items are normalized and deduplicated.
4. New items are stored in the database.

### AI enrichment
1. Newly ingested items are sent to an AI provider using an API key.
2. The AI generates:
   - short summary
   - key takeaways
   - tags
   - optional category / company hints
3. The enriched content is saved alongside the feed item.

### User reading flow
1. User opens the dashboard.
2. Frontend queries backend for the latest feed items.
3. User clicks an item.
4. The detail view shows the AI summary and a link to the original article.
5. Item can be marked as read.

## 4. Current codebase mapping

### Backend already present
- `backend/src/main.ts` sets up NestJS, Fastify, validation, response formatting, and error handling.
- `backend/src/app.module.ts` wires config, Prisma, and feed module.
- `backend/src/modules/feed/*` provides feed listing, detail, and mark-as-read endpoints.
- `backend/prisma/schema.prisma` defines `FeedSource`, `FeedItem`, and `CrawlLog`.

### Frontend already present
- `frontend/app/page.tsx` renders the home page.
- `frontend/app/(home)/neural-feed.tsx` handles query, mutation, and selection state.
- `frontend/app/(home)/components/feed-list.tsx` renders feed cards.
- `frontend/app/(home)/services/feed.ts` defines API calls and query keys.
- `frontend/components/providers/*` sets up query, theme, and toast providers.

## 5. What is missing for the full requirement

### A. RSS sources management
Need a config-driven source registry for:
- OpenAI
- Anthropic
- Google DeepMind
- Meta AI
- xAI

### B. Ingestion pipeline
Need a dedicated module to:
- fetch RSS
- parse entries
- deduplicate by GUID or URL
- persist raw article metadata

### C. AI summarization pipeline
Need AI integration to:
- summarize articles
- extract bullet takeaways
- generate tags
- optionally classify content type

### D. Scheduling
Need cron control to run:
- 2 times/day
- 3 times/day
- 4 times/day
or any configurable schedule you choose later

### E. Admin / operational visibility
Need:
- crawl logs
- last successful sync time
- error reporting
- source enable/disable

## 6. Recommended production layout

```text
backend/src/
  modules/
    feed/
    ingest/
    scheduler/
    sources/
    ai/
  prisma/
  common/

frontend/app/
  (home)/
  research/
  flash-alerts/
frontend/components/
frontend/lib/
```

## 7. Suggested next build steps

1. Add RSS source configuration.
2. Build ingestion job.
3. Add AI summarization service.
4. Save enriched data to Prisma models.
5. Expose data through backend API.
6. Render AI summaries in frontend detail UI.
7. Add cron scheduling options.
