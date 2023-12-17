import { HeroSlide } from "@/components/hero-slide";

import { api } from "@/lib/utils";

const Home = async () => {
  const [movies, genres] = await Promise.all([
    api.getDiscover("movie").then((res) => res.results),
    api.getGenres("movie").then((res) => res.genres),
  ]);

  return (
    <main>
      <HeroSlide movies={movies} genres={genres} />
    </main>
  );
};

export default Home;
