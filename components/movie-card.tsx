import Image from "next/image";
import Link from "next/link";

import { backdropPath, cn } from "@/lib/utils";
import { getAltText } from "@/lib/helpers";

import { MediaInfo, MediaType } from "@/types";

type MovieCardProps<T extends MediaType> = {
  mediaType: T;
  movies: Array<MediaInfo<T>>;
} & React.ComponentPropsWithoutRef<"figure">;

export const MovieCard = <T extends MediaType>({
  mediaType,
  movies,
  className,
}: MovieCardProps<T>) => {
  const handleLoadImage = (e: React.ChangeEvent<HTMLImageElement>) =>
    e.target.classList.remove("opacity-0");

  return (
    <>
      {movies.map((movie, idx) => (
        <Link key={idx} href={`/${mediaType}/${movie.id}`}>
          <figure className={cn("relative bg-muted/50", className)}>
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
