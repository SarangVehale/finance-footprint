
import React from "react";
import { Play, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VideoHeaderProps {
  videoNotFound: boolean;
  handleBackClick: () => void;
}

/**
 * VideoHeader - Displays the header when video is not found
 * 
 * @param videoNotFound - Boolean indicating if video was not found
 * @param handleBackClick - Function to handle back button click
 */
const VideoHeader: React.FC<VideoHeaderProps> = ({ 
  videoNotFound, 
  handleBackClick 
}) => {
  if (!videoNotFound) return null;
  
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <Play className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-bold mb-2">Video Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The video tutorial you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleBackClick}
        className="bg-primary text-white px-4 py-2 rounded-lg"
      >
        Back to Tutorials
      </button>
    </div>
  );
};

export default VideoHeader;
