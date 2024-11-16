import { fetchCourseBySlug } from '@/modules/course/actions';
import { getHistory } from '@/modules/history/actions/history.actions';
import { countLessonByCourseId } from '@/modules/lesson/actions/lesson.actions';
import LessonContent from '@/shared/components/course/course-outline';

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ courseId });
  const completePercentage =
    ((histories?.length || 0) / (lessonCount || 1)) * 100;

  return (
    <div className="sticky right-0 top-5 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="borderDarkMode bgDarkMode mb-2 h-3 w-full rounded-full border">
        <div
          className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{
            width: `${completePercentage}%`,
          }}
        />
      </div>
      <LessonContent
        course={course}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        lectures={lectures}
        slug={slug}
      />
    </div>
  );
};

export default page;
