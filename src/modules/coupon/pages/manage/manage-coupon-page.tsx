import { ITEMS_PER_PAGE } from '@/shared/constants';
import { QuerySearchParams } from '@/shared/types';

import { getCoupons } from '../../actions';
import ManageCouponContainer from './components';

export interface ManageCouponPageProps {}

async function ManageCouponPage({ searchParams }: QuerySearchParams) {
  const data = await getCoupons({
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams.search,
    active: searchParams.active,
  });

  if (!data) return null;
  const { coupons, total } = data;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <ManageCouponContainer
      coupons={coupons}
      total={total}
      totalPages={totalPages}
    />
  );
}

export default ManageCouponPage;
