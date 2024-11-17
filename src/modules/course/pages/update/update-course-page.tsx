import { fetchCourseBySlug } from '../../actions';
import UpdateCourseContainer from './components';

export interface UpdateCoursePageProps {
  slug: string;
}

async function UpdateCoursePage({ slug }: UpdateCoursePageProps) {
  const foundCourse = await fetchCourseBySlug({
    slug,
  });

  if (!foundCourse) return null;

  return <UpdateCourseContainer course={foundCourse} />;
}

export default UpdateCoursePage;
