import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { openai } from "@/lib/opeanai";
import { generateGenrePrompt, generateSimilarPrompt } from "@/helpers";

export const recommendationRouter = createTRPCRouter({
  genre: protectedProcedure
    .input(z.object({ genres: z.string().array(), query: z.string() }))
    .query(async ({ input }) => {
      const content = generateGenrePrompt(input.genres, input.query);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
      });
      return JSON.parse(completion.data.choices[0]?.message?.content!);
    }),
  similar: protectedProcedure
    .input(z.object({ favorites: z.string().array() }))
    .query(async ({ input }) => {
      const content = generateSimilarPrompt(input.favorites);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
      });
      return JSON.parse(completion.data.choices[0]?.message?.content!);
    }),
});
