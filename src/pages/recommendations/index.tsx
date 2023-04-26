import { Recommendations } from "@/components";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useMessageStore } from "@/store/messagesStore";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RecommendationsPage = () => {
  const router = useRouter();
  const messages = useMessageStore((state) => state.messages);

  const { data, isFetching, isLoading, error, refetch } =
    api.recommendation.getRecommendations.useQuery(
      {
        messages: messages,
      },
      {
        enabled: messages.length >= 1,
      }
    );

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong!",
      description: error.message,
      action: (
        <ToastAction altText="Try again" onClick={() => refetch()}>
          Try again
        </ToastAction>
      ),
    });
  }
  // Redirect back to dashboard if no date specified
  useEffect(() => {
    if (messages.length < 1) {
      router.push("/dashboard");
    }
  });

  return (
    <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
      {(!isLoading || !isFetching) && data ? (
        <div className="mb-10 mt-40 flex flex-col gap-4 ">
          <Recommendations
            refetch={refetch}
            recommendations={data.recommendations}
            assistantMessage={data?.assistantMessage!}
          />
        </div>
      ) : (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
    </div>
  );
};

export default RecommendationsPage;
