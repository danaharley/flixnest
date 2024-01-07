"use client";

import { useEffect, useState } from "react";

import { Video } from "@/types";

import { youtubePath } from "@/lib/utils";

export type MediaVideoProps = {
  videos: Array<Video>;
};

export const MediaVideo = ({ videos }: MediaVideoProps) => {
  const [trailer, setTrailer] = useState<Video>();

  useEffect(() => {
    const index = videos.findIndex((index) => index.type === "Trailer");
    setTrailer(videos[index]);
  }, [videos]);

  if (!trailer) return;

  return (
    <div className="relative pt-[56.25%]">
      <iframe
        key={trailer.id}
        src={youtubePath(trailer.key)}
        width="100%"
        height="100%"
        title={trailer.name}
        className="absolute left-0 top-0"
      />
    </div>
  );
};
