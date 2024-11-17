import { ITEMS_PER_PAGE } from '@/shared/constants';
import { QuerySearchParams } from '@/shared/types';

import { fetchOrders } from '../../actions';
import OrderManageContainer from './components';

export interface OrderManagePageProps {}

async function OrderManagePage({ searchParams }: QuerySearchParams) {
  const data = await fetchOrders({
    page: searchParams?.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams?.search,
    status: searchParams?.status,
  });

  return (
    <OrderManageContainer
      orders={data?.orders}
      total={data?.total}
    />
  );
}

export default OrderManagePage;
