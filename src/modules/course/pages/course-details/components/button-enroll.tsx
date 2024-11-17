'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { createOrder } from '@/modules/order/actions/order.actions';
import { Button } from '@/shared/components/ui';
import { useUserContext } from '@/shared/contexts';

interface ButtonEnrollProps {
  courseId: string;
  amount: number;
  coupon: string;
}
const ButtonEnroll = ({ amount, coupon, courseId }: ButtonEnrollProps) => {
  const { userInfo } = useUserContext();

  const router = useRouter();

  const createOrderCode = () => `DH-${Date.now().toString().slice(-6)}`;

  const handleEnrollCourse = async () => {
    if (!userInfo?.name) {
      toast.error('Vui lòng đăng nhập để mua khóa học');

      return;
    }

    const newOrder = await createOrder({
      code: createOrderCode(),
      user: userInfo._id,
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
