'use client';
import MuxPlayer from '@mux/mux-player-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui';
import { useGlobalStore } from '@/shared/store';
import { cn } from '@/shared/utils';

import LessonNavigation from './lesson-navigation';
import RatingButton from './rating-button';

interface VideoPlayerProps {
  nextLesson: string;
  prevLesson: string;
  courseId: string;
}
const VideoPlayer = ({
  courseId,
  nextLesson,
  prevLesson,
}: VideoPlayerProps) => {
  const duration = 5000;
  const [isEndedVideo, setIsEndedVideo] = useState(false);
  const { setShouldExpandedPlayer, shouldExpandedPlayer } = useGlobalStore();
  const router = useRouter();

  useEffect(() => {
    if (!isEndedVideo) return;
    const timer = setTimeout(() => {
      router.push(nextLesson);
    }, duration);

    return () => clearTimeout(timer);
  }, [isEndedVideo, nextLesson, router]);

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            'absolute right-0 top-0 z-10 h-1.5 bg-gradient-to-r from-primary to-secondary',
            isEndedVideo ? 'animate-bar' : '',
          )}
        />
        <MuxPlayer
          metadataVideoTitle="Placeholder (optional)"
          metadataViewerUserId="Placeholder (optional)"
          playbackId="cLtCRXwXHA016mp005eh3cT5fWreC3VSv00VnhXvXzSJ9E"
          primaryColor="#FFFFFF"
          secondaryColor="#000000"
          streamType="on-demand"
          onEnded={() => setIsEndedVideo(true)}
          onPlay={() => setIsEndedVideo(false)}
        />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        />
        <div className="flex gap-5">
          <RatingButton courseId={courseId} />
          <Button
            onClick={() => setShouldExpandedPlayer(!shouldExpandedPlayer)}
          >
            {shouldExpandedPlayer ? 'Mặc định' : 'Mở rộng'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
