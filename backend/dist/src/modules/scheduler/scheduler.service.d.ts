import { PrismaService } from '../../prisma/prisma.service';
import { ArticleService } from '../ingest/article.service';
export declare class SchedulerService {
    private readonly prisma;
    private readonly articleService;
    private readonly logger;
    constructor(prisma: PrismaService, articleService: ArticleService);
    handleCron(): Promise<void>;
}
