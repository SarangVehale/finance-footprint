
import React from 'react';

interface TextNoteContentProps {
  content: string;
  onContentChange: (content: string) => void;
  contentRef: React.RefObject<HTMLTextAreaElement>;
}

/**
 * TextNoteContent - Component for displaying and editing text notes
 * 
 * @param content - Text content of the note
 * @param onContentChange - Function to update note content
 * @param contentRef - Reference to the textarea element
 */
const TextNoteContent: React.FC<TextNoteContentProps> = ({
  content,
  onContentChange,
  contentRef
}) => {
  return (
    <textarea
      ref={contentRef}
      placeholder="Start typing..."
      className="w-full bg-transparent border-none focus:outline-none resize-none text-foreground placeholder:text-muted-foreground h-64 break-words"
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      data-prevent-duplication="true"
      style={{ 
        overflowX: 'hidden', 
        wordWrap: 'break-word', 
        width: '100%',
        WebkitAppearance: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    />
  );
};

export default TextNoteContent;
