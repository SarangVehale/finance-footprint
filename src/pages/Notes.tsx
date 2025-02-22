
import React from "react";
import { Plus, Image, Search, Tag, Trash } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { storageService } from "@/services/localStorage";
import { Note } from "@/types/note";
import { format } from "date-fns";

const Notes = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showNewNote, setShowNewNote] = React.useState(false);
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notes</h1>
          <button
            onClick={() => setShowNewNote(true)}
            className="p-2 rounded-full bg-mint-500 text-white hover:bg-mint-600 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {showNewNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">New Note</h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded-lg mb-4"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                className="w-full p-2 border rounded-lg mb-4 h-32"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewNote(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash size={18} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-3">{note.content}</p>
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
      </div>
    </MobileLayout>
  );
};

export default Notes;
