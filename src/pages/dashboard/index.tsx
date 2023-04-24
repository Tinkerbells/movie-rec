import { RecommendationMenu } from "@/components";

const Dashboard = () => {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
          Get recommendation using this methods
        </h3>
        <RecommendationMenu />
      </div>
    </div>
  );
};

export default Dashboard;
