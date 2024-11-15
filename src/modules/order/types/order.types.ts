import { OrderStatus } from '@/shared/constants';

export interface OrderManagePageProps {
  totalPages: number;
  total: number;
  orders: {
    _id: string;
    code: string;
    total: number;
    amount: number;
    discount: number;
    status: OrderStatus;
    coupon: {
      code: string;
    };
    course: {
      title: string;
    };
    user: {
      name: string;
    };
  }[];
}

export interface OrderManagePageParams {
  searchParams: {
    page: number;
    search: string;
    status: OrderStatus;
  };
}
