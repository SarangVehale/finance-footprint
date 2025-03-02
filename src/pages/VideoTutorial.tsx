
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../components/MobileLayout";
import { ChevronLeft, Play, Eye, Calendar, User } from "lucide-react";
import { videoTutorials } from "../config/tutorials";

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

  if (!video && !isLoading) {
    return (
      <MobileLayout
        title="Video Not Found"
        leftIcon={<ChevronLeft onClick={() => navigate(-1)} />}
      >
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <Play className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Video Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The video tutorial you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/settings")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Back to Settings
          </button>
        </div>
      </MobileLayout>
    );
  }

  const renderVideoEmbed = () => {
    if (!video || !video.url) return null;
    
    // Extract video ID from YouTube URL (this is a simplified example)
    const getYoutubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };
    
    const videoId = getYoutubeId(video.url);
    
    if (!videoId) return (
      <div className="aspect-video bg-muted flex items-center justify-center rounded-lg mb-4">
        <a 
          href={video.url} 
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
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <MobileLayout
      title={isLoading ? "Loading..." : video?.title || "Video Tutorial"}
      leftIcon={<ChevronLeft onClick={() => navigate(-1)} />}
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
      ) : video ? (
        <div className="p-4">
          {renderVideoEmbed()}
          
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
      ) : null}
    </MobileLayout>
  );
};

// This component will render different content based on the video ID
const VideoContent: React.FC<{ videoId: string }> = ({ videoId }) => {
  switch (videoId) {
    case "app-walkthrough":
      return <AppWalkthroughContent />;
    case "reports-exports":
      return <ReportsExportsContent />;
    case "mobile-tips":
      return <MobileTipsContent />;
    case "budget-analysis":
      return <BudgetAnalysisContent />;
    case "data-viz":
      return <DataVizContent />;
    case "importing-data":
      return <ImportingDataContent />;
    default:
      return <DefaultVideoContent />;
  }
};

// Individual video content components
const AppWalkthroughContent: React.FC = () => (
  <div>
    <p>
      This comprehensive walkthrough covers all essential features of Finance Footprint.
      Follow along as we explore the entire application interface and functionality.
    </p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction</li>
      <li>01:15 - Dashboard Overview</li>
      <li>03:42 - Adding Transactions</li>
      <li>05:38 - Categories and Budgeting</li>
      <li>08:20 - Reports and Analytics</li>
      <li>11:05 - Settings and Customization</li>
      <li>13:30 - Mobile Features</li>
    </ul>
  </div>
);

// Default video content as a fallback
const DefaultVideoContent: React.FC = () => (
  <div>
    <p>This video will guide you through important features and functionality in Finance Footprint.</p>
    <p>Follow along with the demonstration to learn useful tips and techniques for managing your finances effectively.</p>
  </div>
);

// Additional video content components
const ReportsExportsContent: React.FC = () => (
  <div>
    <p>Learn how to generate comprehensive financial reports and export your data for use in other applications.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Reports</li>
      <li>01:30 - Creating Custom Reports</li>
      <li>03:45 - Exporting to Excel/CSV</li>
      <li>05:20 - Sharing Reports Securely</li>
      <li>06:50 - Tips for Tax Time Reports</li>
    </ul>
  </div>
);

const MobileTipsContent: React.FC = () => (
  <div>
    <p>Discover how to make the most of Finance Footprint on your mobile device with these tips and tricks.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Mobile Interface Overview</li>
      <li>01:10 - Quick Transaction Entry</li>
      <li>02:35 - Using Receipt Scanning</li>
      <li>04:15 - Offline Mode Features</li>
      <li>05:30 - Widget Configuration</li>
    </ul>
  </div>
);

const BudgetAnalysisContent: React.FC = () => (
  <div>
    <p>Deep dive into advanced budget analysis techniques to gain better insights into your spending patterns.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Budget Analysis</li>
      <li>01:45 - Trend Identification</li>
      <li>04:10 - Comparative Analysis</li>
      <li>06:30 - Using Filters and Tags</li>
      <li>09:15 - Setting Up Alerts and Notifications</li>
      <li>11:00 - Insights and Recommendations</li>
    </ul>
  </div>
);

const DataVizContent: React.FC = () => (
  <div>
    <p>Learn how to use data visualization techniques to better understand your financial data.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Data Visualization</li>
      <li>01:20 - Understanding Chart Types</li>
      <li>03:40 - Customizing Your View</li>
      <li>05:15 - Digging Deeper with Filters</li>
      <li>07:30 - Saving and Sharing Visualizations</li>
      <li>09:00 - Data Insights and Interpretations</li>
    </ul>
  </div>
);

const ImportingDataContent: React.FC = () => (
  <div>
    <p>Follow this guide to import financial data from bank statements or other financial applications.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Data Importing</li>
      <li>01:15 - Supported File Formats</li>
      <li>02:30 - Bank Statement Import Process</li>
      <li>04:40 - Handling Duplicate Entries</li>
      <li>05:55 - Categorizing Imported Transactions</li>
      <li>06:45 - Troubleshooting Common Issues</li>
    </ul>
  </div>
);

export default VideoTutorialPage;
