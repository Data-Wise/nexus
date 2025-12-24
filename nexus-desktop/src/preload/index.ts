import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Define types for database operations
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

// Custom APIs for renderer
const api = {
  // Note operations
  createNote: (note: Partial<Note>) => ipcRenderer.invoke('notes:create', note),
  updateNote: (id: string, updates: Partial<Note>) => ipcRenderer.invoke('notes:update', id, updates),
  deleteNote: (id: string) => ipcRenderer.invoke('notes:delete', id),
  getNote: (id: string) => ipcRenderer.invoke('notes:get', id),
  listNotes: (folder?: string) => ipcRenderer.invoke('notes:list', folder),
  searchNotes: (query: string) => ipcRenderer.invoke('notes:search', query),

  // Tag operations
  addTag: (noteId: string, tag: string) => ipcRenderer.invoke('tags:add', noteId, tag),
  removeTag: (noteId: string, tag: string) => ipcRenderer.invoke('tags:remove', noteId, tag),
  getNoteTags: (noteId: string) => ipcRenderer.invoke('tags:get', noteId),

  // Folder operations
  getFolders: () => ipcRenderer.invoke('folders:list'),

  // Link operations
  updateNoteLinks: (noteId: string, content: string) => ipcRenderer.invoke('links:update', noteId, content),
  getBacklinks: (noteId: string) => ipcRenderer.invoke('links:backlinks', noteId),
  getOutgoingLinks: (noteId: string) => ipcRenderer.invoke('links:outgoing', noteId)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
