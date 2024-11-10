import { getCouponByCode } from '@/modules/coupon/services/coupon.actions';
import { Heading } from '@/shared/components';

import UpdateCouponForm from './update-coupon-form';

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const couponDetails = await getCouponByCode({ code: searchParams.code });

  if (!couponDetails) return null;

  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm data={couponDetails} />
    </div>
  );
};

export default page;
