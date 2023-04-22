import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      Sign out
    </Button>
  );
};
