import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button
      variant="outline"
      className="max-w-sm"
      onClick={() => void signIn()}
    >
      Sign in
    </Button>
  );
};
