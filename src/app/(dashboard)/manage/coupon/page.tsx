import { getCoupons } from "@/lib/actions/coupon.actions";
import CouponManage from "./CouponManage";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    active: boolean;
  };
}) => {
  const coupons = await getCoupons({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    active: searchParams.active,
  });

  return <CouponManage coupons={coupons}></CouponManage>;
};

export default page;
