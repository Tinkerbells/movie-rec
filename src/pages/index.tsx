import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RecommendationMenu, SignInButton } from "@/components";
const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
      {!session ? (
        <SignInButton>Get started</SignInButton>
      ) : (
        <RecommendationMenu />
      )}
    </div>
  );
};

export default Home;
