import CourseUpdate from '@/components/course/course-update';
import { fetchCourseBySlug } from '@/modules/course/actions';
import { Heading } from '@/shared/components';

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const findCourse = await fetchCourseBySlug({
    slug: searchParams.slug,
  });

  if (!findCourse) return null;

  return (
    <>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))} />
    </>
  );
};

export default page;
