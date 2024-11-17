import UpdateCouponPage from '@/modules/coupon/pages/update';
import { Heading } from '@/shared/components';

export interface UpdateCouponPageRootProps {
  searchParams: {
    code: string;
  };
}

function UpdateCouponPageRoot({ searchParams }: UpdateCouponPageRootProps) {
  return (
    <>
      <Heading>Update coupon</Heading>
      <UpdateCouponPage code={searchParams.code} />;
    </>
  );
}

export default UpdateCouponPageRoot;
