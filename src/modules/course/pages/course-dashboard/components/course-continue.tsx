'use client';

import { CourseItem } from '@/modules/course/components/course-item';
import { useQueryFetchUserCoursesContinue } from '@/modules/course/libs/react-query';
import { CourseGrid } from '@/shared/components/common';
import { useUserContext } from '@/shared/contexts';

export interface CourseContinueProps {}

export function CourseContinue(_props: CourseContinueProps) {
  const { userInfo } = useUserContext();

  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || '',
  });

  const courseList = data || [];

  return (
    <>
      <CourseGrid isLoading={isLoading}>
        {courseList.length > 0 &&
          courseList?.map((item) => (
            <CourseItem
              key={item.slug}
              cta="Tiếp tục học"
              data={item}
            />
          ))}
      </CourseGrid>
    </>
  );
}
