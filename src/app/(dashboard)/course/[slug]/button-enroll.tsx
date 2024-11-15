'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { createOrder } from '@/modules/order/actions/order.actions';
import { Button } from '@/shared/components/ui/button';
import { UserModelProps } from '@/shared/types';
import { createOrderCode } from '@/utils';

interface ButtonEnrollProps {
  user: UserModelProps | null | undefined;
  courseId: string;
  amount: number;
  coupon: string;
}
const ButtonEnroll = ({
  amount,
  coupon,
  courseId,
  user,
}: ButtonEnrollProps) => {
  const router = useRouter();
  const handleEnrollCourse = async () => {
    if (!user?.name) {
      toast.error('Vui lòng đăng nhập để mua khóa học');

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
    <Button
      className="w-full"
      variant="primary"
      onClick={handleEnrollCourse}
    >
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
