
import React from "react";

/**
 * Props for the DocContainer component
 */
interface DocContainerProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * Container component for documentation content
 * Applies consistent spacing and responsive styling to all documentation sections
 */
const DocContainer: React.FC<DocContainerProps> = ({ children, title }) => (
  <div className="max-w-4xl mx-auto">
    {title && (
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">{title}</h1>
    )}
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
      {children}
    </div>
  </div>
);

export default DocContainer;
