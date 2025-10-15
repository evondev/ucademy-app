'use client';

import { CourseItemContinue } from '@/modules/course/components/course-item/course-item-continue';
import { useQueryFetchUserCoursesContinue } from '@/modules/course/libs/react-query';
import { CourseGrid, Heading } from '@/shared/components/common';
import { useUserContext } from '@/shared/contexts';
import { handleGetStorageLesson } from '@/shared/helpers';

export interface CourseContinueProps {}

export function CourseContinue(_props: CourseContinueProps) {
  const { userInfo } = useUserContext();

  const { data, isLoading } = useQueryFetchUserCoursesContinue({
    clerkId: userInfo?.clerkId || '',
  });

  const courseList = data || [];

  if (!isLoading && courseList.length === 0)
    return <div>Bạn chưa có khóa học nào.</div>;

  return (
    <div className="flex flex-col gap-5">
      <Heading className="lg:text-xl">Tiếp tục học</Heading>
      <CourseGrid isLoading={isLoading}>
        {courseList.length > 0 &&
          courseList?.map((item) => {
            const firstLessonUrl = item.lectures?.[0]?.lessons?.[0]?._id;

            const url = handleGetStorageLesson({
              courseSlug: item.slug,
              lessonId: firstLessonUrl,
            });

            return (
              <CourseItemContinue
                key={item.slug}
                cta="Tiếp tục học"
                data={item}
                url={url}
              />
            );
          })}
      </CourseGrid>
    </div>
  );
}
