import { z } from "zod";

import {
  createTRPCRouter,
  protectedAndLimitedProcedure,
} from "@/server/api/trpc";
import { openai } from "@/lib/opeanai";
import type { RecommendationType } from "@/types/recommendation";
import { type ChatCompletionRequestMessage } from "openai";

export const recommendationRouter = createTRPCRouter({
  getRecommendations: protectedAndLimitedProcedure
    .input(
      z.object({
        messages: z.object({ role: z.string(), content: z.string() }).array(),
      })
    )
    .query(async ({ input }) => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: input.messages as ChatCompletionRequestMessage[],
        temperature: 0.8,
      });

      const recommendations = JSON.parse(
        completion.data.choices[0]?.message?.content! // eslint-disable-line
      ) as RecommendationType[];
      return {
        assistantMessage: completion.data.choices[0]?.message,
        recommendations: recommendations,
      };
    }),
});
