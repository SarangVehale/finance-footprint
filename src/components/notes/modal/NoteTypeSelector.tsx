
import React from 'react';
import { FileText, CheckSquare } from 'lucide-react';

interface NoteTypeSelectorProps {
  noteType: "text" | "checklist";
  onTypeChange: (type: "text" | "checklist") => void;
}

/**
 * NoteTypeSelector - Component for switching between text and checklist note types
 * 
 * @param noteType - Current type of note (text or checklist)
 * @param onTypeChange - Function to handle type change
 */
const NoteTypeSelector: React.FC<NoteTypeSelectorProps> = ({ 
  noteType, 
  onTypeChange 
}) => {
  return (
    <div className="flex space-x-4 mx-auto sm:mx-0">
      <button
        onClick={() => onTypeChange("text")}
        className={`p-2 rounded-xl transition-colors ${
          noteType === "text"
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent text-foreground"
        }`}
        aria-label="Text note"
      >
        <FileText size={20} />
      </button>
      <button
        onClick={() => onTypeChange("checklist")}
        className={`p-2 rounded-xl transition-colors ${
          noteType === "checklist"
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent text-foreground"
        }`}
        aria-label="Checklist note"
      >
        <CheckSquare size={20} />
      </button>
    </div>
  );
};

export default NoteTypeSelector;
