import { FC } from "react";
import { MovieCard } from "./MovieCard";
import { messageType } from "@/types/message";
import { Button } from "./ui/button";
import { useMessageStore } from "@/store/messagesStore";
import { RotateCw } from "lucide-react";
import { UPDATE_PROMPT } from "@/consts";
export type RecommendationType = {
  title: string;
  description: string;
};
interface RecommendationsProps {
  refetch: () => void;
  recommendations: RecommendationType[];
  assistantMessage: messageType;
}
export const Recommendations: FC<RecommendationsProps> = ({
  refetch,
  recommendations,
  assistantMessage,
}) => {
  const { messages, setMessages } = useMessageStore((state) => ({
    messages: state.messages,
    setMessages: state.setMessages,
  }));
  const handleClick = () => {
    const temp = messages;
    temp.push(assistantMessage, { role: "user", content: UPDATE_PROMPT });
    setMessages(temp);
    refetch();
  };

  return (
    <div>
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Recommendations
      </h3>
      <div className="mt-4 flex flex-col gap-2.5 rounded-lg border p-4">
        {recommendations.slice(0, 5).map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
        <Button type="button" onClick={handleClick} variant={"outline"}>
          <RotateCw className="mr-2 h-4 w-4" />
          Update
        </Button>
      </div>
    </div>
  );
};
