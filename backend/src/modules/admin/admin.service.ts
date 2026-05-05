import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CrawlLogQueryDto } from './dto/crawl-log-query.dto'
import { createPaginatedResponse } from '../../common/responses/api-response.factory'

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getSources() {
    const sources = await this.prisma.feedSource.findMany({
      orderBy: { company: 'asc' },
      include: {
        _count: { select: { feedItems: true } },
        crawlLogs: {
          where: { status: 'success' },
          orderBy: { finishedAt: 'desc' },
          take: 1,
          select: { finishedAt: true },
        },
      },
    })

    return sources.map((s) => ({
      id: s.id,
      company: s.company,
      name: s.name,
      rssUrl: s.rssUrl,
      isActive: s.isActive,
      totalItems: s._count.feedItems,
      lastSyncAt: s.crawlLogs[0]?.finishedAt ?? null,
    }))
  }

  async toggleSource(id: string) {
    const source = await this.prisma.feedSource.findUnique({ where: { id } })
    if (!source) throw new NotFoundException(`Source not found`)

    return this.prisma.feedSource.update({
      where: { id },
      data: { isActive: !source.isActive },
      select: { id: true, company: true, name: true, isActive: true },
    })
  }

  async getCrawlLogs(query: CrawlLogQueryDto) {
    const { sourceId, page = 1, take = 20 } = query
    const skip = (page - 1) * take
    const where = sourceId ? { sourceId } : {}

    const [logs, total] = await Promise.all([
      this.prisma.crawlLog.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        skip,
        take,
        include: {
          source: { select: { company: true, name: true } },
        },
      }),
      this.prisma.crawlLog.count({ where }),
    ])

    return createPaginatedResponse(
      logs.map((l) => ({
        id: l.id,
        sourceId: l.sourceId,
        company: l.source.company,
        sourceName: l.source.name,
        status: l.status,
        itemsFound: l.itemsFound,
        itemsNew: l.itemsNew,
        startedAt: l.startedAt,
        finishedAt: l.finishedAt,
        errorMsg: l.errorMsg,
        durationMs:
          l.finishedAt ? l.finishedAt.getTime() - l.startedAt.getTime() : null,
      })),
      page,
      take,
      total,
    )
  }

  async getStats() {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const [totalItems, todayItems, lastSync, byCompany, unreadCount] = await Promise.all([
      this.prisma.feedItem.count(),
      this.prisma.feedItem.count({ where: { createdAt: { gte: todayStart } } }),
      this.prisma.crawlLog.findFirst({
        where: { status: 'success' },
        orderBy: { finishedAt: 'desc' },
        select: { finishedAt: true, sourceId: true },
      }),
      this.prisma.feedItem.groupBy({
        by: ['company'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
      this.prisma.feedItem.count({ where: { isRead: false } }),
    ])

    return {
      totalItems,
      todayItems,
      unreadCount,
      lastSyncAt: lastSync?.finishedAt ?? null,
      byCompany: byCompany.map((b) => ({ company: b.company, count: b._count.id })),
    }
  }
}
