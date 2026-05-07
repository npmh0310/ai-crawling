import { AdminService } from './admin.service';
import { CrawlLogQueryDto } from './dto/crawl-log-query.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getSources(): Promise<{
        id: string;
        company: import("@prisma/client").$Enums.Company;
        name: string;
        rssUrl: string;
        isActive: boolean;
        totalItems: number;
        lastSyncAt: Date | null;
    }[]>;
    toggleSource(id: string): Promise<{
        company: import("@prisma/client").$Enums.Company;
        id: string;
        name: string;
        isActive: boolean;
    }>;
    getCrawlLogs(query: CrawlLogQueryDto): Promise<import("../../common/interfaces/api-response.interface").PaginatedResponse<{
        id: string;
        sourceId: string;
        company: import("@prisma/client").$Enums.Company;
        sourceName: string;
        status: import("@prisma/client").$Enums.CrawlStatus;
        itemsFound: number;
        itemsNew: number;
        startedAt: Date;
        finishedAt: Date | null;
        errorMsg: string | null;
        durationMs: number | null;
    }>>;
    getStats(): Promise<{
        totalItems: number;
        todayItems: number;
        unreadCount: number;
        lastSyncAt: Date | null;
        byCompany: {
            company: import("@prisma/client").$Enums.Company;
            count: number;
        }[];
    }>;
}
