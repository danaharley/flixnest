"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/navbar/logo";
import { ThemeToggle } from "@/components/navbar/theme-toggle";

import { cn } from "@/lib/utils";

import { SiteConfig } from "@/config/site";

type MainNavProps = {
  routes: Pick<SiteConfig, "mainNav">;
  active: string;
};

export const MainNav = ({ routes, active }: MainNavProps) => {
  return (
    <NavigationMenu className="flex items-center">
      <Logo />
      <NavigationMenuList className="md:ml-4">
        <NavigationMenuItem className="hidden items-center space-x-1.5 md:flex">
          {routes.mainNav.map((route) => (
            <Link key={route.title} href={route.href}>
              <Button
                size="sm"
                variant={active === route.href ? "default" : "ghost"}
                className={cn(
                  "font-semibold text-muted-foreground",
                  active === route.href && "font-bold text-primary-foreground",
                )}
              >
                {route.title}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
