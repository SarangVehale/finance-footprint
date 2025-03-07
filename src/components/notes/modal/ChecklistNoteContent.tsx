
import React from 'react';
import { Plus } from 'lucide-react';

interface ChecklistNoteContentProps {
  checklist: Array<{ text: string; checked: boolean }>;
  onChecklistItemAdd: () => void;
  onChecklistItemChange: (index: number, text: string) => void;
  onChecklistItemToggle: (index: number) => void;
  onChecklistKeyDown: (e: React.KeyboardEvent, index: number) => void;
  checklistContainerRef: React.RefObject<HTMLDivElement>;
}

/**
 * ChecklistNoteContent - Component for displaying and editing checklist notes
 * 
 * @param checklist - Array of checklist items with text and checked state
 * @param onChecklistItemAdd - Function to add new checklist item
 * @param onChecklistItemChange - Function to modify checklist item text
 * @param onChecklistItemToggle - Function to toggle checked state
 * @param onChecklistKeyDown - Function to handle keyboard events
 * @param checklistContainerRef - Reference to the container element
 */
const ChecklistNoteContent: React.FC<ChecklistNoteContentProps> = ({
  checklist,
  onChecklistItemAdd,
  onChecklistItemChange,
  onChecklistItemToggle,
  onChecklistKeyDown,
  checklistContainerRef
}) => {
  return (
    <div 
      ref={checklistContainerRef} 
      className="space-y-2 overflow-y-auto pb-20"
    >
      {checklist.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 animate-slide-in">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onChecklistItemToggle(index)}
            className="rounded-lg border-input w-5 h-5"
          />
          <input
            type="text"
            value={item.text}
            onChange={(e) => onChecklistItemChange(index, e.target.value)}
            onKeyDown={(e) => onChecklistKeyDown(e, index)}
            onBlur={() => {
              // Ensure data is saved when user tabs out or moves focus
              if (item.text.trim() === '') {
                onChecklistItemChange(index, 'New item');
              }
            }}
            placeholder="List item..."
            className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground checklist-input"
            data-prevent-duplication="true"
            style={{ 
              textOverflow: 'ellipsis',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          />
        </div>
      ))}
      <button
        onClick={onChecklistItemAdd}
        className="w-full p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors flex items-center justify-center space-x-2"
      >
        <Plus size={16} />
        <span>Add item</span>
      </button>
    </div>
  );
};

export default ChecklistNoteContent;
