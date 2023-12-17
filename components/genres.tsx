import { Badge } from "@/components/ui/badge";

import { Genre } from "@/types";

type GenresProps = {
  genres: Genre[];
};

export const Genres = ({ genres }: GenresProps) => {
  return (
    <>
      {genres.map((genre) => (
        <Badge key={genre.id} className="px-2.5 py-1 md:px-3 md:py-1.5">
          {genre.name}
        </Badge>
      ))}
    </>
  );
};
