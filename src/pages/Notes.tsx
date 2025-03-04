
import React, { useRef, useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Note } from "@/types/note";
import SearchBar from "@/components/notes/SearchBar";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";

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

  useEffect(() => {
    const checkOverflow = () => {
      if (notesContainerRef.current) {
        const hasVerticalOverflow = notesContainerRef.current.scrollHeight > notesContainerRef.current.clientHeight;
        setHasOverflow(hasVerticalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
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

  const getScrollbarClass = () => {
    return hasOverflow ? "notes-scrollbar has-overflow" : "notes-scrollbar";
  };

  return (
    <MobileLayout title="Notes">
      <div 
        className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-dvh pb-24 pt-safe-top"
        ref={notesContainerRef}
      >
        <div className={getScrollbarClass()}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />

          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
