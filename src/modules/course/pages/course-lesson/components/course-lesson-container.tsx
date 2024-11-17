import { Suspense } from 'react';

import { fetchCourseBySlug } from '@/modules/course/actions';
import { getHistory } from '@/modules/history/actions';
import { countLessonByCourseId } from '@/modules/lesson/actions';
import { Loading } from '@/shared/components/common';
import { CourseOutline } from '@/shared/components/course';
import { CourseLessonPageRootProps } from '@/shared/types';

import CourseLessonComment from './course-lesson-comment';
import CourseLessonOutline from './course-lesson-outline';
import CourseLessonPlayer from './course-lesson-player';
import LoadingPlayer from './course-lesson-player/loading-player';
import LessonWrapper from './lesson-wrapper';

export interface CourseLessonContainerProps extends CourseLessonPageRootProps {}

async function CourseLessonContainer({
  params,
  searchParams,
}: CourseLessonContainerProps) {
  const courseSlug = params.course;
  const lessonSlug = searchParams.slug;
  const foundCourse = await fetchCourseBySlug({ slug: courseSlug });

  if (!foundCourse) return null;

  const courseId = foundCourse?._id.toString();
  const lectures = foundCourse.lectures || [];
  const histories = await getHistory({ course: courseId });
  const lessonCount = await countLessonByCourseId({ courseId });
  const completeNumber = ((histories?.length || 0) / (lessonCount || 1)) * 100;

  return (
    <LessonWrapper courseId={courseId}>
      <div>
        <Suspense fallback={<LoadingPlayer />}>
          <CourseLessonPlayer
            courseId={courseId}
            courseSlug={courseSlug}
            lessonSlug={lessonSlug}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <CourseLessonComment
            courseId={courseId}
            lessonSlug={lessonSlug}
            sort={searchParams.sort}
          />
        </Suspense>
      </div>
      <CourseLessonOutline completeNumber={completeNumber}>
        <CourseOutline
          course={courseSlug}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
          lectures={lectures}
          slug={lessonSlug}
        />
      </CourseLessonOutline>
    </LessonWrapper>
  );
}

export default CourseLessonContainer;
