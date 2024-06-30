import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.actions";
import LessonNavigation from "./LessonNavigation";

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
  const lessonDetails = await getLessonBySlug({
    slug,
    course: courseId || "",
  });
  const lessonList = await findAllLessons({ course: courseId || "" });
  if (!lessonDetails) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  const lectures = findCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  return (
    <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <LessonNavigation
            nextLesson={
              !nextLesson ? "" : `/${course}/lesson?slug=${nextLesson?.slug}`
            }
            prevLesson={
              !prevLesson ? "" : `/${course}/lesson?slug=${prevLesson?.slug}`
            }
          ></LessonNavigation>
          <div></div>
        </div>
        <Heading className="mb-10">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          ></div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
          <div className="h-full rounded-full bg-primary"></div>
        </div>
        <LessonContent
          lectures={lectures}
          course={course}
          slug={slug}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        ></LessonContent>
      </div>
    </div>
  );
};

export default page;
