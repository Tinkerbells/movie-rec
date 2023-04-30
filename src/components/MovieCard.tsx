import { type FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { api } from "@/utils/api";
import { BlurImage } from "./BlurImage";
import { formatDescription } from "@/helpers";
import { type RecommendationType } from "@/types/recommendation";
interface MovieCardProps {
  movie: RecommendationType;
}
export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  // const { data, isLoading } = api.movie.tmdbSearch.useQuery({
  //   query: movie.title,
  // });
  const { data, isLoading } = api.movie.omdbSearch.useQuery({
    title: movie.title,
  });
  return (
    <Card key={movie.title} className="flex w-full max-w-xl items-center">
      {isLoading ? (
        <div className="max-w-32 h-32 p-2 md:h-40 md:w-28">
          <div className="flex h-full w-20 items-center justify-center rounded-lg bg-secondary text-secondary-foreground md:w-24">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      ) : (
        <>
          {data?.posterPath && data.imdbId ? (
            <a
              className="flex items-center p-2"
              // href={`https://www.themoviedb.org/movie/${data.tmdbId}`}
              href={`https://www.imdb.com/title/${data.imdbId}`}
            >
              <figure className="w-20 md:w-24">
                <BlurImage
                  src={data.posterPath}
                  alt={movie.title}
                  // loader={TmdbImageLoader}
                  width={300}
                  height={300}
                />
              </figure>
            </a>
          ) : (
            <div className="max-w-32 h-32 p-2 md:h-40 md:w-28">
              <div className="flex h-full w-20 items-center justify-center rounded-lg bg-secondary text-secondary-foreground md:w-24">
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
            {/* {data?.releaseDate ? formatDate(data?.releaseDate) : "??"} */}
            {data?.releaseDate ? data.releaseDate : "??"}
          </p>
        </CardTitle>
        <CardDescription className="hidden md:flex">
          {/* {data?.description ? formatDescription(data?.description) : "??"} */}
          {data?.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
