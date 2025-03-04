
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
    <div className="card-hover bg-card p-3 rounded-2xl border border-border animate-slide-in h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-foreground truncate">{note.title}</h3>
        <button
          onClick={onDelete}
          className="text-muted-foreground hover:text-red-500 transition-colors"
        >
          <Trash size={16} />
        </button>
      </div>
      
      {note.type === "text" ? (
        <p className="text-muted-foreground text-sm mb-3 whitespace-pre-wrap line-clamp-3 overflow-hidden">
          {note.content}
        </p>
      ) : (
        <div className="space-y-1 mb-3 max-h-24 overflow-hidden">
          {note.checklist?.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggleCheckItem(note.id, idx, !item.checked)}
                className="rounded-lg border-input h-3 w-3"
              />
              <span className={`text-xs ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'} truncate`}>
                {item.text}
              </span>
            </div>
          ))}
          {note.checklist.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{note.checklist.length - 3} more items
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
        <span>{format(new Date(note.updatedAt), "MMM d, yyyy")}</span>
        <div className="flex items-center space-x-2">
          {note.files?.length > 0 && <Image size={12} />}
          {note.labels?.length > 0 && <Tag size={12} />}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
