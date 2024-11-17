import { OrderManagePage } from '@/modules/order/pages';
import { QuerySearchParams } from '@/shared/types';

export interface OrderPageRootProps {}

function OrderPageRoot({ searchParams }: QuerySearchParams) {
  return <OrderManagePage searchParams={searchParams} />;
}

export default OrderPageRoot;
