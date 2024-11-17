import { QuerySortFilter } from './common';
import { LectureItemData } from './lecture.type';
import { CourseModelProps, LessonModelProps } from './models';
import { RatingItemData } from './rating.type';

export interface CourseItemData
  extends Omit<CourseModelProps, 'lectures' | 'rating'> {
  lectures: LectureItemData[];
  rating: RatingItemData[];
}

export interface CourseLessonData {
  duration: number;
  lessons: number;
}
export interface CourseQAData {
  question: string;
  answer: string;
}
export interface CourseLessonPageRootProps {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
    sort: QuerySortFilter;
  };
}
export type GetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
export type CreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export type UpdateCourseParams = {
  slug: string;
  updateData: Partial<CourseModelProps>;
  path?: string;
};
export type UpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: LessonModelProps[];
};
