'use client';
import { useEffect, useState } from 'react';

import CourseItem from '@/modules/course/components/course-item';
import { LassLessonData } from '@/modules/course/types';
import { CourseGrid } from '@/shared/components/common';
import { lastLessonKey } from '@/shared/constants';
import { CourseItemData } from '@/shared/types';

export interface StudyPageContainerProps {
  courses: CourseItemData[];
}

function StudyPageContainer({ courses }: StudyPageContainerProps) {
  const [lastLesson, setLastLesson] = useState<LassLessonData[]>([]);

  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    const lesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
      : [];

    setLastLesson(lesson);
  }, []);
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const firstLessonUrl = item.lectures[0].lessons[0].slug;
        const lastURL =
          lastLesson.find((element) => element.course === item.slug)?.lesson ||
          `/${item.slug}/lesson?slug=${firstLessonUrl}`;

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
  );
}

export default StudyPageContainer;
