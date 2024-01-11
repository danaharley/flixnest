import { Movie, MovieDetails, TV, TVDetails } from "@/types";

// Helper function to check if the object is of type Movie
export const isMovie = (movie: Movie | TV): movie is Movie => {
  return "title" in movie;
};

// Helper function to get alt text based on the media type
export const getAltText = (movie: Movie | TV): string => {
  if (isMovie(movie)) {
    return movie.title;
  } else {
    return movie.name;
  }
};

export const isMovieDetail = (
  movie: MovieDetails | TVDetails,
): movie is MovieDetails => {
  return "title" in movie;
};

// Helper function to get alt text based on the media type
export const getAltTextDetail = (movie: MovieDetails | TVDetails): string => {
  if (isMovieDetail(movie)) {
    return movie.title;
  } else {
    return movie.name;
  }
};
