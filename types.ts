export type MediaType = "movie" | "tv";

export type MediaInfo<T extends MediaType> = T extends "movie" ? Movie : TV;

export type MediaCategoryInfo<T extends MediaType> = T extends "movie"
  ? MovieCategoryType
  : TVCategoryType;

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TV = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type MovieCategoryType =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming";

export type TVCategoryType =
  | "airing_today"
  | "on_the_air"
  | "popular"
  | "top_rated";

export type Genre = {
  id: number;
  name: string;
};
