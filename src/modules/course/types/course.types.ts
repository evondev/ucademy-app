import { CourseModelProps } from '@/shared/types';
import { LessonModelProps } from '@/shared/types/models/lesson.model';

export interface CourseItemData extends Omit<CourseModelProps, 'lectures'> {
  lectures: {
    _id: string;
    title: string;
    lessons: LessonModelProps[];
  }[];
}
export interface LassLessonData {
  course: string;
  lesson: string;
}
