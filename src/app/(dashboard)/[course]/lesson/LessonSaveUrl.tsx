'use client';

import { useEffect } from 'react';

import { lastLessonKey } from '@/shared/constants';

const LessonSaveUrl = ({ course, url }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any[] =
      JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((el) => el.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [course, url]);

  return null;
};

export default LessonSaveUrl;
