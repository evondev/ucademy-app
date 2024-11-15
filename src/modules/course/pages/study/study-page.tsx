import { auth } from '@clerk/nextjs/server';

import { fetchCoursesOfUser } from '../../actions';
import StudyPageContainer from './components';

export interface StudyPageProps {}

async function StudyPage(_props: StudyPageProps) {
  const { userId } = auth();
  const courses = (await fetchCoursesOfUser(userId || '')) || [];

  return <StudyPageContainer courses={courses} />;
}

export default StudyPage;
