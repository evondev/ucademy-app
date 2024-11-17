import { ManageCouponPage } from '@/modules/coupon/pages';
import { QuerySearchParams } from '@/shared/types';

export interface ManageCouponPageRootProps {}

function ManageCouponPageRoot({ searchParams }: QuerySearchParams) {
  return <ManageCouponPage searchParams={searchParams} />;
}

export default ManageCouponPageRoot;
