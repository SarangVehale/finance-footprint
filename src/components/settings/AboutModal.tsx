
import React from "react";

const AboutModal: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-mint-500 animate-float-slow">Finance Footprint</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Version 1.0.0</p>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
        A simple, effective way to track your finances and manage your budget.
        Built with ❤️ for a better financial future.
      </p>
      <div className="pt-4 text-center">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">© 2024 Finance Footprint</p>
      </div>
    </div>
  );
};

export default AboutModal;
