import { type FC } from "react";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import { type RecommendationType } from "@/types/recommendation";

interface RecommendationsProps {
  recommendations: RecommendationType[];
  getBack: () => void;
  handleUpdate: () => void;
  isLoading: boolean;
}
export const Recommendations: FC<RecommendationsProps> = ({
  recommendations,
  getBack,
  handleUpdate,
  isLoading,
}) => {
  return (
    <div className="mt-24 flex w-80 flex-col items-center gap-4 md:mt-52 md:w-[700px]">
      <Button onClick={getBack} className="w-fit" variant={"ghost"}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to form
      </Button>
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Recommendations
      </h3>
      <div className="flex flex-col gap-2.5 rounded-lg border p-4">
        {recommendations.slice(0, 5).map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
        <Button
          type="button"
          onClick={handleUpdate}
          variant={"outline"}
          isLoading={isLoading}
        >
          {isLoading ? null : <RotateCw className="mr-2 h-4 w-4" />}
          Update
        </Button>
      </div>
    </div>
  );
};
