
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
  const [newNote, setNewNote] = React.useState({ title: "", content: "" });

  React.useEffect(() => {
    const loadedNotes = storageService.getNotes();
    setNotes(loadedNotes);
  }, []);

  const handleAddNote = () => {
    if (!newNote.title && !newNote.content) return;

    const note: Note = {
      id: crypto.randomUUID(),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      files: [],
      labels: [],
    };

    storageService.saveNote(note);
    setNotes([...notes, note]);
    setNewNote({ title: "", content: "" });
    setShowNewNote(false);
  };

  const handleDeleteNote = (id: string) => {
    storageService.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 animate-fade-in">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash size={18} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-3 whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
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
          className="fixed bottom-20 right-6 w-14 h-14 bg-mint-500 text-white rounded-full shadow-lg hover:bg-mint-600 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        {/* New Note Modal */}
        {showNewNote && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl animate-slide-up">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setNoteType("text")}
                    className={`p-2 rounded-lg transition-colors ${
                      noteType === "text"
                        ? "bg-mint-100 text-mint-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FileText size={20} />
                  </button>
                  <button
                    onClick={() => setNoteType("checklist")}
                    className={`p-2 rounded-lg transition-colors ${
                      noteType === "checklist"
                        ? "bg-mint-100 text-mint-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <CheckSquare size={20} />
                  </button>
                </div>
                <button
                  onClick={() => setShowNewNote(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Note Content */}
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full text-lg font-medium mb-4 bg-transparent border-none focus:outline-none"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <textarea
                  placeholder="Start typing..."
                  className="w-full h-64 bg-transparent border-none focus:outline-none resize-none"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 border-t">
                <button
                  onClick={handleAddNote}
                  className="px-6 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
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
