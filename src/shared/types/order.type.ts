import { CouponItemData, CourseItemData } from '@/shared/types';

import { OrderStatus } from '../constants';
import { OrderModelProps } from './models';
import { UserItemData } from './user.type';

export interface OrderItemData
  extends Omit<OrderModelProps, 'course' | 'user' | 'coupon'> {
  course: CourseItemData;
  user: UserItemData;
  coupon: CouponItemData;
}
export interface CreateOrderParams {
  code: string;
  course: string;
  user: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string;
}
export interface UpdateOrderParams {
  orderId: string;
  status: OrderStatus;
}
