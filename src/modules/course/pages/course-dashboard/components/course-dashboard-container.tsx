'use client';
import { Heading } from '@/shared/components/common';
import { useUserContext } from '@/shared/contexts';

import { CourseContinue } from './course-continue';
import { CourseSuggestion } from './course-suggestion';

function CourseDashboardContainer() {
  const { userInfo } = useUserContext();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Welcome back {userInfo?.name} 👋</h2>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">Tiếp tục học</Heading>
        <CourseContinue />
      </div>
      <div className="flex flex-col gap-5">
        <Heading className="lg:text-2xl">Đề xuất</Heading>
        <CourseSuggestion />
      </div>
    </div>
  );
}

export default CourseDashboardContainer;
