import { Movie, TV } from "@/types";

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
