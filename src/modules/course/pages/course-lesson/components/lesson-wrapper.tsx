'use client';
import React from 'react';

import { useUserContext } from '@/shared/contexts';
import { useGlobalStore } from '@/shared/store';

interface LessonWrapperProps {
  children: React.ReactNode;
  courseId: string;
}
const LessonWrapper = ({ children, courseId }: LessonWrapperProps) => {
  const { shouldExpandedPlayer } = useGlobalStore();
  const { userInfo } = useUserContext();
  const userCourses = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo?.courses))
    : [];

  if (!userCourses.includes(courseId) || !userInfo?._id) return null;

  return (
    <div
      className="block min-h-screen items-start gap-10 xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]"
      style={{
        display: shouldExpandedPlayer ? 'block' : 'grid',
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
