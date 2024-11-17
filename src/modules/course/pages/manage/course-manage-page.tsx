import { QuerySearchParams } from '@/shared/types';

import { fetchCourses } from '../../actions';
import CourseManageContainer from './components';

export interface CourseManagePageProps {}

async function CourseManagePage({ searchParams }: QuerySearchParams) {
  const courses =
    (await fetchCourses({
      page: searchParams.page || 1,
      limit: 10,
      search: searchParams.search,
      status: searchParams.status,
    })) || [];

  return <CourseManageContainer courses={courses} />;
}

export default CourseManagePage;
