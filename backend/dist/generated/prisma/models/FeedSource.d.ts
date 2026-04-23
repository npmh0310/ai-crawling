import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FeedSourceModel = runtime.Types.Result.DefaultSelection<Prisma.$FeedSourcePayload>;
export type AggregateFeedSource = {
    _count: FeedSourceCountAggregateOutputType | null;
    _min: FeedSourceMinAggregateOutputType | null;
    _max: FeedSourceMaxAggregateOutputType | null;
};
export type FeedSourceMinAggregateOutputType = {
    id: string | null;
    company: $Enums.Company | null;
    name: string | null;
    rssUrl: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type FeedSourceMaxAggregateOutputType = {
    id: string | null;
    company: $Enums.Company | null;
    name: string | null;
    rssUrl: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type FeedSourceCountAggregateOutputType = {
    id: number;
    company: number;
    name: number;
    rssUrl: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type FeedSourceMinAggregateInputType = {
    id?: true;
    company?: true;
    name?: true;
    rssUrl?: true;
    isActive?: true;
    createdAt?: true;
};
export type FeedSourceMaxAggregateInputType = {
    id?: true;
    company?: true;
    name?: true;
    rssUrl?: true;
    isActive?: true;
    createdAt?: true;
};
export type FeedSourceCountAggregateInputType = {
    id?: true;
    company?: true;
    name?: true;
    rssUrl?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type FeedSourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedSourceWhereInput;
    orderBy?: Prisma.FeedSourceOrderByWithRelationInput | Prisma.FeedSourceOrderByWithRelationInput[];
    cursor?: Prisma.FeedSourceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FeedSourceCountAggregateInputType;
    _min?: FeedSourceMinAggregateInputType;
    _max?: FeedSourceMaxAggregateInputType;
};
export type GetFeedSourceAggregateType<T extends FeedSourceAggregateArgs> = {
    [P in keyof T & keyof AggregateFeedSource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFeedSource[P]> : Prisma.GetScalarType<T[P], AggregateFeedSource[P]>;
};
export type FeedSourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedSourceWhereInput;
    orderBy?: Prisma.FeedSourceOrderByWithAggregationInput | Prisma.FeedSourceOrderByWithAggregationInput[];
    by: Prisma.FeedSourceScalarFieldEnum[] | Prisma.FeedSourceScalarFieldEnum;
    having?: Prisma.FeedSourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FeedSourceCountAggregateInputType | true;
    _min?: FeedSourceMinAggregateInputType;
    _max?: FeedSourceMaxAggregateInputType;
};
export type FeedSourceGroupByOutputType = {
    id: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive: boolean;
    createdAt: Date;
    _count: FeedSourceCountAggregateOutputType | null;
    _min: FeedSourceMinAggregateOutputType | null;
    _max: FeedSourceMaxAggregateOutputType | null;
};
export type GetFeedSourceGroupByPayload<T extends FeedSourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FeedSourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FeedSourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FeedSourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FeedSourceGroupByOutputType[P]>;
}>>;
export type FeedSourceWhereInput = {
    AND?: Prisma.FeedSourceWhereInput | Prisma.FeedSourceWhereInput[];
    OR?: Prisma.FeedSourceWhereInput[];
    NOT?: Prisma.FeedSourceWhereInput | Prisma.FeedSourceWhereInput[];
    id?: Prisma.StringFilter<"FeedSource"> | string;
    company?: Prisma.EnumCompanyFilter<"FeedSource"> | $Enums.Company;
    name?: Prisma.StringFilter<"FeedSource"> | string;
    rssUrl?: Prisma.StringFilter<"FeedSource"> | string;
    isActive?: Prisma.BoolFilter<"FeedSource"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FeedSource"> | Date | string;
    feedItems?: Prisma.FeedItemListRelationFilter;
    crawlLogs?: Prisma.CrawlLogListRelationFilter;
};
export type FeedSourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    rssUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    feedItems?: Prisma.FeedItemOrderByRelationAggregateInput;
    crawlLogs?: Prisma.CrawlLogOrderByRelationAggregateInput;
};
export type FeedSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FeedSourceWhereInput | Prisma.FeedSourceWhereInput[];
    OR?: Prisma.FeedSourceWhereInput[];
    NOT?: Prisma.FeedSourceWhereInput | Prisma.FeedSourceWhereInput[];
    company?: Prisma.EnumCompanyFilter<"FeedSource"> | $Enums.Company;
    name?: Prisma.StringFilter<"FeedSource"> | string;
    rssUrl?: Prisma.StringFilter<"FeedSource"> | string;
    isActive?: Prisma.BoolFilter<"FeedSource"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FeedSource"> | Date | string;
    feedItems?: Prisma.FeedItemListRelationFilter;
    crawlLogs?: Prisma.CrawlLogListRelationFilter;
}, "id">;
export type FeedSourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    rssUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FeedSourceCountOrderByAggregateInput;
    _max?: Prisma.FeedSourceMaxOrderByAggregateInput;
    _min?: Prisma.FeedSourceMinOrderByAggregateInput;
};
export type FeedSourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.FeedSourceScalarWhereWithAggregatesInput | Prisma.FeedSourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.FeedSourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FeedSourceScalarWhereWithAggregatesInput | Prisma.FeedSourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FeedSource"> | string;
    company?: Prisma.EnumCompanyWithAggregatesFilter<"FeedSource"> | $Enums.Company;
    name?: Prisma.StringWithAggregatesFilter<"FeedSource"> | string;
    rssUrl?: Prisma.StringWithAggregatesFilter<"FeedSource"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"FeedSource"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FeedSource"> | Date | string;
};
export type FeedSourceCreateInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    feedItems?: Prisma.FeedItemCreateNestedManyWithoutSourceInput;
    crawlLogs?: Prisma.CrawlLogCreateNestedManyWithoutSourceInput;
};
export type FeedSourceUncheckedCreateInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    feedItems?: Prisma.FeedItemUncheckedCreateNestedManyWithoutSourceInput;
    crawlLogs?: Prisma.CrawlLogUncheckedCreateNestedManyWithoutSourceInput;
};
export type FeedSourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedItems?: Prisma.FeedItemUpdateManyWithoutSourceNestedInput;
    crawlLogs?: Prisma.CrawlLogUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedItems?: Prisma.FeedItemUncheckedUpdateManyWithoutSourceNestedInput;
    crawlLogs?: Prisma.CrawlLogUncheckedUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceCreateManyInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type FeedSourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedSourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedSourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    rssUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedSourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    rssUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedSourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    rssUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedSourceScalarRelationFilter = {
    is?: Prisma.FeedSourceWhereInput;
    isNot?: Prisma.FeedSourceWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumCompanyFieldUpdateOperationsInput = {
    set?: $Enums.Company;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type FeedSourceCreateNestedOneWithoutFeedItemsInput = {
    create?: Prisma.XOR<Prisma.FeedSourceCreateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedCreateWithoutFeedItemsInput>;
    connectOrCreate?: Prisma.FeedSourceCreateOrConnectWithoutFeedItemsInput;
    connect?: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceUpdateOneRequiredWithoutFeedItemsNestedInput = {
    create?: Prisma.XOR<Prisma.FeedSourceCreateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedCreateWithoutFeedItemsInput>;
    connectOrCreate?: Prisma.FeedSourceCreateOrConnectWithoutFeedItemsInput;
    upsert?: Prisma.FeedSourceUpsertWithoutFeedItemsInput;
    connect?: Prisma.FeedSourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedSourceUpdateToOneWithWhereWithoutFeedItemsInput, Prisma.FeedSourceUpdateWithoutFeedItemsInput>, Prisma.FeedSourceUncheckedUpdateWithoutFeedItemsInput>;
};
export type FeedSourceCreateNestedOneWithoutCrawlLogsInput = {
    create?: Prisma.XOR<Prisma.FeedSourceCreateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedCreateWithoutCrawlLogsInput>;
    connectOrCreate?: Prisma.FeedSourceCreateOrConnectWithoutCrawlLogsInput;
    connect?: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceUpdateOneRequiredWithoutCrawlLogsNestedInput = {
    create?: Prisma.XOR<Prisma.FeedSourceCreateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedCreateWithoutCrawlLogsInput>;
    connectOrCreate?: Prisma.FeedSourceCreateOrConnectWithoutCrawlLogsInput;
    upsert?: Prisma.FeedSourceUpsertWithoutCrawlLogsInput;
    connect?: Prisma.FeedSourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FeedSourceUpdateToOneWithWhereWithoutCrawlLogsInput, Prisma.FeedSourceUpdateWithoutCrawlLogsInput>, Prisma.FeedSourceUncheckedUpdateWithoutCrawlLogsInput>;
};
export type FeedSourceCreateWithoutFeedItemsInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    crawlLogs?: Prisma.CrawlLogCreateNestedManyWithoutSourceInput;
};
export type FeedSourceUncheckedCreateWithoutFeedItemsInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    crawlLogs?: Prisma.CrawlLogUncheckedCreateNestedManyWithoutSourceInput;
};
export type FeedSourceCreateOrConnectWithoutFeedItemsInput = {
    where: Prisma.FeedSourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedSourceCreateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedCreateWithoutFeedItemsInput>;
};
export type FeedSourceUpsertWithoutFeedItemsInput = {
    update: Prisma.XOR<Prisma.FeedSourceUpdateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedUpdateWithoutFeedItemsInput>;
    create: Prisma.XOR<Prisma.FeedSourceCreateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedCreateWithoutFeedItemsInput>;
    where?: Prisma.FeedSourceWhereInput;
};
export type FeedSourceUpdateToOneWithWhereWithoutFeedItemsInput = {
    where?: Prisma.FeedSourceWhereInput;
    data: Prisma.XOR<Prisma.FeedSourceUpdateWithoutFeedItemsInput, Prisma.FeedSourceUncheckedUpdateWithoutFeedItemsInput>;
};
export type FeedSourceUpdateWithoutFeedItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlLogs?: Prisma.CrawlLogUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceUncheckedUpdateWithoutFeedItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlLogs?: Prisma.CrawlLogUncheckedUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceCreateWithoutCrawlLogsInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    feedItems?: Prisma.FeedItemCreateNestedManyWithoutSourceInput;
};
export type FeedSourceUncheckedCreateWithoutCrawlLogsInput = {
    id?: string;
    company: $Enums.Company;
    name: string;
    rssUrl: string;
    isActive?: boolean;
    createdAt?: Date | string;
    feedItems?: Prisma.FeedItemUncheckedCreateNestedManyWithoutSourceInput;
};
export type FeedSourceCreateOrConnectWithoutCrawlLogsInput = {
    where: Prisma.FeedSourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedSourceCreateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedCreateWithoutCrawlLogsInput>;
};
export type FeedSourceUpsertWithoutCrawlLogsInput = {
    update: Prisma.XOR<Prisma.FeedSourceUpdateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedUpdateWithoutCrawlLogsInput>;
    create: Prisma.XOR<Prisma.FeedSourceCreateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedCreateWithoutCrawlLogsInput>;
    where?: Prisma.FeedSourceWhereInput;
};
export type FeedSourceUpdateToOneWithWhereWithoutCrawlLogsInput = {
    where?: Prisma.FeedSourceWhereInput;
    data: Prisma.XOR<Prisma.FeedSourceUpdateWithoutCrawlLogsInput, Prisma.FeedSourceUncheckedUpdateWithoutCrawlLogsInput>;
};
export type FeedSourceUpdateWithoutCrawlLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedItems?: Prisma.FeedItemUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceUncheckedUpdateWithoutCrawlLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    rssUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    feedItems?: Prisma.FeedItemUncheckedUpdateManyWithoutSourceNestedInput;
};
export type FeedSourceCountOutputType = {
    feedItems: number;
    crawlLogs: number;
};
export type FeedSourceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    feedItems?: boolean | FeedSourceCountOutputTypeCountFeedItemsArgs;
    crawlLogs?: boolean | FeedSourceCountOutputTypeCountCrawlLogsArgs;
};
export type FeedSourceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceCountOutputTypeSelect<ExtArgs> | null;
};
export type FeedSourceCountOutputTypeCountFeedItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedItemWhereInput;
};
export type FeedSourceCountOutputTypeCountCrawlLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrawlLogWhereInput;
};
export type FeedSourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    company?: boolean;
    name?: boolean;
    rssUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    feedItems?: boolean | Prisma.FeedSource$feedItemsArgs<ExtArgs>;
    crawlLogs?: boolean | Prisma.FeedSource$crawlLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.FeedSourceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedSource"]>;
export type FeedSourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    company?: boolean;
    name?: boolean;
    rssUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["feedSource"]>;
export type FeedSourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    company?: boolean;
    name?: boolean;
    rssUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["feedSource"]>;
export type FeedSourceSelectScalar = {
    id?: boolean;
    company?: boolean;
    name?: boolean;
    rssUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type FeedSourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "company" | "name" | "rssUrl" | "isActive" | "createdAt", ExtArgs["result"]["feedSource"]>;
export type FeedSourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    feedItems?: boolean | Prisma.FeedSource$feedItemsArgs<ExtArgs>;
    crawlLogs?: boolean | Prisma.FeedSource$crawlLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.FeedSourceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FeedSourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type FeedSourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $FeedSourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FeedSource";
    objects: {
        feedItems: Prisma.$FeedItemPayload<ExtArgs>[];
        crawlLogs: Prisma.$CrawlLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        company: $Enums.Company;
        name: string;
        rssUrl: string;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["feedSource"]>;
    composites: {};
};
export type FeedSourceGetPayload<S extends boolean | null | undefined | FeedSourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload, S>;
export type FeedSourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FeedSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeedSourceCountAggregateInputType | true;
};
export interface FeedSourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FeedSource'];
        meta: {
            name: 'FeedSource';
        };
    };
    findUnique<T extends FeedSourceFindUniqueArgs>(args: Prisma.SelectSubset<T, FeedSourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FeedSourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeedSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FeedSourceFindFirstArgs>(args?: Prisma.SelectSubset<T, FeedSourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FeedSourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeedSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FeedSourceFindManyArgs>(args?: Prisma.SelectSubset<T, FeedSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FeedSourceCreateArgs>(args: Prisma.SelectSubset<T, FeedSourceCreateArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FeedSourceCreateManyArgs>(args?: Prisma.SelectSubset<T, FeedSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FeedSourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeedSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FeedSourceDeleteArgs>(args: Prisma.SelectSubset<T, FeedSourceDeleteArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FeedSourceUpdateArgs>(args: Prisma.SelectSubset<T, FeedSourceUpdateArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FeedSourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeedSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FeedSourceUpdateManyArgs>(args: Prisma.SelectSubset<T, FeedSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FeedSourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeedSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FeedSourceUpsertArgs>(args: Prisma.SelectSubset<T, FeedSourceUpsertArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FeedSourceCountArgs>(args?: Prisma.Subset<T, FeedSourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FeedSourceCountAggregateOutputType> : number>;
    aggregate<T extends FeedSourceAggregateArgs>(args: Prisma.Subset<T, FeedSourceAggregateArgs>): Prisma.PrismaPromise<GetFeedSourceAggregateType<T>>;
    groupBy<T extends FeedSourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FeedSourceGroupByArgs['orderBy'];
    } : {
        orderBy?: FeedSourceGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FeedSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FeedSourceFieldRefs;
}
export interface Prisma__FeedSourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    feedItems<T extends Prisma.FeedSource$feedItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeedSource$feedItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    crawlLogs<T extends Prisma.FeedSource$crawlLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeedSource$crawlLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FeedSourceFieldRefs {
    readonly id: Prisma.FieldRef<"FeedSource", 'String'>;
    readonly company: Prisma.FieldRef<"FeedSource", 'Company'>;
    readonly name: Prisma.FieldRef<"FeedSource", 'String'>;
    readonly rssUrl: Prisma.FieldRef<"FeedSource", 'String'>;
    readonly isActive: Prisma.FieldRef<"FeedSource", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"FeedSource", 'DateTime'>;
}
export type FeedSourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where?: Prisma.FeedSourceWhereInput;
    orderBy?: Prisma.FeedSourceOrderByWithRelationInput | Prisma.FeedSourceOrderByWithRelationInput[];
    cursor?: Prisma.FeedSourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedSourceScalarFieldEnum | Prisma.FeedSourceScalarFieldEnum[];
};
export type FeedSourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where?: Prisma.FeedSourceWhereInput;
    orderBy?: Prisma.FeedSourceOrderByWithRelationInput | Prisma.FeedSourceOrderByWithRelationInput[];
    cursor?: Prisma.FeedSourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedSourceScalarFieldEnum | Prisma.FeedSourceScalarFieldEnum[];
};
export type FeedSourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where?: Prisma.FeedSourceWhereInput;
    orderBy?: Prisma.FeedSourceOrderByWithRelationInput | Prisma.FeedSourceOrderByWithRelationInput[];
    cursor?: Prisma.FeedSourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedSourceScalarFieldEnum | Prisma.FeedSourceScalarFieldEnum[];
};
export type FeedSourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedSourceCreateInput, Prisma.FeedSourceUncheckedCreateInput>;
};
export type FeedSourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeedSourceCreateManyInput | Prisma.FeedSourceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FeedSourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    data: Prisma.FeedSourceCreateManyInput | Prisma.FeedSourceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FeedSourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedSourceUpdateInput, Prisma.FeedSourceUncheckedUpdateInput>;
    where: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeedSourceUpdateManyMutationInput, Prisma.FeedSourceUncheckedUpdateManyInput>;
    where?: Prisma.FeedSourceWhereInput;
    limit?: number;
};
export type FeedSourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedSourceUpdateManyMutationInput, Prisma.FeedSourceUncheckedUpdateManyInput>;
    where?: Prisma.FeedSourceWhereInput;
    limit?: number;
};
export type FeedSourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where: Prisma.FeedSourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedSourceCreateInput, Prisma.FeedSourceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FeedSourceUpdateInput, Prisma.FeedSourceUncheckedUpdateInput>;
};
export type FeedSourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
    where: Prisma.FeedSourceWhereUniqueInput;
};
export type FeedSourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedSourceWhereInput;
    limit?: number;
};
export type FeedSource$feedItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    where?: Prisma.FeedItemWhereInput;
    orderBy?: Prisma.FeedItemOrderByWithRelationInput | Prisma.FeedItemOrderByWithRelationInput[];
    cursor?: Prisma.FeedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FeedItemScalarFieldEnum | Prisma.FeedItemScalarFieldEnum[];
};
export type FeedSource$crawlLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    where?: Prisma.CrawlLogWhereInput;
    orderBy?: Prisma.CrawlLogOrderByWithRelationInput | Prisma.CrawlLogOrderByWithRelationInput[];
    cursor?: Prisma.CrawlLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CrawlLogScalarFieldEnum | Prisma.CrawlLogScalarFieldEnum[];
};
export type FeedSourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedSourceSelect<ExtArgs> | null;
    omit?: Prisma.FeedSourceOmit<ExtArgs> | null;
    include?: Prisma.FeedSourceInclude<ExtArgs> | null;
};
