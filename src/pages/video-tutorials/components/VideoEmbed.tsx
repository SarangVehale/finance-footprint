
import React from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  url: string;
  title: string;
}

/**
 * VideoEmbed - Renders a YouTube video embed or a link
 * 
 * @param url - URL of the video
 * @param title - Title of the video
 */
const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title }) => {
  // Extract video ID from YouTube URL
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYoutubeId(url);
  
  if (!videoId) return (
    <div className="aspect-video bg-muted flex items-center justify-center rounded-lg mb-4">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <Play size={48} className="text-primary" />
      </a>
    </div>
  );
  
  return (
    <div className="aspect-video mb-4">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoEmbed;
