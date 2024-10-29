'use client';
import useGlobalStore from '@/store';
import React from 'react';

const LessonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { expandedPlayer } = useGlobalStore();
  return (
    <div
      className="block min-h-screen items-start gap-10 xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)]"
      style={{
        display: expandedPlayer ? 'block' : 'grid',
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
