import { findAllLessons } from '@/modules/lesson/actions';
import { Heading } from '@/shared/components/common';

import LessonSaveUrl from './lesson-save-url';
import VideoPlayer from './video-player';

export interface CourseLessonPlayerProps {
  courseId: string;
  lessonSlug: string;
  courseSlug: string;
}

async function CourseLessonPlayer({
  courseId,
  courseSlug,
  lessonSlug,
}: CourseLessonPlayerProps) {
  const lessonList = await findAllLessons({ course: courseId || '' });
  const lessonDetails = lessonList?.find(
    (element) => element.slug === lessonSlug,
  );

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((element) => element.slug === lessonSlug) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const previousLesson = lessonList?.[currentLessonIndex - 1];
  const nextLessonUrl = nextLesson
    ? `/${courseSlug}/lesson?slug=${nextLesson.slug}`
    : '';
  const previousLessonUrl = previousLesson
    ? `/${courseSlug}/lesson?slug=${previousLesson.slug}`
    : '';

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?slug=${lessonSlug}`}
      />

      <VideoPlayer
        courseId={courseId}
        nextLesson={nextLessonUrl}
        prevLesson={previousLessonUrl}
      />

      <Heading className="mb-10">{lessonDetails.title}</Heading>
      <div className="bgDarkMode borderDarkMode entry-content rounded-lg border p-5">
        <div
          dangerouslySetInnerHTML={{ __html: lessonDetails.content || '' }}
        />
      </div>
    </div>
  );
}

export default CourseLessonPlayer;
