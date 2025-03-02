
/**
 * Tutorial data type definitions
 */

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  time: string;
  difficulty: string;
  category?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  author?: string;
  rating?: number;
  url?: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  time: string;
  thumbnail?: string;
  views?: number;
  difficulty?: string;
  url?: string;
}

export interface DownloadableResource {
  title: string;
  type: string;
  size: string;
  description: string;
  url: string;
}
