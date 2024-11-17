export interface QueryFilter {
  limit?: number;
  page?: number;
  search?: string;
  status?: string;
  active?: boolean;
}
export interface QuerySearchParams {
  searchParams: QueryFilter;
}
export type QuerySortFilter = 'recent' | 'oldest';
export type BadgeStatusVariant = 'default' | 'success' | 'warning' | 'danger';
