export interface QueryFilter {
  limit?: number;
  page?: number;
  search?: string;
}
export type QuerySortFilter = 'recent' | 'oldest';
