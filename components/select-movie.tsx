"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type SelectMovieProps = {
  lists: Array<{ value: string; label: string }>;
  categoryType: string;
};

export const SelectMovie = ({ lists, categoryType }: SelectMovieProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-40 justify-between md:w-52"
        >
          {categoryType
            ? lists.find((movie) => movie.value === categoryType)?.label
            : "Select movie..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0 md:w-52">
        <Command>
          <CommandInput placeholder="Search movie.." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {lists.map((movie) => (
              <CommandItem
                key={movie.value}
                value={movie.value}
                onSelect={(currentValue) => {
                  router.push(
                    pathname + "?" + createQueryString("type", currentValue),
                  );
                  setOpen(false);
                }}
                defaultChecked={movie.value === categoryType}
                className="hover:cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    categoryType === movie.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {movie.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
