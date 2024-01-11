import { MediaPhotosSlide } from "@/components/media-detail/swiper/media-photos-slide";
import { MediaContainer } from "@/components/media-detail/media-container";
import { ImageHeader } from "@/components/media-detail/image-header";
import { MediaDetailInfo } from "@/components/media-detail/media-detail-info";
import { MediaVideo } from "@/components/media-detail/media-video";
import { Section } from "@/components/section";

import { api } from "@/lib/utils";

const DetailMoviePage = async ({ params }: { params: { movieId: string } }) => {
  const [
    movieDetails,
    movieCasts,
    videos,
    photos,
    recommendations,
    topRatedMovies,
  ] = await Promise.all([
    api.getMediaDetails({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),

    api.getMediaCredits({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),

    api
      .getMediaVideos({
        mediaType: "movie",
        mediaId: parseInt(params.movieId),
      })
      .then((res) => res.results),

    api.getMediaPhotos({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),

    api
      .getRecommendations({
        mediaType: "movie",
        mediaId: parseInt(params.movieId),
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
  ]);

  return (
    <section className="mb-20 mt-[20%]">
      <ImageHeader movie={movieDetails} />
      <div className="mx-auto max-w-[1400px] space-y-28">
        <MediaDetailInfo movie={movieDetails} cast={movieCasts.cast} />

        {videos && videos.length ? (
          <MediaContainer title="Trailer">
            <div className="mx-4 xl:mx-0">
              <MediaVideo videos={videos} />
            </div>
          </MediaContainer>
        ) : null}

        {photos.backdrops && photos.backdrops.length ? (
          <MediaContainer title="Backdrops">
            <div className="mx-4 xl:mx-0">
              <MediaPhotosSlide
                mediaPhotoType="backdrops"
                photos={photos.backdrops.slice(0, 10)}
              />
            </div>
          </MediaContainer>
        ) : null}

        {photos.posters && photos.posters.length ? (
          <MediaContainer title="Poster">
            <div className="mx-4 xl:mx-0">
              <MediaPhotosSlide
                mediaPhotoType="poster"
                photos={photos.posters.slice(0, 10)}
                className="h-72 md:h-96 xl:h-[426px]"
              />
            </div>
          </MediaContainer>
        ) : null}

        {recommendations && recommendations.length ? (
          <div className="mx-4 xl:mx-0">
            <Section
              title="You May Also Like"
              mediaType="movie"
              movies={recommendations}
            />
          </div>
        ) : (
          <div className="mx-4 xl:mx-0">
            <Section
              title="You May Also Like"
              mediaType="movie"
              movies={topRatedMovies}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailMoviePage;

export const generateStaticParams = async () => {
  const movies = await api
    .getMedia({ mediaType: "movie", mediaCategory: "popular", page: 1 })
    .then((res) => res.results);

  return movies.map((movie) => ({
    movieId: movie.id.toString(),
  }));
};
