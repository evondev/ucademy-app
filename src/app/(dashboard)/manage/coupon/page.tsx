import { getCoupons } from '@/modules/coupon/services/coupon.actions';
import { ITEMS_PER_PAGE } from '@/shared/constants';

import CouponManage from './coupon-manage';

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    active: boolean;
  };
}) => {
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
    <CouponManage
      coupons={coupons}
      total={total}
      totalPages={totalPages}
    />
  );
};

export default page;
