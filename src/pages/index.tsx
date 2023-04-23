import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { RecommendationMenu } from "@/components";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.user) push("/recommendations");
  }, [session]);

  return (
    <div className="flex max-w-5xl flex-col items-center gap-4">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find movie recommendations using AI
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Looking for the next movie to watch but don't know where to start?
          With this app, you can easily find the next movie to watch by picking
          your favorite genres, or find similar movies based on your favorites.
        </p>
      </div>
      <Button
        onClick={() => signIn()}
        variant={"outline"}
        className="w-full max-w-sm"
      >
        Get started
      </Button>
    </div>
  );
};

export default Home;
