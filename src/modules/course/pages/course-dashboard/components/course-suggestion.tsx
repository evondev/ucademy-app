'use client';

import { CourseItem } from '@/modules/course/components/course-item';
import { useQueryFetchCourses } from '@/modules/course/libs/react-query';
import { CourseGrid } from '@/shared/components/common';
import { CourseStatus } from '@/shared/constants';

export interface CourseSuggestionProps {}

export function CourseSuggestion(_props: CourseSuggestionProps) {
  const { data, isLoading } = useQueryFetchCourses({
    limit: 3,
    status: CourseStatus.APPROVED,
  });

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
