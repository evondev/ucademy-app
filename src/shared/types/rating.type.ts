import { CourseItemData } from '@/modules/course/types';

import { RatingModelProps } from './models';
import { UserItemData } from './user.type';

export interface RatingItemData
  extends Omit<RatingModelProps, 'course' | 'user'> {
  course: CourseItemData;
  user: UserItemData;
}
