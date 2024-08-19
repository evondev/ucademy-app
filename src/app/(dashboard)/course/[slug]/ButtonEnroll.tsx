"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.model";
import { createOrder } from "@/lib/actions/order.actions";
import { createOrderCode } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ButtonEnroll = ({
  user,
  courseId,
  amount,
  coupon,
}: {
  user: IUser | null | undefined;
  courseId: string;
  amount: number;
  coupon: string;
}) => {
  const router = useRouter();
  const handleEnrollCourse = async () => {
    if (!user?.name) {
      toast.error("Vui lòng đăng nhập để mua khóa học");
      return;
    }
    const newOrder = await createOrder({
      code: createOrderCode(),
      user: user._id,
      course: courseId,
      total: amount,
      amount: amount,
      coupon,
    });
    if (newOrder.code) {
      router.push(`/order/${newOrder.code}`);
    }
  };
  return (
    <Button variant="primary" className="w-full" onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
