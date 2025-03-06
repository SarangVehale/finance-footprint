
import React from "react";
import { BookOpen, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tutorial } from "@/types/tutorial";

interface TutorialHeaderProps {
  tutorial: Tutorial | undefined;
  isLoading: boolean;
  handleBackClick: () => void;
}

/**
 * TutorialHeader - Displays the header section of a tutorial page
 * 
 * @param tutorial - The tutorial object to display
 * @param isLoading - Boolean indicating if tutorial is loading
 * @param handleBackClick - Function to handle back button click
 */
const TutorialHeader: React.FC<TutorialHeaderProps> = ({ 
  tutorial, 
  isLoading, 
  handleBackClick 
}) => {
  if (!tutorial && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">Tutorial Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The tutorial you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleBackClick}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Back to Tutorials
        </button>
      </div>
    );
  }
  
  return null;
};

export default TutorialHeader;
