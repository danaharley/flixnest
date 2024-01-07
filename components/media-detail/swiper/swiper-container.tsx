"use client";

import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MediaPhotoType } from "@/types";

export type SwiperContainerProps<T extends MediaPhotoType> = {
  mediaPhotoType: T;
  children: React.ReactNode;
};

export const SwiperContainer = <T extends MediaPhotoType>({
  mediaPhotoType,
  children,
}: SwiperContainerProps<T>) => {
  if (mediaPhotoType === "backdrops") {
    return (
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={10}
        navigation={true}
        grabCursor={true}
        className="!px-4 lg:!px-16"
      >
        {children}
      </Swiper>
    );
  } else {
    return (
      <Swiper
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        {children}
      </Swiper>
    );
  }
};
