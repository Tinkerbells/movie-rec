import { RecommendationMenu, Recommendations } from "@/components";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { generateUpdatePrompt } from "@/helpers";
import { messageType } from "@/types/message";
import { RecommendationType } from "@/types/recommendation";
import { api } from "@/utils/api";
import { useState } from "react";

const RecommendationsPage = () => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>(
    []
  );
  const { data, isFetching, refetch } =
    api.recommendation.getRecommendations.useQuery(
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
          toast({
            variant: "destructive",
            title: "Something went wrong!",
            description: error.message,
            action: (
              <ToastAction
                altText="Try again"
                onClick={() => {
                  refetch();
                }}
              >
                Try again
              </ToastAction>
            ),
          });
        },
      }
    );

  const handleUpdate = () => {
    if (data?.assistantMessage) {
      console.log(data.assistantMessage);
      setMessages([
        ...messages,
        data.assistantMessage!,
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
    <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
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
  );
};

export default RecommendationsPage;
