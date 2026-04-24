import { ApiResponse, PaginatedResponse } from '../interfaces/api-response.interface';
export declare function createSuccessResponse<T>(data: T): ApiResponse<T>;
export declare function createPaginatedResponse<T>(data: T[], page: number, take: number, itemCount: number): PaginatedResponse<T>;
