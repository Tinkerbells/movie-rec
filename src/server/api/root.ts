import { createTRPCRouter } from "@/server/api/trpc";
import { recommendationRouter } from "./routers/recommendation";
import { tmdbRouter } from "./routers/tmdb";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recommendation: recommendationRouter,
  tmdb: tmdbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
