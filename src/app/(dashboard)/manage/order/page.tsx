import { fetchOrders } from "@/lib/actions/order.actions";
import { EOrderStatus } from "@/types/enums";
import OrderManage from "./OrderManage";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const orders = await fetchOrders({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });

  return <OrderManage orders={orders}></OrderManage>;
};

export default page;
