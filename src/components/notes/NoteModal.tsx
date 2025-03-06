
import React, { useEffect, useRef } from 'react';
import ModalHeader from './modal/ModalHeader';
import TextNoteContent from './modal/TextNoteContent';
import ChecklistNoteContent from './modal/ChecklistNoteContent';

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
  autoSave?: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

/**
 * NoteModal - Modal component for creating and editing notes
 * 
 * Handles both text notes and checklist notes with shared functionality.
 */
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
  autoSave = false,
  modalRef
}: NoteModalProps) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const checklistContainerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 640;
  const [processingPaste, setProcessingPaste] = React.useState(false);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalContentRef.current && 
          !modalContentRef.current.contains(event.target as Node) && 
          show) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onClose]);

  // Fix keyboard and view issues
  useEffect(() => {
    if (show) {
      document.body.classList.add('keyboard-open');
      
      // Smooth scroll to modal when opened
      setTimeout(() => {
        modalRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      // Fix for selection issues
      if (contentRef.current) {
        contentRef.current.style.webkitUserSelect = 'text';
        contentRef.current.style.userSelect = 'text';
      }
      
      if (titleInputRef.current) {
        titleInputRef.current.style.webkitUserSelect = 'text';
        titleInputRef.current.style.userSelect = 'text';
      }
    } else {
      document.body.classList.remove('keyboard-open');
    }

    // Adjust height based on viewport
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const windowHeight = window.outerHeight;
      
      if (windowHeight > viewportHeight * 1.2) {
        // Keyboard is likely open
        if (noteType === 'text' && contentRef.current) {
          contentRef.current.style.height = `${viewportHeight * 0.4}px`;
        } else if (noteType === 'checklist' && checklistContainerRef.current) {
          checklistContainerRef.current.style.maxHeight = `${viewportHeight * 0.4}px`;
        }
      } else {
        // Keyboard is likely closed
        if (noteType === 'text' && contentRef.current) {
          contentRef.current.style.height = '300px';
        } else if (noteType === 'checklist' && checklistContainerRef.current) {
          checklistContainerRef.current.style.maxHeight = '300px';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => {
      document.body.classList.remove('keyboard-open');
      window.removeEventListener('resize', handleResize);
    };
  }, [show, noteType, modalRef]);

  // Fix for copy-paste duplication in mobile
  useEffect(() => {
    const preventPasteDuplication = () => {
      if (!show) return;
      
      // Handle title input paste
      if (titleInputRef.current) {
        titleInputRef.current.addEventListener('paste', handlePaste);
      }
      
      // Handle text content paste
      if (contentRef.current && noteType === 'text') {
        contentRef.current.addEventListener('paste', handlePaste);
      }
      
      // Handle checklist inputs paste
      const handleChecklistPaste = () => {
        const checklistInputs = document.querySelectorAll('.checklist-input');
        checklistInputs.forEach(input => {
          input.addEventListener('paste', handlePaste);
        });
        
        return () => {
          checklistInputs.forEach(input => {
            input.removeEventListener('paste', handlePaste);
          });
        };
      };
      
      if (noteType === 'checklist') {
        return handleChecklistPaste();
      }
      
      return () => {
        if (titleInputRef.current) {
          titleInputRef.current.removeEventListener('paste', handlePaste);
        }
        if (contentRef.current) {
          contentRef.current.removeEventListener('paste', handlePaste);
        }
      };
    };
    
    function handlePaste(e: Event) {
      const pasteEvent = e as ClipboardEvent;
      
      // Prevent duplication by ensuring we only process one paste event
      if (processingPaste) {
        pasteEvent.preventDefault();
        return;
      }
      
      setProcessingPaste(true);
      setTimeout(() => setProcessingPaste(false), 100);
      
      // Let the paste event proceed normally without further interference
    }
    
    const cleanup = preventPasteDuplication();
    return cleanup;
  }, [noteType, show, processingPaste]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div 
        ref={modalContentRef}
        className="bg-card w-full h-[calc(100%-env(safe-area-inset-top))] sm:h-auto sm:max-w-lg sm:rounded-2xl animate-slide-up overflow-hidden flex flex-col pt-safe-top pb-safe-bottom"
      >
        <ModalHeader 
          noteType={noteType}
          onTypeChange={onTypeChange}
          onClose={onClose}
          isMobile={isMobile}
        />

        <div className="flex-1 overflow-y-auto p-4">
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Title"
            className="w-full text-lg font-medium mb-4 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            data-prevent-duplication="true"
          />

          {noteType === "text" ? (
            <TextNoteContent 
              content={content}
              onContentChange={onContentChange}
              contentRef={contentRef}
            />
          ) : (
            <ChecklistNoteContent 
              checklist={checklist}
              onChecklistItemAdd={onChecklistItemAdd}
              onChecklistItemChange={onChecklistItemChange}
              onChecklistItemToggle={onChecklistItemToggle}
              onChecklistKeyDown={onChecklistKeyDown}
              checklistContainerRef={checklistContainerRef}
            />
          )}
        </div>

        {autoSave && (
          <div className="flex items-center justify-center p-2 border-t border-border mt-auto text-xs text-muted-foreground">
            Auto-saving...
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteModal;
