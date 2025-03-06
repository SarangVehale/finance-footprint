
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../../components/MobileLayout";
import { ChevronLeft, Calendar, Eye } from "lucide-react";
import { videoTutorials } from "../../config/tutorials";
import VideoHeader from "./components/VideoHeader";
import VideoEmbed from "./components/VideoEmbed";
import VideoContent from "./components/VideoContent";

/**
 * VideoTutorialPage - Displays a video tutorial with its content
 * 
 * Uses parameters from the URL to find and display the correct video.
 * Shows loading state while fetching the video content.
 */
const VideoTutorialPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Find the video tutorial
  const video = videoTutorials.find(v => v.id === id);

  useEffect(() => {
    // Simulate loading the video content
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
      title={isLoading ? "Loading..." : video?.title || "Video Tutorial"}
      leftIcon={<ChevronLeft onClick={handleBackClick} />}
    >
      {isLoading ? (
        <div className="p-4 space-y-4">
          <div className="aspect-video bg-muted animate-pulse rounded-lg"></div>
          <div className="h-8 bg-muted animate-pulse rounded mt-4"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
          <div className="flex space-x-4 mt-4">
            <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      ) : !video ? (
        <VideoHeader videoNotFound={true} handleBackClick={handleBackClick} />
      ) : (
        <div className="p-4">
          {video.url && <VideoEmbed url={video.url} title={video.title} />}
          
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          <p className="text-muted-foreground mb-4">{video.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{video.time}</span>
            </div>
            
            {video.views && (
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                <span>{video.views.toLocaleString()} views</span>
              </div>
            )}
            
            {video.difficulty && (
              <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                {video.difficulty}
              </div>
            )}
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h3>What you'll learn in this video</h3>
            <VideoContent videoId={video.id} />
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="text-base font-medium mb-2">Next Steps</h4>
              <p className="text-sm">
                After watching this video, you might want to explore:
              </p>
              <ul className="text-sm mt-2">
                <li>Related tutorials in our guide section</li>
                <li>Practice what you've learned in the app</li>
                <li>Share your feedback to help us improve</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default VideoTutorialPage;
