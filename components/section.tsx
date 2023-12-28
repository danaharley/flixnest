"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MovieCard } from "@/components/movie-card";

import { cn } from "@/lib/utils";

import { MediaInfo, MediaType } from "@/types";

type SectionProps<T extends MediaType> = {
  title: string;
  mediaType: T;
  movies: Array<MediaInfo<T>>;
};

export const Section = <T extends MediaType>({
  title,
  mediaType,
  movies,
}: SectionProps<T>) => {
  const directionRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleDirections = (directions: string) => {
    setIsMoved(true);

    if (directionRef.current) {
      const { scrollLeft, clientWidth } = directionRef.current;

      const scrollTo =
        directions === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      directionRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="space-y-2">
      <h2 className="ml-4 text-2xl font-bold uppercase">{title}</h2>
      <div className="group relative">
        <div
          className={cn(
            "group/icon absolute bottom-0 left-0 top-0 z-40 m-auto hidden h-full w-10 items-center justify-center bg-primary/10 opacity-0 transition duration-300 ease-in-out hover:cursor-pointer group-hover:opacity-100 group-hover:backdrop-blur-sm",
            isMoved && "lg:flex",
          )}
          onClick={() => handleDirections("left")}
        >
          <ChevronLeft className="h-8 w-8 text-destructive transition group-hover/icon:scale-125" />
        </div>
        <div
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
          ref={directionRef}
        >
          <MovieCard
            className="h-48 w-32 shrink-0 rounded md:h-52 md:w-[138px] 2xl:h-72 2xl:w-48"
            mediaType={mediaType}
            movies={movies}
          />
        </div>
        <div
          className="group/icon absolute bottom-0 right-0 top-0 z-40 m-auto hidden h-full w-10 items-center justify-center bg-primary/10 opacity-0 transition duration-300 ease-in-out hover:cursor-pointer group-hover:opacity-100 group-hover:backdrop-blur-sm lg:flex"
          onClick={() => handleDirections("right")}
        >
          <ChevronRight className="h-8 w-8 text-destructive transition group-hover/icon:scale-125" />
        </div>
      </div>
    </section>
  );
};
