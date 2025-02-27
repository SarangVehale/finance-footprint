
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background p-safe">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome</h1>
        <p className="text-center text-muted-foreground mb-8">
          Track your finances, stay organized, and achieve your financial goals.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
