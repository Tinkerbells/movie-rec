import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-accent bg-card px-5">
      <Link href="/">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight md:text-4xl lg:text-3xl">
          MOVIE-REC
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-8">
        <div>
          {!session ? (
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
