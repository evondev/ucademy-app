import { Heading } from '@/shared/components/common';

import { CourseListAll } from './course-list-all';

function CourseDashboardContainer() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-lg bg-primary p-5 text-white">
        <h2 className="text-2xl font-bold">
          Welcome back <strong>Evondev</strong>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
          incidunt cumque amet ipsum.
        </p>
        <div className="mt-3 flex gap-3">
          <div className="rounded-lg bg-white p-2 text-sm font-bold text-primary">
            Resume your last course
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">Continue learning</Heading>
        <div />
      </div>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">For you</Heading>
        <CourseListAll />
        <div />
      </div>
      {/* <CourseGrid>
      {courseList.length > 0 &&
        courseList?.map((item) => (
          <CourseItem
            key={item.slug}
            data={item}
          />
        ))}
    </CourseGrid> */}
    </div>
  );
}

export default CourseDashboardContainer;
