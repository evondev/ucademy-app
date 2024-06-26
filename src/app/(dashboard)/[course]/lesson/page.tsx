import PageNotFound from "@/app/not-found";
import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import LessonNavigation from "./LessonNavigation";
import LessonSaveUrl from "./LessonSaveUrl";

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
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUserInfo({ userId });
  if (!findUser) return <PageNotFound />;
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  if (!findUser.courses.includes(courseId as any)) return <PageNotFound />;
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
  const completePercentage =
    ((histories?.length || 0) / (lessonList?.length || 1)) * 100;
  return (
    <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      ></LessonSaveUrl>
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
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary w-0 transition-all duration-300"
            style={{
              width: `${completePercentage}%`,
            }}
          ></div>
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
