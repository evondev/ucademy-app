'use client';

import { CourseContinue } from './course-continue';
import { CourseSuggestion } from './course-suggestion';

function CourseDashboardContainer() {
  return (
    <div className="flex flex-col gap-8">
      <CourseContinue />
      <CourseSuggestion />
    </div>
  );
}

export default CourseDashboardContainer;
