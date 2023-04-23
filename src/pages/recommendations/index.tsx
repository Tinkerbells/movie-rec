import { RecommendationMenu } from "@/components";
import { NextPage } from "next";

const RecommendationsPage: NextPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Get recommendation using this methods
      </h3>
      <RecommendationMenu />
    </div>
  );
};
export default RecommendationsPage;
