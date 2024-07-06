"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/store";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LessonNavigation from "../LessonNavigation";

const VideoPlayer = ({
  nextLesson,
  prevLesson,
}: {
  nextLesson: string;
  prevLesson: string;
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
          streamType="on-demand"
          playbackId="cLtCRXwXHA016mp005eh3cT5fWreC3VSv00VnhXvXzSJ9E"
          metadataVideoTitle="Placeholder (optional)"
          metadataViewerUserId="Placeholder (optional)"
          primaryColor="#FFFFFF"
          secondaryColor="#000000"
          onEnded={() => setIsEndedVideo(true)}
          onPlay={() => setIsEndedVideo(false)}
        />
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation
          nextLesson={nextLesson}
          prevLesson={prevLesson}
        ></LessonNavigation>
        <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
          {expandedPlayer ? "Mặc định" : "Mở rộng"}
        </Button>
      </div>
    </>
  );
};

export default VideoPlayer;
