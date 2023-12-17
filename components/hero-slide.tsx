import Image from "next/image";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomCircularProgressbar } from "@/components/custom-circular-progressbar";
import { Genres } from "@/components/genres";

import { backdropPath } from "@/lib/utils";

import { Genre, Movie } from "@/types";

type HeroSlideProps = {
  movies: Movie[];
  genres: Genre[];
};

export const HeroSlide = ({ movies, genres }: HeroSlideProps) => {
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  const selectedGenres = genres.filter((genre) =>
    randomMovie.genre_ids.includes(genre.id),
  );

  return (
    <div className="relative flex h-[65vh] flex-col justify-end">
      <div className="space-y-6 px-4 md:mx-auto md:max-w-2xl md:px-0 lg:max-w-6xl xl:ml-36 xl:w-full">
        <figure className="absolute left-0 top-0 -z-10 h-[40vh] w-screen bg-red-200 md:h-[75vh] xl:h-screen">
          <Image
            src={backdropPath(
              randomMovie.backdrop_path || randomMovie.poster_path,
            )}
            alt={randomMovie.title}
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 block h-full w-full bg-gradient-to-b from-transparent to-background" />
        </figure>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-7xl">
          {randomMovie.title || randomMovie.original_title}
        </h1>
        <div className="flex items-center space-x-4">
          <CustomCircularProgressbar percentage={randomMovie.vote_average} />
          <div className="space-x-2 space-y-1.5">
            <Genres genres={selectedGenres} />
          </div>
        </div>
        <p className="line-clamp-4 max-w-md text-sm md:line-clamp-none md:max-w-2xl md:text-lg">
          {randomMovie.overview}
        </p>
        <Button className="uppercase">
          <Play className="mr-3 h-4 w-4" />
          Watch Now
        </Button>
      </div>
    </div>
  );
};
