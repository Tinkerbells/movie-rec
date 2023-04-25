"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimilarityMenu } from "./SimilarityMenu";
import { GenreQueryMenu } from "./GenreQueryMenu";
export const RecommendationMenu = () => {
  return (
    <Tabs defaultValue="genres">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="genres">By genres and query</TabsTrigger>
        <TabsTrigger value="similar">By similarity</TabsTrigger>
      </TabsList>
      <GenreQueryMenu />
      <SimilarityMenu />
    </Tabs>
  );
};
