import CreateCouponPage from '@/modules/coupon/pages/create';
import { Heading } from '@/shared/components';

export interface CreateCouponPageRootProps {}

function CreateCouponPageRoot(_props: CreateCouponPageRootProps) {
  return (
    <>
      <Heading>Create Coupon</Heading>
      <CreateCouponPage />
    </>
  );
}

export default CreateCouponPageRoot;
