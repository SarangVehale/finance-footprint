
import React from 'react';
import { FileSpreadsheet, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface ExportedFile {
  name: string;
  url: string;
  date: string;
}

const ExportedFilesModal = () => {
  const [files, setFiles] = React.useState<ExportedFile[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('exportedFiles') || '[]');
    setFiles(storedFiles);
  }, []);

  const handleDelete = (fileName: string) => {
    const updatedFiles = files.filter(file => file.name !== fileName);
    localStorage.setItem('exportedFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
    toast({
      title: "File Deleted",
      description: "The exported file has been removed"
    });
  };

  const openFile = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Exported Files</h2>
      
      {files.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No exported files yet</p>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="text-green-500" size={20} />
                <div>
                  <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(file.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openFile(file.url)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                  title="Open file"
                >
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => handleDelete(file.name)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                  title="Delete file"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportedFilesModal;
