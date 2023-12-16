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
    <div className="absolute inset-0">
      <figure className="relative -z-10 h-[60vh] w-screen md:h-[70vh] xl:h-screen">
        <Image
          src={backdropPath(
            randomMovie.backdrop_path || randomMovie.poster_path,
          )}
          alt={randomMovie.title}
          className="object-cover"
          fill
        />
        <div className="absolute block h-full w-full bg-gradient-to-b from-transparent to-background after:content-['']" />
      </figure>
      <div className="absolute left-1/2 top-1/4 w-full -translate-x-1/2 md:max-w-3xl lg:left-[10%] lg:w-full lg:-translate-x-[10%]">
        <div className="space-y-6 px-5 md:container md:space-y-10">
          <h1 className="text-3xl font-bold md:text-5xl xl:text-7xl">
            {randomMovie.title}
          </h1>
          <div className="flex items-center space-x-4">
            <CustomCircularProgressbar percentage={randomMovie.vote_average} />
            <div className="space-x-2 space-y-1.5">
              <Genres genres={selectedGenres} />
            </div>
          </div>
          <p className="line-clamp-4 max-w-md md:line-clamp-none md:max-w-2xl md:text-lg">
            {randomMovie.overview}
          </p>
          <Button className="uppercase">
            <Play className="mr-3 h-4 w-4" />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  );
};
