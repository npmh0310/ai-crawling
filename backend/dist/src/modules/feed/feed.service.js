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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const feed_query_dto_1 = require("./dto/feed-query.dto");
const time_util_1 = require("../../common/utils/time.util");
const api_response_factory_1 = require("../../common/responses/api-response.factory");
const config_1 = require("../../config");
let FeedService = class FeedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFeeds(query) {
        const { company, sourceType, category, unreadOnly, lang = feed_query_dto_1.LangParam.en, page = 1, take = 10 } = query;
        const skip = (page - 1) * take;
        const where = {
            ...(company && { company: company }),
            ...(sourceType && { sourceType: sourceType }),
            ...(category && { category }),
            ...(unreadOnly && { isRead: false }),
        };
        const [items, itemCount] = await Promise.all([
            this.prisma.feedItem.findMany({ where, orderBy: { publishedAt: 'desc' }, skip, take }),
            this.prisma.feedItem.count({ where }),
        ]);
        return (0, api_response_factory_1.createPaginatedResponse)(items.map((item) => this.toFeedResponse(item, lang)), page, take, itemCount);
    }
    async searchFeeds(query) {
        const { q, lang = feed_query_dto_1.LangParam.en, page = 1, take = 10 } = query;
        const skip = (page - 1) * take;
        const where = {
            OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { titleVi: { contains: q, mode: 'insensitive' } },
                { body: { contains: q, mode: 'insensitive' } },
                { bodyVi: { contains: q, mode: 'insensitive' } },
                { tags: { has: q.toLowerCase() } },
            ],
        };
        const [items, itemCount] = await Promise.all([
            this.prisma.feedItem.findMany({ where, orderBy: { publishedAt: 'desc' }, skip, take }),
            this.prisma.feedItem.count({ where }),
        ]);
        return (0, api_response_factory_1.createPaginatedResponse)(items.map((item) => this.toFeedResponse(item, lang)), page, take, itemCount);
    }
    async getFeedById(id, lang = feed_query_dto_1.LangParam.en) {
        const item = await this.prisma.feedItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Feed item not found`);
        return this.toFeedResponse(item, lang);
    }
    async markAsRead(id) {
        const item = await this.prisma.feedItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Feed item not found`);
        await this.prisma.feedItem.update({ where: { id }, data: { isRead: true } });
    }
    async markAllAsRead() {
        const { count } = await this.prisma.feedItem.updateMany({
            where: { isRead: false },
            data: { isRead: true },
        });
        return { updated: count };
    }
    toFeedResponse(item, lang) {
        const isVi = lang === feed_query_dto_1.LangParam.vi;
        const title = isVi && item.titleVi ? item.titleVi : item.title;
        const rawBody = isVi ? (item.bodyVi ?? item.body) : item.body;
        const body = rawBody ? rawBody.slice(0, config_1.CONFIG.ai.maxBodyChars) : undefined;
        const takeaways = isVi ? item.takeawaysVi : item.takeaways;
        return {
            id: item.id,
            company: item.company,
            sourceType: item.sourceType,
            category: item.category,
            timeAgo: (0, time_util_1.formatTimeAgo)(item.publishedAt),
            title,
            ...(body && { body }),
            ...(item.quote && { quote: item.quote }),
            ...(item.handle && { handle: item.handle }),
            ...(takeaways?.length && { takeaways }),
            ...(item.tags?.length && { tags: item.tags }),
            originalUrl: item.originalUrl,
            isRead: item.isRead,
        };
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedService);
//# sourceMappingURL=feed.service.js.map