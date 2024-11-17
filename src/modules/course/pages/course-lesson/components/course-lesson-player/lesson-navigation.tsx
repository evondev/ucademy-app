'use client';

import { useRouter } from 'next/navigation';

import { IconLeftArrow, IconRightArrow } from '@/shared/components/icons';
import { Button } from '@/shared/components/ui';

interface LessonNavigationProps {
  nextLesson: string;
  prevLesson: string;
}
const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: LessonNavigationProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        disabled={!prevLesson}
        onClick={() => (prevLesson ? router.push(prevLesson) : null)}
      >
        <IconLeftArrow />
      </Button>
      <Button
        className="size-10 p-3"
        disabled={!nextLesson}
        onClick={() => (nextLesson ? router.push(nextLesson) : null)}
      >
        <IconRightArrow />
      </Button>
    </div>
  );
};

export default LessonNavigation;
