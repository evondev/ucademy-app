import CourseItem from '@/modules/course/components/course-item';
import { CourseGrid } from '@/shared/components/common';
import { CourseItemData } from '@/shared/types';

export interface CourseDashboardContainerProps {
  courseList: CourseItemData[];
}

function CourseDashboardContainer({
  courseList,
}: CourseDashboardContainerProps) {
  if (!courseList || courseList.length === 0) return null;

  return (
    <CourseGrid>
      {courseList.length > 0 &&
        courseList?.map((item) => (
          <CourseItem
            key={item.slug}
            data={item}
          />
        ))}
    </CourseGrid>
  );
}

export default CourseDashboardContainer;
