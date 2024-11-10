import { CourseManageContainer } from '@/modules/course/pages';
import { CourseStatus } from '@/types/enums';

export interface CourseManagePageRootProps {
  searchParams: {
    page: number;
    search: string;
    status: CourseStatus;
  };
}
const CourseManagePageRoot = ({ searchParams }: CourseManagePageRootProps) => {
  return <CourseManageContainer searchParams={searchParams} />;
};

export default CourseManagePageRoot;
