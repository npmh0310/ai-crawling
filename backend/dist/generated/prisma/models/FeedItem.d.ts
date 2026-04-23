import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FeedItemModel = runtime.Types.Result.DefaultSelection<Prisma.$FeedItemPayload>;
export type AggregateFeedItem = {
    _count: FeedItemCountAggregateOutputType | null;
    _min: FeedItemMinAggregateOutputType | null;
    _max: FeedItemMaxAggregateOutputType | null;
};
export type FeedItemMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    company: $Enums.Company | null;
    sourceType: $Enums.SourceType | null;
    category: string | null;
    title: string | null;
    body: string | null;
    quote: string | null;
    handle: string | null;
    originalUrl: string | null;
    publishedAt: Date | null;
    isRead: boolean | null;
    guid: string | null;
    createdAt: Date | null;
};
export type FeedItemMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    company: $Enums.Company | null;
    sourceType: $Enums.SourceType | null;
    category: string | null;
    title: string | null;
    body: string | null;
    quote: string | null;
    handle: string | null;
    originalUrl: string | null;
    publishedAt: Date | null;
    isRead: boolean | null;
    guid: string | null;
    createdAt: Date | null;
};
export type FeedItemCountAggregateOutputType = {
    id: number;
    sourceId: number;
    company: number;
    sourceType: number;
    category: number;
    title: number;
    body: number;
    quote: number;
    handle: number;
    takeaways: number;
    tags: number;
    originalUrl: number;
    publishedAt: number;
    isRead: number;
    guid: number;
    createdAt: number;
    _all: number;
};
export type FeedItemMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    company?: true;
    sourceType?: true;
    category?: true;
    title?: true;
    body?: true;
    quote?: true;
    handle?: true;
    originalUrl?: true;
    publishedAt?: true;
    isRead?: true;
    guid?: true;
    createdAt?: true;
};
export type FeedItemMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    company?: true;
    sourceType?: true;
    category?: true;
    title?: true;
    body?: true;
    quote?: true;
    handle?: true;
    originalUrl?: true;
    publishedAt?: true;
    isRead?: true;
    guid?: true;
    createdAt?: true;
};
export type FeedItemCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    company?: true;
    sourceType?: true;
    category?: true;
    title?: true;
    body?: true;
    quote?: true;
    handle?: true;
    takeaways?: true;
    tags?: true;
    originalUrl?: true;
    publishedAt?: true;
    isRead?: true;
    guid?: true;
    createdAt?: true;
    _all?: true;
};
export type FeedItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedItemWhereInput;
    orderBy?: Prisma.FeedItemOrderByWithRelationInput | Prisma.FeedItemOrderByWithRelationInput[];
    cursor?: Prisma.FeedItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FeedItemCountAggregateInputType;
    _min?: FeedItemMinAggregateInputType;
    _max?: FeedItemMaxAggregateInputType;
};
export type GetFeedItemAggregateType<T extends FeedItemAggregateArgs> = {
    [P in keyof T & keyof AggregateFeedItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFeedItem[P]> : Prisma.GetScalarType<T[P], AggregateFeedItem[P]>;
};
export type FeedItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedItemWhereInput;
    orderBy?: Prisma.FeedItemOrderByWithAggregationInput | Prisma.FeedItemOrderByWithAggregationInput[];
    by: Prisma.FeedItemScalarFieldEnum[] | Prisma.FeedItemScalarFieldEnum;
    having?: Prisma.FeedItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FeedItemCountAggregateInputType | true;
    _min?: FeedItemMinAggregateInputType;
    _max?: FeedItemMaxAggregateInputType;
};
export type FeedItemGroupByOutputType = {
    id: string;
    sourceId: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category: string;
    title: string;
    body: string | null;
    quote: string | null;
    handle: string | null;
    takeaways: string[];
    tags: string[];
    originalUrl: string | null;
    publishedAt: Date;
    isRead: boolean;
    guid: string;
    createdAt: Date;
    _count: FeedItemCountAggregateOutputType | null;
    _min: FeedItemMinAggregateOutputType | null;
    _max: FeedItemMaxAggregateOutputType | null;
};
export type GetFeedItemGroupByPayload<T extends FeedItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FeedItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FeedItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FeedItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FeedItemGroupByOutputType[P]>;
}>>;
export type FeedItemWhereInput = {
    AND?: Prisma.FeedItemWhereInput | Prisma.FeedItemWhereInput[];
    OR?: Prisma.FeedItemWhereInput[];
    NOT?: Prisma.FeedItemWhereInput | Prisma.FeedItemWhereInput[];
    id?: Prisma.StringFilter<"FeedItem"> | string;
    sourceId?: Prisma.StringFilter<"FeedItem"> | string;
    company?: Prisma.EnumCompanyFilter<"FeedItem"> | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFilter<"FeedItem"> | $Enums.SourceType;
    category?: Prisma.StringFilter<"FeedItem"> | string;
    title?: Prisma.StringFilter<"FeedItem"> | string;
    body?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    quote?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    handle?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    takeaways?: Prisma.StringNullableListFilter<"FeedItem">;
    tags?: Prisma.StringNullableListFilter<"FeedItem">;
    originalUrl?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
    isRead?: Prisma.BoolFilter<"FeedItem"> | boolean;
    guid?: Prisma.StringFilter<"FeedItem"> | string;
    createdAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
    source?: Prisma.XOR<Prisma.FeedSourceScalarRelationFilter, Prisma.FeedSourceWhereInput>;
};
export type FeedItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrderInput | Prisma.SortOrder;
    quote?: Prisma.SortOrderInput | Prisma.SortOrder;
    handle?: Prisma.SortOrderInput | Prisma.SortOrder;
    takeaways?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    originalUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    guid?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.FeedSourceOrderByWithRelationInput;
};
export type FeedItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    guid?: string;
    AND?: Prisma.FeedItemWhereInput | Prisma.FeedItemWhereInput[];
    OR?: Prisma.FeedItemWhereInput[];
    NOT?: Prisma.FeedItemWhereInput | Prisma.FeedItemWhereInput[];
    sourceId?: Prisma.StringFilter<"FeedItem"> | string;
    company?: Prisma.EnumCompanyFilter<"FeedItem"> | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFilter<"FeedItem"> | $Enums.SourceType;
    category?: Prisma.StringFilter<"FeedItem"> | string;
    title?: Prisma.StringFilter<"FeedItem"> | string;
    body?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    quote?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    handle?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    takeaways?: Prisma.StringNullableListFilter<"FeedItem">;
    tags?: Prisma.StringNullableListFilter<"FeedItem">;
    originalUrl?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
    isRead?: Prisma.BoolFilter<"FeedItem"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
    source?: Prisma.XOR<Prisma.FeedSourceScalarRelationFilter, Prisma.FeedSourceWhereInput>;
}, "id" | "guid">;
export type FeedItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrderInput | Prisma.SortOrder;
    quote?: Prisma.SortOrderInput | Prisma.SortOrder;
    handle?: Prisma.SortOrderInput | Prisma.SortOrder;
    takeaways?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    originalUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    guid?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FeedItemCountOrderByAggregateInput;
    _max?: Prisma.FeedItemMaxOrderByAggregateInput;
    _min?: Prisma.FeedItemMinOrderByAggregateInput;
};
export type FeedItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.FeedItemScalarWhereWithAggregatesInput | Prisma.FeedItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.FeedItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FeedItemScalarWhereWithAggregatesInput | Prisma.FeedItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FeedItem"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"FeedItem"> | string;
    company?: Prisma.EnumCompanyWithAggregatesFilter<"FeedItem"> | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeWithAggregatesFilter<"FeedItem"> | $Enums.SourceType;
    category?: Prisma.StringWithAggregatesFilter<"FeedItem"> | string;
    title?: Prisma.StringWithAggregatesFilter<"FeedItem"> | string;
    body?: Prisma.StringNullableWithAggregatesFilter<"FeedItem"> | string | null;
    quote?: Prisma.StringNullableWithAggregatesFilter<"FeedItem"> | string | null;
    handle?: Prisma.StringNullableWithAggregatesFilter<"FeedItem"> | string | null;
    takeaways?: Prisma.StringNullableListFilter<"FeedItem">;
    tags?: Prisma.StringNullableListFilter<"FeedItem">;
    originalUrl?: Prisma.StringNullableWithAggregatesFilter<"FeedItem"> | string | null;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"FeedItem"> | Date | string;
    isRead?: Prisma.BoolWithAggregatesFilter<"FeedItem"> | boolean;
    guid?: Prisma.StringWithAggregatesFilter<"FeedItem"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FeedItem"> | Date | string;
};
export type FeedItemCreateInput = {
    id?: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
    source: Prisma.FeedSourceCreateNestedOneWithoutFeedItemsInput;
};
export type FeedItemUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
};
export type FeedItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.FeedSourceUpdateOneRequiredWithoutFeedItemsNestedInput;
};
export type FeedItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemCreateManyInput = {
    id?: string;
    sourceId: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
};
export type FeedItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemListRelationFilter = {
    every?: Prisma.FeedItemWhereInput;
    some?: Prisma.FeedItemWhereInput;
    none?: Prisma.FeedItemWhereInput;
};
export type FeedItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type FeedItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    takeaways?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    originalUrl?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    guid?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    originalUrl?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    guid?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    company?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    originalUrl?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    guid?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FeedItemCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput> | Prisma.FeedItemCreateWithoutSourceInput[] | Prisma.FeedItemUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FeedItemCreateOrConnectWithoutSourceInput | Prisma.FeedItemCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.FeedItemCreateManySourceInputEnvelope;
    connect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
};
export type FeedItemUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput> | Prisma.FeedItemCreateWithoutSourceInput[] | Prisma.FeedItemUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FeedItemCreateOrConnectWithoutSourceInput | Prisma.FeedItemCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.FeedItemCreateManySourceInputEnvelope;
    connect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
};
export type FeedItemUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput> | Prisma.FeedItemCreateWithoutSourceInput[] | Prisma.FeedItemUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FeedItemCreateOrConnectWithoutSourceInput | Prisma.FeedItemCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.FeedItemUpsertWithWhereUniqueWithoutSourceInput | Prisma.FeedItemUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.FeedItemCreateManySourceInputEnvelope;
    set?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    disconnect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    delete?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    connect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    update?: Prisma.FeedItemUpdateWithWhereUniqueWithoutSourceInput | Prisma.FeedItemUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.FeedItemUpdateManyWithWhereWithoutSourceInput | Prisma.FeedItemUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.FeedItemScalarWhereInput | Prisma.FeedItemScalarWhereInput[];
};
export type FeedItemUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput> | Prisma.FeedItemCreateWithoutSourceInput[] | Prisma.FeedItemUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.FeedItemCreateOrConnectWithoutSourceInput | Prisma.FeedItemCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.FeedItemUpsertWithWhereUniqueWithoutSourceInput | Prisma.FeedItemUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.FeedItemCreateManySourceInputEnvelope;
    set?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    disconnect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    delete?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    connect?: Prisma.FeedItemWhereUniqueInput | Prisma.FeedItemWhereUniqueInput[];
    update?: Prisma.FeedItemUpdateWithWhereUniqueWithoutSourceInput | Prisma.FeedItemUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.FeedItemUpdateManyWithWhereWithoutSourceInput | Prisma.FeedItemUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.FeedItemScalarWhereInput | Prisma.FeedItemScalarWhereInput[];
};
export type FeedItemCreatetakeawaysInput = {
    set: string[];
};
export type FeedItemCreatetagsInput = {
    set: string[];
};
export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type FeedItemUpdatetakeawaysInput = {
    set?: string[];
    push?: string | string[];
};
export type FeedItemUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type FeedItemCreateWithoutSourceInput = {
    id?: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
};
export type FeedItemUncheckedCreateWithoutSourceInput = {
    id?: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
};
export type FeedItemCreateOrConnectWithoutSourceInput = {
    where: Prisma.FeedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput>;
};
export type FeedItemCreateManySourceInputEnvelope = {
    data: Prisma.FeedItemCreateManySourceInput | Prisma.FeedItemCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type FeedItemUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.FeedItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.FeedItemUpdateWithoutSourceInput, Prisma.FeedItemUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.FeedItemCreateWithoutSourceInput, Prisma.FeedItemUncheckedCreateWithoutSourceInput>;
};
export type FeedItemUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.FeedItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.FeedItemUpdateWithoutSourceInput, Prisma.FeedItemUncheckedUpdateWithoutSourceInput>;
};
export type FeedItemUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.FeedItemScalarWhereInput;
    data: Prisma.XOR<Prisma.FeedItemUpdateManyMutationInput, Prisma.FeedItemUncheckedUpdateManyWithoutSourceInput>;
};
export type FeedItemScalarWhereInput = {
    AND?: Prisma.FeedItemScalarWhereInput | Prisma.FeedItemScalarWhereInput[];
    OR?: Prisma.FeedItemScalarWhereInput[];
    NOT?: Prisma.FeedItemScalarWhereInput | Prisma.FeedItemScalarWhereInput[];
    id?: Prisma.StringFilter<"FeedItem"> | string;
    sourceId?: Prisma.StringFilter<"FeedItem"> | string;
    company?: Prisma.EnumCompanyFilter<"FeedItem"> | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFilter<"FeedItem"> | $Enums.SourceType;
    category?: Prisma.StringFilter<"FeedItem"> | string;
    title?: Prisma.StringFilter<"FeedItem"> | string;
    body?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    quote?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    handle?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    takeaways?: Prisma.StringNullableListFilter<"FeedItem">;
    tags?: Prisma.StringNullableListFilter<"FeedItem">;
    originalUrl?: Prisma.StringNullableFilter<"FeedItem"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
    isRead?: Prisma.BoolFilter<"FeedItem"> | boolean;
    guid?: Prisma.StringFilter<"FeedItem"> | string;
    createdAt?: Prisma.DateTimeFilter<"FeedItem"> | Date | string;
};
export type FeedItemCreateManySourceInput = {
    id?: string;
    company: $Enums.Company;
    sourceType: $Enums.SourceType;
    category?: string;
    title: string;
    body?: string | null;
    quote?: string | null;
    handle?: string | null;
    takeaways?: Prisma.FeedItemCreatetakeawaysInput | string[];
    tags?: Prisma.FeedItemCreatetagsInput | string[];
    originalUrl?: string | null;
    publishedAt: Date | string;
    isRead?: boolean;
    guid: string;
    createdAt?: Date | string;
};
export type FeedItemUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.EnumCompanyFieldUpdateOperationsInput | $Enums.Company;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    takeaways?: Prisma.FeedItemUpdatetakeawaysInput | string[];
    tags?: Prisma.FeedItemUpdatetagsInput | string[];
    originalUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    guid?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FeedItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    company?: boolean;
    sourceType?: boolean;
    category?: boolean;
    title?: boolean;
    body?: boolean;
    quote?: boolean;
    handle?: boolean;
    takeaways?: boolean;
    tags?: boolean;
    originalUrl?: boolean;
    publishedAt?: boolean;
    isRead?: boolean;
    guid?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedItem"]>;
export type FeedItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    company?: boolean;
    sourceType?: boolean;
    category?: boolean;
    title?: boolean;
    body?: boolean;
    quote?: boolean;
    handle?: boolean;
    takeaways?: boolean;
    tags?: boolean;
    originalUrl?: boolean;
    publishedAt?: boolean;
    isRead?: boolean;
    guid?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedItem"]>;
export type FeedItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    company?: boolean;
    sourceType?: boolean;
    category?: boolean;
    title?: boolean;
    body?: boolean;
    quote?: boolean;
    handle?: boolean;
    takeaways?: boolean;
    tags?: boolean;
    originalUrl?: boolean;
    publishedAt?: boolean;
    isRead?: boolean;
    guid?: boolean;
    createdAt?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["feedItem"]>;
export type FeedItemSelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    company?: boolean;
    sourceType?: boolean;
    category?: boolean;
    title?: boolean;
    body?: boolean;
    quote?: boolean;
    handle?: boolean;
    takeaways?: boolean;
    tags?: boolean;
    originalUrl?: boolean;
    publishedAt?: boolean;
    isRead?: boolean;
    guid?: boolean;
    createdAt?: boolean;
};
export type FeedItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceId" | "company" | "sourceType" | "category" | "title" | "body" | "quote" | "handle" | "takeaways" | "tags" | "originalUrl" | "publishedAt" | "isRead" | "guid" | "createdAt", ExtArgs["result"]["feedItem"]>;
export type FeedItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type FeedItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type FeedItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type $FeedItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FeedItem";
    objects: {
        source: Prisma.$FeedSourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceId: string;
        company: $Enums.Company;
        sourceType: $Enums.SourceType;
        category: string;
        title: string;
        body: string | null;
        quote: string | null;
        handle: string | null;
        takeaways: string[];
        tags: string[];
        originalUrl: string | null;
        publishedAt: Date;
        isRead: boolean;
        guid: string;
        createdAt: Date;
    }, ExtArgs["result"]["feedItem"]>;
    composites: {};
};
export type FeedItemGetPayload<S extends boolean | null | undefined | FeedItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FeedItemPayload, S>;
export type FeedItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FeedItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FeedItemCountAggregateInputType | true;
};
export interface FeedItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FeedItem'];
        meta: {
            name: 'FeedItem';
        };
    };
    findUnique<T extends FeedItemFindUniqueArgs>(args: Prisma.SelectSubset<T, FeedItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FeedItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FeedItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FeedItemFindFirstArgs>(args?: Prisma.SelectSubset<T, FeedItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FeedItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FeedItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FeedItemFindManyArgs>(args?: Prisma.SelectSubset<T, FeedItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FeedItemCreateArgs>(args: Prisma.SelectSubset<T, FeedItemCreateArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FeedItemCreateManyArgs>(args?: Prisma.SelectSubset<T, FeedItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FeedItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FeedItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FeedItemDeleteArgs>(args: Prisma.SelectSubset<T, FeedItemDeleteArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FeedItemUpdateArgs>(args: Prisma.SelectSubset<T, FeedItemUpdateArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FeedItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, FeedItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FeedItemUpdateManyArgs>(args: Prisma.SelectSubset<T, FeedItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FeedItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FeedItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FeedItemUpsertArgs>(args: Prisma.SelectSubset<T, FeedItemUpsertArgs<ExtArgs>>): Prisma.Prisma__FeedItemClient<runtime.Types.Result.GetResult<Prisma.$FeedItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FeedItemCountArgs>(args?: Prisma.Subset<T, FeedItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FeedItemCountAggregateOutputType> : number>;
    aggregate<T extends FeedItemAggregateArgs>(args: Prisma.Subset<T, FeedItemAggregateArgs>): Prisma.PrismaPromise<GetFeedItemAggregateType<T>>;
    groupBy<T extends FeedItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FeedItemGroupByArgs['orderBy'];
    } : {
        orderBy?: FeedItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FeedItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FeedItemFieldRefs;
}
export interface Prisma__FeedItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    source<T extends Prisma.FeedSourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeedSourceDefaultArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FeedItemFieldRefs {
    readonly id: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly sourceId: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly company: Prisma.FieldRef<"FeedItem", 'Company'>;
    readonly sourceType: Prisma.FieldRef<"FeedItem", 'SourceType'>;
    readonly category: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly title: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly body: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly quote: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly handle: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly takeaways: Prisma.FieldRef<"FeedItem", 'String[]'>;
    readonly tags: Prisma.FieldRef<"FeedItem", 'String[]'>;
    readonly originalUrl: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"FeedItem", 'DateTime'>;
    readonly isRead: Prisma.FieldRef<"FeedItem", 'Boolean'>;
    readonly guid: Prisma.FieldRef<"FeedItem", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FeedItem", 'DateTime'>;
}
export type FeedItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    where: Prisma.FeedItemWhereUniqueInput;
};
export type FeedItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    where: Prisma.FeedItemWhereUniqueInput;
};
export type FeedItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FeedItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FeedItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FeedItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedItemCreateInput, Prisma.FeedItemUncheckedCreateInput>;
};
export type FeedItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FeedItemCreateManyInput | Prisma.FeedItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FeedItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    data: Prisma.FeedItemCreateManyInput | Prisma.FeedItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FeedItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FeedItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedItemUpdateInput, Prisma.FeedItemUncheckedUpdateInput>;
    where: Prisma.FeedItemWhereUniqueInput;
};
export type FeedItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FeedItemUpdateManyMutationInput, Prisma.FeedItemUncheckedUpdateManyInput>;
    where?: Prisma.FeedItemWhereInput;
    limit?: number;
};
export type FeedItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FeedItemUpdateManyMutationInput, Prisma.FeedItemUncheckedUpdateManyInput>;
    where?: Prisma.FeedItemWhereInput;
    limit?: number;
    include?: Prisma.FeedItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FeedItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    where: Prisma.FeedItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.FeedItemCreateInput, Prisma.FeedItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FeedItemUpdateInput, Prisma.FeedItemUncheckedUpdateInput>;
};
export type FeedItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
    where: Prisma.FeedItemWhereUniqueInput;
};
export type FeedItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FeedItemWhereInput;
    limit?: number;
};
export type FeedItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FeedItemSelect<ExtArgs> | null;
    omit?: Prisma.FeedItemOmit<ExtArgs> | null;
    include?: Prisma.FeedItemInclude<ExtArgs> | null;
};
