import Image from "next/image";

import { posterPath } from "@/lib/utils";

import { Cast } from "@/types";

export type MediaPersonSlideProps = {
  cast: Array<Cast>;
};

export const MediaPersonSlide = ({ cast }: MediaPersonSlideProps) => {
  return (
    <>
      {cast.map((cast, idx) => (
        <figure key={idx} className="relative flex-shrink-0 bg-muted/50">
          <Image
            key={idx}
            src={
              cast.profile_path
                ? posterPath(cast.profile_path)
                : "/no-image.png"
            }
            alt={cast.name || cast.original_name}
            width="0"
            height="0"
            sizes="(max-width: 912px) 188vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full overflow-hidden object-cover lg:h-56"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-muted/70 py-3 text-center text-sm font-light tracking-wide backdrop-blur">
            {cast.name || cast.original_name}
          </figcaption>
        </figure>
      ))}
    </>
  );
};
