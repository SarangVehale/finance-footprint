
import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Video,
  Download,
  Check,
  Search,
  Filter,
  Book,
  PieChart,
  DollarSign,
  TrendingUp,
  Bookmark
} from "lucide-react";

// Import components
import TutorialCard from "./tutorials/TutorialCard";
import VideoCard from "./tutorials/VideoCard";
import ResourceCard from "./tutorials/ResourceCard";

// Import data from config files
import { 
  gettingStarted, 
  advancedTutorials, 
  videoTutorials, 
  downloadableResources 
} from "../../config/tutorials";

const TutorialsModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"guides" | "videos" | "resources">("guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  
  const filteredTutorials = [...gettingStarted, ...advancedTutorials].filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || tutorial.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  const filteredVideos = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || 
                            (video.difficulty && video.difficulty.toLowerCase() === difficultyFilter.toLowerCase());
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <section>
        <div className="rounded-xl bg-primary/5 p-5 mb-6 text-center">
          <GraduationCap className="w-12 h-12 mx-auto text-primary mb-3 animate-float-slow" />
          <h3 className="text-lg font-medium mb-2">Tutorials & Guides</h3>
          <p className="text-muted-foreground text-sm mb-4">Learn how to make the most of Finance Footprint with our step-by-step guides</p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button 
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === "guides" ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveTab("guides")}
            >
              <BookOpen size={18} className="text-primary mb-1" />
              <span className="text-xs">Guides</span>
            </button>
            <button 
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === "videos" ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              <Video size={18} className="text-primary mb-1" />
              <span className="text-xs">Videos</span>
            </button>
            <button 
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === "resources" ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
              onClick={() => setActiveTab("resources")}
            >
              <Download size={18} className="text-primary mb-1" />
              <span className="text-xs">Resources</span>
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tutorials..."
                className="w-full pl-9 pr-3 py-1.5 bg-background rounded-lg text-sm border border-input focus:border-primary focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-1 bg-background rounded-lg border border-input px-2 py-1">
              <Filter size={14} className="text-muted-foreground" />
              <select 
                className="text-xs bg-transparent border-none focus:ring-0 focus:outline-none"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {activeTab === "guides" && (
        <>
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium">Getting Started</h3>
              <span className="text-xs text-primary font-medium">{gettingStarted.length} guides</span>
            </div>
            <div className="space-y-3 custom-scrollbar">
              {filteredTutorials
                .filter(tutorial => gettingStarted.some(starter => starter.title === tutorial.title))
                .map((tutorial, index) => (
                  <TutorialCard 
                    key={index} 
                    tutorial={tutorial} 
                    delayIndex={index} 
                    isGettingStarted={true}
                  />
                ))}
            </div>
          </section>
          
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium">Advanced Features</h3>
              <span className="text-xs text-primary font-medium">{advancedTutorials.length} guides</span>
            </div>
            <div className="space-y-3 custom-scrollbar">
              {filteredTutorials
                .filter(tutorial => advancedTutorials.some(advanced => advanced.title === tutorial.title))
                .map((tutorial, index) => (
                  <TutorialCard 
                    key={index} 
                    tutorial={tutorial} 
                    delayIndex={index}
                  />
                ))}
            </div>
          </section>
          
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium">Featured Learning Paths</h3>
              <button className="text-xs text-primary hover:underline flex items-center">
                <Bookmark size={12} className="mr-1" />
                View All Paths
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign size={16} className="text-primary" />
                  <h4 className="font-medium">Budget Mastery</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Master budgeting from basics to advanced techniques</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">3 modules</span>
                  <button className="text-primary hover:underline">Start Path</button>
                </div>
              </div>

              <div className="p-4 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={16} className="text-primary" />
                  <h4 className="font-medium">Investing Basics</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Learn fundamentals of investing and growing wealth</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">5 modules</span>
                  <button className="text-primary hover:underline">Start Path</button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      {activeTab === "videos" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium">Video Tutorials</h3>
            <span className="text-xs text-primary font-medium">{videoTutorials.length} videos</span>
          </div>
          <div className="space-y-3 custom-scrollbar">
            {filteredVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </div>
        </section>
      )}
      
      {activeTab === "resources" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium">Downloadable Resources</h3>
            <span className="text-xs text-primary font-medium">{downloadableResources.length} resources</span>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 custom-scrollbar">
            {downloadableResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} index={index} />
            ))}
          </div>
          
          <div className="mt-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
            <h4 className="font-medium mb-2 flex items-center">
              <Check size={16} className="text-primary mr-2" />
              Get All Resources
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Download our complete resource pack containing all templates, worksheets, and calculators in one convenient file.
            </p>
            <div className="flex justify-end">
              <a 
                href="https://drive.google.com/file/d/1g7H3qpKZj5tR9F2kLmX8uY6pQ2wR4Jvf/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors flex items-center"
              >
                <Download size={12} className="mr-1" />
                Download Complete Pack (850 KB)
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TutorialsModal;
