'use client';
import Link from 'next/link';

import { createHistory } from '@/lib/actions/history.actions';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/shared/components/ui/checkbox';

import { IconPlay } from '../../shared/components/icons';

const LessonItem = ({
  isActive = false,
  isChecked = false,
  lesson,
  url,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url || '/',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        'bgDarkMode borderDarkMode flex items-center gap-2 rounded-lg border p-4 text-sm font-medium',
        isActive ? 'font-bold' : '',
      )}
    >
      {!!url && (
        <Checkbox
          className="shrink-0"
          defaultChecked={isChecked}
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link
          className={cn('line-clamp-1', isActive && 'pointer-events-none')}
          href={url}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lesson.title}</h4>
      )}
      <span className="ml-auto shrink-0 text-xs font-semibold">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
