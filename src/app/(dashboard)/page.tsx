import CourseItem from '@/components/course/CourseItem';
import { getAllCoursesPublic } from '@/lib/actions/course.actions';
import { CourseGrid, Heading } from '@/shared/components';

const page = async () => {
  const courses = (await getAllCoursesPublic({})) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses.length > 0 &&
          courses?.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            ></CourseItem>
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;
