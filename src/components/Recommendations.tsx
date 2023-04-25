import { FC } from "react";
import { MovieCard } from "./MovieCard";
export type RecommendationType = {
  title: string;
  description: string;
};
interface RecommendationsProps {
  recommendations: RecommendationType[];
}
export const Recommendations: FC<RecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border p-4">
      {recommendations.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};
