import LessonContent from "@/components/lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { countLessonByCourseId } from "@/lib/actions/lesson.actions";

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
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ courseId });
  const completePercentage =
    ((histories?.length || 0) / (lessonCount || 1)) * 100;

  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary w-0 transition-all duration-300"
          style={{
            width: `${completePercentage}%`,
          }}
        ></div>
      </div>
      <LessonContent
        course={course}
        histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        lectures={lectures}
        slug={slug}
      ></LessonContent>
    </div>
  );
};

export default page;
