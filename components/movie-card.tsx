import Image from "next/image";
import Link from "next/link";

import { backdropPath, cn } from "@/lib/utils";
import { getAltText } from "@/lib/helpers";

import { MediaInfo, MediaType } from "@/types";

type MovieCardProps<T extends MediaType> = {
  mediaType: T;
  movies: Array<MediaInfo<T>>;
};

export const MovieCard = <T extends MediaType>({
  mediaType,
  movies,
}: MovieCardProps<T>) => {
  const handleLoadImage = (e: React.ChangeEvent<HTMLImageElement>) =>
    e.target.classList.remove("opacity-0");

  return (
    <>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/${mediaType}/${movie.id}`}>
          <figure
            className={cn(
              "relative h-48 w-32 shrink-0 rounded bg-muted/50 md:h-52 md:w-[138px] 2xl:h-72 2xl:w-48",
            )}
          >
            <Image
              src={backdropPath(movie.poster_path)}
              alt={getAltText(movie)}
              className={cn(
                "rounded object-cover opacity-0 transition-opacity",
              )}
              sizes="100%"
              fill
              onLoad={handleLoadImage}
            />
          </figure>
        </Link>
      ))}
    </>
  );
};
