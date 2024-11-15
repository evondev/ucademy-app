import { CourseDetailsPage } from '@/modules/course/pages';

export interface CourseDetailsPageRootProps {
  params: {
    slug: string;
  };
}

function CourseDetailsPageRoot({ params }: CourseDetailsPageRootProps) {
  return <CourseDetailsPage slug={params.slug} />;
}

export default CourseDetailsPageRoot;
