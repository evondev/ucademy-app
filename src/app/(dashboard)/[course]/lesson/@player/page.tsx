import { getCourseBySlug } from '@/lib/actions/course.actions';
import { findAllLessons } from '@/lib/actions/lesson.actions';
import { getUserInfo } from '@/lib/actions/user.actions';
import { Heading } from '@/shared/components';
import { auth } from '@clerk/nextjs/server';
import LessonSaveUrl from '../LessonSaveUrl';
import VideoPlayer from './VideoPlayer';

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
  const findUser = await getUserInfo({ userId: userId! });
  const course = params.course;
  const slug = searchParams.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lessonList = await findAllLessons({ course: courseId || '' });
  const lessonDetails = lessonList?.find((el) => el.slug === slug);
  if (!lessonDetails) return null;
  const currentLessonIndex =
    lessonList?.findIndex((el) => el.slug === slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split('v=').at(-1);
  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      ></LessonSaveUrl>
      {/* <iframe
          className="w-full h-full object-fill"
          src={`https://www.youtube.com/embed/${videoId}`}
        ></iframe> */}
      <VideoPlayer
        data={{
          userId: findUser?._id.toString() || '',
          courseId,
        }}
        nextLesson={
          !nextLesson ? '' : `/${course}/lesson?slug=${nextLesson?.slug}`
        }
        prevLesson={
          !prevLesson ? '' : `/${course}/lesson?slug=${prevLesson?.slug}`
        }
      />

      <Heading className="mb-10">{lessonDetails.title}</Heading>
      <div className="bgDarkMode borderDarkMode entry-content rounded-lg border p-5">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}
        ></div>
      </div>
    </div>
  );
};

export default page;
