export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: string[]; // IDs of children
  parentId?: string;
  content?: string; // Content of the file
  description?: string; // Explanation of what this file/folder does
  isExpanded?: boolean;
}

export type PresetType = 'core' | 'ai' | 'collaborative';
