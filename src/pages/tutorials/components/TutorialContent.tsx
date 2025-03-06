
import React from "react";
import { 
  Clock, 
  User,
  Tag
} from "lucide-react";
import { Tutorial } from "@/types/tutorial";
import TutorialContentRenderer from "./TutorialContentRenderer";

interface TutorialContentProps {
  tutorial: Tutorial;
  isLoading: boolean;
}

/**
 * TutorialContent - Displays the content of a tutorial
 * 
 * @param tutorial - The tutorial object to display
 * @param isLoading - Boolean indicating if tutorial is loading
 */
const TutorialContent: React.FC<TutorialContentProps> = ({ 
  tutorial, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded"></div>
        <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
        <div className="h-4 bg-muted animate-pulse rounded"></div>
        <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
        <div className="h-32 bg-muted animate-pulse rounded mt-6"></div>
        <div className="space-y-2 mt-6">
          <div className="h-4 bg-muted animate-pulse rounded"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-3">{tutorial.title}</h1>
        <p className="text-muted-foreground mb-4">{tutorial.description}</p>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1" />
            <span>{tutorial.time}</span>
          </div>
          
          <div className="px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-full">
            {tutorial.difficulty}
          </div>
          
          {tutorial.category && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Tag size={14} className="mr-1" />
              <span>{tutorial.category}</span>
            </div>
          )}
        </div>
        
        {tutorial.author && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <User size={14} className="mr-1" />
            <span>By {tutorial.author}</span>
          </div>
        )}
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <TutorialContentRenderer tutorialId={tutorial.id} />
      </div>
    </div>
  );
};

export default TutorialContent;
