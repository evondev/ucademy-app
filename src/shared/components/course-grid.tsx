import React from 'react';

interface CourseGridProps {
  children: React.ReactNode;
}
const CourseGrid = ({ children }: CourseGridProps) => {
  return (
    <div className="course-slider mt-6 grid gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6">
      {children}
    </div>
  );
};

export default CourseGrid;
