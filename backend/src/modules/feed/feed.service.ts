import { Injectable, NotFoundException } from '@nestjs/common'
import { SchedulerRegistry } from '@nestjs/schedule'
import { PrismaService } from '../../prisma/prisma.service'
import { FeedQueryDto, LangParam, SearchQueryDto } from './dto/feed-query.dto'
import { formatTimeAgo } from '../../common/utils/time.util'
import { JUNK_TITLE_VALUES } from '../../common/utils/content-quality.util'
import { createPaginatedResponse } from '../../common/responses/api-response.factory'
import { CONFIG } from '../../config'
import { HOT_THRESHOLD, computeHotScore } from './hot-score.util'

const HOT_POOL_DAYS = 7
const HOT_POOL_CAP = 200
const HOT_DEFAULT_LIMIT = 5

@Injectable()
export class FeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scheduler: SchedulerRegistry,
  ) {}

  private getNextCrawlAt(): Date | null {
    let earliest: Date | null = null
    for (const job of this.scheduler.getCronJobs().values()) {
      const next = job.nextDate().toJSDate()
      if (!earliest || next < earliest) earliest = next
    }
    return earliest
  }

  async getFeeds(query: FeedQueryDto) {
    const { company, sourceType, category, unreadOnly, lang = LangParam.en, page = 1, take = 10 } = query
    const skip = (page - 1) * take

    const where = {
      ...(company?.length && { company: { in: company as any } }),
      ...(sourceType && { sourceType: sourceType as any }),
      ...(category && { category }),
      ...(unreadOnly && { isRead: false }),
      NOT: [
        { title: { in: JUNK_TITLE_VALUES } },
        { titleVi: { in: JUNK_TITLE_VALUES } },
      ],
    }

    const [items, itemCount] = await Promise.all([
      this.prisma.feedItem.findMany({ where, orderBy: { publishedAt: 'desc' }, skip, take }),
      this.prisma.feedItem.count({ where }),
    ])

    return createPaginatedResponse(items.map((item) => this.toFeedResponse(item, lang)), page, take, itemCount)
  }

  async searchFeeds(query: SearchQueryDto) {
    const { q, lang = LangParam.en, page = 1, take = 10 } = query
    const skip = (page - 1) * take

    const where = {
      OR: [
        { title: { contains: q, mode: 'insensitive' as const } },
        { titleVi: { contains: q, mode: 'insensitive' as const } },
        { body: { contains: q, mode: 'insensitive' as const } },
        { bodyVi: { contains: q, mode: 'insensitive' as const } },
        { tags: { has: q.toLowerCase() } },
      ],
    }

    const [items, itemCount] = await Promise.all([
      this.prisma.feedItem.findMany({ where, orderBy: { publishedAt: 'desc' }, skip, take }),
      this.prisma.feedItem.count({ where }),
    ])

    return createPaginatedResponse(items.map((item) => this.toFeedResponse(item, lang)), page, take, itemCount)
  }

  async getFeedById(id: string, lang: LangParam = LangParam.en) {
    const item = await this.prisma.feedItem.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Feed item not found`)
    return this.toFeedResponse(item, lang)
  }

  async markAsRead(id: string) {
    const item = await this.prisma.feedItem.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Feed item not found`)
    await this.prisma.feedItem.update({ where: { id }, data: { isRead: true } })
  }

  async getCrawlStats() {
    const latest = await this.prisma.crawlLog.findFirst({
      orderBy: { startedAt: 'desc' },
    })

    const nextCrawlAt = this.getNextCrawlAt()
    if (!latest) return { all: 0, news: 0, social: 0, sourcesCount: 0, lastCrawledAt: null, nextCrawlAt }

    const sessionWindow = new Date(latest.startedAt.getTime() - 30 * 60 * 1000)

    const [sourcesCount, all, news, social] = await Promise.all([
      this.prisma.crawlLog.count({ where: { startedAt: { gte: sessionWindow } } }),
      this.prisma.feedItem.count({ where: { createdAt: { gte: sessionWindow } } }),
      this.prisma.feedItem.count({ where: { createdAt: { gte: sessionWindow }, sourceType: 'news' } }),
      this.prisma.feedItem.count({ where: { createdAt: { gte: sessionWindow }, sourceType: 'social' } }),
    ])

    return {
      all,
      news,
      social,
      sourcesCount,
      lastCrawledAt: latest.finishedAt ?? latest.startedAt,
      nextCrawlAt,
    }
  }

  async markAllAsRead() {
    const { count } = await this.prisma.feedItem.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })
    return { updated: count }
  }

  async getHotItems(lang: LangParam = LangParam.en, limit = HOT_DEFAULT_LIMIT) {
    const since = new Date(Date.now() - HOT_POOL_DAYS * 24 * 3_600_000)

    const candidates = await this.prisma.feedItem.findMany({
      where: {
        publishedAt: { gte: since },
        NOT: [
          { title: { in: JUNK_TITLE_VALUES } },
          { titleVi: { in: JUNK_TITLE_VALUES } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      take: HOT_POOL_CAP,
    })

    const now = new Date()
    const ranked = candidates
      .map((item) => ({
        item,
        score: computeHotScore({
          publishedAt: item.publishedAt,
          sourceType: item.sourceType,
          company: item.company,
          handle: item.handle,
          category: item.category,
          title: item.title,
          takeaways: item.takeaways,
        }, now),
      }))
      .sort((a, b) => b.score.total - a.score.total)

    // Prefer items above the "hot" threshold; if too few qualify,
    // fall back to top-N by score so the strip is never empty when fresh data exists.
    const qualified = ranked.filter((x) => x.score.total >= HOT_THRESHOLD)
    const finalList = qualified.length >= limit ? qualified.slice(0, limit) : ranked.slice(0, limit)

    return finalList.map(({ item, score }) => ({
      ...this.toFeedResponse(item, lang),
      score: score.total,
      isHot: score.total >= HOT_THRESHOLD,
    }))
  }

  private toFeedResponse(item: any, lang: LangParam) {
    const isVi = lang === LangParam.vi
    const title = isVi && item.titleVi ? item.titleVi : item.title
    const rawBody = isVi ? (item.bodyVi ?? item.body) : item.body
    const body = rawBody ? rawBody.slice(0, CONFIG.ai.maxBodyChars) : undefined
    const takeaways = isVi ? item.takeawaysVi : item.takeaways

    return {
      id: item.id,
      company: item.company,
      sourceType: item.sourceType,
      category: item.category,
      timeAgo: formatTimeAgo(item.publishedAt),
      title,
      ...(body && { body }),
      ...(item.quote && { quote: item.quote }),
      ...(item.handle && { handle: item.handle }),
      ...(takeaways?.length && { takeaways }),
      ...(item.tags?.length && { tags: item.tags }),
      originalUrl: item.originalUrl,
      isRead: item.isRead,
    }
  }
}
