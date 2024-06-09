import React from "react";

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6 gap-8 mt-6">
      {children}
    </div>
  );
};

export default CourseGrid;
