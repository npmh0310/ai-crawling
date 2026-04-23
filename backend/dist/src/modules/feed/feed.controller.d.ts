import { FeedService } from './feed.service';
import { FeedQueryDto } from './dto/feed-query.dto';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
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
}
