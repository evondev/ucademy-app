import { Heading } from '@/shared/components';

import NewCouponForm from './new-coupon-form';

const page = () => {
  return (
    <div>
      <Heading className="mb-10">Tạo mới mã giảm giá</Heading>
      <NewCouponForm />
    </div>
  );
};

export default page;
