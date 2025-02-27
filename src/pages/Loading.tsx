
import React from "react";
import { CircularProgress } from "@/components/ui/circular-progress";
import { DollarSign } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-safe">
      <div className="relative w-32 h-32 mb-4">
        {/* Dancing money animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
        
        {/* Multiple dancing dollar symbols */}
        <div className="absolute left-0 top-1/4 animate-dance-1">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <div className="absolute right-0 top-0 animate-dance-2">
          <div className="w-8 h-8 bg-mint-300/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-mint-500" />
          </div>
        </div>
        
        <div className="absolute left-1/4 bottom-0 animate-dance-3">
          <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <div className="absolute right-1/4 bottom-1/4 animate-dance-4">
          <div className="w-7 h-7 bg-mint-400/15 rounded-full flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-mint-400" />
          </div>
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold text-foreground">Loading...</h1>
      <p className="text-muted-foreground animate-pulse">Counting your money</p>
    </div>
  );
};

export default Loading;
