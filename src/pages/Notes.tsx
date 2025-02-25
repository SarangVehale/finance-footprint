
import React from "react";
import { Plus, Image, Search, Tag, Trash, CheckSquare, FileText, X } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Note } from "@/types/note";
import { format } from "date-fns";

const Notes = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showNewNote, setShowNewNote] = React.useState(false);
  const [noteType, setNoteType] = React.useState<"text" | "checklist">("text");
  const [newNote, setNewNote] = React.useState({ 
    title: "", 
    content: "",
    checklist: [] as { text: string; checked: boolean }[]
  });

  React.useEffect(() => {
    const loadedNotes = storageService.getNotes();
    setNotes(loadedNotes);
  }, []);

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

  const handleAddChecklistItem = () => {
    setNewNote({
      ...newNote,
      checklist: [...newNote.checklist, { text: "", checked: false }]
    });
  };

  const handleChecklistItemChange = (index: number, text: string) => {
    const updatedChecklist = [...newNote.checklist];
    updatedChecklist[index].text = text;
    setNewNote({ ...newNote, checklist: updatedChecklist });
  };

  const handleToggleChecklistItem = (index: number) => {
    const updatedChecklist = [...newNote.checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setNewNote({ ...newNote, checklist: updatedChecklist });
  };

  const handleDeleteNote = (id: string) => {
    storageService.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.checklist?.some(item => 
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <MobileLayout>
      <div className="p-6 space-y-6 bg-background">
        <div className="relative animate-fade-in">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredNotes.map((note, index) => (
            <div
              key={note.id}
              className="card-hover bg-card p-4 rounded-xl border border-border animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-foreground">{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Trash size={18} />
                </button>
              </div>
              
              {note.type === "text" ? (
                <p className="text-muted-foreground text-sm mb-3 whitespace-pre-wrap">
                  {note.content}
                </p>
              ) : (
                <div className="space-y-2 mb-3">
                  {note.checklist?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {
                          const updatedNote = { ...note };
                          updatedNote.checklist![idx].checked = !item.checked;
                          storageService.saveNote(updatedNote);
                          setNotes(notes.map(n => n.id === note.id ? updatedNote : n));
                        }}
                        className="rounded border-input"
                      />
                      <span className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{format(new Date(note.updatedAt), "MMM d, yyyy")}</span>
                <div className="flex items-center space-x-2">
                  {note.files?.length > 0 && <Image size={14} />}
                  {note.labels?.length > 0 && <Tag size={14} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setShowNewNote(true)}
          className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-float flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        {/* New Note Modal */}
        {showNewNote && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl animate-slide-up">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setNoteType("text")}
                    className={`p-2 rounded-lg transition-colors ${
                      noteType === "text"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <FileText size={20} />
                  </button>
                  <button
                    onClick={() => setNoteType("checklist")}
                    className={`p-2 rounded-lg transition-colors ${
                      noteType === "checklist"
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    <CheckSquare size={20} />
                  </button>
                </div>
                <button
                  onClick={() => setShowNewNote(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full text-lg font-medium mb-4 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />

                {noteType === "text" ? (
                  <textarea
                    placeholder="Start typing..."
                    className="w-full h-64 bg-transparent border-none focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  />
                ) : (
                  <div className="space-y-2">
                    {newNote.checklist.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 animate-slide-in">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleChecklistItem(index)}
                          className="rounded border-input"
                        />
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                          placeholder="List item..."
                          className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleAddChecklistItem}
                      className="w-full p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add item</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end p-4 border-t border-border">
                <button
                  onClick={handleAddNote}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Notes;
