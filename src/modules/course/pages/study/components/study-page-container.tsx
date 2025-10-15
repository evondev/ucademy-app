'use client';

import { CourseItemContinue } from '@/modules/course/components/course-item/course-item-continue';
import { CourseGrid } from '@/shared/components/common';
import { handleGetStorageLesson } from '@/shared/helpers';
import { CourseItemData } from '@/shared/types';

export interface StudyPageContainerProps {
  courses: CourseItemData[];
}

function StudyPageContainer({ courses }: StudyPageContainerProps) {
  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const firstLessonUrl = item.lectures[0].lessons[0]._id;
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
  );
}

export default StudyPageContainer;
