'use client';

import { useEffect, useState } from 'react';

import { CourseItem } from '@/modules/course/components/course-item';
import { useQueryFetchUserCoursesContinue } from '@/modules/course/libs/react-query';
import { LassLessonData } from '@/modules/course/types';
import { CourseGrid } from '@/shared/components/common';
import { lastLessonKey } from '@/shared/constants';
import { useUserContext } from '@/shared/contexts';

export interface CourseContinueProps {}

export function CourseContinue(_props: CourseContinueProps) {
  const { userInfo } = useUserContext();

  const [lastLesson, setLastLesson] = useState<LassLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
      : [];

    setLastLesson(lesson);
  }, []);

  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || '',
  });

  const courseList = data || [];

  return (
    <>
      <CourseGrid isLoading={isLoading}>
        {courseList.length > 0 &&
          courseList?.map((item) => {
            const firstLessonUrl = item.lectures?.[0]?.lessons?.[0]?._id;

            const lastURL =
              lastLesson.find((element) => element.course === item.slug)
                ?.lesson || `/${item.slug}/lesson?id=${firstLessonUrl}`;

            return (
              <CourseItem
                key={item.slug}
                cta="Tiếp tục học"
                data={item}
                url={lastURL}
              />
            );
          })}
      </CourseGrid>
    </>
  );
}
