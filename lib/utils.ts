import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  Backdrop,
  Cast,
  Crew,
  Genre,
  MediaCategoryInfo,
  MediaDetailInfo,
  MediaInfo,
  MediaType,
  Poster,
  Video,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = "https://api.themoviedb.org/3";

export const backdropPath = (imgUrl: string) =>
  `https://image.tmdb.org/t/p/original${imgUrl}`;

export const posterPath = (imgUrl: string) =>
  `https://image.tmdb.org/t/p/w500${imgUrl}`;

export const youtubePath = (source: string) =>
  `https://www.youtube.com/embed/${source}`;

export const makeGet = async <T>(
  url: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWM0ZmJjMWE1OTE0NmI5N2Y1YTVlYTMzYzAwMjFmYSIsInN1YiI6IjYwMWJhY2I0Yjk3NDQyMDAzYzI2MTNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPu3L64EF9-57FAq6_VGG_KAie1AO8n14HBzsJHpjF0`,
      ...headers,
    },
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return (await response.json()) as T;
};

export const makePost = async <TRequest, TResponse>(
  url: string,
  body: TRequest,
  headers: Record<string, string> = {},
): Promise<TResponse> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZWM0ZmJjMWE1OTE0NmI5N2Y1YTVlYTMzYzAwMjFmYSIsInN1YiI6IjYwMWJhY2I0Yjk3NDQyMDAzYzI2MTNiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPu3L64EF9-57FAq6_VGG_KAie1AO8n14HBzsJHpjF0`,
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return (await response.json()) as TResponse;
};

export const api = {
  getDiscover: async <T extends MediaType>({
    mediaType,
  }: {
    mediaType: T;
  }): Promise<{
    page: number;
    results: Array<MediaInfo<T>>;
    total_pages: number;
    total_results: number;
  }> => {
    return await makeGet<{
      page: number;
      results: Array<MediaInfo<T>>;
      total_pages: number;
      total_results: number;
    }>(
      `/discover/${mediaType}?include_adult=true&include_video=true&language=en-US&sort_by=popularity.desc`,
    );
  },

  getGenreList: ({ mediaType }: { mediaType: MediaType }) => {
    return makeGet<{ genres: Genre[] }>(`/genre/${mediaType}/list?language=en`);
  },

  getMedia: async <T extends MediaType>({
    mediaType,
    mediaCategory,
    page = 1,
  }: {
    mediaType: T;
    mediaCategory: MediaCategoryInfo<T>;
    page: number;
  }): Promise<{
    page: number;
    results: Array<MediaInfo<T>>;
    total_pages: number;
    total_results: number;
  }> => {
    return await makeGet<{
      page: number;
      results: Array<MediaInfo<T>>;
      total_pages: number;
      total_results: number;
    }>(`/${mediaType}/${mediaCategory}?language=en-US&page=${page}`);
  },

  getMediaDetails: async <T extends MediaType>({
    mediaType,
    mediaId,
  }: {
    mediaType: T;
    mediaId: number;
  }): Promise<MediaDetailInfo<T>> => {
    return await makeGet<MediaDetailInfo<T>>(
      `/${mediaType}/${mediaId}?language=en-US`,
    );
  },

  getMediaCredits: async <T extends MediaType>({
    mediaType,
    mediaId,
  }: {
    mediaType: T;
    mediaId: number;
  }): Promise<{
    id: number;
    cast: Cast[];
    crew: Crew[];
  }> => {
    return await makeGet<{
      id: number;
      cast: Cast[];
      crew: Crew[];
    }>(`/${mediaType}/${mediaId}/credits?language=en-US`);
  },

  getMediaVideos: async <T extends MediaType>({
    mediaType,
    mediaId,
  }: {
    mediaType: T;
    mediaId: number;
  }): Promise<{
    id: number;
    results: Video[];
  }> => {
    return await makeGet<{
      id: number;
      results: Video[];
    }>(`/${mediaType}/${mediaId}/videos?language=en-US`);
  },

  getMediaPhotos: async <T extends MediaType>({
    mediaType,
    mediaId,
  }: {
    mediaType: T;
    mediaId: number;
  }): Promise<{
    backdrops: Backdrop[];
    posters: Poster[];
  }> => {
    return await makeGet<{
      backdrops: Backdrop[];
      posters: Poster[];
    }>(`/${mediaType}/${mediaId}/images`);
  },
};
