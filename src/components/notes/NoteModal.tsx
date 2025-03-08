
import React, { useEffect, useRef } from 'react';
import ModalHeader from './modal/ModalHeader';
import TextNoteContent from './modal/TextNoteContent';
import ChecklistNoteContent from './modal/ChecklistNoteContent';
import { useToast } from '@/hooks/use-toast';
import { storageService } from '@/services/localStorage';
import { AlertCircle } from 'lucide-react';

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
  const [storageAvailable, setStorageAvailable] = React.useState(true);
  const { toast } = useToast();

  // Check if storage is available
  useEffect(() => {
    if (show) {
      const available = storageService.isStorageAvailable();
      setStorageAvailable(available);
      
      if (!available) {
        toast({
          title: "Storage Access Issue",
          description: "This app needs storage access to save your notes. Some features may not work properly.",
          variant: "destructive",
          duration: 6000,
        });
      }
    }
  }, [show, toast]);

  // Debug logs for button interactions
  useEffect(() => {
    if (show) {
      console.log("Note modal opened, type:", noteType);
      console.log("Current data:", {
        title,
        content,
        checklist: checklist.length > 0 ? `${checklist.length} items` : "empty"
      });
    }
  }, [show, noteType, title, content, checklist]);

  // Log the save operation
  const handleSave = () => {
    console.log("Saving note data:", {
      type: noteType,
      title,
      content: noteType === "text" ? content : "checklist",
      checklist: noteType === "checklist" ? checklist : []
    });
    
    if (!storageAvailable) {
      toast({
        title: "Storage Access Required",
        description: "Cannot save note. Storage access is required.",
        variant: "destructive",
      });
      return;
    }
    
    onSave();
  };
  
  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalContentRef.current && 
          !modalContentRef.current.contains(event.target as Node) && 
          show) {
        // Save before closing
        handleSave();
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onClose, onSave]);

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
      
      console.log("Note modal resize", {
        viewportHeight,
        windowHeight,
        noteType
      });
      
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

  // Auto-save effect
  useEffect(() => {
    if (show && storageAvailable && (title || content || checklist.some(item => item.text))) {
      const saveTimer = setInterval(() => {
        console.log("Auto-saving note data");
        handleSave();
      }, 5000);
      
      return () => clearInterval(saveTimer);
    }
  }, [show, title, content, checklist, storageAvailable]);

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
          onClose={() => {
            handleSave();
            onClose();
          }}
          isMobile={isMobile}
        />

        <div className="flex-1 overflow-y-auto p-4">
          {!storageAvailable && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-3 flex items-center space-x-2 mb-4">
              <AlertCircle className="text-red-500" size={16} />
              <p className="text-xs text-red-700 dark:text-red-300">
                Storage access is limited. Your note may not be saved.
              </p>
            </div>
          )}
          
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
            {storageAvailable ? "Auto-saving..." : "Auto-save disabled"}
          </div>
        )}

        <div className="p-4 border-t border-border">
          <button
            onClick={handleSave}
            className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
