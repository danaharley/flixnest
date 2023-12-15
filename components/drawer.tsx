import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

type DrawerProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  icon: React.ReactNode;
  routes: Pick<SiteConfig, "mainNav">;
  active: string;
};

export const Drawer = ({
  isOpen,
  onOpenChange,
  icon: Icon,
  routes,
  active,
}: DrawerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        {Icon}
      </SheetTrigger>
      <SheetContent side="left">
        <NavigationMenu className="flex flex-col items-start">
          <div className="flex items-center space-x-3">
            <Logo />
            <ThemeToggle />
          </div>
          <SheetTitle className="mt-6 uppercase">Menu</SheetTitle>
          <NavigationMenuList className="mt-4">
            <NavigationMenuItem className="flex flex-col space-y-3">
              {routes.mainNav.map((route) => (
                <Link key={route.title} href={route.href}>
                  <Button
                    size="default"
                    variant={active === route.href ? "default" : "ghost"}
                    className={cn(
                      "text-center text-base font-normal uppercase",
                      active === route.href && "font-bold",
                    )}
                  >
                    <route.icon className="mr-6 h-6 w-6" /> {route.title}
                  </Button>
                </Link>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};
