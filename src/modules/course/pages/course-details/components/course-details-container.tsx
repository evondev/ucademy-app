import PageNotFound from '@/app/not-found';
import { CourseItemData } from '@/modules/course/types';
import { CourseStatus } from '@/shared/constants';

export interface CourseDetailsContainerProps {
  userId: string | null;
  courseDetails: CourseItemData | undefined;
}

function CourseDetailsContainer({
  courseDetails,
  userId,
}: CourseDetailsContainerProps) {
  const isEmptyData =
    !courseDetails || courseDetails.status !== CourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;

  return <div>CourseDetailsContainer</div>;
}

export default CourseDetailsContainer;
