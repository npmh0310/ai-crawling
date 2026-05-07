import { ArticleService } from '../ingest/article.service';
export declare class SchedulerService {
    private readonly articleService;
    private readonly logger;
    constructor(articleService: ArticleService);
    handleCron(): Promise<void>;
}
