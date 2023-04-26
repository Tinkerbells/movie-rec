import { FC } from "react";
import { RecommendationType } from "./Recommendations";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "@/utils/api";
import { BlurImage } from "./BlurImage";
import { TmdbImageLoader } from "./TmdbImageLoader";
import { formatDate, formatDescription } from "@/helpers";
interface MovieCardProps {
  movie: RecommendationType;
}
export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const { data, isLoading } = api.tmdb.search.useQuery({
    query: movie.title,
  });
  return (
    <Card key={movie.title} className="flex w-full max-w-xl items-center">
      {isLoading ? (
        <div className="h-32 p-2">
          <div className="flex h-full w-24 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
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
              <figure className="w-24">
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
              <div className="flex h-full w-24 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
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
            {data?.releaseDate && formatDate(data?.releaseDate!)}
          </p>
        </CardTitle>
        <CardDescription>
          {formatDescription(movie.description)}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
