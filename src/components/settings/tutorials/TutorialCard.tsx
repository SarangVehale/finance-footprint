
import React from "react";
import { Clock, Star, Tag } from "lucide-react";
import { Tutorial } from "../../../types/tutorial";

interface TutorialCardProps {
  tutorial: Tutorial;
  delayIndex: number;
  isGettingStarted?: boolean;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ 
  tutorial, 
  delayIndex,
  isGettingStarted = false
}) => {
  return (
    <div 
      className={`p-4 border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in ${
        tutorial.isFeatured ? "border-primary/30 bg-primary/5" : "border-border"
      }`}
      style={{ animationDelay: `${delayIndex * 100 + (isGettingStarted ? 0 : 300)}ms` }}
      onClick={() => tutorial.url && window.open(tutorial.url, "_blank")}
    >
      <div className="flex justify-between mb-1">
        <h4 className="font-medium">{tutorial.title}</h4>
        {tutorial.isNew && (
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">New</span>
        )}
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
        {tutorial.author && (
          <span className="text-muted-foreground">By {tutorial.author}</span>
        )}
        {tutorial.rating && (
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`${i < Math.floor(tutorial.rating || 0) ? "fill-current" : "fill-current opacity-50"}`} 
              />
            ))}
            <span className="ml-1 text-muted-foreground">{tutorial.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialCard;
