
import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import NoteTypeSelector from './NoteTypeSelector';

interface ModalHeaderProps {
  noteType: "text" | "checklist";
  onTypeChange: (type: "text" | "checklist") => void;
  onClose: () => void;
  isMobile: boolean;
}

/**
 * ModalHeader - Header component for the note modal
 * 
 * @param noteType - Current type of note (text or checklist)
 * @param onTypeChange - Function to handle type change
 * @param onClose - Function to close the modal
 * @param isMobile - Boolean indicating if app is in mobile view
 */
const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  noteType, 
  onTypeChange, 
  onClose, 
  isMobile 
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-border">
      {isMobile ? (
        <button
          onClick={onClose}
          className="p-2 hover:bg-accent rounded-xl transition-colors text-foreground"
          aria-label="Close"
        >
          <ArrowLeft size={20} />
        </button>
      ) : null}
      
      <NoteTypeSelector noteType={noteType} onTypeChange={onTypeChange} />
      
      {!isMobile && (
        <button
          onClick={onClose}
          className="p-2 hover:bg-accent rounded-xl transition-colors text-foreground"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default ModalHeader;
