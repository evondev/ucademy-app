import { fetchCourses } from '../../actions';
import CourseDashboardContainer from './components';

export interface CourseDashboardPageProps {}

async function CourseDashboardPage(_props: CourseDashboardPageProps) {
  const courseList = (await fetchCourses({})) || [];

  return <CourseDashboardContainer courseList={courseList} />;
}

export default CourseDashboardPage;
