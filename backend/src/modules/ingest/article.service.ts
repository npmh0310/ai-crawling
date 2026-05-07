import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import pLimit from 'p-limit'
import { PrismaService } from '../../prisma/prisma.service'
import { RssService } from './rss.service'
import { ArticleCrawlerService } from './article-crawler.service'
import { AiProcessorService } from '../ai-processor/ai-processor.service'
import { RSS_SOURCES, getRssSource } from '../sources/rss-sources'
import { CONFIG } from '../../config'
import { RateLimiter } from '../../common/utils/rate-limiter.util'
import { withRetry } from '../../common/utils/retry.util'

export type IngestResult = {
  sourceId: string
  inserted: number
  skipped: number
  failed: number
}

@Injectable()
export class ArticleService implements OnModuleInit {
  private readonly logger = new Logger(ArticleService.name)
  private readonly crawlLimit = pLimit(CONFIG.crawler.concurrency)
  private readonly rateLimiter = new RateLimiter(
    CONFIG.ai.rateLimit.maxRequestsPerMinute,
    CONFIG.ai.rateLimit.maxRequestsPerMinute / 60000,
  )

  constructor(
    private readonly prisma: PrismaService,
    private readonly rssService: RssService,
    private readonly crawlerService: ArticleCrawlerService,
    private readonly aiService: AiProcessorService,
  ) {}

  async onModuleInit() {
    try {
      await this.seedFeedSources()
    } catch (err) {
      this.logger.error('Failed to seed feed sources — DB may be unavailable', err)
    }
  }

  private async seedFeedSources() {
    for (const source of RSS_SOURCES) {
      await this.prisma.feedSource.upsert({
        where: { id: source.id },
        update: {},
        create: {
          id: source.id,
          company: source.company as any,
          name: source.name,
          rssUrl: source.urls[0],
        },
      })
    }
    this.logger.log(`Feed sources seeded (${RSS_SOURCES.length})`)
  }

  private async getIngestSince(sourceId: string): Promise<Date> {
    const latest = await this.prisma.feedItem.findFirst({
      where: { sourceId },
      orderBy: { publishedAt: 'desc' },
      select: { publishedAt: true },
    })

    if (latest) {
      const cronFloor = new Date(Date.now() - CONFIG.ingest.cronLookbackHours * 60 * 60 * 1000)
      return latest.publishedAt > cronFloor ? latest.publishedAt : cronFloor
    }

    const since = new Date()
    since.setDate(since.getDate() - CONFIG.ingest.firstRunLookbackDays)
    return since
  }

  async ingestSource(sourceId: string): Promise<IngestResult> {
    const rssSource = getRssSource(sourceId)
    if (!rssSource) throw new Error(`Unknown source: ${sourceId}`)

    const log = await this.prisma.crawlLog.create({
      data: { sourceId, status: 'partial', startedAt: new Date() },
    })

    let inserted = 0
    let skipped = 0
    let failed = 0

    try {
      const since = await this.getIngestSince(sourceId)
      const sinceStr = since.toISOString().split('T')[0]
      this.logger.log(`[${sourceId}] fetching since ${sinceStr}`)

      const { data: items } = await this.rssService.fetchAndParse(rssSource, {
        take: CONFIG.ingest.maxItemsPerFetch,
        page: 1,
        requestReceivedStart: sinceStr,
      })

      const guids = items.map((i) => i.guid)
      const existing = await this.prisma.feedItem.findMany({
        where: { guid: { in: guids } },
        select: { guid: true },
      })
      const existingSet = new Set(existing.map((e) => e.guid))
      const newItems = items.filter((i) => !existingSet.has(i.guid))
      skipped = items.length - newItems.length
      this.logger.log(`[${sourceId}] ${items.length} fetched, ${newItems.length} new`)

      const crawled = await Promise.all(
        newItems.map((item) =>
          this.crawlLimit(async () => {
            const articleContent = await this.crawlerService.fetchArticleContent(item.link)
            return {
              item,
              content: articleContent?.content ?? item.summary ?? item.title,
            }
          }),
        ),
      )

      for (const { item, content } of crawled) {
        try {
          await this.rateLimiter.acquire()
          const aiResult = await withRetry(
            () => this.aiService.analyze(item.title, content, item.company),
            {
              maxAttempts: CONFIG.ai.retry.maxAttempts,
              baseDelayMs: CONFIG.ai.retry.baseDelayMs,
              maxDelayMs: CONFIG.ai.retry.maxDelayMs,
              shouldRetry: (e) => !e.message.includes('400'),
            },
          )

          await this.prisma.feedItem.upsert({
            where: { guid: item.guid },
            update: {},
            create: {
              sourceId,
              company: item.company as any,
              sourceType: 'news',
              category: aiResult.category,
              title: item.title,
              titleVi: aiResult.titleVi || null,
              body: content,
              bodyVi: aiResult.bodyVi || null,
              takeaways: aiResult.takeaways,
              takeawaysVi: aiResult.takeawaysVi,
              tags: aiResult.tags,
              originalUrl: item.link,
              publishedAt: item.publishedAt ?? new Date(),
              guid: item.guid,
            },
          })
          inserted++
        } catch (err) {
          this.logger.warn(`Failed to ingest item "${item.title}": ${(err as Error).message}`)
          failed++
        }
      }

      const status = inserted === 0 && failed > 0 ? 'failed' : failed > 0 ? 'partial' : 'success'
      await this.prisma.crawlLog.updateMany({
        where: { id: log.id },
        data: { status, itemsFound: items.length, itemsNew: inserted, finishedAt: new Date() },
      })

      return { sourceId, inserted, skipped, failed }
    } catch (err) {
      await this.prisma.crawlLog.updateMany({
        where: { id: log.id },
        data: { status: 'failed', errorMsg: (err as Error).message, finishedAt: new Date() },
      })
      throw err
    }
  }

  async backfillVietnamese(): Promise<{ updated: number; failed: number }> {
    const items = await this.prisma.feedItem.findMany({
      where: {
        OR: [
          { takeawaysVi: { equals: [] } },
          { titleVi: null },
        ],
      },
      select: { id: true, title: true, body: true, company: true },
    })
    this.logger.log(`[backfill-vi] ${items.length} items need Vietnamese`)

    let updated = 0
    let failed = 0

    for (const item of items) {
      try {
        await this.rateLimiter.acquire()
        const aiResult = await withRetry(
          () => this.aiService.analyze(item.title, item.body ?? item.title, item.company),
          {
            maxAttempts: CONFIG.ai.retry.maxAttempts,
            baseDelayMs: CONFIG.ai.retry.baseDelayMs,
            maxDelayMs: CONFIG.ai.retry.maxDelayMs,
            shouldRetry: (e) => !e.message.includes('400'),
          },
        )

        if (aiResult.takeawaysVi.length > 0 || aiResult.titleVi) {
          await this.prisma.feedItem.update({
            where: { id: item.id },
            data: {
              takeawaysVi: aiResult.takeawaysVi,
              titleVi: aiResult.titleVi || null,
              bodyVi: aiResult.bodyVi || null,
            },
          })
          updated++
        }
      } catch (err) {
        this.logger.warn(`[backfill-vi] Failed "${item.title}": ${(err as Error).message}`)
        failed++
      }
    }

    this.logger.log(`[backfill-vi] done: ${updated} updated, ${failed} failed`)
    return { updated, failed }
  }

  async ingestAll(): Promise<IngestResult[]> {
    const results = await Promise.allSettled(RSS_SOURCES.map((s) => this.ingestSource(s.id)))

    return results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value
      this.logger.error(`Source ${RSS_SOURCES[i].id} failed: ${r.reason}`)
      return { sourceId: RSS_SOURCES[i].id, inserted: 0, skipped: 0, failed: 1 }
    })
  }

  async resetAll(): Promise<{ deleted: { feedItems: number; crawlLogs: number; feedSources: number } }> {
    const [feedItems, crawlLogs] = await Promise.all([
      this.prisma.feedItem.deleteMany(),
      this.prisma.crawlLog.deleteMany(),
    ])
    const feedSources = await this.prisma.feedSource.deleteMany()
    this.logger.log(
      `Reset: ${feedItems.count} items, ${crawlLogs.count} logs, ${feedSources.count} sources deleted`,
    )
    await this.seedFeedSources()
    return {
      deleted: {
        feedItems: feedItems.count,
        crawlLogs: crawlLogs.count,
        feedSources: feedSources.count,
      },
    }
  }
}
