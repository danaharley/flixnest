import Image from "next/image";

import { backdropPath } from "@/lib/utils";

import { getAltTextDetail } from "@/lib/helpers";

import { MediaDetailInfo, MediaType } from "@/types";

export type ImageHeaderProps<T extends MediaType> = {
  movie: MediaDetailInfo<T>;
};

export const ImageHeader = <T extends MediaType>({
  movie,
}: ImageHeaderProps<T>) => {
  return (
    <figure className="absolute top-0 -z-10 min-h-screen w-screen">
      <Image
        src={backdropPath(movie.backdrop_path)}
        alt={getAltTextDetail(movie)}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 block h-full w-full bg-gradient-to-b from-transparent to-background" />
    </figure>
  );
};
