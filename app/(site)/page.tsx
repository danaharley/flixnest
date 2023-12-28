import { HeroSlide } from "@/components/hero-slide";
import { Section } from "@/components/section";

import { api } from "@/lib/utils";

const Home = async () => {
  const [
    discoverMovies,
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
  ] = await Promise.all([
    api.getDiscover({ mediaType: "movie" }).then((res) => res.results),
    api
      .getMedia({
        mediaType: "movie",
        mediaCategory: "popular",
        page: 1,
      })
      .then((res) => res.results),
    api
      .getMedia({
        mediaType: "tv",
        mediaCategory: "popular",
        page: 1,
      })
      .then((res) => res.results),
    api
      .getMedia({
        mediaType: "movie",
        mediaCategory: "top_rated",
        page: 1,
      })
      .then((res) => res.results),
    api
      .getMedia({
        mediaType: "tv",
        mediaCategory: "top_rated",
        page: 1,
      })
      .then((res) => res.results),
  ]);

  return (
    <div className="mb-20 space-y-20 md:space-y-16">
      <HeroSlide movies={discoverMovies} />
      <div className="ml-4 space-y-16 md:ml-8 lg:ml-10 xl:ml-14">
        <Section
          title="Popular Movies"
          mediaType="movie"
          movies={popularMovies}
        />
        <Section title="Popular Series" mediaType="tv" movies={popularSeries} />
        <Section
          title="Top Rated Movies"
          mediaType="movie"
          movies={topRatedMovies}
        />
        <Section
          title="Top Rated Series"
          mediaType="tv"
          movies={topRatedSeries}
        />
      </div>
    </div>
  );
};

export default Home;
