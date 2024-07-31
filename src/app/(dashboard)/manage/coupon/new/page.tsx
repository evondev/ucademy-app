import Heading from "@/components/common/Heading";
import NewCouponForm from "./NewCouponForm";

const page = () => {
  return (
    <div>
      <Heading className="mb-10">Tạo mới mã giảm giá</Heading>
      <NewCouponForm></NewCouponForm>
    </div>
  );
};

export default page;
