import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <Button variant="outline" onClick={() => void signOut()}>
      Sign out
    </Button>
  );
};
