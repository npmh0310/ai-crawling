import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import pLimit from 'p-limit'
import { PrismaService } from '../../prisma/prisma.service'
import { RedditCrawlerService, RedditPost } from './reddit-crawler.service'
import { ArticleCrawlerService } from './article-crawler.service'
import { AiProcessorService } from '../ai-processor/ai-processor.service'
import { REDDIT_SOURCES, getRedditSource, RedditSource } from '../sources/reddit-sources'
import { CONFIG } from '../../config'
import { RateLimiter } from '../../common/utils/rate-limiter.util'
import { withRetry } from '../../common/utils/retry.util'
import { IngestResult } from './article.service'
import { isUsableTitle } from '../../common/utils/content-quality.util'

@Injectable()
export class RedditService implements OnModuleInit {
  private readonly logger = new Logger(RedditService.name)
  private readonly crawlLimit = pLimit(CONFIG.reddit.concurrency)
  private readonly rateLimiter = new RateLimiter(
    CONFIG.ai.rateLimit.maxRequestsPerMinute,
    CONFIG.ai.rateLimit.maxRequestsPerMinute / 60000,
  )

  constructor(
    private readonly prisma: PrismaService,
    private readonly crawler: RedditCrawlerService,
    private readonly articleCrawler: ArticleCrawlerService,
    private readonly aiService: AiProcessorService,
  ) {}

  async onModuleInit() {
    try {
      await this.seedRedditSources()
    } catch (err) {
      this.logger.error('Failed to seed Reddit sources', err)
    }
  }

  private async seedRedditSources() {
    for (const source of REDDIT_SOURCES) {
      await this.prisma.feedSource.upsert({
        where: { id: source.id },
        update: {},
        create: {
          id: source.id,
          company: 'Reddit',
          name: source.name,
          subreddit: source.subreddit,
        },
      })
    }
    this.logger.log(`Reddit sources seeded (${REDDIT_SOURCES.length})`)
  }

  private passesFilters(post: RedditPost, source: RedditSource): boolean {
    if (post.score < source.minScore) return false
    if (source.flairBlacklist && post.flair && source.flairBlacklist.includes(post.flair)) {
      return false
    }
    if (source.flairWhitelist && source.flairWhitelist.length > 0) {
      if (!post.flair) return false
      if (!source.flairWhitelist.some((f) => post.flair === f || post.flair?.startsWith(f))) {
        return false
      }
    }
    return true
  }

  private async resolveContent(post: RedditPost): Promise<string> {
    if (post.is_self && post.selftext.trim().length > 0) {
      return post.selftext.slice(0, CONFIG.crawler.maxContentLength)
    }
    const skipDomains = ['i.redd.it', 'v.redd.it', 'imgur.com', 'reddit.com', 'youtube.com', 'youtu.be']
    if (skipDomains.some((d) => post.domain.includes(d))) {
      return post.title
    }
    try {
      const article = await this.articleCrawler.fetchArticleContent(post.url)
      return article?.content ?? post.selftext ?? post.title
    } catch {
      return post.selftext || post.title
    }
  }

  async ingestSource(sourceId: string): Promise<IngestResult> {
    const source = getRedditSource(sourceId)
    if (!source) throw new Error(`Unknown Reddit source: ${sourceId}`)

    const log = await this.prisma.crawlLog.create({
      data: { sourceId, status: 'partial', startedAt: new Date() },
    })

    let inserted = 0
    let skipped = 0
    let failed = 0

    try {
      const posts = await this.crawler.fetchTopPosts(source.subreddit, {
        timeframe: CONFIG.reddit.timeframe,
        limit: CONFIG.reddit.fetchLimit,
      })

      const guids = posts.map((p) => `reddit-${p.id}`)
      const existing = await this.prisma.feedItem.findMany({
        where: { guid: { in: guids } },
        select: { guid: true },
      })
      const existingSet = new Set(existing.map((e) => e.guid))

      const candidates = posts
        .filter((p) => !existingSet.has(`reddit-${p.id}`))
        .filter((p) => isUsableTitle(p.title))
        .filter((p) => this.passesFilters(p, source))
        .slice(0, CONFIG.reddit.maxPerCrawl)

      skipped = posts.length - candidates.length
      this.logger.log(
        `[r/${source.subreddit}] ${posts.length} fetched, ${candidates.length} pass filters`,
      )

      const enriched = await Promise.all(
        candidates.map((post) =>
          this.crawlLimit(async () => ({
            post,
            content: await this.resolveContent(post),
          })),
        ),
      )

      for (const { post, content } of enriched) {
        if (content.length < CONFIG.crawler.minContentLength) {
          skipped++
          continue
        }
        try {
          await this.rateLimiter.acquire()
          const aiResult = await withRetry(
            () => this.aiService.analyze(post.title, content, 'Reddit'),
            {
              maxAttempts: CONFIG.ai.retry.maxAttempts,
              baseDelayMs: CONFIG.ai.retry.baseDelayMs,
              maxDelayMs: CONFIG.ai.retry.maxDelayMs,
              shouldRetry: (e) => !e.message.includes('400'),
            },
          )

          await this.prisma.feedItem.upsert({
            where: { guid: `reddit-${post.id}` },
            update: {},
            create: {
              sourceId,
              company: 'Reddit',
              sourceType: 'social',
              category: aiResult.category,
              title: post.title,
              titleVi: aiResult.titleVi || null,
              body: content,
              bodyVi: aiResult.bodyVi || null,
              handle: `r/${source.subreddit}`,
              takeaways: aiResult.takeaways,
              takeawaysVi: aiResult.takeawaysVi,
              tags: aiResult.tags,
              originalUrl: post.permalink,
              publishedAt: new Date(post.created_utc * 1000),
              guid: `reddit-${post.id}`,
            },
          })
          inserted++
        } catch (err) {
          this.logger.warn(
            `Failed post ${post.id} from r/${source.subreddit}: ${(err as Error).message}`,
          )
          failed++
        }
      }

      const status = inserted === 0 && failed > 0 ? 'failed' : failed > 0 ? 'partial' : 'success'
      await this.prisma.crawlLog.updateMany({
        where: { id: log.id },
        data: { status, itemsFound: posts.length, itemsNew: inserted, finishedAt: new Date() },
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
    const healthy = await this.crawler.checkHealth()
    if (!healthy) {
      this.logger.warn('Reddit API unreachable — skipping Reddit ingest')
      return []
    }

    const activeSources = await this.prisma.feedSource.findMany({
      where: { subreddit: { not: null }, isActive: true },
      select: { id: true },
    })

    const results = await Promise.allSettled(
      activeSources.map((s) => this.ingestSource(s.id)),
    )

    return results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value
      this.logger.error(`Reddit source ${activeSources[i].id} failed: ${r.reason}`)
      return { sourceId: activeSources[i].id, inserted: 0, skipped: 0, failed: 1 }
    })
  }

  async previewSubreddit(subreddit: string) {
    const posts = await this.crawler.fetchTopPosts(subreddit, {
      timeframe: CONFIG.reddit.timeframe,
      limit: 25,
    })
    return {
      subreddit,
      count: posts.length,
      posts: posts.map((p) => ({
        id: p.id,
        title: p.title,
        score: p.score,
        flair: p.flair,
        url: p.permalink,
        domain: p.domain,
      })),
    }
  }
}
