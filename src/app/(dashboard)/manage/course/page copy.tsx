import CourseManage from '@/components/course/course-manage';
import { fetchCourses } from '@/lib/actions/course.actions';
import { CourseStatus } from '@/types/enums';

const CourseManagePageRoot = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: CourseStatus;
  };
}) => {
  const courses = await fetchCourses({
    page: searchParams.page || 1,
    limit: 10,
    search: searchParams.search,
    status: searchParams.status,
  });

  return (
    <CourseManage
      courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
    />
  );
};

export default CourseManagePageRoot;
