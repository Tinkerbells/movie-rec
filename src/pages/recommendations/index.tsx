"use client";
import { RecommendationMenu, Recommendations } from "@/components";
import { generateUpdatePrompt } from "@/helpers";
import { type messageType } from "@/types/message";
import { type RecommendationType } from "@/types/recommendation";
import { api } from "@/utils/api";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import Head from "next/head";
const RecommendationsPage = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  const { data, isFetching } = api.recommendation.getRecommendations.useQuery(
    {
      messages: messages,
    },
    {
      onSuccess: (data) => {
        setRecommendations(data.recommendations);
      },
      enabled: messages.length >= 1,
      retry: false,
      onError: (error) => {
        console.log(error);
        if (error.data?.code === "TOO_MANY_REQUESTS") {
          toast.error("Too many request! Please try again later");
        } else {
          toast.error("Something went wrong! Please try again");
        }
      },
    }
  );

  const handleUpdate = () => {
    if (data?.assistantMessage) {
      setMessages([
        ...messages,
        data.assistantMessage,
        { role: "user", content: generateUpdatePrompt() },
      ]);
    }
  };

  const getBack = () => {
    setMessages([]);
    setRecommendations([]);
  };

  const setMessage = (content: string) => {
    setMessages([{ role: "user", content: content }]);
  };

  return (
    <>
      <Head>
        <title>Recommendations</title>
      </Head>
      <div
        className={cn(
          "relative flex h-screen justify-center overflow-x-hidden pb-20",
          recommendations.length < 1 && messages.length <= 1
            ? "items-center"
            : "items-start"
        )}
      >
        {recommendations.length < 1 && messages.length <= 1 ? (
          <RecommendationMenu setMessage={setMessage} isLoading={isFetching} />
        ) : (
          <Recommendations
            handleUpdate={handleUpdate}
            recommendations={recommendations}
            getBack={getBack}
            isLoading={isFetching}
          />
        )}
      </div>
    </>
  );
};

export default RecommendationsPage;
