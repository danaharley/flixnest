"use client";

import { SwiperSlide } from "swiper/react";
import Image from "next/image";

import { SwiperContainer } from "@/components/media-detail/swiper/swiper-container";

import { backdropPath, cn, posterPath } from "@/lib/utils";

import { MediaPhotoInfo, MediaPhotoType } from "@/types";

export type MediaPhotosSlideProps<T extends MediaPhotoType> = {
  mediaPhotoType: T;
  photos: Array<MediaPhotoInfo<T>>;
  className?: string;
};

export const MediaPhotosSlide = <T extends MediaPhotoType>({
  mediaPhotoType,
  photos,
  className,
}: MediaPhotosSlideProps<T>) => {
  return (
    <SwiperContainer mediaPhotoType={mediaPhotoType}>
      {photos.map((photo, idx) => (
        <SwiperSlide key={idx}>
          <div className={cn("relative pt-[56.25%]", className)}>
            <Image
              src={
                mediaPhotoType === "backdrops"
                  ? backdropPath(photo.file_path)
                  : posterPath(photo.file_path)
              }
              alt={mediaPhotoType + "-" + idx}
              fill
              className="absolute left-0 top-0 object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </SwiperContainer>
  );
};
