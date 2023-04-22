import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-accent">
      <div></div>
      <div>
        {!session ? (
          // Handle unauthenticated state, e.g. render a SignIn component
          <SignInButton />
        ) : (
          <SignOutButton />
        )}
      </div>
      <ThemeToggle />
    </div>
  );
};
