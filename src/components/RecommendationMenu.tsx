import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimilarityMenu } from "./SimilarityMenu";
import { GenreQueryMenu } from "./GenreQueryMenu";
import { messageType } from "@/types/message";
import { FC } from "react";

export interface MenuProps {
  setMessage: (content: string) => void;
  isLoading: boolean;
}
export const RecommendationMenu: FC<MenuProps> = ({
  setMessage,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Get recommendations using this methods
      </h3>
      <Tabs defaultValue="genres" className="max-w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="genres">By genres and query</TabsTrigger>
          <TabsTrigger value="similar">By similarity</TabsTrigger>
        </TabsList>
        <GenreQueryMenu setMessage={setMessage} isLoading={isLoading} />
        <SimilarityMenu setMessage={setMessage} isLoading={isLoading} />
      </Tabs>
    </div>
  );
};
