export interface QueryFilter {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
}
export type QuerySortFilter = 'recent' | 'oldest';
