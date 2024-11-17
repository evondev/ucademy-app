import { getCouponByCode } from '../../actions';
import UpdateCouponContainer from './components';

export interface UpdateCouponPageProps {
  code: string;
}

async function UpdateCouponPage({ code }: UpdateCouponPageProps) {
  const couponDetails = await getCouponByCode({ code });

  if (!couponDetails) return null;

  return <UpdateCouponContainer couponDetails={couponDetails} />;
}

export default UpdateCouponPage;
