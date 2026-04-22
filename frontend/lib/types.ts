export interface PaginationMeta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

/** Wrapper chung cho mọi response từ backend */
export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  data: T
  meta?: PaginationMeta
  message: string
}
