
import React from "react";
import { CircularProgress } from "@/components/ui/circular-progress";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-safe">
      <div className="w-20 h-20 mb-4">
        <CircularProgress />
      </div>
      <h1 className="text-2xl font-semibold text-foreground">Loading...</h1>
    </div>
  );
};

export default Loading;
