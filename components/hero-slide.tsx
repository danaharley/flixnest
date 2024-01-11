import Image from "next/image";
import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CustomCircularProgressbar } from "@/components/custom-circular-progressbar";
import { Genres } from "@/components/genres";

import { api, backdropPath } from "@/lib/utils";
import { getAltText, isMovie } from "@/lib/helpers";

import { MediaInfo, MediaType } from "@/types";
import Link from "next/link";

type HeroSlideProps<T extends MediaType> = {
  movies: Array<MediaInfo<T>>;
};

export const HeroSlide = async <T extends MediaType>({
  movies,
}: HeroSlideProps<T>) => {
  const genres = await api
    .getGenreList({ mediaType: "movie" })
    .then((res) => res.genres);

  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  const selectedGenres = genres.filter((genre) =>
    randomMovie.genre_ids.includes(genre.id),
  );

  return (
    <section className="relative flex h-[60vh] flex-col justify-end">
      <div className="ml-4 space-y-6 pr-4 md:ml-8 lg:ml-10 xl:ml-[7%]">
        <figure className="absolute left-0 top-0 -z-10 h-[40vh] w-screen md:h-[75vh] xl:h-screen">
          <Image
            src={backdropPath(
              randomMovie.backdrop_path || randomMovie.poster_path,
            )}
            alt={getAltText(randomMovie)}
            className="object-cover"
            fill
            sizes="100%"
          />
          <div className="absolute inset-0 block h-full w-full bg-gradient-to-b from-transparent to-background" />
        </figure>
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
          {isMovie(randomMovie)
            ? randomMovie.title || randomMovie.original_title
            : randomMovie.name || randomMovie.original_name}
        </h1>
        <div className="flex items-center space-x-4">
          <CustomCircularProgressbar
            percentage={parseFloat(randomMovie.vote_average.toFixed(1))}
          />
          <div className="space-x-2 space-y-1.5">
            <Genres genres={selectedGenres} />
          </div>
        </div>
        <p className="line-clamp-3 max-w-md text-sm md:line-clamp-4 md:max-w-2xl md:text-lg">
          {randomMovie.overview}
        </p>
        <Button className="uppercase" asChild>
          <Link href={`/movie/${randomMovie.id}`}>
            <Play className="mr-3 h-4 w-4" />
            Watch Now
          </Link>
        </Button>
      </div>
    </section>
  );
};
