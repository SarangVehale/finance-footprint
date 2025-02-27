
import React, { useEffect, useState } from "react";
import { DollarSign, Coins, PiggyBank, Wallet } from "lucide-react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timer);
        return 100;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-safe overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80">
        <div className="absolute top-1/4 left-1/4 animate-float-fast">
          <PiggyBank className="text-mint-300/30 w-16 h-16" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float animation-delay-400">
          <Wallet className="text-mint-400/20 w-12 h-12" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow animation-delay-800">
          <Coins className="text-primary/20 w-14 h-14" />
        </div>
      </div>

      {/* Main money rain animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className={`absolute animate-money-fall animation-delay-${i * 200}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20 + 5}%`,
              animationDuration: `${Math.random() * 3 + 6}s`,
            }}
          >
            <div 
              className={`w-10 h-10 bg-gradient-to-br ${
                i % 3 === 0 ? "from-primary/30 to-mint-400/50" : 
                i % 3 === 1 ? "from-mint-300/30 to-mint-500/50" : 
                "from-mint-400/30 to-primary/50"
              } rounded-full flex items-center justify-center animate-spin-slow`}
            >
              <DollarSign className={`w-6 h-6 ${
                i % 3 === 0 ? "text-primary" : 
                i % 3 === 1 ? "text-mint-500" : 
                "text-mint-400"
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center">
        <div className="mb-8 relative">
          <div className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden">
            {/* Coins spinning around */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute"
                style={{ 
                  transform: `rotate(${i * 60}deg)`, 
                  transformOrigin: 'center'
                }}
              >
                <div 
                  className={`animate-orbit`}
                  style={{ animationDelay: `${i * -0.6}s` }}
                >
                  <div className={`w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-soft`}>
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Center bouncing coin */}
            <div className="animate-bounce-gentle">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-mint-400 rounded-full flex items-center justify-center shadow-lg">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3">Loading...</h1>
        <p className="text-muted-foreground mb-6">Your money is on the way</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-background relative rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-gradient-to-r from-primary to-mint-400 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
      </div>
    </div>
  );
};

export default Loading;
