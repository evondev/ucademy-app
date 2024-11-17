import { CourseManagePage } from '@/modules/course/pages';
import { QuerySearchParams } from '@/shared/types';

export interface CourseManagePageRootProps {}
const CourseManagePageRoot = ({ searchParams }: QuerySearchParams) => {
  return <CourseManagePage searchParams={searchParams} />;
};

export default CourseManagePageRoot;
