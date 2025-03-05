import React, { useRef, useEffect, useState } from "react";
import { Plus, FileText, Download } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Note } from "@/types/note";
import SearchBar from "@/components/notes/SearchBar";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

const Notes = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const notesContainerRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showNewNote, setShowNewNote] = React.useState(false);
  const [noteType, setNoteType] = React.useState<"text" | "checklist">("text");
  const [newNote, setNewNote] = React.useState({ 
    title: "", 
    content: "",
    checklist: [] as { text: string; checked: boolean }[]
  });
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isViewingNote, setIsViewingNote] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isProcessingNote, setIsProcessingNote] = useState(false);
  const { toast } = useToast();

  // Fix: Safely filter notes to handle possible undefined checklist values
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.checklist && note.checklist.some(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  useEffect(() => {
    const loadedNotes = storageService.getNotes();
    // Ensure all notes have a valid checklist array
    const validatedNotes = loadedNotes.map(note => ({
      ...note,
      checklist: note.checklist || []
    }));
    setNotes(validatedNotes);
  }, []);

  // Fix the overflow detection
  useEffect(() => {
    const checkOverflow = () => {
      if (notesContainerRef.current) {
        const containerHeight = notesContainerRef.current.clientHeight;
        const contentHeight = notesContainerRef.current.scrollHeight;
        const hasVerticalOverflow = contentHeight > containerHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    checkOverflow();
    // Use ResizeObserver for better detection of size changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (notesContainerRef.current) {
      resizeObserver.observe(notesContainerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [notes, searchTerm, filteredNotes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // Auto-save when clicking outside
        if (showNewNote) {
          handleAddNote();
        } else if (isViewingNote) {
          handleUpdateNote();
        }
      }
    };

    if (showNewNote || isViewingNote) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNewNote, isViewingNote, newNote]);

  useEffect(() => {
    if (!showNewNote && !isViewingNote) return;
    
    const autoSaveTimer = setTimeout(() => {
      if (showNewNote) {
        if (newNote.title || newNote.content || newNote.checklist.length > 0) {
          handleAddNote(true); // Pass true to indicate auto-save (no close)
        }
      } else if (isViewingNote && selectedNote) {
        handleUpdateNote(true); // Pass true to indicate auto-save (no close)
      }
    }, 1500); // 1.5 seconds after last change
    
    return () => clearTimeout(autoSaveTimer);
  }, [newNote, showNewNote, isViewingNote]);

  const handleAddNote = (autoSave = false) => {
    if (isProcessingNote) return; // Prevent duplicate notes when processing
    if (!newNote.title && !newNote.content && newNote.checklist.length === 0) {
      if (!autoSave) setShowNewNote(false);
      return;
    }

    setIsProcessingNote(true);
    
    const note: Note = {
      id: crypto.randomUUID(),
      title: newNote.title || "Untitled",
      content: noteType === "text" ? newNote.content : "",
      checklist: noteType === "checklist" ? [...newNote.checklist] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: noteType,
      files: [],
      labels: [],
    };

    storageService.saveNote(note);
    setNotes([...notes, note]);
    
    if (!autoSave) {
      setNewNote({ title: "", content: "", checklist: [] });
      setShowNewNote(false);
    }
    
    setTimeout(() => {
      setIsProcessingNote(false);
    }, 500); // Debounce to prevent multiple submissions
  };

  const handleDeleteNote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    storageService.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null);
      setIsViewingNote(false);
    }
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed"
    });
  };

  const handleToggleCheckItem = (noteId: string, index: number, checked: boolean) => {
    const note = notes.find(n => n.id === noteId);
    if (note && note.checklist) {
      const updatedNote = { ...note };
      updatedNote.checklist[index].checked = checked;
      updatedNote.updatedAt = new Date().toISOString();
      storageService.updateNote(updatedNote);
      setNotes(notes.map(n => n.id === noteId ? updatedNote : n));
      
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(updatedNote);
      }
    }
  };

  const handleChecklistKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentItem = newNote.checklist[index];
      if (currentItem.text.trim() === '') return;
      
      const updatedChecklist = [...newNote.checklist];
      updatedChecklist.splice(index + 1, 0, { text: '', checked: false });
      setNewNote({ ...newNote, checklist: updatedChecklist });

      setTimeout(() => {
        const inputs = document.querySelectorAll('.checklist-input');
        if (inputs[index + 1]) {
          (inputs[index + 1] as HTMLInputElement).focus();
        }
      }, 0);
    }
  };

  const handleViewNote = (note: Note) => {
    // Ensure note has a valid checklist array
    const safeNote = {
      ...note,
      checklist: note.checklist || []
    };
    
    setSelectedNote(safeNote);
    setIsViewingNote(true);
    
    if (safeNote.type === "checklist") {
      setNoteType("checklist");
      setNewNote({
        title: safeNote.title,
        content: "",
        checklist: [...safeNote.checklist]
      });
    } else {
      setNoteType("text");
      setNewNote({
        title: safeNote.title,
        content: safeNote.content,
        checklist: []
      });
    }
  };

  const handleUpdateNote = (autoSave = false) => {
    if (!selectedNote) return;
    
    const updatedNote: Note = {
      ...selectedNote,
      title: newNote.title || "Untitled",
      content: noteType === "text" ? newNote.content : "",
      checklist: noteType === "checklist" ? [...newNote.checklist] : [],
      updatedAt: new Date().toISOString(),
      type: noteType
    };
    
    storageService.updateNote(updatedNote);
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    
    if (!autoSave) {
      setSelectedNote(null);
      setIsViewingNote(false);
      setNewNote({ title: "", content: "", checklist: [] });
    }
  };

  const handleExportNotes = () => {
    try {
      // Convert notes to a format suitable for export
      const exportData = notes.map(note => {
        if (note.type === 'checklist' && note.checklist) {
          // For checklist notes, format the checklist items
          const checklistText = note.checklist.map(item => 
            `${item.checked ? '☑' : '☐'} ${item.text}`
          ).join('\n');
          
          return {
            Title: note.title,
            Type: 'Checklist',
            Content: checklistText,
            Created: new Date(note.createdAt).toLocaleString(),
            Updated: new Date(note.updatedAt).toLocaleString()
          };
        } else {
          // For text notes
          return {
            Title: note.title,
            Type: 'Text',
            Content: note.content,
            Created: new Date(note.createdAt).toLocaleString(),
            Updated: new Date(note.updatedAt).toLocaleString()
          };
        }
      });

      // Create a worksheet from the data
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes');
      
      // Generate file name with date
      const fileName = `notes_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // For mobile and web compatibility
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile, generate a blob URL and open it
        XLSX.writeFile(workbook, fileName);
        
        // Store the exported file in localStorage for later access
        const storedFiles = JSON.parse(localStorage.getItem('exportedFiles') || '[]');
        const newFile = {
          name: fileName,
          url: window.location.href, // This is a placeholder since we can't get the actual file URL
          date: new Date().toISOString()
        };
        localStorage.setItem('exportedFiles', JSON.stringify([...storedFiles, newFile]));
      } else {
        // For desktop browsers
        XLSX.writeFile(workbook, fileName);
      }

      toast({
        title: "Export Successful",
        description: "Your notes have been exported to an Excel file"
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your notes",
        variant: "destructive"
      });
    }
  };

  const getScrollbarClass = () => {
    return hasOverflow ? "notes-scrollbar has-overflow" : "notes-scrollbar";
  };

  return (
    <MobileLayout title="Notes">
      <div className="bg-background min-h-dvh w-full">
        {/* Main container with proper overflow handling */}
        <div 
          ref={notesContainerRef}
          className="flex flex-col h-[calc(100vh-8rem)] overflow-hidden"
        >
          <div className="p-4 sm:p-6 space-y-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">My Notes</h2>
              <button
                onClick={handleExportNotes}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                aria-label="Export notes"
              >
                <Download size={18} className="mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className={`px-4 sm:px-6 pb-24 flex-1 overflow-y-auto ${getScrollbarClass()}`}>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredNotes.map((note) => (
                <div key={note.id} onClick={() => handleViewNote(note)} className="h-full">
                  <NoteCard
                    note={note}
                    onDelete={(e) => handleDeleteNote(note.id, e)}
                    onToggleCheckItem={handleToggleCheckItem}
                  />
                </div>
              ))}
            </div>

            {filteredNotes.length === 0 && !searchTerm && (
              <div className="flex flex-col items-center justify-center pt-10 pb-16 text-center">
                <div className="bg-accent/50 p-6 rounded-2xl mb-4">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Create your first note by clicking the + button below
                </p>
              </div>
            )}

            {filteredNotes.length === 0 && searchTerm && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No notes found</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setShowNewNote(true);
            setSelectedNote(null);
            setNoteType("text");
            setNewNote({ title: "", content: "", checklist: [] });
          }}
          className="fixed bottom-24 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-float flex items-center justify-center"
        >
          <Plus size={20} />
        </button>

        <NoteModal
          show={showNewNote}
          onClose={() => {
            handleAddNote();
            setShowNewNote(false);
          }}
          noteType={noteType}
          onTypeChange={setNoteType}
          title={newNote.title}
          onTitleChange={(title) => setNewNote({ ...newNote, title })}
          content={newNote.content}
          onContentChange={(content) => setNewNote({ ...newNote, content })}
          checklist={newNote.checklist}
          onChecklistItemAdd={() => setNewNote({
            ...newNote,
            checklist: [...newNote.checklist, { text: "", checked: false }]
          })}
          onChecklistItemChange={(index, text) => {
            const updatedChecklist = [...newNote.checklist];
            updatedChecklist[index].text = text;
            setNewNote({ ...newNote, checklist: updatedChecklist });
          }}
          onChecklistItemToggle={(index) => {
            const updatedChecklist = [...newNote.checklist];
            updatedChecklist[index].checked = !updatedChecklist[index].checked;
            setNewNote({ ...newNote, checklist: updatedChecklist });
          }}
          onChecklistKeyDown={handleChecklistKeyDown}
          onSave={() => {}}
          autoSave={true}
          modalRef={modalRef}
        />

        <NoteModal
          show={isViewingNote}
          onClose={() => {
            handleUpdateNote();
            setIsViewingNote(false);
            setSelectedNote(null);
            setNewNote({ title: "", content: "", checklist: [] });
          }}
          noteType={noteType}
          onTypeChange={setNoteType}
          title={newNote.title}
          onTitleChange={(title) => setNewNote({ ...newNote, title })}
          content={newNote.content}
          onContentChange={(content) => setNewNote({ ...newNote, content })}
          checklist={newNote.checklist}
          onChecklistItemAdd={() => setNewNote({
            ...newNote,
            checklist: [...newNote.checklist, { text: "", checked: false }]
          })}
          onChecklistItemChange={(index, text) => {
            const updatedChecklist = [...newNote.checklist];
            updatedChecklist[index].text = text;
            setNewNote({ ...newNote, checklist: updatedChecklist });
          }}
          onChecklistItemToggle={(index) => {
            const updatedChecklist = [...newNote.checklist];
            updatedChecklist[index].checked = !updatedChecklist[index].checked;
            setNewNote({ ...newNote, checklist: updatedChecklist });
          }}
          onChecklistKeyDown={handleChecklistKeyDown}
          onSave={() => {}}
          autoSave={true}
          modalRef={modalRef}
        />
      </div>
    </MobileLayout>
  );
};

export default Notes;
