import { CourseManageContainer } from '@/modules/course/pages/course-manage-page';
import { CourseStatus } from '@/shared/constants';

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
