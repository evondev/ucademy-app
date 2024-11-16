import { LessonItemData } from './lesson.type';
import { LectureModelProps } from './models';

export interface LectureItemData extends Omit<LectureModelProps, 'lessons'> {
  lessons: LessonItemData[];
}
