import { ITEMS_PER_PAGE } from "@/constants";
import { fetchOrders } from "@/lib/actions/order.actions";
import { OrderStatus } from "@/types/enums";
import OrderManage from "./OrderManage";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: OrderStatus;
  };
}) => {
  const data = await fetchOrders({
    page: searchParams.page || 1,
    limit: ITEMS_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  if (!data) return null;
  const { orders, total } = data;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <OrderManage
      orders={orders}
      totalPages={totalPages}
      total={total}
    ></OrderManage>
  );
};

export default page;
