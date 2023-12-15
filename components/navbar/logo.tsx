import { cn } from "@/lib/utils";

type LogoProps = React.ComponentPropsWithoutRef<"h1">;

export const Logo = ({ className }: LogoProps) => {
  return (
    <h1 className={cn("text-2xl font-bold", className)}>
      Flix<span className="text-destructive">Nest</span>
    </h1>
  );
};
