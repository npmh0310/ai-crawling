import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CrawlLogModel = runtime.Types.Result.DefaultSelection<Prisma.$CrawlLogPayload>;
export type AggregateCrawlLog = {
    _count: CrawlLogCountAggregateOutputType | null;
    _avg: CrawlLogAvgAggregateOutputType | null;
    _sum: CrawlLogSumAggregateOutputType | null;
    _min: CrawlLogMinAggregateOutputType | null;
    _max: CrawlLogMaxAggregateOutputType | null;
};
export type CrawlLogAvgAggregateOutputType = {
    itemsFound: number | null;
    itemsNew: number | null;
};
export type CrawlLogSumAggregateOutputType = {
    itemsFound: number | null;
    itemsNew: number | null;
};
export type CrawlLogMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    status: $Enums.CrawlStatus | null;
    itemsFound: number | null;
    itemsNew: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    errorMsg: string | null;
};
export type CrawlLogMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    status: $Enums.CrawlStatus | null;
    itemsFound: number | null;
    itemsNew: number | null;
    startedAt: Date | null;
    finishedAt: Date | null;
    errorMsg: string | null;
};
export type CrawlLogCountAggregateOutputType = {
    id: number;
    sourceId: number;
    status: number;
    itemsFound: number;
    itemsNew: number;
    startedAt: number;
    finishedAt: number;
    errorMsg: number;
    _all: number;
};
export type CrawlLogAvgAggregateInputType = {
    itemsFound?: true;
    itemsNew?: true;
};
export type CrawlLogSumAggregateInputType = {
    itemsFound?: true;
    itemsNew?: true;
};
export type CrawlLogMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    itemsFound?: true;
    itemsNew?: true;
    startedAt?: true;
    finishedAt?: true;
    errorMsg?: true;
};
export type CrawlLogMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    itemsFound?: true;
    itemsNew?: true;
    startedAt?: true;
    finishedAt?: true;
    errorMsg?: true;
};
export type CrawlLogCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    status?: true;
    itemsFound?: true;
    itemsNew?: true;
    startedAt?: true;
    finishedAt?: true;
    errorMsg?: true;
    _all?: true;
};
export type CrawlLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrawlLogWhereInput;
    orderBy?: Prisma.CrawlLogOrderByWithRelationInput | Prisma.CrawlLogOrderByWithRelationInput[];
    cursor?: Prisma.CrawlLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CrawlLogCountAggregateInputType;
    _avg?: CrawlLogAvgAggregateInputType;
    _sum?: CrawlLogSumAggregateInputType;
    _min?: CrawlLogMinAggregateInputType;
    _max?: CrawlLogMaxAggregateInputType;
};
export type GetCrawlLogAggregateType<T extends CrawlLogAggregateArgs> = {
    [P in keyof T & keyof AggregateCrawlLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCrawlLog[P]> : Prisma.GetScalarType<T[P], AggregateCrawlLog[P]>;
};
export type CrawlLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrawlLogWhereInput;
    orderBy?: Prisma.CrawlLogOrderByWithAggregationInput | Prisma.CrawlLogOrderByWithAggregationInput[];
    by: Prisma.CrawlLogScalarFieldEnum[] | Prisma.CrawlLogScalarFieldEnum;
    having?: Prisma.CrawlLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CrawlLogCountAggregateInputType | true;
    _avg?: CrawlLogAvgAggregateInputType;
    _sum?: CrawlLogSumAggregateInputType;
    _min?: CrawlLogMinAggregateInputType;
    _max?: CrawlLogMaxAggregateInputType;
};
export type CrawlLogGroupByOutputType = {
    id: string;
    sourceId: string;
    status: $Enums.CrawlStatus;
    itemsFound: number;
    itemsNew: number;
    startedAt: Date;
    finishedAt: Date | null;
    errorMsg: string | null;
    _count: CrawlLogCountAggregateOutputType | null;
    _avg: CrawlLogAvgAggregateOutputType | null;
    _sum: CrawlLogSumAggregateOutputType | null;
    _min: CrawlLogMinAggregateOutputType | null;
    _max: CrawlLogMaxAggregateOutputType | null;
};
export type GetCrawlLogGroupByPayload<T extends CrawlLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CrawlLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CrawlLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CrawlLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CrawlLogGroupByOutputType[P]>;
}>>;
export type CrawlLogWhereInput = {
    AND?: Prisma.CrawlLogWhereInput | Prisma.CrawlLogWhereInput[];
    OR?: Prisma.CrawlLogWhereInput[];
    NOT?: Prisma.CrawlLogWhereInput | Prisma.CrawlLogWhereInput[];
    id?: Prisma.StringFilter<"CrawlLog"> | string;
    sourceId?: Prisma.StringFilter<"CrawlLog"> | string;
    status?: Prisma.EnumCrawlStatusFilter<"CrawlLog"> | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFilter<"CrawlLog"> | number;
    itemsNew?: Prisma.IntFilter<"CrawlLog"> | number;
    startedAt?: Prisma.DateTimeFilter<"CrawlLog"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"CrawlLog"> | Date | string | null;
    errorMsg?: Prisma.StringNullableFilter<"CrawlLog"> | string | null;
    source?: Prisma.XOR<Prisma.FeedSourceScalarRelationFilter, Prisma.FeedSourceWhereInput>;
};
export type CrawlLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMsg?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.FeedSourceOrderByWithRelationInput;
};
export type CrawlLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CrawlLogWhereInput | Prisma.CrawlLogWhereInput[];
    OR?: Prisma.CrawlLogWhereInput[];
    NOT?: Prisma.CrawlLogWhereInput | Prisma.CrawlLogWhereInput[];
    sourceId?: Prisma.StringFilter<"CrawlLog"> | string;
    status?: Prisma.EnumCrawlStatusFilter<"CrawlLog"> | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFilter<"CrawlLog"> | number;
    itemsNew?: Prisma.IntFilter<"CrawlLog"> | number;
    startedAt?: Prisma.DateTimeFilter<"CrawlLog"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"CrawlLog"> | Date | string | null;
    errorMsg?: Prisma.StringNullableFilter<"CrawlLog"> | string | null;
    source?: Prisma.XOR<Prisma.FeedSourceScalarRelationFilter, Prisma.FeedSourceWhereInput>;
}, "id">;
export type CrawlLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMsg?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CrawlLogCountOrderByAggregateInput;
    _avg?: Prisma.CrawlLogAvgOrderByAggregateInput;
    _max?: Prisma.CrawlLogMaxOrderByAggregateInput;
    _min?: Prisma.CrawlLogMinOrderByAggregateInput;
    _sum?: Prisma.CrawlLogSumOrderByAggregateInput;
};
export type CrawlLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.CrawlLogScalarWhereWithAggregatesInput | Prisma.CrawlLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.CrawlLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CrawlLogScalarWhereWithAggregatesInput | Prisma.CrawlLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CrawlLog"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"CrawlLog"> | string;
    status?: Prisma.EnumCrawlStatusWithAggregatesFilter<"CrawlLog"> | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntWithAggregatesFilter<"CrawlLog"> | number;
    itemsNew?: Prisma.IntWithAggregatesFilter<"CrawlLog"> | number;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"CrawlLog"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CrawlLog"> | Date | string | null;
    errorMsg?: Prisma.StringNullableWithAggregatesFilter<"CrawlLog"> | string | null;
};
export type CrawlLogCreateInput = {
    id?: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
    source: Prisma.FeedSourceCreateNestedOneWithoutCrawlLogsInput;
};
export type CrawlLogUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
};
export type CrawlLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    source?: Prisma.FeedSourceUpdateOneRequiredWithoutCrawlLogsNestedInput;
};
export type CrawlLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogCreateManyInput = {
    id?: string;
    sourceId: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
};
export type CrawlLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogListRelationFilter = {
    every?: Prisma.CrawlLogWhereInput;
    some?: Prisma.CrawlLogWhereInput;
    none?: Prisma.CrawlLogWhereInput;
};
export type CrawlLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CrawlLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    errorMsg?: Prisma.SortOrder;
};
export type CrawlLogAvgOrderByAggregateInput = {
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
};
export type CrawlLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    errorMsg?: Prisma.SortOrder;
};
export type CrawlLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finishedAt?: Prisma.SortOrder;
    errorMsg?: Prisma.SortOrder;
};
export type CrawlLogSumOrderByAggregateInput = {
    itemsFound?: Prisma.SortOrder;
    itemsNew?: Prisma.SortOrder;
};
export type CrawlLogCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput> | Prisma.CrawlLogCreateWithoutSourceInput[] | Prisma.CrawlLogUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.CrawlLogCreateOrConnectWithoutSourceInput | Prisma.CrawlLogCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.CrawlLogCreateManySourceInputEnvelope;
    connect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
};
export type CrawlLogUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput> | Prisma.CrawlLogCreateWithoutSourceInput[] | Prisma.CrawlLogUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.CrawlLogCreateOrConnectWithoutSourceInput | Prisma.CrawlLogCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.CrawlLogCreateManySourceInputEnvelope;
    connect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
};
export type CrawlLogUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput> | Prisma.CrawlLogCreateWithoutSourceInput[] | Prisma.CrawlLogUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.CrawlLogCreateOrConnectWithoutSourceInput | Prisma.CrawlLogCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.CrawlLogUpsertWithWhereUniqueWithoutSourceInput | Prisma.CrawlLogUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.CrawlLogCreateManySourceInputEnvelope;
    set?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    disconnect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    delete?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    connect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    update?: Prisma.CrawlLogUpdateWithWhereUniqueWithoutSourceInput | Prisma.CrawlLogUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.CrawlLogUpdateManyWithWhereWithoutSourceInput | Prisma.CrawlLogUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.CrawlLogScalarWhereInput | Prisma.CrawlLogScalarWhereInput[];
};
export type CrawlLogUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput> | Prisma.CrawlLogCreateWithoutSourceInput[] | Prisma.CrawlLogUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.CrawlLogCreateOrConnectWithoutSourceInput | Prisma.CrawlLogCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.CrawlLogUpsertWithWhereUniqueWithoutSourceInput | Prisma.CrawlLogUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.CrawlLogCreateManySourceInputEnvelope;
    set?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    disconnect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    delete?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    connect?: Prisma.CrawlLogWhereUniqueInput | Prisma.CrawlLogWhereUniqueInput[];
    update?: Prisma.CrawlLogUpdateWithWhereUniqueWithoutSourceInput | Prisma.CrawlLogUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.CrawlLogUpdateManyWithWhereWithoutSourceInput | Prisma.CrawlLogUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.CrawlLogScalarWhereInput | Prisma.CrawlLogScalarWhereInput[];
};
export type EnumCrawlStatusFieldUpdateOperationsInput = {
    set?: $Enums.CrawlStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type CrawlLogCreateWithoutSourceInput = {
    id?: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
};
export type CrawlLogUncheckedCreateWithoutSourceInput = {
    id?: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
};
export type CrawlLogCreateOrConnectWithoutSourceInput = {
    where: Prisma.CrawlLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput>;
};
export type CrawlLogCreateManySourceInputEnvelope = {
    data: Prisma.CrawlLogCreateManySourceInput | Prisma.CrawlLogCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type CrawlLogUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.CrawlLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.CrawlLogUpdateWithoutSourceInput, Prisma.CrawlLogUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.CrawlLogCreateWithoutSourceInput, Prisma.CrawlLogUncheckedCreateWithoutSourceInput>;
};
export type CrawlLogUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.CrawlLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.CrawlLogUpdateWithoutSourceInput, Prisma.CrawlLogUncheckedUpdateWithoutSourceInput>;
};
export type CrawlLogUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.CrawlLogScalarWhereInput;
    data: Prisma.XOR<Prisma.CrawlLogUpdateManyMutationInput, Prisma.CrawlLogUncheckedUpdateManyWithoutSourceInput>;
};
export type CrawlLogScalarWhereInput = {
    AND?: Prisma.CrawlLogScalarWhereInput | Prisma.CrawlLogScalarWhereInput[];
    OR?: Prisma.CrawlLogScalarWhereInput[];
    NOT?: Prisma.CrawlLogScalarWhereInput | Prisma.CrawlLogScalarWhereInput[];
    id?: Prisma.StringFilter<"CrawlLog"> | string;
    sourceId?: Prisma.StringFilter<"CrawlLog"> | string;
    status?: Prisma.EnumCrawlStatusFilter<"CrawlLog"> | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFilter<"CrawlLog"> | number;
    itemsNew?: Prisma.IntFilter<"CrawlLog"> | number;
    startedAt?: Prisma.DateTimeFilter<"CrawlLog"> | Date | string;
    finishedAt?: Prisma.DateTimeNullableFilter<"CrawlLog"> | Date | string | null;
    errorMsg?: Prisma.StringNullableFilter<"CrawlLog"> | string | null;
};
export type CrawlLogCreateManySourceInput = {
    id?: string;
    status: $Enums.CrawlStatus;
    itemsFound?: number;
    itemsNew?: number;
    startedAt: Date | string;
    finishedAt?: Date | string | null;
    errorMsg?: string | null;
};
export type CrawlLogUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    itemsFound?: Prisma.IntFieldUpdateOperationsInput | number;
    itemsNew?: Prisma.IntFieldUpdateOperationsInput | number;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    errorMsg?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type CrawlLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    itemsFound?: boolean;
    itemsNew?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    errorMsg?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["crawlLog"]>;
export type CrawlLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    itemsFound?: boolean;
    itemsNew?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    errorMsg?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["crawlLog"]>;
export type CrawlLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    itemsFound?: boolean;
    itemsNew?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    errorMsg?: boolean;
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["crawlLog"]>;
export type CrawlLogSelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    status?: boolean;
    itemsFound?: boolean;
    itemsNew?: boolean;
    startedAt?: boolean;
    finishedAt?: boolean;
    errorMsg?: boolean;
};
export type CrawlLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceId" | "status" | "itemsFound" | "itemsNew" | "startedAt" | "finishedAt" | "errorMsg", ExtArgs["result"]["crawlLog"]>;
export type CrawlLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type CrawlLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type CrawlLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.FeedSourceDefaultArgs<ExtArgs>;
};
export type $CrawlLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CrawlLog";
    objects: {
        source: Prisma.$FeedSourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceId: string;
        status: $Enums.CrawlStatus;
        itemsFound: number;
        itemsNew: number;
        startedAt: Date;
        finishedAt: Date | null;
        errorMsg: string | null;
    }, ExtArgs["result"]["crawlLog"]>;
    composites: {};
};
export type CrawlLogGetPayload<S extends boolean | null | undefined | CrawlLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload, S>;
export type CrawlLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CrawlLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CrawlLogCountAggregateInputType | true;
};
export interface CrawlLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CrawlLog'];
        meta: {
            name: 'CrawlLog';
        };
    };
    findUnique<T extends CrawlLogFindUniqueArgs>(args: Prisma.SelectSubset<T, CrawlLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CrawlLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CrawlLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CrawlLogFindFirstArgs>(args?: Prisma.SelectSubset<T, CrawlLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CrawlLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CrawlLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CrawlLogFindManyArgs>(args?: Prisma.SelectSubset<T, CrawlLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CrawlLogCreateArgs>(args: Prisma.SelectSubset<T, CrawlLogCreateArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CrawlLogCreateManyArgs>(args?: Prisma.SelectSubset<T, CrawlLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CrawlLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CrawlLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CrawlLogDeleteArgs>(args: Prisma.SelectSubset<T, CrawlLogDeleteArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CrawlLogUpdateArgs>(args: Prisma.SelectSubset<T, CrawlLogUpdateArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CrawlLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, CrawlLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CrawlLogUpdateManyArgs>(args: Prisma.SelectSubset<T, CrawlLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CrawlLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CrawlLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CrawlLogUpsertArgs>(args: Prisma.SelectSubset<T, CrawlLogUpsertArgs<ExtArgs>>): Prisma.Prisma__CrawlLogClient<runtime.Types.Result.GetResult<Prisma.$CrawlLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CrawlLogCountArgs>(args?: Prisma.Subset<T, CrawlLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CrawlLogCountAggregateOutputType> : number>;
    aggregate<T extends CrawlLogAggregateArgs>(args: Prisma.Subset<T, CrawlLogAggregateArgs>): Prisma.PrismaPromise<GetCrawlLogAggregateType<T>>;
    groupBy<T extends CrawlLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CrawlLogGroupByArgs['orderBy'];
    } : {
        orderBy?: CrawlLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CrawlLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CrawlLogFieldRefs;
}
export interface Prisma__CrawlLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    source<T extends Prisma.FeedSourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FeedSourceDefaultArgs<ExtArgs>>): Prisma.Prisma__FeedSourceClient<runtime.Types.Result.GetResult<Prisma.$FeedSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CrawlLogFieldRefs {
    readonly id: Prisma.FieldRef<"CrawlLog", 'String'>;
    readonly sourceId: Prisma.FieldRef<"CrawlLog", 'String'>;
    readonly status: Prisma.FieldRef<"CrawlLog", 'CrawlStatus'>;
    readonly itemsFound: Prisma.FieldRef<"CrawlLog", 'Int'>;
    readonly itemsNew: Prisma.FieldRef<"CrawlLog", 'Int'>;
    readonly startedAt: Prisma.FieldRef<"CrawlLog", 'DateTime'>;
    readonly finishedAt: Prisma.FieldRef<"CrawlLog", 'DateTime'>;
    readonly errorMsg: Prisma.FieldRef<"CrawlLog", 'String'>;
}
export type CrawlLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    where: Prisma.CrawlLogWhereUniqueInput;
};
export type CrawlLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    where: Prisma.CrawlLogWhereUniqueInput;
};
export type CrawlLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CrawlLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CrawlLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CrawlLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CrawlLogCreateInput, Prisma.CrawlLogUncheckedCreateInput>;
};
export type CrawlLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CrawlLogCreateManyInput | Prisma.CrawlLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CrawlLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    data: Prisma.CrawlLogCreateManyInput | Prisma.CrawlLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CrawlLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CrawlLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CrawlLogUpdateInput, Prisma.CrawlLogUncheckedUpdateInput>;
    where: Prisma.CrawlLogWhereUniqueInput;
};
export type CrawlLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CrawlLogUpdateManyMutationInput, Prisma.CrawlLogUncheckedUpdateManyInput>;
    where?: Prisma.CrawlLogWhereInput;
    limit?: number;
};
export type CrawlLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CrawlLogUpdateManyMutationInput, Prisma.CrawlLogUncheckedUpdateManyInput>;
    where?: Prisma.CrawlLogWhereInput;
    limit?: number;
    include?: Prisma.CrawlLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CrawlLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    where: Prisma.CrawlLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.CrawlLogCreateInput, Prisma.CrawlLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CrawlLogUpdateInput, Prisma.CrawlLogUncheckedUpdateInput>;
};
export type CrawlLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
    where: Prisma.CrawlLogWhereUniqueInput;
};
export type CrawlLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CrawlLogWhereInput;
    limit?: number;
};
export type CrawlLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CrawlLogSelect<ExtArgs> | null;
    omit?: Prisma.CrawlLogOmit<ExtArgs> | null;
    include?: Prisma.CrawlLogInclude<ExtArgs> | null;
};
