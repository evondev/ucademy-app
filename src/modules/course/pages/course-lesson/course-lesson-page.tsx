import { CourseLessonPageRootProps } from '@/shared/types';

import { CourseLessonContainer } from './components';

export interface CourseLessonPageProps extends CourseLessonPageRootProps {}

async function CourseLessonPage({
  params,
  searchParams,
}: CourseLessonPageProps) {
  return (
    <CourseLessonContainer
      params={params}
      searchParams={searchParams}
    />
  );
}

export default CourseLessonPage;
