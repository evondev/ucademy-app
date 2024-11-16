'use client';

import { useEffect } from 'react';

import { lastLessonKey } from '@/shared/constants';

interface LessonSaveUrlProps {
  url: string;
  course: string;
}
const LessonSaveUrl = ({ course, url }: LessonSaveUrlProps) => {
  useEffect(() => {
    let results: {
      course: string;
    }[] = JSON.parse(localStorage?.getItem(lastLessonKey) || '[]') || [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((element) => element.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [course, url]);

  return null;
};

export default LessonSaveUrl;
