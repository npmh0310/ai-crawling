"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RssService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RssService = void 0;
const common_1 = require("@nestjs/common");
const fast_xml_parser_1 = require("fast-xml-parser");
const api_response_factory_1 = require("../../common/responses/api-response.factory");
let RssService = RssService_1 = class RssService {
    logger = new common_1.Logger(RssService_1.name);
    parser = new fast_xml_parser_1.XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        removeNSPrefix: true,
        trimValues: true,
        processEntities: false,
        htmlEntities: true,
    });
    async fetchAndParse(source, query) {
        const results = await Promise.allSettled(source.urls.map((url) => this.fetchFeed(url, source)));
        const allItems = results.flatMap((result) => {
            if (result.status === 'fulfilled')
                return result.value;
            this.logger.warn(result.reason);
            return [];
        });
        return this.filterByDateRangeAndLimit(allItems, query);
    }
    async fetchFeed(url, source) {
        const response = await fetch(url, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                accept: 'application/rss+xml, application/xml, text/xml, */*',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS from ${url}: ${response.status} ${response.statusText}`);
        }
        const xml = await response.text();
        const parsed = this.parser.parse(xml);
        const items = this.getItems(parsed);
        return items.map((item) => this.normalizeItem(item, source, url));
    }
    getItems(parsed) {
        if (Array.isArray(parsed?.rss?.channel?.item))
            return parsed.rss.channel.item;
        if (parsed?.rss?.channel?.item)
            return [parsed.rss.channel.item];
        if (Array.isArray(parsed?.feed?.entry))
            return parsed.feed.entry;
        if (parsed?.feed?.entry)
            return [parsed.feed.entry];
        return [];
    }
    normalizeItem(item, source, sourceUrl) {
        const title = this.getValue(item.title) ?? 'Untitled';
        const link = this.getLink(item) ?? sourceUrl;
        const guid = this.getValue(item.guid) ?? this.getValue(item.id) ?? link;
        const publishedAt = this.parseDate(this.getValue(item.pubDate) ?? this.getValue(item.published) ?? this.getValue(item.updated));
        return {
            sourceId: source.id,
            company: source.company,
            sourceName: source.name,
            sourceUrl,
            guid,
            title,
            link,
            publishedAt,
            summary: this.getValue(item.description) ?? this.getValue(item.summary) ?? null,
        };
    }
    getValue(value) {
        if (!value)
            return null;
        if (typeof value === 'string')
            return value;
        if (typeof value === 'object' && '_text' in value)
            return value._text;
        return null;
    }
    getLink(item) {
        if (typeof item.link === 'string')
            return item.link;
        if (Array.isArray(item.link)) {
            const first = item.link[0];
            if (typeof first === 'string')
                return first;
            if (first?.['@_href'])
                return first['@_href'];
            if (first?._text)
                return first._text;
        }
        if (item.link?.['@_href'])
            return item.link['@_href'];
        return null;
    }
    parseDate(value) {
        if (!value)
            return null;
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    filterByDateRangeAndLimit(items, query) {
        const start = query.requestReceivedStart
            ? new Date(`${query.requestReceivedStart}T00:00:00.000Z`).getTime()
            : null;
        const end = query.requestReceivedEnd
            ? new Date(`${query.requestReceivedEnd}T23:59:59.999Z`).getTime()
            : null;
        const page = query.page ?? 1;
        const take = query.take ?? 10;
        const skip = (page - 1) * take;
        const now = Date.now();
        const filtered = items
            .filter((item) => {
            if (!item.publishedAt)
                return true;
            const publishedAt = item.publishedAt.getTime();
            if (start !== null && publishedAt < start)
                return false;
            if (end !== null && publishedAt > end)
                return false;
            return true;
        })
            .sort((a, b) => {
            const timeA = a.publishedAt?.getTime() ?? now;
            const timeB = b.publishedAt?.getTime() ?? now;
            return timeB - timeA;
        });
        const itemCount = filtered.length;
        return (0, api_response_factory_1.createPaginatedResponse)(filtered.slice(skip, skip + take), page, take, itemCount);
    }
};
exports.RssService = RssService;
exports.RssService = RssService = RssService_1 = __decorate([
    (0, common_1.Injectable)()
], RssService);
//# sourceMappingURL=rss.service.js.map