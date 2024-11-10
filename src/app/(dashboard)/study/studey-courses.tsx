'use client';
import { useEffect, useState } from 'react';

import CourseItem from '@/components/course/course-item';
import { CourseGrid } from '@/shared/components';
import { lastLessonKey } from '@/shared/constants';
import { StudyCoursesProps } from '@/types';

const StudyCourses = ({
  courses,
}: {
  courses: StudyCoursesProps[] | null | undefined;
}) => {
  const [lastLesson, setLastLesson] = useState<any[]>([]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage
        ? JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || []
        : [];

      setLastLesson(data);
    }
  }, []);
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {!!courses &&
        courses.length > 0 &&
        courses?.map((item) => {
          const url =
            lastLesson.find((element: any) => element.course === item.slug)
              ?.lesson || '';
          const firstLessonUrl = item.lectures[0].lessons[0].slug;

          return (
            <CourseItem
              key={item.slug}
              cta="Tiếp tục học"
              data={item}
              url={url || `/${item.slug}/lesson?slug=${firstLessonUrl}`}
            />
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourses;
