
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Wallet, ChartLineUp, Calendar, Settings } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);

  const features = [
    {
      icon: <Wallet className="w-12 h-12 text-primary" />,
      title: "Track Expenses",
      description: "Keep track of your daily spending and income"
    },
    {
      icon: <ChartLineUp className="w-12 h-12 text-primary" />,
      title: "Analytics",
      description: "Visualize your financial patterns and trends"
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary" />,
      title: "History",
      description: "Review past transactions and plan ahead"
    },
    {
      icon: <Settings className="w-12 h-12 text-primary" />,
      title: "Customizable",
      description: "Personalize categories and preferences"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint-300/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-mint-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center p-6 z-10">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-float">
            <Wallet className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -inset-4 bg-primary/5 rounded-full animate-pulse-soft" />
        </div>

        {/* Title with Gradient */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-mint-400 bg-clip-text text-transparent animate-fade-in">
          Finance Footprint
        </h1>

        {/* Feature Carousel */}
        <div className="relative w-full max-w-md mb-12 h-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center transition-all duration-500 transform ${
                index === currentStep
                  ? "opacity-100 translate-x-0"
                  : index < currentStep
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex space-x-2 mb-8">
          {features.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "bg-primary w-4"
                  : "bg-primary/30"
              }`}
            />
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleStart}
          className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl overflow-hidden transition-all hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-mint-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
