import { CourseItemData } from '@/modules/course/types';

import { CouponModelProps } from './models';

export interface CouponItemData extends Omit<CouponModelProps, 'courses'> {
  courses: CourseItemData[];
}
