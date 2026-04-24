import { FetchRssQueryDto } from './dto/fetch-rss-query.dto';
import { RssService } from './rss.service';
import { ArticleService } from './article.service';
export declare class IngestController {
    private readonly rssService;
    private readonly articleService;
    constructor(rssService: RssService, articleService: ArticleService);
    fetchOpenAIFeed(query: FetchRssQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<import("./rss.service").NormalizedRssItem>> | never[];
    ingestAll(): Promise<import("./article.service").IngestResult[]>;
    ingestSource(sourceId: string): Promise<import("./article.service").IngestResult>;
}
