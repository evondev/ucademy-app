import { CourseItemData } from '@/shared/types';

import { RatingStatus } from '../constants';
import { RatingModelProps } from './models';
import { UserItemData } from './user.type';

export interface RatingItemData
  extends Omit<RatingModelProps, 'course' | 'user'> {
  course: CourseItemData;
  user: UserItemData;
}
export type CreateRatingParams = {
  rate: number;
  content: string;
  user: string;
  course: string;
};
export type RatingItem = {
  _id: string;
  content: string;
  rate: number;
  created_at: string;
  course: {
    title: string;
    slug: string;
  };
  user: {
    name: string;
  };
  status: RatingStatus;
};
