import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { RssService } from './rss.service'
import { ArticleCrawlerService } from './article-crawler.service'
import { AiProcessorService } from '../ai-processor/ai-processor.service'
import { RSS_SOURCES, getRssSource } from '../sources/rss-sources'

export type IngestResult = {
  sourceId: string
  inserted: number
  skipped: number
  failed: number
}

@Injectable()
export class ArticleService implements OnModuleInit {
  private readonly logger = new Logger(ArticleService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly rssService: RssService,
    private readonly crawlerService: ArticleCrawlerService,
    private readonly aiService: AiProcessorService,
  ) {}

  async onModuleInit() {
    await this.seedFeedSources()
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
    if (latest) return latest.publishedAt

    // First run: only fetch last 7 days
    const since = new Date()
    since.setDate(since.getDate() - 7)
    return since
  }

  async ingestSource(sourceId: string): Promise<IngestResult> {
    const rssSource = getRssSource(sourceId)
    if (!rssSource) throw new Error(`Unknown source: ${sourceId}`)

    let inserted = 0
    let skipped = 0
    let failed = 0

    const since = await this.getIngestSince(sourceId)
    const sinceStr = since.toISOString().split('T')[0]
    this.logger.log(`[${sourceId}] fetching since ${sinceStr}`)

    const { data: items } = await this.rssService.fetchAndParse(rssSource, {
      take: 50,
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
    this.logger.log(`[${sourceId}] ${items.length} fetched, ${newItems.length} new`)

    for (const item of newItems) {
      try {
        const articleContent = await this.crawlerService.fetchArticleContent(item.link)
        const content = articleContent?.content ?? item.summary ?? item.title

        const aiResult = await this.aiService.analyze(item.title, content, item.company)

        await this.prisma.feedItem.create({
          data: {
            sourceId,
            company: item.company as any,
            sourceType: 'news',
            category: aiResult.category,
            title: item.title,
            body: content,
            takeaways: aiResult.takeaways,
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

    skipped = items.length - newItems.length
    return { sourceId, inserted, skipped, failed }
  }

  async ingestAll(): Promise<IngestResult[]> {
    const results = await Promise.allSettled(
      RSS_SOURCES.map((s) => this.ingestSource(s.id)),
    )

    return results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value
      this.logger.error(`Source ${RSS_SOURCES[i].id} failed: ${r.reason}`)
      return { sourceId: RSS_SOURCES[i].id, inserted: 0, skipped: 0, failed: 1 }
    })
  }
}
