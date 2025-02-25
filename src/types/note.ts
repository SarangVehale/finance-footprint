
export interface Note {
  id: string;
  title: string;
  content: string;
  type?: "text" | "checklist";
  checklist?: Array<{ text: string; checked: boolean }>;
  createdAt: string;
  updatedAt: string;
  files?: string[];
  labels?: string[];
}
