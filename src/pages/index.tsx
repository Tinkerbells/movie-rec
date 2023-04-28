import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
      <div className="flex max-w-5xl flex-col items-center gap-8">
        <div className="flex max-w-[300px] flex-col items-center md:max-w-full">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Find movie, series or anime recommendations using AI
          </h1>
          <p className="text-center text-sm leading-7 md:text-lg [&:not(:first-child)]:mt-6">
            Looking for the next movie and series to watch but don't know where
            to start? With this app, you can easily find the next movie or
            series to watch by picking your favorite genres or find similar
            based on your favorites.
          </p>
        </div>
        <Button
          onClick={() => void signIn()}
          variant={"outline"}
          className="w-full max-w-xs md:max-w-sm"
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Home;
