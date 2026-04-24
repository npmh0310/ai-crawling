import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FeedQueryDto } from './dto/feed-query.dto';
import { formatTimeAgo } from '../../common/utils/time.util';
import { createPaginatedResponse } from '../../common/responses/api-response.factory';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeeds(query: FeedQueryDto) {
    const { company, sourceType, page = 1, take = 20 } = query;
    const skip = (page - 1) * take;

    const where = {
      ...(company && { company: company as any }),
      ...(sourceType && { sourceType: sourceType as any }),
    };

    const [items, itemCount] = await this.prisma.$transaction([
      this.prisma.feedItem.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.feedItem.count({ where }),
    ]);

    return createPaginatedResponse(
      items.map(this.toFeedResponse),
      page,
      take,
      itemCount,
    );
  }

  async getFeedById(id: string) {
    const item = await this.prisma.feedItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Feed item not found`);
    return this.toFeedResponse(item);
  }

  async markAsRead(id: string) {
    const item = await this.prisma.feedItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Feed item not found`);
    await this.prisma.feedItem.update({
      where: { id },
      data: { isRead: true },
    });
  }

  private toFeedResponse(item: any) {
    return {
      id: item.id,
      company: item.company,
      sourceType: item.sourceType,
      category: item.category,
      timeAgo: formatTimeAgo(item.publishedAt),
      title: item.title,
      ...(item.body && { body: item.body }),
      ...(item.quote && { quote: item.quote }),
      ...(item.handle && { handle: item.handle }),
      ...(item.takeaways?.length && { takeaways: item.takeaways }),
      ...(item.tags?.length && { tags: item.tags }),
      originalUrl: item.originalUrl,
    };
  }
}
