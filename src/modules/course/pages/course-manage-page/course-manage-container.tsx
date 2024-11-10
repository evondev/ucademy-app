import { CourseManagePageRootProps } from '@/app/(dashboard)/manage/course/page';
import { getAllCourses } from '@/lib/actions/course.actions';

import CourseManage from './components/course-manage';

export interface CourseManageContainerProps extends CourseManagePageRootProps {}

async function CourseManageContainer({
  searchParams,
}: CourseManageContainerProps) {
  const courses =
    (await getAllCourses({
      page: searchParams.page || 1,
      limit: 10,
      search: searchParams.search,
      status: searchParams.status,
    })) || [];

  return <CourseManage courses={courses} />;
}

export default CourseManageContainer;
