import { FetchRssQueryDto } from './dto/fetch-rss-query.dto';
import { RssSource } from '../sources/rss-sources';
import { PaginatedResponse } from '../../common/interfaces/api-response.interface';
export type NormalizedRssItem = {
    sourceId: string;
    company: RssSource['company'];
    sourceName: string;
    sourceUrl: string;
    guid: string;
    title: string;
    link: string;
    publishedAt: Date | null;
    summary: string | null;
};
export declare class RssService {
    private readonly logger;
    private readonly parser;
    fetchAndParse(source: RssSource, query: FetchRssQueryDto): Promise<PaginatedResponse<NormalizedRssItem>>;
    private fetchFeed;
    private getItems;
    private normalizeItem;
    private getValue;
    private getLink;
    private parseDate;
    private filterByDateRangeAndLimit;
}
