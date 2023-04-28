import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimilarityMenu } from "./SimilarityMenu";
import { GenreQueryMenu } from "./GenreQueryMenu";
import { type FC } from "react";

export interface MenuProps {
  setMessage: (content: string) => void;
  isLoading: boolean;
}
export const RecommendationMenu: FC<MenuProps> = ({
  setMessage,
  isLoading,
}) => {
  return (
    <div className="mt-10 flex w-80 flex-col gap-4 md:w-[450px]">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Get recommendations using this methods
      </h3>
      <Tabs defaultValue="similar" className="max-w-[450px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="similar">By similarity</TabsTrigger>
          <TabsTrigger value="genres">By genres and query</TabsTrigger>
        </TabsList>
        <SimilarityMenu setMessage={setMessage} isLoading={isLoading} />
        <GenreQueryMenu setMessage={setMessage} isLoading={isLoading} />
      </Tabs>
    </div>
  );
};
