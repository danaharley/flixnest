import Image from "next/image";

import { backdropPath } from "@/lib/utils";

import { MovieDetails } from "@/types";

export const ImageHeader = ({ movie }: { movie: MovieDetails }) => {
  return (
    <figure className="absolute top-0 -z-10 min-h-screen w-screen">
      <Image
        src={backdropPath(movie.backdrop_path)}
        alt={movie.title || movie.original_title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 block h-full w-full bg-gradient-to-b from-transparent to-background" />
    </figure>
  );
};
