import { CourseLessonPage } from '@/modules/course/pages';
import { CourseLessonPageRootProps } from '@/shared/types';

function CourseLessonPageRoot({
  params,
  searchParams,
}: CourseLessonPageRootProps) {
  return (
    <CourseLessonPage
      params={params}
      searchParams={searchParams}
    />
  );
}

export default CourseLessonPageRoot;
