export interface PaginationMeta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    data: T;
    meta?: PaginationMeta;
    message?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
