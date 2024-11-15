import { auth } from '@clerk/nextjs/server';

import { fetchCourseBySlug } from '@/modules/course/actions';
import { findAllLessons } from '@/modules/lesson/actions/lesson.actions';
import { getUserInfo } from '@/modules/user/actions';
import { Heading } from '@/shared/components';

import LessonSaveUrl from '../lesson-save-url';
import VideoPlayer from './video-player';

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
  const findCourse = await fetchCourseBySlug({ slug: course });

  if (!findCourse) return null;
  const courseId = findCourse?._id.toString();
  const lessonList = await findAllLessons({ course: courseId || '' });
  const lessonDetails = lessonList?.find((element) => element.slug === slug);

  if (!lessonDetails) return null;
  const currentLessonIndex =
    lessonList?.findIndex((element) => element.slug === slug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const previousLesson = lessonList?.[currentLessonIndex - 1];

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={course}
        url={`/${course}/lesson?slug=${slug}`}
      />
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
          nextLesson ? `/${course}/lesson?slug=${nextLesson?.slug}` : ''
        }
        prevLesson={
          previousLesson ? `/${course}/lesson?slug=${previousLesson?.slug}` : ''
        }
      />

      <Heading className="mb-10">{lessonDetails.title}</Heading>
      <div className="bgDarkMode borderDarkMode entry-content rounded-lg border p-5">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}
        />
      </div>
    </div>
  );
};

export default page;
