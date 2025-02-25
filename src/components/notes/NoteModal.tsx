
import React from 'react';
import { X, FileText, CheckSquare, Plus } from 'lucide-react';

interface NoteModalProps {
  show: boolean;
  onClose: () => void;
  noteType: "text" | "checklist";
  onTypeChange: (type: "text" | "checklist") => void;
  title: string;
  onTitleChange: (title: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  checklist: Array<{ text: string; checked: boolean }>;
  onChecklistItemAdd: () => void;
  onChecklistItemChange: (index: number, text: string) => void;
  onChecklistItemToggle: (index: number) => void;
  onChecklistKeyDown: (e: React.KeyboardEvent, index: number) => void;
  onSave: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const NoteModal = ({
  show,
  onClose,
  noteType,
  onTypeChange,
  title,
  onTitleChange,
  content,
  onContentChange,
  checklist,
  onChecklistItemAdd,
  onChecklistItemChange,
  onChecklistItemToggle,
  onChecklistKeyDown,
  onSave,
  modalRef
}: NoteModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div 
        ref={modalRef}
        className="bg-card w-full max-w-lg rounded-2xl sm:rounded-2xl animate-slide-up overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex space-x-4">
            <button
              onClick={() => onTypeChange("text")}
              className={`p-2 rounded-xl transition-colors ${
                noteType === "text"
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent text-foreground"
              }`}
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
            >
              <CheckSquare size={20} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-xl transition-colors text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-lg font-medium mb-4 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />

          {noteType === "text" ? (
            <textarea
              placeholder="Start typing..."
              className="w-full h-64 bg-transparent border-none focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
            />
          ) : (
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 animate-slide-in">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onChecklistItemToggle(index)}
                    className="rounded-lg border-input"
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => onChecklistItemChange(index, e.target.value)}
                    onKeyDown={(e) => onChecklistKeyDown(e, index)}
                    placeholder="List item..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground checklist-input"
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
          )}
        </div>

        <div className="flex justify-end p-4 border-t border-border">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
