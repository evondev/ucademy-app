import PageNotFound from '@/app/not-found';
import { getOrderDetails } from '@/modules/order/actions/order.actions';

interface OrderDetailsPageRootProps {
  params: {
    code: string;
  };
}
const OrderDetailsPageRoot = async ({ params }: OrderDetailsPageRootProps) => {
  const orderDetails = await getOrderDetails({
    code: params.code,
  });

  if (!orderDetails) return <PageNotFound />;

  return (
    <div className="flex flex-col gap-5">
      <p>
        Cám ơn bạn đã mua khóa học{' '}
        <strong className="text-primary">{orderDetails.course.title}</strong>{' '}
        với số tiền là{' '}
        <strong className="text-primary">{orderDetails.total}</strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung{' '}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetailsPageRoot;
