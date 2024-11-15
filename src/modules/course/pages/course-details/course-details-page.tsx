import { auth } from '@clerk/nextjs/server';

import { fetchCourseBySlug } from '../../actions';
import CourseDetailsContainer from './components';

export interface CourseDetailsPageProps {
  slug: string;
}

async function CourseDetailsPage({ slug }: CourseDetailsPageProps) {
  const courseDetails = await fetchCourseBySlug({
    slug,
  });
  const { userId } = auth();

  return (
    <CourseDetailsContainer
      courseDetails={courseDetails}
      userId={userId}
    />
  );
}

export default CourseDetailsPage;
