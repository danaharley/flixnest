import { HeroSlide } from "@/components/hero-slide";
import { LoadMore } from "@/components/load-more";
import { SelectMovie } from "@/components/select-movie";

import { api } from "@/lib/utils";

import { siteConfig } from "@/config/site";

import { TVCategoryType } from "@/types";

const TVPage = async ({
  searchParams,
}: {
  searchParams: { type: string | undefined };
}) => {
  const categoryType = searchParams.type || "popular";

  const [discoverTV, tvByCategory] = await Promise.all([
    api.getDiscover({ mediaType: "tv" }).then((res) => res.results),
    api
      .getMedia({
        mediaType: "tv",
        mediaCategory: categoryType as TVCategoryType,
        page: 1,
      })
      .then((res) => res.results),
  ]);

  return (
    <div>
      <HeroSlide movies={discoverTV} />
      <div className="mx-auto mt-20 max-w-[1400px] space-y-4 px-4 md:mt-28 lg:mt-52">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl xl:text-3xl">
            TV Series
          </h2>
          <SelectMovie
            lists={siteConfig.tvCategoryLists}
            categoryType={categoryType}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          <LoadMore
            mediaType="tv"
            mediaCategory={categoryType as TVCategoryType}
            data={tvByCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default TVPage;
