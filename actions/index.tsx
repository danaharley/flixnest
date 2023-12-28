"use server";

import { api } from "@/lib/utils";

import { MediaCategoryInfo, MediaType } from "@/types";

type fetchMoviesProps<T extends MediaType> = {
  mediaType: T;
  mediaCategory: MediaCategoryInfo<T>;
  page: number;
};

export const fetchMovies = async <T extends MediaType>({
  mediaType,
  mediaCategory,
  page = 1,
}: fetchMoviesProps<T>) => {
  const movies = await api.getMedia({
    mediaType,
    mediaCategory,
    page,
  });

  return movies;
};
