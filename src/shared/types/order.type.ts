import { CourseItemData } from '@/modules/course/types';

import { CouponItemData } from './coupon.type';
import { OrderModelProps } from './models';
import { UserItemData } from './user.type';

export interface OrderItemData
  extends Omit<OrderModelProps, 'course' | 'user' | 'coupon'> {
  course: CourseItemData;
  user: UserItemData;
  coupon: CouponItemData;
}
