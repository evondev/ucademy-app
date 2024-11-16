import { LessonModelProps } from './models';

export interface LessonItemData
  extends Omit<LessonModelProps, 'course' | 'lecture'> {
  course: string;
}
