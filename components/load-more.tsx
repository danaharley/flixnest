"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";

import { MediaInfo, MediaType } from "@/types";
import { fetchMovies } from "@/actions";

type LoadMoreProps<T extends MediaType> = {
  mediaType: T;
  data: Array<MediaInfo<T>>;
};

export const LoadMore = <T extends MediaType>({
  mediaType,
  data,
}: LoadMoreProps<T>) => {
  const [movies, setMovies] = useState<Array<MediaInfo<T>>>(data);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies({ mediaType: "movie", mediaCategory: "popular", page }).then(
      (res) => {
        if (res && res.results.length) {
          if (page !== 1) {
            setMovies((prevData: MediaInfo<T>[]) => [
              ...(prevData.length ? prevData : []),
              ...(res.results as MediaInfo<T>[]),
            ]);
          }
        }
      },
    );
  }, [page]);

  const onLoadMore = () => setPage(page + 1);

  return (
    <>
      <MovieCard
        className="aspect-h-14 aspect-w-9"
        mediaType={mediaType}
        movies={movies}
      />

      <Button
        className="col-span-2 mt-5 bg-transparent font-semibold uppercase text-primary hover:bg-primary/10 md:col-span-3 lg:col-span-4"
        onClick={onLoadMore}
      >
        Load More
      </Button>
    </>
  );
};
