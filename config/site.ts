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
};
