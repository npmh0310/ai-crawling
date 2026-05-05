import { FeedService } from './feed.service';
import { FeedQueryDto, SearchQueryDto } from './dto/feed-query.dto';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeeds(query: FeedQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<any>>;
    searchFeeds(query: SearchQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<any>>;
    markAllAsRead(): Promise<{
        updated: number;
    }>;
    getFeedById(id: string): Promise<any>;
    markAsRead(id: string): Promise<void>;
}
