'use client';

import { useEffect, useState } from 'react';

import { IconClock } from '@/shared/components/icons';
import { formatMinutesToHour } from '@/shared/helpers';

import { getCourseLessonsInfo } from '../../actions';

export interface CourseItemDurationProps {
  slug: string;
}

function CourseItemDuration({ slug }: CourseItemDurationProps) {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function getDuration() {
      const response = await getCourseLessonsInfo({ slug });

      setDuration(response?.duration || 0);
    }
    getDuration();
  }, [slug]);

  return (
    <div className="flex items-center gap-2">
      <IconClock className="size-4" />
      <span>{formatMinutesToHour(duration)}</span>
    </div>
  );
}

export default CourseItemDuration;
