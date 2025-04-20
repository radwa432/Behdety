export interface PaginationResponse<T> {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    data: T[];
  }