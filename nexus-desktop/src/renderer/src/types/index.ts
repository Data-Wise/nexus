export interface Note {
  id: string
  title: string
  content: string
  folder: string
  created_at: number
  updated_at: number
  deleted_at: number | null
}

export interface Folder {
  path: string
  color: string | null
  icon: string | null
  sort_order: number
}

// Extend Window interface to include our custom API
declare global {
  interface Window {
    api: {
      // Note operations
      createNote: (note: Partial<Note>) => Promise<Note>
      updateNote: (id: string, updates: Partial<Note>) => Promise<Note | null>
      deleteNote: (id: string) => Promise<boolean>
      getNote: (id: string) => Promise<Note | null>
      listNotes: (folder?: string) => Promise<Note[]>
      searchNotes: (query: string) => Promise<Note[]>

      // Tag operations
      addTag: (noteId: string, tag: string) => Promise<boolean>
      removeTag: (noteId: string, tag: string) => Promise<boolean>
      getNoteTags: (noteId: string) => Promise<string[]>

      // Folder operations
      getFolders: () => Promise<Folder[]>
    }
  }
}

export {}
