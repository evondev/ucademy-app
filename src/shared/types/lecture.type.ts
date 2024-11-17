import { LessonItemData } from './lesson.type';
import { LectureModelProps } from './models';

export interface LectureItemData extends Omit<LectureModelProps, 'lessons'> {
  lessons: LessonItemData[];
}
export interface CreateLectureParams {
  course: string;
  title?: string;
  order?: number;
  path?: string;
}
export interface UpdateLectureParams {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
}
