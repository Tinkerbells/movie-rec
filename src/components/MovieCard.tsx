import { FC } from "react";
import { RecommendationType } from "./Recommendations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { api } from "@/utils/api";
interface MovieCardProps {
  movie: RecommendationType;
}
export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { data, error, isLoading } = api.tmdb.search.useQuery({
    query: movie.title,
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card key={movie.title} className="flex">
          <CardContent>
            {data ? (
              <Image
                width={100}
                height={100}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w300/${data}`}
              />
            ) : null}
          </CardContent>
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>{movie.description}</CardDescription>
          </CardHeader>
        </Card>
      )}
    </>
  );
};
