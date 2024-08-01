import Heading from "@/components/common/Heading";
import UpdateCouponForm from "./UpdateCouponForm";

const page = () => {
  return (
    <div>
      <Heading className="mb-10">Cập nhật mã giảm giá</Heading>
      <UpdateCouponForm></UpdateCouponForm>
    </div>
  );
};

export default page;
