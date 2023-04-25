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
    <div className="flex flex-col gap-2.5">
      {recommendations.map((movie, index) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};
