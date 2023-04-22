import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  );
};
