import CreateCoursePage from '@/modules/course/pages/create';
import { Heading } from '@/shared/components';

export interface CreateCoursePageRootProps {}

function CreateCoursePageRoot(_props: CreateCoursePageRootProps) {
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CreateCoursePage />
    </>
  );
}

export default CreateCoursePageRoot;
