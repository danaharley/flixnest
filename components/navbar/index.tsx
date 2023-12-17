"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { MainNav } from "@/components/navbar/main-nav";
import { UserMenu } from "@/components/navbar/user-menu";
import { Drawer } from "@/components/drawer";

import { useScroll } from "@/hooks/use-scroll";

import { cn } from "@/lib/utils";

import { siteConfig } from "@/config/site";

export const Navbar = () => {
  // const routes: { title: string; href: string; active: boolean }[] = [
  const pathname = usePathname();

  //   {
  //     title: "Home",
  //     href: "/",
  //     active: pathname !== "/movies" && pathname !== "/tv",
  //   },
  //   {
  //     title: "Movies",
  //     href: "/movies",
  //     active: pathname === "/movies",
  //   },
  //   {
  //     title: "TV Series",
  //     href: "/tv",
  //     active: pathname === "/tv",
  //   },
  // ];
  const isScrolled = useScroll();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-16 w-full bg-transparent transition-all",
        isScrolled && "border-b bg-background shadow-sm",
      )}
    >
      <div className="flex h-16 items-center justify-between space-x-4 px-4">
        <div className="flex items-center space-x-2.5 md:space-x-0">
          <Drawer
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
            routes={siteConfig}
            active={pathname}
            icon={<Menu className="h-6 w-6 text-muted-foreground" />}
          />
          <MainNav routes={siteConfig} active={pathname} />
        </div>
        <UserMenu />
      </div>
    </header>
  );
};
