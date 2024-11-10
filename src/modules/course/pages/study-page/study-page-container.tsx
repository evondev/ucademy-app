import { auth } from '@clerk/nextjs/server';

import { getUserCourses } from '@/lib/actions/user.actions';

import StudyCourses from './components/study-courses';

export interface StudyPageContainerProps {}

async function StudyPageContainer(_props: StudyPageContainerProps) {
  const { userId } = auth();
  const courses = (await getUserCourses(userId || '')) || [];

  return (
    <>
      <StudyCourses courses={courses} />
    </>
  );
}

export default StudyPageContainer;
