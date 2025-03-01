
import React from "react";
import { 
  Users, 
  DollarSign, 
  Lightbulb, 
  PieChart, 
  TrendingDown, 
  Calendar, 
  HeartHandshake, 
  LucideIcon, 
  Video, 
  FileText, 
  BookOpen, 
  Award,
  MessagesSquare,
  UserPlus,
  Clock,
  Bell,
  ExternalLink
} from "lucide-react";

interface Discussion {
  title: string;
  author: string;
  replies: number;
  time: string;
  tags?: string[];
  isPinned?: boolean;
}

interface ForumCategory {
  title: string;
  count: number;
  icon: React.ReactNode;
}

interface Community {
  name: string;
  members: number;
  description: string;
  isOfficial?: boolean;
}

interface ForumEvent {
  title: string;
  date: string;
  time: string;
  type: string;
  host?: string;
  attendees?: number;
  level?: string;
}

const ForumModal: React.FC = () => {
  const forumCategories: ForumCategory[] = [
    { title: "Budgeting Tips", count: 124, icon: <DollarSign size={16} /> },
    { title: "App Features", count: 89, icon: <Lightbulb size={16} /> },
    { title: "Investing", count: 76, icon: <PieChart size={16} /> },
    { title: "Debt Reduction", count: 52, icon: <TrendingDown size={16} /> },
    { title: "Financial Goals", count: 67, icon: <Award size={16} /> },
    { title: "Side Hustles", count: 43, icon: <HeartHandshake size={16} /> }
  ];

  const discussions: Discussion[] = [
    {
      title: "How to categorize subscriptions?",
      author: "JaneDoe",
      replies: 8,
      time: "2 hours ago",
      tags: ["Categories", "Tips"]
    },
    {
      title: "Best way to track shared expenses",
      author: "FinanceGuru",
      replies: 12,
      time: "Yesterday",
      tags: ["Roommates", "Tracking"]
    },
    {
      title: "Feature request: multiple currencies",
      author: "Traveler22",
      replies: 5,
      time: "3 days ago",
      isPinned: true,
      tags: ["Feature", "Request"]
    },
    {
      title: "Weekly savings challenge - who's in?",
      author: "SaveMaster",
      replies: 28,
      time: "1 week ago",
      tags: ["Challenge", "Savings"]
    },
    {
      title: "How to set realistic budget goals",
      author: "NewToFinance",
      replies: 16,
      time: "2 weeks ago",
      tags: ["Beginner", "Budget"]
    }
  ];

  const communities: Community[] = [
    {
      name: "Budget Beginners",
      members: 1254,
      description: "A supportive space for those new to budgeting",
      isOfficial: false
    },
    {
      name: "Finance Footprint Official",
      members: 4589,
      description: "Official community run by the app developers",
      isOfficial: true
    },
    {
      name: "FIRE Movement",
      members: 876,
      description: "Financial Independence, Retire Early discussion",
      isOfficial: false
    }
  ];

  const forumEvents: ForumEvent[] = [
    {
      title: "Financial Freedom Workshop",
      date: "June 15, 2024",
      time: "7:00 PM EST",
      type: "Online",
      host: "FinanceCoach",
      attendees: 78,
      level: "All Levels"
    },
    {
      title: "Ask Me Anything: Investment Tips",
      date: "June 22, 2024",
      time: "6:30 PM EST",
      type: "Online",
      host: "InvestmentPro",
      attendees: 45,
      level: "Intermediate"
    },
    {
      title: "Budget Review Session",
      date: "July 5, 2024",
      time: "5:00 PM EST",
      type: "Online",
      host: "BudgetMaster",
      attendees: 32,
      level: "Beginner"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
      <section>
        <div className="rounded-xl bg-primary/5 p-5 mb-6 text-center">
          <Users className="w-12 h-12 mx-auto text-primary mb-3 animate-float-slow" />
          <h3 className="text-lg font-medium mb-2">Finance Footprint Community</h3>
          <p className="text-muted-foreground text-sm mb-4">Join our growing community of users to share tips, ask questions, and get help</p>
          <a 
            href="https://community.financefootprint.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Join Community
            <ExternalLink size={14} className="ml-2" />
          </a>
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium">Popular Discussion Categories</h3>
          <button className="text-xs text-primary hover:underline">View All</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {forumCategories.map((category, index) => (
            <div 
              key={index}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-primary">{category.icon}</span>
                <span className="font-medium">{category.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{category.count} discussions</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium">Recent Discussions</h3>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-primary hover:underline flex items-center">
              <Clock size={12} className="mr-1" />
              Recent
            </button>
            <button className="text-xs text-muted-foreground hover:text-primary hover:underline flex items-center">
              <MessagesSquare size={12} className="mr-1" />
              Popular
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {discussions.map((discussion, index) => (
            <div 
              key={index} 
              className={`p-3 border-b border-border last:border-0 hover:bg-accent/30 transition-all duration-200 cursor-pointer animate-fade-in ${
                discussion.isPinned ? "bg-primary/5" : ""
              }`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{discussion.title}</h4>
                {discussion.isPinned && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Pinned</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {discussion.tags?.map((tag, idx) => (
                  <span key={idx} className="text-xs px-1.5 py-0.5 bg-accent rounded">#{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center">
                  <UserPlus size={12} className="mr-1" />
                  {discussion.author}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <MessagesSquare size={12} className="mr-1" />
                    {discussion.replies}
                  </span>
                  <span>{discussion.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full text-center text-primary text-sm py-2 hover:underline">
          Load More Discussions
        </button>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Featured Discussions</h3>
        <div className="space-y-3">
          <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-primary">Monthly Budget Challenge</h4>
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Featured</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Join our monthly challenge to reduce spending and increase savings!</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-primary font-medium">42 participants</span>
              </div>
              <span className="text-muted-foreground">Ends in 12 days</span>
            </div>
          </div>

          <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-primary">Savings Tracker Template</h4>
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Resource</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Download this template to track your savings goals more effectively!</p>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-primary font-medium">128 downloads</span>
              </div>
              <button className="text-primary hover:underline">Download</button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Communities</h3>
        <div className="space-y-3">
          {communities.map((community, index) => (
            <div 
              key={index}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100 + 500}ms` }}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{community.name}</h4>
                {community.isOfficial && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Official</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{community.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary">{community.members} members</span>
                <button className="text-xs bg-primary/90 text-primary-foreground px-2 py-1 rounded hover:bg-primary transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium">Community Events</h3>
          <button className="flex items-center text-xs text-primary hover:underline">
            <Calendar size={12} className="mr-1" />
            View Calendar
          </button>
        </div>
        <div className="space-y-3">
          {forumEvents.map((event, index) => (
            <div 
              key={index} 
              className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100 + 700}ms` }}
            >
              <h4 className="font-medium mb-1">{event.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs space-y-2 sm:space-y-0">
                <div className="space-y-1">
                  <p className="text-muted-foreground">
                    <Calendar size={12} className="inline mr-1" />
                    {event.date}
                  </p>
                  <p className="text-muted-foreground">
                    <Clock size={12} className="inline mr-1" />
                    {event.time}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-center">
                    {event.type}
                  </span>
                  <span className="text-muted-foreground text-center">
                    {event.level}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Host: {event.host}</span>
                <div className="flex space-x-2">
                  <span className="text-xs text-primary">{event.attendees} attending</span>
                  <button className="text-xs bg-primary/90 text-primary-foreground px-2 py-0.5 rounded hover:bg-primary transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-medium">Subscribe to Notifications</h3>
        <div className="p-4 bg-accent/40 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Bell className="text-primary w-5 h-5" />
            <p className="text-sm font-medium">Get forum updates delivered to your inbox</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 bg-background border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
            />
            <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumModal;
