import { Heading } from '@/shared/components/common';

import { CourseListAll } from './course-list-all';

function CourseDashboardContainer() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Welcome back Evondev 👋</h2>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">Tiếp tục học</Heading>
        <div />
      </div>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">Đề xuất</Heading>
        <CourseListAll />
        <div />
      </div>
    </div>
  );
}

export default CourseDashboardContainer;
