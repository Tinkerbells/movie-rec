import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-accent bg-card px-5">
      <h1 className="hidden scroll-m-20 text-2xl font-extrabold tracking-tight md:flex md:text-4xl lg:text-3xl">
        MOVIE-REC
      </h1>
      <div className="flex w-full items-center justify-between gap-8 md:w-fit">
        <div>
          {!session?.user ? (
            // Handle unauthenticated state, e.g. render a SignIn/SignOut component
            <SignInButton />
          ) : (
            <SignOutButton />
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
