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
const time_util_1 = require("../../common/utils/time.util");
const api_response_factory_1 = require("../../common/responses/api-response.factory");
let FeedService = class FeedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFeeds(query) {
        const { company, sourceType, page = 1, take = 20 } = query;
        const skip = (page - 1) * take;
        const where = {
            ...(company && { company: company }),
            ...(sourceType && { sourceType: sourceType }),
        };
        const [items, itemCount] = await this.prisma.$transaction([
            this.prisma.feedItem.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.feedItem.count({ where }),
        ]);
        return (0, api_response_factory_1.createPaginatedResponse)(items.map(this.toFeedResponse), page, take, itemCount);
    }
    async getFeedById(id) {
        const item = await this.prisma.feedItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Feed item not found`);
        return this.toFeedResponse(item);
    }
    async markAsRead(id) {
        const item = await this.prisma.feedItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException(`Feed item not found`);
        await this.prisma.feedItem.update({
            where: { id },
            data: { isRead: true },
        });
    }
    toFeedResponse(item) {
        return {
            id: item.id,
            company: item.company,
            sourceType: item.sourceType,
            category: item.category,
            timeAgo: (0, time_util_1.formatTimeAgo)(item.publishedAt),
            title: item.title,
            ...(item.body && { body: item.body }),
            ...(item.quote && { quote: item.quote }),
            ...(item.handle && { handle: item.handle }),
            ...(item.takeaways?.length && { takeaways: item.takeaways }),
            ...(item.tags?.length && { tags: item.tags }),
            originalUrl: item.originalUrl,
        };
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedService);
//# sourceMappingURL=feed.service.js.map