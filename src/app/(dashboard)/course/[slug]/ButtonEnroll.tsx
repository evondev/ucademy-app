'use client';
import { User } from '@/database/user.model';
import { createOrder } from '@/lib/actions/order.actions';
import { Button } from '@/shared/components/ui/button';
import { createOrderCode } from '@/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ButtonEnroll = ({
  user,
  courseId,
  amount,
  coupon,
}: {
  user: User | null | undefined;
  courseId: string;
  amount: number;
  coupon: string;
}) => {
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
