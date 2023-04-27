import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { openai } from "@/lib/opeanai";
import { RecommendationType } from "@/types/recommendation";

export const recommendationRouter = createTRPCRouter({
  getRecommendations: protectedProcedure
    .input(
      z.object({
        messages: z.object({ role: z.string(), content: z.string() }).array(),
      })
    )
    .query(async ({ input }) => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // @ts-ignore
        messages: input.messages,
      });
      const recommendations: RecommendationType[] = JSON.parse(
        completion.data.choices[0]?.message?.content!
      );
      return {
        assistantMessage: completion.data.choices[0]?.message,
        recommendations: recommendations,
      };
    }),
});
