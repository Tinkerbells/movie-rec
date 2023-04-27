import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getMovie } from "@/services";

export const tmdbRouter = createTRPCRouter({
  search: protectedProcedure
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
});
