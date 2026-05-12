# AI Crawling

A full-stack AI news aggregator that ingests content from major AI companies (OpenAI, Anthropic, Google DeepMind, Meta AI, NVIDIA), Twitter, and Reddit, then enriches it with Google Gemini and serves it through a clean reading UI.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Next.js 16 UI  │ ──▶ │  NestJS Backend │ ──▶ │  PostgreSQL      │
│  (React 19)     │ ◀── │  (Fastify)      │ ◀── │  (Prisma)        │
└─────────────────┘     └─────────────────┘     └──────────────────┘
                               │
                ┌──────────────┼─────────────────┐
                ▼              ▼                 ▼
          ┌──────────┐   ┌──────────┐    ┌─────────────┐
          │ RSSHub   │   │ Reddit   │    │ Twitter     │
          │ (RSS)    │   │ (JSON)   │    │ (Playwright)│
          └──────────┘   └──────────┘    └─────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │ Google Gemini│
                        │ (enrichment) │
                        └──────────────┘
```

## Stack

| Layer       | Tech                                                                  |
| ----------- | --------------------------------------------------------------------- |
| Frontend    | Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, TanStack Query v5, next-intl |
| Backend     | NestJS (Fastify), Prisma, PostgreSQL                                  |
| AI          | Google Gemini (`gemma-4-26b-a4b-it`)                                  |
| Crawlers    | RSSHub, Reddit JSON API, Playwright (Twitter)                         |

## Project Structure

```
.
├── backend/            # NestJS API + ingest pipeline + scheduler
├── frontend/           # Next.js reader UI (i18n: en/vi)
├── twitter-service/    # Python Playwright service for Twitter scraping
└── docs/               # Architecture & cron-flow docs
```

## Ingest Pipeline

A single **sequential cron orchestrator** runs the full pipeline to avoid overlapping AI rate-limits:

```
RSS ─▶ Twitter ─▶ Reddit ─▶ Backfill-Vi
```

- **RSS** — fetches from 5 RSSHub sources, crawls full article HTML, sends to Gemini for category / takeaways / tags
- **Twitter** — calls the Python Playwright service to fetch tweets from configured handles
- **Reddit** — pulls posts from configured subreddits via Reddit JSON API
- **Backfill-Vi** — retries Gemini enrichment for items missing Vietnamese translation

A run-guard prevents overlapping ticks if a previous run is still in progress.

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env   # set DATABASE_URL, GOOGLE_AI_API_KEY, RSSHUB_BASE_URL, TWITTER_SERVICE_URL
npx prisma migrate dev
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set BACKEND_URL
npm run dev
```

### Twitter Service

```bash
cd twitter-service
pip install -r requirements.txt
python save_cookies.py   # one-time login to save Twitter cookies
python main.py
```

## Configuration

Key env vars (backend):

| Variable               | Default                 | Purpose                                      |
| ---------------------- | ----------------------- | -------------------------------------------- |
| `CRON_SCHEDULE`        | `0 0,12 * * *`          | Master cron (server timezone)                |
| `GOOGLE_AI_API_KEY`    | —                       | Gemini API key                               |
| `RSSHUB_BASE_URL`      | —                       | RSSHub instance URL                          |
| `TWITTER_SERVICE_URL`  | `http://localhost:3010` | Python Twitter service                       |
| `REDDIT_TIMEFRAME`     | `day`                   | `hour` / `day` / `week`                      |
| `BACKEND_URL`          | —                       | (frontend) backend base URL for proxy route  |

All other tunables (rate-limits, retry, content-length caps) live in [`backend/src/config.ts`](backend/src/config.ts).

## API

| Method | Path                              | Purpose                                    |
| ------ | --------------------------------- | ------------------------------------------ |
| GET    | `/feed`                           | Paginated feed items (filterable)          |
| GET    | `/ingest/run`                     | Trigger RSS ingest manually                |
| GET    | `/ingest/twitter/run`             | Trigger Twitter ingest manually            |
| GET    | `/ingest/reddit/run`              | Trigger Reddit ingest manually             |
| GET    | `/ingest/backfill-vi`             | Retry Vietnamese enrichment for missing items |
| GET    | `/ingest/preview/:sourceId`       | Preview RSS source without persisting      |
| DELETE | `/ingest/reset`                   | Wipe all FeedItems (dev)                   |

The frontend never calls the backend directly — all requests go through `app/api/proxy/[...path]/route.ts`.

## Data Model

- **FeedSource** — RSS / Twitter / Reddit source registry
- **FeedItem** — normalized item: title, body, takeaways, tags, category, sourceType, publishedAt, isRead
- **CrawlLog** — per-source run history: status, itemsFound, itemsNew, errorMsg

## Docs

- [`docs/architecture.md`](docs/architecture.md) — system design
- [`docs/cron-flow.md`](docs/cron-flow.md) — scheduler & orchestrator detail
- [`docs/issues.md`](docs/issues.md) — known issues & TODOs
