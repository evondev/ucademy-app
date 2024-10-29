"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import useGlobalStore from "@/store";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LessonNavigation from "../LessonNavigation";
import RatingButton from "./RatingButton";

const VideoPlayer = ({
  nextLesson,
  prevLesson,
  data,
}: {
  nextLesson: string;
  prevLesson: string;
  data: {
    userId: string;
    courseId: string;
  };
}) => {
  const duration = 5000;
  const [isEndedVideo, setIsEndedVideo] = useState(false);
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (!isEndedVideo) return;
    const timer = setTimeout(() => {
      router.push(nextLesson);
    }, duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndedVideo, nextLesson]);
  return (
    <>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            "h-1.5 bg-gradient-to-r from-primary to-secondary absolute top-0 right-0 z-10",
            isEndedVideo ? "animate-bar" : ""
          )}
        ></div>
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
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        ></LessonNavigation>
        <div className="flex gap-5">
          <RatingButton
            courseId={data.courseId}
            userId={data.userId}
          ></RatingButton>
          <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
            {expandedPlayer ? "Mặc định" : "Mở rộng"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
