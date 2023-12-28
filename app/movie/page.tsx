import { HeroSlide } from "@/components/hero-slide";
import { LoadMore } from "@/components/load-more";

import { api } from "@/lib/utils";

const MoviePage = async () => {
  const [discoverMovie, moviesByCategory] = await Promise.all([
    api.getDiscover({ mediaType: "movie" }).then((res) => res.results),
    api
      .getMedia({
        mediaType: "movie",
        mediaCategory: "popular",
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
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadMore data={moviesByCategory} mediaType="movie" />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
