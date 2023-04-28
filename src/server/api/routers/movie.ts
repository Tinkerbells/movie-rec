import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getMovie } from "@/services";
import { getOmdbMovie } from "@/services/omdb";

export const movieRouter = createTRPCRouter({
  tmdbSearch: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const data = await getMovie(input.query);
      return {
        posterPath: data.results[0]?.poster_path,
        description: data.results[0]?.overview,
        releaseDate: data.results[0]?.release_date,
        tmdbId: data.results[0]?.id,
      };
    }),

  omdbSearch: protectedProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const data = await getOmdbMovie(input.title);
      return {
        posterPath: data.Poster,
        description: data.Plot,
        releaseDate: data.Released,
        imdbId: data.imdbID,
      };
    }),
});
