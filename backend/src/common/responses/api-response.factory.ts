import { ApiResponse, PaginationMeta, PaginatedResponse } from '../interfaces/api-response.interface'

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    statusCode: 200,
    success: true,
    data,
  }
}

export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  take: number,
  itemCount: number,
): PaginatedResponse<T> {
  const meta: PaginationMeta = {
    page,
    take,
    itemCount,
    pageCount: Math.ceil(itemCount / take),
    hasPreviousPage: page > 1,
    hasNextPage: page * take < itemCount,
  }

  return {
    data,
    meta,
  }
}
