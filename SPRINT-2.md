# Sprint 2: SQLite Database

**Status**: ⚪ Not Started
**Duration**: 12 hours
**Depends On**: Sprint 1 ✅

---

## Goal

Replace mock data with a real SQLite database for persistent note storage.

**What Success Looks Like**:
- Notes persist across app restarts
- Can create, read, update, delete notes
- Fast full-text search
- Database migrations work
- No data loss

---

## Tasks

### 1. Set up better-sqlite3 (2h)

**Subtasks**:
- [ ] Install better-sqlite3 package
- [ ] Configure electron-builder for native modules
- [ ] Create database initialization code
- [ ] Set up database location (`~/.nexus/data.db`)
- [ ] Test database connection

**Dependencies**:
```bash
npm install better-sqlite3
npm install -D @types/better-sqlite3
```

**Database Location**:
```typescript
import { app } from 'electron'
import { join } from 'path'

const DB_PATH = join(app.getPath('userData'), 'nexus.db')
```

---

### 2. Design Database Schema (2h)

**Subtasks**:
- [ ] Design notes table schema
- [ ] Design folders/tags tables
- [ ] Create FTS5 virtual table for search
- [ ] Add indexes for performance
- [ ] Document schema

**Schema Design**:
```sql
-- Notes table
CREATE TABLE notes (
  id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
  title TEXT NOT NULL,
  content TEXT,
  folder TEXT DEFAULT 'inbox',
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  deleted_at INTEGER NULL
);

-- Full-text search
CREATE VIRTUAL TABLE notes_fts USING fts5(
  title,
  content,
  tokenize='porter unicode61'
);

-- Indexes
CREATE INDEX idx_notes_folder ON notes(folder);
CREATE INDEX idx_notes_updated ON notes(updated_at DESC);
CREATE INDEX idx_notes_deleted ON notes(deleted_at);

-- Tags table
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
  UNIQUE(note_id, tag)
);

CREATE INDEX idx_tags_note ON tags(note_id);
CREATE INDEX idx_tags_tag ON tags(tag);

-- Folders metadata
CREATE TABLE folders (
  path TEXT PRIMARY KEY,
  color TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);
```

---

### 3. Implement CRUD Operations (3h)

**Subtasks**:
- [ ] Create IPC handlers for database operations
- [ ] Implement createNote()
- [ ] Implement updateNote()
- [ ] Implement deleteNote()
- [ ] Implement getNotes()
- [ ] Implement searchNotes()
- [ ] Add error handling
- [ ] Test all operations

**IPC API Design**:
```typescript
// Main process handlers
ipcMain.handle('notes:create', async (_, note) => { })
ipcMain.handle('notes:update', async (_, id, updates) => { })
ipcMain.handle('notes:delete', async (_, id) => { })
ipcMain.handle('notes:get', async (_, id) => { })
ipcMain.handle('notes:list', async (_, folder?) => { })
ipcMain.handle('notes:search', async (_, query) => { })

// Preload exposure
contextBridge.exposeInMainWorld('db', {
  createNote: (note) => ipcRenderer.invoke('notes:create', note),
  updateNote: (id, updates) => ipcRenderer.invoke('notes:update', id, updates),
  deleteNote: (id) => ipcRenderer.invoke('notes:delete', id),
  getNote: (id) => ipcRenderer.invoke('notes:get', id),
  listNotes: (folder) => ipcRenderer.invoke('notes:list', folder),
  searchNotes: (query) => ipcRenderer.invoke('notes:search', query)
})
```

---

### 4. Create Database Service Layer (2h)

**Subtasks**:
- [ ] Create DatabaseService class
- [ ] Implement connection pooling
- [ ] Add transaction support
- [ ] Add migration system
- [ ] Implement backup functionality

**Service Structure**:
```typescript
// src/main/database/DatabaseService.ts
class DatabaseService {
  private db: Database

  constructor(dbPath: string) {
    this.db = new Database(dbPath)
    this.initialize()
  }

  initialize() {
    this.runMigrations()
  }

  runMigrations() {
    // Migration logic
  }

  createNote(note: Note): Note { }
  updateNote(id: string, updates: Partial<Note>): Note { }
  deleteNote(id: string): boolean { }
  getNote(id: string): Note | null { }
  listNotes(folder?: string): Note[] { }
  searchNotes(query: string): Note[] { }

  // Transaction support
  transaction<T>(fn: () => T): T {
    return this.db.transaction(fn)()
  }
}
```

---

### 5. Update UI to Use Database (2h)

**Subtasks**:
- [ ] Replace mock data with database calls
- [ ] Update Zustand store to use IPC
- [ ] Add loading states
- [ ] Add error handling UI
- [ ] Test CRUD operations in UI

**Store Updates**:
```typescript
import { create } from 'zustand'

interface AppState {
  notes: Note[]
  selectedNoteId: string | null
  isLoading: boolean
  error: string | null

  // Actions
  loadNotes: (folder?: string) => Promise<void>
  createNote: (note: Partial<Note>) => Promise<void>
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>
  deleteNote: (id: string) => Promise<void>
  selectNote: (id: string) => void
  searchNotes: (query: string) => Promise<void>
}

const useStore = create<AppState>((set, get) => ({
  notes: [],
  selectedNoteId: null,
  isLoading: false,
  error: null,

  loadNotes: async (folder?) => {
    set({ isLoading: true, error: null })
    try {
      const notes = await window.db.listNotes(folder)
      set({ notes, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },

  createNote: async (note) => {
    const newNote = await window.db.createNote(note)
    set(state => ({ notes: [...state.notes, newNote] }))
  },

  // ... other actions
}))
```

---

### 6. Add Database Migrations (1h)

**Subtasks**:
- [ ] Create migrations folder structure
- [ ] Implement migration runner
- [ ] Add schema_version table
- [ ] Create initial migration
- [ ] Test migration system

**Migration System**:
```typescript
// src/main/database/migrations/001_initial.ts
export const up = (db: Database) => {
  db.exec(`
    CREATE TABLE notes ( ... );
    CREATE TABLE tags ( ... );
    CREATE TABLE folders ( ... );
    CREATE VIRTUAL TABLE notes_fts USING fts5( ... );
  `)
}

export const down = (db: Database) => {
  db.exec(`
    DROP TABLE IF EXISTS notes;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS folders;
    DROP TABLE IF EXISTS notes_fts;
  `)
}

// Migration runner
function runMigrations(db: Database) {
  // Check schema_version
  // Run pending migrations in order
  // Update schema_version
}
```

---

## Deliverables

By end of Sprint 2:

1. **Persistent Storage**
   - SQLite database at `~/.nexus/nexus.db`
   - Data survives app restarts
   - Fast queries with indexes

2. **CRUD Operations**
   - Create, read, update, delete notes
   - Full-text search working
   - Proper error handling

3. **Database Architecture**
   - Clean service layer
   - Migration system in place
   - IPC bridge secure and typed

4. **Updated UI**
   - No more mock data
   - Loading states
   - Error messages
   - Real persistence

---

## Testing Checklist

Before marking Sprint 2 complete:

- [ ] Can create new note
- [ ] Can update existing note
- [ ] Can delete note
- [ ] Notes persist after app restart
- [ ] Search returns correct results
- [ ] No SQL injection vulnerabilities
- [ ] Transactions work correctly
- [ ] Migrations run successfully
- [ ] Database backup works
- [ ] Performance is acceptable (< 100ms for list, < 50ms for get)

---

## Notes & Blockers

### Technical Decisions
- Using better-sqlite3 for synchronous API (simpler than node-sqlite3)
- FTS5 for full-text search (faster than LIKE queries)
- Soft deletes (deleted_at) instead of hard deletes

### Challenges to Watch For
- Native module compilation (better-sqlite3 needs rebuild for Electron)
- Database location permissions
- Migration rollback strategy
- Concurrent access handling

### Performance Targets
- List 1000 notes: < 100ms
- Get single note: < 50ms
- Search 1000 notes: < 200ms
- Create note: < 50ms
- Update note: < 50ms

---

## Next Sprint Preview

**Sprint 3: Rich Markdown Editor** (15h)
- Integrate TipTap editor
- Markdown rendering
- Syntax highlighting
- Image support
- Link autocomplete

---

**Target Start**: After Sprint 1 completion
**Target Completion**: TBD
**Actual Completion**: TBD
