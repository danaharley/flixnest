import { MediaPhotosSlide } from "@/components/media-detail/swiper/media-photos-slide";
import { MediaContainer } from "@/components/media-detail/media-container";
import { ImageHeader } from "@/components/media-detail/image-header";
import { MediaDetailInfo } from "@/components/media-detail/media-detail-info";
import { MediaVideo } from "@/components/media-detail/media-video";

import { api } from "@/lib/utils";

const DetailMoviePage = async ({ params }: { params: { movieId: string } }) => {
  const [movieDetails, movieCasts, videos, photos] = await Promise.all([
    api.getMediaDetails({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),

    api.getMediaCredits({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),

    api
      .getMediaVideos({ mediaType: "movie", mediaId: parseInt(params.movieId) })
      .then((res) => res.results),

    api.getMediaPhotos({
      mediaType: "movie",
      mediaId: parseInt(params.movieId),
    }),
  ]);

  return (
    <section className="mt-[20%]">
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
