
import React from "react";
import { Download, FileText } from "lucide-react";
import { DownloadableResource } from "../../../types/tutorial";

interface ResourceCardProps {
  resource: DownloadableResource;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index }) => {
  return (
    <div 
      className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => window.open(resource.url, "_blank")}
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
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Download size={12} className="mr-1" />
          Download
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;
