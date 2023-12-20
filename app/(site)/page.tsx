import { HeroSlide } from "@/components/hero-slide";
import { Section } from "@/components/section";

import { api } from "@/lib/utils";

const Home = async () => {
  const [
    movies,
    genres,
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
  ] = await Promise.all([
    api.getDiscover("movie").then((res) => res.results),
    api.getGenres("movie").then((res) => res.genres),
    api.getPopular("movie").then((res) => res.results),
    api.getPopular("tv").then((res) => res.results),
    api.getTopRated("movie").then((res) => res.results),
    api.getTopRated("tv").then((res) => res.results),
  ]);

  return (
    <div className="mb-20 space-y-20 md:space-y-16">
      <HeroSlide movies={movies} genres={genres} />
      <div className="ml-4 space-y-16 md:ml-8 lg:ml-10 xl:ml-14">
        <Section title="Popular Movies" movies={popularMovies} />
        <Section title="Popular Series" movies={popularSeries} />
        <Section title="Top Rated Movies" movies={topRatedMovies} />
        <Section title="Top Rated Series" movies={topRatedSeries} />
      </div>
    </div>
  );
};

export default Home;
