
import React, { useState } from "react";
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
  Calendar,
  Search,
  Filter,
  Check,
  Bookmark
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
  url?: string;
}

interface VideoTutorial {
  title: string;
  description: string;
  time: string;
  thumbnail?: string;
  views?: number;
  difficulty?: string;
  url?: string;
}

const TutorialsModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"guides" | "videos" | "resources">("guides");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  
  const gettingStarted: Tutorial[] = [
    {
      title: "Setting Up Your Account",
      description: "Learn how to create and configure your account",
      time: "5 min read",
      difficulty: "Beginner",
      isNew: true,
      url: "https://docs.financefootprint.com/getting-started/account-setup"
    },
    {
      title: "Adding Your First Transaction",
      description: "Step-by-step guide to recording transactions",
      time: "3 min read",
      difficulty: "Beginner",
      author: "FinanceFootprint Team",
      url: "https://docs.financefootprint.com/getting-started/first-transaction"
    },
    {
      title: "Understanding the Dashboard",
      description: "Overview of all the main features and screens",
      time: "7 min read",
      difficulty: "Beginner",
      author: "FinanceFootprint Team",
      rating: 4.8,
      url: "https://docs.financefootprint.com/getting-started/dashboard-overview"
    },
    {
      title: "Setting Your Financial Goals",
      description: "How to define and track your financial objectives",
      time: "6 min read",
      difficulty: "Beginner",
      author: "FinanceFootprint Team",
      url: "https://docs.financefootprint.com/getting-started/financial-goals"
    },
    {
      title: "Managing Account Security",
      description: "Best practices for securing your financial data",
      time: "4 min read",
      difficulty: "Beginner",
      isNew: true,
      author: "FinanceFootprint Team",
      url: "https://docs.financefootprint.com/getting-started/security"
    }
  ];

  const advancedTutorials: Tutorial[] = [
    {
      title: "Creating Custom Categories",
      description: "Organize your finances with personalized categories",
      time: "4 min read",
      difficulty: "Intermediate",
      category: "Organization",
      author: "CategoryMaster",
      url: "https://docs.financefootprint.com/advanced/custom-categories"
    },
    {
      title: "Analyzing Your Spending Patterns",
      description: "Get insights into your financial habits using analytics",
      time: "6 min read",
      difficulty: "Intermediate",
      category: "Analytics",
      isFeatured: true,
      author: "DataGuru",
      url: "https://docs.financefootprint.com/advanced/spending-analysis"
    },
    {
      title: "Setting Budgets and Goals",
      description: "Learn how to plan and track your financial goals",
      time: "8 min read",
      difficulty: "Advanced",
      category: "Planning",
      author: "GoalAchiever",
      url: "https://docs.financefootprint.com/advanced/budgeting-goals"
    },
    {
      title: "Automating Regular Transactions",
      description: "Set up recurring transactions to save time",
      time: "5 min read",
      difficulty: "Intermediate",
      category: "Automation",
      author: "EfficiencyPro",
      url: "https://docs.financefootprint.com/advanced/recurring-transactions"
    },
    {
      title: "Tax Planning with Finance Footprint",
      description: "Prepare for tax season by categorizing and reporting",
      time: "10 min read",
      difficulty: "Advanced",
      category: "Taxes",
      author: "TaxExpert",
      isFeatured: true,
      url: "https://docs.financefootprint.com/advanced/tax-planning"
    },
    {
      title: "Creating Financial Reports",
      description: "Generate comprehensive reports for better insights",
      time: "7 min read",
      difficulty: "Advanced",
      category: "Reports",
      author: "ReportMaster",
      url: "https://docs.financefootprint.com/advanced/financial-reports"
    }
  ];

  const videoTutorials: VideoTutorial[] = [
    {
      title: "Complete App Walkthrough",
      description: "Full overview of all app features and functionality",
      time: "15 min video",
      views: 2453,
      difficulty: "All Levels",
      url: "https://www.youtube.com/watch?v=finance-footprint-walkthrough"
    },
    {
      title: "Creating Reports and Exports",
      description: "How to generate and share financial reports",
      time: "8 min video",
      views: 1245,
      difficulty: "Intermediate",
      url: "https://www.youtube.com/watch?v=finance-footprint-reports"
    },
    {
      title: "Mobile Tips and Tricks",
      description: "Get the most out of the mobile experience",
      time: "6 min video",
      views: 983,
      difficulty: "Beginner",
      url: "https://www.youtube.com/watch?v=finance-footprint-mobile"
    },
    {
      title: "Advanced Budget Analysis",
      description: "Deep dive into analyzing your spending patterns",
      time: "12 min video",
      views: 1562,
      difficulty: "Advanced",
      url: "https://www.youtube.com/watch?v=finance-footprint-budget-analysis"
    },
    {
      title: "Data Visualization Techniques",
      description: "Making the most of charts and visual data",
      time: "10 min video",
      views: 1105,
      difficulty: "Intermediate",
      url: "https://www.youtube.com/watch?v=finance-footprint-data-viz"
    },
    {
      title: "Importing Financial Data",
      description: "How to import data from other apps or bank statements",
      time: "7 min video",
      views: 1783,
      difficulty: "Intermediate",
      url: "https://www.youtube.com/watch?v=finance-footprint-importing"
    }
  ];

  const downloadableResources = [
    {
      title: "Monthly Budget Template",
      type: "Excel Spreadsheet",
      size: "245 KB",
      description: "Comprehensive monthly budget planner with automated calculations",
      url: "https://financefootprint.com/downloads/monthly-budget-template.xlsx"
    },
    {
      title: "Expense Tracker",
      type: "Excel Spreadsheet",
      size: "189 KB",
      description: "Detailed expense tracking with categorization and analysis",
      url: "https://financefootprint.com/downloads/expense-tracker.xlsx"
    },
    {
      title: "Savings Goal Calculator",
      type: "Excel Spreadsheet",
      size: "156 KB",
      description: "Plan and track your progress towards savings goals",
      url: "https://financefootprint.com/downloads/savings-calculator.xlsx"
    },
    {
      title: "Investment Portfolio Tracker",
      type: "Excel Spreadsheet",
      size: "210 KB",
      description: "Monitor your investments and analyze performance",
      url: "https://financefootprint.com/downloads/investment-tracker.xlsx"
    },
    {
      title: "Debt Reduction Planner",
      type: "Excel Spreadsheet",
      size: "178 KB",
      description: "Strategies and calculations to eliminate debt faster",
      url: "https://financefootprint.com/downloads/debt-reduction-planner.xlsx"
    },
    {
      title: "Financial Goal Setting Worksheet",
      type: "PDF",
      size: "125 KB",
      description: "Worksheet to help define clear and achievable financial goals",
      url: "https://financefootprint.com/downloads/financial-goals-worksheet.pdf"
    },
    {
      title: "Emergency Fund Calculator",
      type: "Excel Spreadsheet",
      size: "145 KB",
      description: "Calculate how much you need in your emergency fund",
      url: "https://financefootprint.com/downloads/emergency-fund-calculator.xlsx"
    },
    {
      title: "Tax Deduction Checklist",
      type: "PDF",
      size: "135 KB",
      description: "Comprehensive list of potential tax deductions",
      url: "https://financefootprint.com/downloads/tax-deduction-checklist.pdf"
    }
  ];

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
          
          {/* Search and Filter Bar */}
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
                <div 
                  key={index}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => tutorial.url && window.open(tutorial.url, "_blank")}
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
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-medium">Advanced Features</h3>
              <span className="text-xs text-primary font-medium">{advancedTutorials.length} guides</span>
            </div>
            <div className="space-y-3 custom-scrollbar">
              {filteredTutorials
                .filter(tutorial => advancedTutorials.some(advanced => advanced.title === tutorial.title))
                .map((tutorial, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in ${
                    tutorial.isFeatured ? "border-primary/30 bg-primary/5" : "border-border"
                  }`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                  onClick={() => tutorial.url && window.open(tutorial.url, "_blank")}
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
              <div 
                key={index}
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
              <div 
                key={index}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={18} className="text-primary shrink-0" />
                  <h4 className="font-medium">{resource.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{resource.type}</span>
                    <span className="text-muted-foreground">{resource.size}</span>
                  </div>
                  <a 
                    href={resource.url} 
                    download 
                    className="text-primary hover:underline flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={12} className="mr-1" />
                    Download
                  </a>
                </div>
              </div>
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
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors flex items-center">
                <Download size={12} className="mr-1" />
                Download Complete Pack (850 KB)
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TutorialsModal;
