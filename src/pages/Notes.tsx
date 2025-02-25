
import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    const loadedNotes = storageService.getNotes();
    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowNewNote(false);
      }
    };

    if (showNewNote) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNewNote]);

  const handleAddNote = () => {
    if (!newNote.title && !newNote.content && newNote.checklist.length === 0) return;

    const note: Note = {
      id: crypto.randomUUID(),
      title: newNote.title,
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
    setNewNote({ title: "", content: "", checklist: [] });
    setShowNewNote(false);
  };

  const handleDeleteNote = (id: string) => {
    storageService.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleToggleCheckItem = (noteId: string, index: number, checked: boolean) => {
    const note = notes.find(n => n.id === noteId);
    if (note && note.checklist) {
      const updatedNote = { ...note };
      updatedNote.checklist[index].checked = checked;
      storageService.updateNote(updatedNote);
      setNotes(notes.map(n => n.id === noteId ? updatedNote : n));
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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.checklist?.some(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 bg-background min-h-screen">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredNotes.map((note, index) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onToggleCheckItem={handleToggleCheckItem}
            />
          ))}
        </div>

        <button
          onClick={() => setShowNewNote(true)}
          className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-float flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        <NoteModal
          show={showNewNote}
          onClose={() => setShowNewNote(false)}
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
          onSave={handleAddNote}
          modalRef={modalRef}
        />
      </div>
    </MobileLayout>
  );
};

export default Notes;
