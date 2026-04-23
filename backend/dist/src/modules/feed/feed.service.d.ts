import { PrismaService } from '../../prisma/prisma.service';
import { FeedQueryDto } from './dto/feed-query.dto';
export declare class FeedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFeeds(query: FeedQueryDto): Promise<{
        data: any[];
        meta: {
            page: number;
            take: number;
            itemCount: number;
            pageCount: number;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
        };
    }>;
    getFeedById(id: string): Promise<any>;
    markAsRead(id: string): Promise<void>;
    private toFeedResponse;
}
