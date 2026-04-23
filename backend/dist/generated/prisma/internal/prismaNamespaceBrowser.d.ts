import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly FeedSource: "FeedSource";
    readonly FeedItem: "FeedItem";
    readonly CrawlLog: "CrawlLog";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const FeedSourceScalarFieldEnum: {
    readonly id: "id";
    readonly company: "company";
    readonly name: "name";
    readonly rssUrl: "rssUrl";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type FeedSourceScalarFieldEnum = (typeof FeedSourceScalarFieldEnum)[keyof typeof FeedSourceScalarFieldEnum];
export declare const FeedItemScalarFieldEnum: {
    readonly id: "id";
    readonly sourceId: "sourceId";
    readonly company: "company";
    readonly sourceType: "sourceType";
    readonly category: "category";
    readonly title: "title";
    readonly body: "body";
    readonly quote: "quote";
    readonly handle: "handle";
    readonly takeaways: "takeaways";
    readonly tags: "tags";
    readonly originalUrl: "originalUrl";
    readonly publishedAt: "publishedAt";
    readonly isRead: "isRead";
    readonly guid: "guid";
    readonly createdAt: "createdAt";
};
export type FeedItemScalarFieldEnum = (typeof FeedItemScalarFieldEnum)[keyof typeof FeedItemScalarFieldEnum];
export declare const CrawlLogScalarFieldEnum: {
    readonly id: "id";
    readonly sourceId: "sourceId";
    readonly status: "status";
    readonly itemsFound: "itemsFound";
    readonly itemsNew: "itemsNew";
    readonly startedAt: "startedAt";
    readonly finishedAt: "finishedAt";
    readonly errorMsg: "errorMsg";
};
export type CrawlLogScalarFieldEnum = (typeof CrawlLogScalarFieldEnum)[keyof typeof CrawlLogScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
