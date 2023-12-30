"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/movie-card";

import { usePrevious } from "@/hooks/use-previous";

import { fetchMovies } from "@/actions";

import { MediaCategoryInfo, MediaInfo, MediaType } from "@/types";

type LoadMoreProps<T extends MediaType> = {
  mediaType: T;
  mediaCategory: MediaCategoryInfo<T>;
  data: Array<MediaInfo<T>>;
};

export const LoadMore = <T extends MediaType>({
  mediaType,
  mediaCategory,
  data,
}: LoadMoreProps<T>) => {
  const [movies, setMovies] = useState<Array<MediaInfo<T>>>(data);
  const [page, setPage] = useState(1);

  const prevMediaType = usePrevious(mediaCategory);

  useEffect(() => {
    fetchMovies({ mediaType, mediaCategory, page }).then((res) => {
      if (res && res.results.length) {
        if (page !== 1 && mediaCategory === prevMediaType) {
          setMovies((prevData: MediaInfo<T>[]) => [
            ...(prevData.length ? prevData : []),
            ...(res.results as MediaInfo<T>[]),
          ]);
        } else {
          setMovies(data);
          setPage(1);
        }
      }
    });
  }, [page, mediaCategory, mediaType, prevMediaType]);

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
