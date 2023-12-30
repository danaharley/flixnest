import { HeroSlide } from "@/components/hero-slide";
import { LoadMore } from "@/components/load-more";
import { SelectMovie } from "@/components/select-movie";

import { api } from "@/lib/utils";

import { siteConfig } from "@/config/site";

import { MovieCategoryType } from "@/types";

const MoviePage = async ({
  searchParams,
}: {
  searchParams: { type: string | undefined };
}) => {
  const categoryType = searchParams.type || "popular";

  const [discoverMovie, moviesByCategory] = await Promise.all([
    api.getDiscover({ mediaType: "movie" }).then((res) => res.results),
    api
      .getMedia({
        mediaType: "movie",
        mediaCategory: categoryType as MovieCategoryType,
        page: 1,
      })
      .then((res) => res.results),
  ]);

  return (
    <div>
      <HeroSlide movies={discoverMovie} />
      <div className="mx-auto mt-20 max-w-[1400px] space-y-4 px-4 md:mt-28 lg:mt-52">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl xl:text-3xl">Movies</h2>
          <SelectMovie
            lists={siteConfig.movieCategoryLists}
            categoryType={categoryType}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadMore
            mediaType="movie"
            mediaCategory={categoryType as MovieCategoryType}
            data={moviesByCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
