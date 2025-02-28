
import React, { useRef, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Note } from "@/types/note";
import SearchBar from "@/components/notes/SearchBar";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";

const Notes = () => {
  const modalRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const loadedNotes = storageService.getNotes();
    setNotes(loadedNotes);
  }, []);

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

  // Auto-save effect - saves note after brief pause in typing or changes
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
    // Don't save empty notes
    if (!newNote.title && !newNote.content && newNote.checklist.length === 0) {
      if (!autoSave) setShowNewNote(false);
      return;
    }

    const note: Note = {
      id: crypto.randomUUID(),
      title: newNote.title || "Untitled", // Prevent empty titles
      content: noteType === "text" ? newNote.content : "",
      checklist: noteType === "checklist" ? newNote.checklist : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: noteType,
      files: [],
      labels: [],
    };

    storageService.saveNote(note);
    setNotes([...notes, note]);
    
    // Only reset and close if not an auto-save
    if (!autoSave) {
      setNewNote({ title: "", content: "", checklist: [] });
      setShowNewNote(false);
    }
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
    setSelectedNote(note);
    setIsViewingNote(true);
    
    // Set the appropriate note type and content
    if (note.type === "checklist") {
      setNoteType("checklist");
      setNewNote({
        title: note.title,
        content: "",
        checklist: [...note.checklist]
      });
    } else {
      setNoteType("text");
      setNewNote({
        title: note.title,
        content: note.content,
        checklist: []
      });
    }
  };

  const handleUpdateNote = (autoSave = false) => {
    if (!selectedNote) return;
    
    const updatedNote: Note = {
      ...selectedNote,
      title: newNote.title || "Untitled", // Prevent empty titles
      content: noteType === "text" ? newNote.content : "",
      checklist: noteType === "checklist" ? newNote.checklist : [],
      updatedAt: new Date().toISOString(),
      type: noteType
    };
    
    storageService.updateNote(updatedNote);
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    
    // Only reset and close if not an auto-save
    if (!autoSave) {
      setSelectedNote(null);
      setIsViewingNote(false);
      setNewNote({ title: "", content: "", checklist: [] });
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.checklist?.some(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <MobileLayout>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-dvh pb-24 pt-safe-top">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredNotes.map((note) => (
            <div key={note.id} onClick={() => handleViewNote(note)}>
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
              <FileText className="w-12 h-12 text-muted-foreground" />
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

        <button
          onClick={() => {
            setShowNewNote(true);
            setSelectedNote(null);
            setNoteType("text");
            setNewNote({ title: "", content: "", checklist: [] });
          }}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-float flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        {/* New Note Modal */}
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

        {/* View/Edit Note Modal */}
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
