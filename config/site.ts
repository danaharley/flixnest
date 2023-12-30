import { Film, Home, Tv } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "FlixNest",
  description: "Discover, Watch, Share Your Movie Experience",
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Movies",
      href: "/movie",
      icon: Film,
    },
    {
      title: "TV Series",
      href: "/tv",
      icon: Tv,
    },
  ],

  movieCategoryLists: [
    {
      value: "now_playing",
      label: "Now Playing",
    },
    {
      value: "popular",
      label: "Popular",
    },
    {
      value: "top_rated",
      label: "Top Rated",
    },
    {
      value: "upcoming",
      label: "Upcoming",
    },
  ],
};
