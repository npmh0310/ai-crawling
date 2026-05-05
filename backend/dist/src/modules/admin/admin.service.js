"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const api_response_factory_1 = require("../../common/responses/api-response.factory");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSources() {
        const sources = await this.prisma.feedSource.findMany({
            orderBy: { company: 'asc' },
            include: {
                _count: { select: { feedItems: true } },
                crawlLogs: {
                    where: { status: 'success' },
                    orderBy: { finishedAt: 'desc' },
                    take: 1,
                    select: { finishedAt: true },
                },
            },
        });
        return sources.map((s) => ({
            id: s.id,
            company: s.company,
            name: s.name,
            rssUrl: s.rssUrl,
            isActive: s.isActive,
            totalItems: s._count.feedItems,
            lastSyncAt: s.crawlLogs[0]?.finishedAt ?? null,
        }));
    }
    async toggleSource(id) {
        const source = await this.prisma.feedSource.findUnique({ where: { id } });
        if (!source)
            throw new common_1.NotFoundException(`Source not found`);
        return this.prisma.feedSource.update({
            where: { id },
            data: { isActive: !source.isActive },
            select: { id: true, company: true, name: true, isActive: true },
        });
    }
    async getCrawlLogs(query) {
        const { sourceId, page = 1, take = 20 } = query;
        const skip = (page - 1) * take;
        const where = sourceId ? { sourceId } : {};
        const [logs, total] = await Promise.all([
            this.prisma.crawlLog.findMany({
                where,
                orderBy: { startedAt: 'desc' },
                skip,
                take,
                include: {
                    source: { select: { company: true, name: true } },
                },
            }),
            this.prisma.crawlLog.count({ where }),
        ]);
        return (0, api_response_factory_1.createPaginatedResponse)(logs.map((l) => ({
            id: l.id,
            sourceId: l.sourceId,
            company: l.source.company,
            sourceName: l.source.name,
            status: l.status,
            itemsFound: l.itemsFound,
            itemsNew: l.itemsNew,
            startedAt: l.startedAt,
            finishedAt: l.finishedAt,
            errorMsg: l.errorMsg,
            durationMs: l.finishedAt ? l.finishedAt.getTime() - l.startedAt.getTime() : null,
        })), page, take, total);
    }
    async getStats() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const [totalItems, todayItems, lastSync, byCompany, unreadCount] = await Promise.all([
            this.prisma.feedItem.count(),
            this.prisma.feedItem.count({ where: { createdAt: { gte: todayStart } } }),
            this.prisma.crawlLog.findFirst({
                where: { status: 'success' },
                orderBy: { finishedAt: 'desc' },
                select: { finishedAt: true, sourceId: true },
            }),
            this.prisma.feedItem.groupBy({
                by: ['company'],
                _count: { id: true },
                orderBy: { _count: { id: 'desc' } },
            }),
            this.prisma.feedItem.count({ where: { isRead: false } }),
        ]);
        return {
            totalItems,
            todayItems,
            unreadCount,
            lastSyncAt: lastSync?.finishedAt ?? null,
            byCompany: byCompany.map((b) => ({ company: b.company, count: b._count.id })),
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map