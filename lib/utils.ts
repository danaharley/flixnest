import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Genre, MediaType, Movie } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_URL = "https://api.themoviedb.org/3";

export const backdropPath = (imgUrl: string) =>
  `https://image.tmdb.org/t/p/original${imgUrl}`;

export const posterPath = (imgUrl: string) =>
  `https://image.tmdb.org/t/p/w500${imgUrl}`;

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
  getDiscover: (mediaType: MediaType) => {
    return makeGet<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }>(
      `/discover/${mediaType}?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc`,
    );
  },

  getGenres: (mediaType: MediaType) => {
    return makeGet<{ genres: Genre[] }>(`/genre/${mediaType}/list?language=en`);
  },

  getPopular: (mediaType: MediaType) => {
    return makeGet<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }>(`/${mediaType}/popular?language=en-US`);
  },

  getTopRated: (mediaType: MediaType) => {
    return makeGet<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }>(`/${mediaType}/top_rated?language=en-US`);
  },
};
