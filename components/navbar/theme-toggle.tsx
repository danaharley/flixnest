"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] text-muted-foreground dark:hidden" />
      <Moon className="hidden h-5 w-5 text-muted-foreground dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
