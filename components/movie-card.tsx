import Image from "next/image";

import { backdropPath, cn } from "@/lib/utils";

import { Movie } from "@/types";
import Link from "next/link";

type MovieCardProps = {
  movies: Movie[];
};

export const MovieCard = ({ movies }: MovieCardProps) => {
  return (
    <>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <figure
            className={cn(
              "relative h-48 w-32 shrink-0 rounded md:h-52 md:w-[138px] 2xl:h-72 2xl:w-48",
            )}
          >
            <Image
              src={backdropPath(movie.poster_path)}
              alt={movie.title || movie.name}
              className="rounded object-cover"
              sizes="100%"
              fill
            />
          </figure>
        </Link>
      ))}
    </>
  );
};
