import React from 'react';

import { CourseItemSkeleton } from '@/modules/course/components/course-item';

interface CourseGridProps {
  children: React.ReactNode;
  isLoading?: boolean;
}
const CourseGrid = ({ children, isLoading }: CourseGridProps) => {
  if (isLoading)
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 3 })
          .fill(0)
          .map((_, index) => (
            <CourseItemSkeleton key={index} />
          ))}
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      {children}
    </div>
  );
};

export default CourseGrid;
