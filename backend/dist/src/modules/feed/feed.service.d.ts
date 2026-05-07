import { PrismaService } from '../../prisma/prisma.service';
import { FeedQueryDto, LangParam, SearchQueryDto } from './dto/feed-query.dto';
export declare class FeedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFeeds(query: FeedQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<any>>;
    searchFeeds(query: SearchQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<any>>;
    getFeedById(id: string, lang?: LangParam): Promise<any>;
    markAsRead(id: string): Promise<void>;
    markAllAsRead(): Promise<{
        updated: number;
    }>;
    private toFeedResponse;
}
