import { fetchCourseBySlug } from '../../actions';
import OutlineCourseContainer from './components';

export interface OutlineCoursePageProps {
  slug: string;
}

async function OutlineCoursePage({ slug }: OutlineCoursePageProps) {
  const foundCourse = await fetchCourseBySlug({
    slug,
  });

  if (!foundCourse) return null;

  return <OutlineCourseContainer course={foundCourse} />;
}

export default OutlineCoursePage;
