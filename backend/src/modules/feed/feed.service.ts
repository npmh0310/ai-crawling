import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { FeedQueryDto, LangParam, SearchQueryDto } from './dto/feed-query.dto'
import { formatTimeAgo } from '../../common/utils/time.util'
import { createPaginatedResponse } from '../../common/responses/api-response.factory'
import { CONFIG } from '../../config'

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeeds(query: FeedQueryDto) {
    const { company, sourceType, category, unreadOnly, lang = LangParam.en, page = 1, take = 10 } = query
    const skip = (page - 1) * take

    const where = {
      ...(company && { company: company as any }),
      ...(sourceType && { sourceType: sourceType as any }),
      ...(category && { category }),
      ...(unreadOnly && { isRead: false }),
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

  async markAllAsRead() {
    const { count } = await this.prisma.feedItem.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    })
    return { updated: count }
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
