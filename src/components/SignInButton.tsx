import { ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";

export const SignInButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button variant="outline" onClick={() => signIn()}>
      {children}
    </Button>
  );
};
