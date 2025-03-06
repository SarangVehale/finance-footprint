
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout";
import { ChevronLeft } from "lucide-react";
import { gettingStarted, advancedTutorials } from "../../config/tutorials";
import { Tutorial } from "../../types/tutorial";
import TutorialHeader from "./components/TutorialHeader";
import TutorialContent from "./components/TutorialContent";

/**
 * TutorialPage - Displays a single tutorial with its content
 * 
 * Uses parameters from the URL to find and display the correct tutorial.
 * Shows loading state while fetching the tutorial content.
 */
const TutorialPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Find the tutorial from all available tutorials
  const allTutorials = [...gettingStarted, ...advancedTutorials];
  const tutorial = allTutorials.find(t => t.id === id);

  // Handle loading state
  useEffect(() => {
    // Simulate loading the tutorial content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Navigate back to tutorials section instead of settings
  const handleBackClick = () => {
    navigate("/settings", { state: { openModal: "tutorials" } });
  };

  return (
    <MobileLayout
      title={isLoading ? "Loading..." : tutorial?.title || "Tutorial"}
      leftIcon={<ChevronLeft onClick={handleBackClick} />}
    >
      {(!tutorial && !isLoading) ? (
        <TutorialHeader 
          tutorial={tutorial} 
          isLoading={isLoading} 
          handleBackClick={handleBackClick} 
        />
      ) : (
        tutorial && (
          <TutorialContent 
            tutorial={tutorial} 
            isLoading={isLoading} 
          />
        )
      )}
    </MobileLayout>
  );
};

export default TutorialPage;
