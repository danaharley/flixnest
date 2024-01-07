import Image from "next/image";
import { Play } from "lucide-react";

import { CustomCircularProgressbar } from "@/components/custom-circular-progressbar";
import { Genres } from "@/components/genres";
import { Button } from "@/components/ui/button";
import { MediaContainer } from "@/components/media-detail/media-container";
import { MediaPersonSlide } from "@/components/media-detail/swiper/media-person-slide";

import { backdropPath } from "@/lib/utils";

import { Cast, MovieDetails } from "@/types";

export type MediaDetailInfoProps = {
  movie: MovieDetails;
  cast: Array<Cast>;
};

export const MediaDetailInfo = ({ movie, cast }: MediaDetailInfoProps) => {
  return (
    <div className="flex flex-col items-center space-y-8 lg:ml-4 lg:flex-row lg:items-start lg:space-y-0 xl:ml-0">
      <figure className="relative h-96 w-64 shrink-0 bg-muted/50 md:h-[523px] md:w-[375px] lg:h-[540px] lg:w-[360px] xl:h-[725px] xl:w-[514px]">
        <Image
          src={backdropPath(movie.poster_path)}
          alt={movie.title || movie.original_title}
          fill
          className="object-cover"
        />
      </figure>
      <div className="mx-4 flex flex-col space-y-9 lg:ml-8 xl:ml-10 xl:mr-0">
        <h1 className="text-3xl font-bold md:text-4xl xl:line-clamp-2 xl:text-7xl">
          {movie.title || movie.original_title}
        </h1>
        <div className="flex items-center space-x-4">
          <CustomCircularProgressbar percentage={movie.vote_average} />
          <Genres genres={movie.genres} />
        </div>
        <p>{movie.overview}</p>
        <Button className="max-w-[168px] uppercase">
          <Play className="mr-3 h-4 w-4" />
          Watch Now
        </Button>

        <MediaContainer title="Cast">
          <div className="flex overflow-x-auto scrollbar-hide">
            <MediaPersonSlide cast={cast} />
          </div>
        </MediaContainer>
      </div>
    </div>
  );
};
