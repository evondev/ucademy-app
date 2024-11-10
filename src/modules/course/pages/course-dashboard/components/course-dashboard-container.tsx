import CourseItem from '@/modules/course/components/course-item';
import { CourseModelProps } from '@/modules/course/models';
import { CourseGrid } from '@/shared/components';

export interface CourseDashboardContainerProps {
  courseList: CourseModelProps[];
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
