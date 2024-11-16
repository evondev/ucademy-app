import { CourseModelProps, RatingModelProps } from '@/shared/types';
import { LectureItemData } from '@/shared/types/lecture.type';

export interface CourseItemData
  extends Omit<CourseModelProps, 'lectures' | 'rating'> {
  lectures: LectureItemData[];
  rating: RatingModelProps[];
}
export interface LassLessonData {
  course: string;
  lesson: string;
}
