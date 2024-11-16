import { CourseLessonPage } from '@/modules/course/pages';
import { CourseLessonPageRootProps } from '@/shared/types';

async function CourseLessonPageRoot({
  params,
  searchParams,
}: CourseLessonPageRootProps) {
  // userId = auth();
  // getall user courses slug []
  // check user course include params.course
  return (
    <CourseLessonPage
      params={params}
      searchParams={searchParams}
    />
  );
}

export default CourseLessonPageRoot;
