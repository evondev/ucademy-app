import { CourseModelProps } from '@/shared/types';

export interface CourseItemData extends Omit<CourseModelProps, 'lectures'> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}
export interface LassLessonData {
  course: string;
  lesson: string;
}
