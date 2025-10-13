import { findAllLessons } from '@/modules/lesson/actions';
import { Heading } from '@/shared/components/common';

import LessonSaveUrl from './lesson-save-url';
import VideoPlayer from './video-player';

export interface CourseLessonPlayerProps {
  courseId: string;
  lessonId: string;
  courseSlug: string;
}

async function CourseLessonPlayer({
  courseId,
  courseSlug,
  lessonId,
}: CourseLessonPlayerProps) {
  const lessonList = await findAllLessons({ course: courseId || '' });

  const lessonDetails = lessonList?.find(
    (element) => element._id.toString() === lessonId,
  );

  if (!lessonDetails) return null;

  const currentLessonIndex =
    lessonList?.findIndex((element) => element._id === lessonId) || 0;
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const previousLesson = lessonList?.[currentLessonIndex - 1];
  const nextLessonUrl = nextLesson
    ? `/${courseSlug}/lesson?id=${nextLesson._id}`
    : '';
  const previousLessonUrl = previousLesson
    ? `/${courseSlug}/lesson?id=${previousLesson._id}`
    : '';

  return (
    <div className="mb-5">
      <LessonSaveUrl
        course={courseSlug}
        url={`/${courseSlug}/lesson?id=${lessonId}`}
      />

      <VideoPlayer
        courseId={courseId}
        nextLesson={nextLessonUrl}
        playbackId={lessonDetails.video_url}
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
