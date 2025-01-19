export interface EditorTheme {
  id: string;
  name: string;
  type: 'light' | 'dark';
}

export const editorThemes: EditorTheme[] = [
  { id: 'vs', name: 'Light', type: 'light' },
  { id: 'vs-dark', name: 'Dark', type: 'dark' },
  { id: 'github-light', name: 'GitHub Light', type: 'light' },
  { id: 'github-dark', name: 'GitHub Dark', type: 'dark' },
  { id: 'monokai', name: 'Monokai', type: 'dark' },
  { id: 'dracula', name: 'Dracula', type: 'dark' },
  { id: 'nord', name: 'Nord', type: 'dark' },
  { id: 'aura', name: 'Aura Dark', type: 'dark' },
  { id: 'tokyo-night', name: 'Tokyo Night', type: 'dark' },
]; 