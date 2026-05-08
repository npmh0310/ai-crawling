import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import pLimit from 'p-limit'
import { PrismaService } from '../../prisma/prisma.service'
import { TwitterCrawlerService } from './twitter-crawler.service'
import { AiProcessorService } from '../ai-processor/ai-processor.service'
import { TWITTER_SOURCES, getTwitterSource, TwitterSource } from '../sources/twitter-sources'
import { CONFIG } from '../../config'
import { RateLimiter } from '../../common/utils/rate-limiter.util'
import { withRetry } from '../../common/utils/retry.util'
import { IngestResult } from './article.service'

@Injectable()
export class TwitterService implements OnModuleInit {
  private readonly logger = new Logger(TwitterService.name)
  private readonly crawlLimit = pLimit(CONFIG.twitter.concurrency)
  private readonly rateLimiter = new RateLimiter(
    CONFIG.ai.rateLimit.maxRequestsPerMinute,
    CONFIG.ai.rateLimit.maxRequestsPerMinute / 60000,
  )

  constructor(
    private readonly prisma: PrismaService,
    private readonly crawlerService: TwitterCrawlerService,
    private readonly aiService: AiProcessorService,
  ) {}

  async onModuleInit() {
    try {
      await this.seedTwitterSources()
    } catch (err) {
      this.logger.error('Failed to seed Twitter sources', err)
    }
  }

  private async seedTwitterSources() {
    for (const source of TWITTER_SOURCES) {
      await this.prisma.feedSource.upsert({
        where: { id: source.id },
        update: {},
        create: {
          id: source.id,
          company: source.company as any,
          name: source.name,
          twitterHandle: source.handle,
        },
      })
    }
    this.logger.log(`Twitter sources seeded (${TWITTER_SOURCES.length})`)
  }

  private async getLatestTweetId(sourceId: string): Promise<string | null> {
    const latest = await this.prisma.feedItem.findFirst({
      where: { sourceId, sourceType: 'social' },
      orderBy: { publishedAt: 'desc' },
      select: { guid: true },
    })
    if (!latest?.guid) return null
    return latest.guid.replace('tweet-', '') || null
  }

  async ingestAccount(sourceId: string): Promise<IngestResult> {
    const source = getTwitterSource(sourceId)
    if (!source) throw new Error(`Unknown Twitter source: ${sourceId}`)

    const log = await this.prisma.crawlLog.create({
      data: { sourceId, status: 'partial', startedAt: new Date() },
    })

    let inserted = 0
    let skipped = 0
    let failed = 0

    try {
      const sinceId = await this.getLatestTweetId(sourceId)
      const tweets = await this.crawlerService.fetchTweets(source.handle, sinceId)

      if (tweets.length === 0) {
        this.logger.log(`[@${source.handle}] no new tweets`)
        await this.prisma.crawlLog.updateMany({
          where: { id: log.id },
          data: { status: 'success', itemsFound: 0, itemsNew: 0, finishedAt: new Date() },
        })
        return { sourceId, inserted: 0, skipped: 0, failed: 0 }
      }

      const guids = tweets.map((t) => `tweet-${t.id}`)
      const existing = await this.prisma.feedItem.findMany({
        where: { guid: { in: guids } },
        select: { guid: true },
      })
      const existingSet = new Set(existing.map((e) => e.guid))
      const newTweets = tweets
        .filter((t) => !existingSet.has(`tweet-${t.id}`))
        .filter((t) => !this.isRepost(t.text))
        .filter((t) => this.extractBody(t.text).length >= CONFIG.twitter.filter.minBodyLength)
        .slice(0, CONFIG.twitter.filter.maxPerCrawl)
      skipped = tweets.length - newTweets.length
      this.logger.log(`[@${source.handle}] ${tweets.length} fetched, ${newTweets.length} quality new`)

      for (const tweet of newTweets) {
        try {
          await this.rateLimiter.acquire()
          const aiResult = await withRetry(
            () => this.aiService.analyze(
              this.buildTitle(source, tweet.text),
              tweet.text,
              source.company,
            ),
            {
              maxAttempts: CONFIG.ai.retry.maxAttempts,
              baseDelayMs: CONFIG.ai.retry.baseDelayMs,
              maxDelayMs: CONFIG.ai.retry.maxDelayMs,
              shouldRetry: (e) => !e.message.includes('400'),
            },
          )

          await this.prisma.feedItem.upsert({
            where: { guid: `tweet-${tweet.id}` },
            update: {},
            create: {
              sourceId,
              company: source.company as any,
              sourceType: 'social',
              category: aiResult.category,
              title: this.buildTitle(source, tweet.text),
              titleVi: aiResult.titleVi || null,
              body: tweet.text,
              bodyVi: aiResult.bodyVi || null,
              quote: tweet.text,
              handle: `@${source.handle}`,
              takeaways: aiResult.takeaways,
              takeawaysVi: aiResult.takeawaysVi,
              tags: aiResult.tags,
              originalUrl: tweet.url,
              publishedAt: new Date(tweet.created_at),
              guid: `tweet-${tweet.id}`,
            },
          })
          inserted++
        } catch (err) {
          this.logger.warn(
            `Failed tweet ${tweet.id} from @${source.handle}: ${(err as Error).message}`,
          )
          failed++
        }
      }

      const status = inserted === 0 && failed > 0 ? 'failed' : failed > 0 ? 'partial' : 'success'
      await this.prisma.crawlLog.updateMany({
        where: { id: log.id },
        data: { status, itemsFound: tweets.length, itemsNew: inserted, finishedAt: new Date() },
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

  async ingestAll(): Promise<IngestResult[]> {
    const healthy = await this.crawlerService.checkHealth()
    if (!healthy) {
      this.logger.warn('Twitter service unreachable — skipping Twitter ingest')
      return []
    }

    const activeSources = await this.prisma.feedSource.findMany({
      where: { twitterHandle: { not: null }, isActive: true },
      select: { id: true },
    })

    const results = await Promise.allSettled(
      activeSources.map((s) => this.crawlLimit(() => this.ingestAccount(s.id))),
    )

    return results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value
      this.logger.error(`Twitter source ${activeSources[i].id} failed: ${r.reason}`)
      return { sourceId: activeSources[i].id, inserted: 0, skipped: 0, failed: 1 }
    })
  }

  async previewAccount(handle: string): Promise<{ handle: string; tweets: { id: string; text: string; created_at: string }[] }> {
    const tweets = await this.crawlerService.fetchTweets(handle)
    return {
      handle,
      tweets: tweets.map((t) => ({ id: t.id, text: t.text, created_at: t.created_at })),
    }
  }

  private isRepost(text: string): boolean {
    return text.startsWith('RT @')
  }

  private extractBody(text: string): string {
    return text.replace(/https?:\/\/\S+/g, '').replace(/@\w+/g, '').trim()
  }

  private buildTitle(source: TwitterSource, text: string): string {
    const truncated = text.length > 100 ? text.slice(0, 97) + '…' : text
    return `${source.name}: ${truncated}`
  }
}
