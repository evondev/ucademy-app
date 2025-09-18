'use client';

import { CourseItem } from '@/modules/course/components/course-item';
import { useQueryFetchCourses } from '@/modules/course/libs/react-query';
import { CourseGrid } from '@/shared/components/common';

export interface CourseListAllProps {}

export function CourseListAll(_props: CourseListAllProps) {
  const { data, isLoading } = useQueryFetchCourses();

  const courseList = data || [];

  return (
    <>
      <CourseGrid isLoading={isLoading}>
        {courseList.length > 0 &&
          courseList?.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
            />
          ))}
      </CourseGrid>
    </>
  );
}
