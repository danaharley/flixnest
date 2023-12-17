import Image from "next/image";

import { backdropPath } from "@/lib/utils";

import { Movie } from "@/types";

type SectionProps = {
  title: string;
  movies: Movie[];
};

export const Section = ({ title, movies }: SectionProps) => {
  return (
    <section className="space-y-2">
      <h2 className="ml-4 text-2xl font-bold uppercase">{title}</h2>
      <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
        {movies.map((movie) => (
          <figure
            key={movie.id}
            className="relative h-44 w-[125px] shrink-0 rounded shadow md:h-72 md:w-52"
          >
            <Image
              src={backdropPath(movie.poster_path)}
              alt={movie.title || movie.name}
              className="rounded object-cover"
              fill
              sizes="100%"
            />
          </figure>
        ))}
      </div>
    </section>
  );
};
