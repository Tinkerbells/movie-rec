import { FC } from "react";
import { RecommendationType } from "./Recommendations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { api } from "@/utils/api";
import { BlurImage } from "./BlurImage";
import { TmdbImageLoader } from "./TmdbImageLoader";
import { formatDate } from "@/helpers";
interface MovieCardProps {
  movie: RecommendationType;
}
export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { data, error, isLoading } = api.tmdb.search.useQuery({
    query: movie.title,
  });
  return (
    <Card key={movie.title} className="flex w-full max-w-xl items-center">
      {isLoading ? (
        <div className="h-32 p-2">
          <div className="flex h-full w-20 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      ) : (
        <>
          {data?.posterPath ? (
            <a
              className="flex cursor-pointer items-center p-2"
              href={`https://www.themoviedb.org/movie/${data.tmdbId}`}
            >
              <figure className="h-full w-20 items-center">
                <BlurImage
                  src={data.posterPath}
                  alt={movie.title}
                  loader={TmdbImageLoader}
                  width={300}
                  height={300}
                />
              </figure>
            </a>
          ) : (
            <div className="h-32 p-2">
              <div className="flex h-full w-20 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <ImageIcon />
              </div>
            </div>
          )}
        </>
      )}
      <CardHeader>
        <CardTitle>
          {movie.title}
          <p className="mt-1 text-sm font-normal text-muted-foreground">
            {formatDate(data?.releaseDate!)}
          </p>
        </CardTitle>
        <CardDescription>{movie.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
