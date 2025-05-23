"use client";

import VideoPlayer from "@/components/video-player";

interface CustomVideoProps {
  videoUrl: string;
}

export const CustomVideo = ({ videoUrl }: CustomVideoProps) => {
  return (
    <div className="mx-auto w-full max-w-[800px]">
      <VideoPlayer src={videoUrl} />
    </div>
  );
};