import { Logo } from "./navbar/logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex h-16 items-center justify-center space-x-2 bg-background text-center">
      <Logo className="text-lg" />
      <span className="text-sm text-muted-foreground">
        &copy; nubicoder | M. Harliansyah Wardana {currentYear}
      </span>
    </footer>
  );
};
