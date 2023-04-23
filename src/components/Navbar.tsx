import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-accent px-5">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
        MOVIE-REC
      </h1>
      <div className="flex items-center justify-between gap-8">
        <div>
          {!session ? (
            // Handle unauthenticated state, e.g. render a SignIn component
            <SignInButton>Sign in</SignInButton>
          ) : (
            <SignOutButton />
          )}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
