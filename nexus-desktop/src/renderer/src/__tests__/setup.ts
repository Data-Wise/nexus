import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock window.api for Electron IPC
global.window.api = {
  createNote: vi.fn(),
  updateNote: vi.fn(),
  deleteNote: vi.fn(),
  getNote: vi.fn(),
  listNotes: vi.fn(),
  searchNotes: vi.fn(),
  addTag: vi.fn(),
  removeTag: vi.fn(),
  getNoteTags: vi.fn(),
  getFolders: vi.fn(),
  updateNoteLinks: vi.fn(),
  getBacklinks: vi.fn(),
  getOutgoingLinks: vi.fn()
}
