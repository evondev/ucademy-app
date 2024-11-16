import { QuerySortFilter } from './common';

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
