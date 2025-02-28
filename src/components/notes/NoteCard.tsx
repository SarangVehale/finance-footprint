
import React from 'react';
import { Image, Tag, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Note } from '@/types/note';

interface NoteCardProps {
  note: Note;
  onDelete: (e: React.MouseEvent) => void;
  onToggleCheckItem: (noteId: string, index: number, checked: boolean) => void;
}

const NoteCard = ({ note, onDelete, onToggleCheckItem }: NoteCardProps) => {
  return (
    <div className="card-hover bg-card p-4 rounded-2xl border border-border animate-slide-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-foreground">{note.title}</h3>
        <button
          onClick={onDelete}
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
                onChange={() => onToggleCheckItem(note.id, idx, !item.checked)}
                className="rounded-lg border-input"
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
  );
};

export default NoteCard;
