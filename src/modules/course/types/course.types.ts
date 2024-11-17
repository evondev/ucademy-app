import { z } from 'zod';

import { CourseModelProps, RatingModelProps } from '@/shared/types';
import { LectureItemData } from '@/shared/types/lecture.type';

import { courseCommentFormSchema, courseCreateSchema } from '../schemas';

export interface CourseItemData
  extends Omit<CourseModelProps, 'lectures' | 'rating'> {
  lectures: LectureItemData[];
  rating: RatingModelProps[];
}
export interface LassLessonData {
  course: string;
  lesson: string;
}

export type CourseCommentFormValues = z.infer<typeof courseCommentFormSchema>;
export type CourseCreateFormValues = z.infer<typeof courseCreateSchema>;
