
import React from "react";
import { Play } from "lucide-react";
import { VideoTutorial } from "../../../types/tutorial";

interface VideoCardProps {
  video: VideoTutorial;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  return (
    <div 
      className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in flex items-center space-x-3"
      style={{ animationDelay: `${index * 100 + 600}ms` }}
      onClick={() => video.url && window.open(video.url, "_blank")}
    >
      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
        <Play size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-1">{video.title}</h4>
        <p className="text-sm text-muted-foreground mb-1">{video.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">{video.time}</span>
            {video.difficulty && (
              <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px]">
                {video.difficulty}
              </span>
            )}
          </div>
          {video.views && (
            <span className="text-muted-foreground">{video.views.toLocaleString()} views</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
