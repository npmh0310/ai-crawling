import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed-query.dto';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    getFeeds(query: FeedQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<any>>;
    getFeedById(id: string): Promise<any>;
    markAsRead(id: string): Promise<void>;
}
