
import React from "react";
import { 
  GraduationCap, 
  Play, 
  BookOpen, 
  Book, 
  FileText,
  Video,
  Download,
  ExternalLink,
  PieChart,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  Tag,
  Calendar
} from "lucide-react";

interface Tutorial {
  title: string;
  description: string;
  time: string;
  difficulty: string;
  category?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  author?: string;
  rating?: number;
}

interface VideoTutorial {
  title: string;
  description: string;
  time: string;
  thumbnail?: string;
  views?: number;
  difficulty?: string;
}

interface Course {
  title: string;
  description: string;
  modules: number;
  time: string;
  instructor: string;
  enrolled: number;
  level: string;
  progress?: number;
}

interface Webinar {
  title: string;
  date: string;
  time: string;
  host: string;
  topics: string[];
}

const TutorialsModal: React.FC = () => {
  const gettingStarted: Tutorial[] = [
    {
      title: "Setting Up Your Account",
      description: "Learn how to create and configure your account",
      time: "5 min read",
      difficulty: "Beginner",
      isNew: true
    },
    {
      title: "Adding Your First Transaction",
      description: "Step-by-step guide to recording transactions",
      time: "3 min read",
      difficulty: "Beginner",
      author: "FinanceFootprint Team"
    },
    {
      title: "Understanding the Dashboard",
      description: "Overview of all the main features and screens",
      time: "7 min read",
      difficulty: "Beginner",
      author: "FinanceFootprint Team",
      rating: 4.8
    }
  ];

  const advancedTutorials: Tutorial[] = [
    {
      title: "Creating Custom Categories",
      description: "Organize your finances with personalized categories",
      time: "4 min read",
      difficulty: "Intermediate",
      category: "Organization",
      author: "CategoryMaster"
    },
    {
      title: "Analyzing Your Spending Patterns",
      description: "Get insights into your financial habits using analytics",
      time: "6 min read",
      difficulty: "Intermediate",
      category: "Analytics",
      isFeatured: true,
      author: "DataGuru"
    },
    {
      title: "Setting Budgets and Goals",
      description: "Learn how to plan and track your financial goals",
      time: "8 min read",
      difficulty: "Advanced",
      category: "Planning",
      author: "GoalAchiever"
    }
  ];

  const videoTutorials: VideoTutorial[] = [
    {
      title: "Complete App Walkthrough",
      description: "Full overview of all app features and functionality",
      time: "15 min video",
      views: 2453,
      difficulty: "All Levels"
    },
    {
      title: "Creating Reports and Exports",
      description: "How to generate and share financial reports",
      time: "8 min video",
      views: 1245,
      difficulty: "Intermediate"
    },
    {
      title: "Mobile Tips and Tricks",
      description: "Get the most out of the mobile experience",
      time: "6 min video",
      views: 983,
      difficulty: "Beginner"
    }
  ];

  const courses: Course[] = [
    {
      title: "Financial Independence Fundamentals",
      description: "Master the basics of personal finance management",
      modules: 5,
      time: "2.5 hours",
      instructor: "Finance Pro",
      enrolled: 1243,
      level: "Beginner",
      progress: 35
    },
    {
      title: "Advanced Budget Strategies",
      description: "Take your budgeting skills to the next level",
      modules: 8,
      time: "4 hours",
      instructor: "Budget Master",
      enrolled: 756,
      level: "Intermediate"
    }
  ];

  const upcomingWebinars: Webinar[] = [
    {
      title: "Maximizing Your App Experience",
      date: "July 10, 2024",
      time: "2:00 PM EST",
      host: "App Developer Team",
      topics: ["Hidden Features", "Integration Tips", "Q&A Session"]
    },
    {
      title: "Financial Planning for Beginners",
      date: "July 18, 2024",
      time: "6:00 PM EST",
      host: "Financial Advisor",
      topics: ["Emergency Funds", "Debt Management", "Investment Basics"]
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <section>
        <div className="rounded-xl bg-primary/5 p-5 mb-6 text-center">
          <GraduationCap className="w-12 h-12 mx-auto text-primary mb-3 animate-float-slow" />
          <h3 className="text-lg font-medium mb-2">Tutorials & Guides</h3>
          <p className="text-muted-foreground text-sm mb-4">Learn how to make the most of Finance Footprint with our step-by-step guides</p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary/20 transition-colors">
              <BookOpen size={18} className="text-primary mb-1" />
              <span className="text-xs">Guides</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary/20 transition-colors">
              <Video size={18} className="text-primary mb-1" />
              <span className="text-xs">Videos</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary/20 transition-colors">
              <GraduationCap size={18} className="text-primary mb-1" />
              <span className="text-xs">Courses</span>
            </button>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium">Getting Started</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Filter by:</span>
            <select className="text-xs bg-accent rounded p-1 border-none focus:ring-0">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          {gettingStarted.map((tutorial, index) => (
            <div 
              key={index}
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">{tutorial.title}</h4>
                {tutorial.isNew && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">New</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{tutorial.difficulty}</span>
                  <span className="text-muted-foreground flex items-center">
                    <Clock size={12} className="mr-1" />
                    {tutorial.time}
                  </span>
                </div>
                {tutorial.author && (
                  <span className="text-xs text-muted-foreground">By {tutorial.author}</span>
                )}
              </div>
              {tutorial.rating && (
                <div className="flex items-center mt-2 text-xs text-amber-500">
                  <Star size={12} className="fill-current" />
                  <Star size={12} className="fill-current" />
                  <Star size={12} className="fill-current" />
                  <Star size={12} className="fill-current" />
                  <Star size={12} className="fill-current opacity-50" />
                  <span className="ml-1 text-muted-foreground">{tutorial.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Advanced Features</h3>
        <div className="space-y-3">
          {advancedTutorials.map((tutorial, index) => (
            <div 
              key={index}
              className={`p-4 border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in ${
                tutorial.isFeatured ? "border-primary/30 bg-primary/5" : "border-border"
              }`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">{tutorial.title}</h4>
                {tutorial.isFeatured && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">Featured</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{tutorial.description}</p>
              <div className="flex items-center flex-wrap gap-2 text-xs mb-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{tutorial.difficulty}</span>
                {tutorial.category && (
                  <span className="px-2 py-1 bg-accent text-muted-foreground rounded-full flex items-center">
                    <Tag size={10} className="mr-1" />
                    {tutorial.category}
                  </span>
                )}
                <span className="text-muted-foreground flex items-center">
                  <Clock size={12} className="mr-1" />
                  {tutorial.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">By {tutorial.author}</span>
                <button className="text-primary hover:underline flex items-center">
                  Read Guide
                  <ExternalLink size={10} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Video Tutorials</h3>
        <div className="space-y-3">
          {videoTutorials.map((video, index) => (
            <div 
              key={index}
              className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in flex items-center space-x-3"
              style={{ animationDelay: `${index * 100 + 600}ms` }}
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
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Featured Learning Paths</h3>
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
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Self-Paced Courses</h3>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="p-4 border border-primary/20 rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100 + 800}ms` }}
            >
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">{course.title}</h4>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  {course.level}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
              
              {course.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between text-xs">
                <div className="space-x-3 flex">
                  <span className="text-muted-foreground">{course.modules} modules</span>
                  <span className="text-muted-foreground">{course.time}</span>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className="text-muted-foreground mr-2">
                    {course.enrolled.toLocaleString()} enrolled
                  </span>
                  <button className="px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                    {course.progress !== undefined ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium">Upcoming Webinars</h3>
          <button className="text-xs text-primary hover:underline flex items-center">
            <Calendar size={12} className="mr-1" />
            View Calendar
          </button>
        </div>
        <div className="space-y-3">
          {upcomingWebinars.map((webinar, index) => (
            <div 
              key={index}
              className="p-4 border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100 + 1000}ms` }}
            >
              <h4 className="font-medium mb-2">{webinar.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                <span className="flex items-center text-muted-foreground">
                  <Calendar size={12} className="mr-1" />
                  {webinar.date}
                </span>
                <span className="flex items-center text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  {webinar.time}
                </span>
                <span className="flex items-center text-muted-foreground">
                  Host: {webinar.host}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="text-xs font-medium mb-1">Topics:</div>
                <div className="flex flex-wrap gap-1">
                  {webinar.topics.map((topic, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Downloadable Resources</h3>
        <div className="grid gap-3 grid-cols-2">
          {[
            { title: "Budget Template", type: "Spreadsheet", size: "245 KB" },
            { title: "Expense Tracker", type: "Spreadsheet", size: "189 KB" },
            { title: "Savings Goal Calculator", type: "Spreadsheet", size: "156 KB" },
            { title: "Investment Tracker", type: "Spreadsheet", size: "210 KB" }
          ].map((resource, index) => (
            <div 
              key={index}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100 + 1200}ms` }}
            >
              <div className="flex items-center mb-2">
                <FileText size={16} className="text-primary mr-2" />
                <h4 className="text-sm font-medium">{resource.title}</h4>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-muted-foreground">{resource.type}</span>
                  <span className="text-muted-foreground ml-2">{resource.size}</span>
                </div>
                <button className="text-primary hover:underline flex items-center">
                  <Download size={12} className="mr-1" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TutorialsModal;
