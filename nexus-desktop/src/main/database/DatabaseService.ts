import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'

export interface Note {
  id: string
  title: string
  content: string
  folder: string
  created_at: number
  updated_at: number
  deleted_at: number | null
}

export interface Tag {
  id: number
  note_id: string
  tag: string
}

export interface Folder {
  path: string
  color: string | null
  icon: string | null
  sort_order: number
}

export class DatabaseService {
  private db: Database.Database
  private dbPath: string

  constructor() {
    // Set up database location in user data directory
    const userDataPath = app.getPath('userData')
    const dbDir = join(userDataPath, 'data')

    // Ensure directory exists
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true })
    }

    this.dbPath = join(dbDir, 'nexus.db')
    this.db = new Database(this.dbPath)

    // Enable WAL mode for better performance
    this.db.pragma('journal_mode = WAL')

    this.initialize()
  }

  private initialize(): void {
    // Run migrations
    this.runMigrations()
  }

  private runMigrations(): void {
    // Create schema_version table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS schema_version (
        version INTEGER PRIMARY KEY,
        applied_at INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `)

    const currentVersion = this.getCurrentSchemaVersion()

    // Run migration 001 if not applied
    if (currentVersion < 1) {
      this.runMigration001()
      this.db.prepare('INSERT INTO schema_version (version) VALUES (?)').run(1)
    }

    // Run migration 002 if not applied
    if (currentVersion < 2) {
      this.runMigration002()
      this.db.prepare('INSERT INTO schema_version (version) VALUES (?)').run(2)
    }
  }

  private getCurrentSchemaVersion(): number {
    try {
      const result = this.db.prepare('SELECT MAX(version) as version FROM schema_version').get() as { version: number | null }
      return result.version || 0
    } catch {
      return 0
    }
  }

  private runMigration001(): void {
    console.log('Running migration 001: Initial schema')

    this.db.exec(`
      -- Notes table
      CREATE TABLE notes (
        id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
        title TEXT NOT NULL,
        content TEXT DEFAULT '',
        folder TEXT DEFAULT 'inbox',
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        updated_at INTEGER DEFAULT (strftime('%s', 'now')),
        deleted_at INTEGER NULL
      );

      -- Full-text search
      CREATE VIRTUAL TABLE notes_fts USING fts5(
        title,
        content,
        content=notes,
        content_rowid=rowid
      );

      -- Triggers to keep FTS index in sync
      CREATE TRIGGER notes_ai AFTER INSERT ON notes BEGIN
        INSERT INTO notes_fts(rowid, title, content)
        VALUES (new.rowid, new.title, new.content);
      END;

      CREATE TRIGGER notes_ad AFTER DELETE ON notes BEGIN
        DELETE FROM notes_fts WHERE rowid = old.rowid;
      END;

      CREATE TRIGGER notes_au AFTER UPDATE ON notes BEGIN
        UPDATE notes_fts SET title = new.title, content = new.content
        WHERE rowid = new.rowid;
      END;

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

      -- Insert default folders
      INSERT INTO folders (path, sort_order) VALUES
        ('inbox', 1),
        ('projects', 2),
        ('areas', 3),
        ('resources', 4),
        ('archive', 5);
    `)
  }

  private runMigration002(): void {
    console.log('Running migration 002: Links table')

    this.db.exec(`
      -- Links between notes
      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_note_id TEXT NOT NULL,
        target_note_id TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY (source_note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (target_note_id) REFERENCES notes(id) ON DELETE CASCADE,
        UNIQUE(source_note_id, target_note_id)
      );

      CREATE INDEX IF NOT EXISTS idx_links_source ON links(source_note_id);
      CREATE INDEX IF NOT EXISTS idx_links_target ON links(target_note_id);
    `)
  }

  // CRUD Operations

  createNote(note: Partial<Note>): Note {
    const stmt = this.db.prepare(`
      INSERT INTO notes (title, content, folder)
      VALUES (?, ?, ?)
      RETURNING *
    `)

    const result = stmt.get(
      note.title || 'Untitled',
      note.content || '',
      note.folder || 'inbox'
    ) as Note

    return result
  }

  updateNote(id: string, updates: Partial<Note>): Note | null {
    const fields: string[] = []
    const values: any[] = []

    if (updates.title !== undefined) {
      fields.push('title = ?')
      values.push(updates.title)
    }
    if (updates.content !== undefined) {
      fields.push('content = ?')
      values.push(updates.content)
    }
    if (updates.folder !== undefined) {
      fields.push('folder = ?')
      values.push(updates.folder)
    }

    if (fields.length === 0) {
      return this.getNote(id)
    }

    fields.push("updated_at = strftime('%s', 'now')")
    values.push(id)

    const stmt = this.db.prepare(`
      UPDATE notes
      SET ${fields.join(', ')}
      WHERE id = ?
      RETURNING *
    `)

    const result = stmt.get(...values) as Note | undefined
    return result || null
  }

  deleteNote(id: string): boolean {
    // Soft delete
    const stmt = this.db.prepare(`
      UPDATE notes
      SET deleted_at = strftime('%s', 'now')
      WHERE id = ?
    `)

    const result = stmt.run(id)
    return result.changes > 0
  }

  permanentlyDeleteNote(id: string): boolean {
    const stmt = this.db.prepare('DELETE FROM notes WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }

  restoreNote(id: string): boolean {
    const stmt = this.db.prepare(`
      UPDATE notes
      SET deleted_at = NULL
      WHERE id = ?
    `)

    const result = stmt.run(id)
    return result.changes > 0
  }

  getNote(id: string): Note | null {
    const stmt = this.db.prepare('SELECT * FROM notes WHERE id = ? AND deleted_at IS NULL')
    const result = stmt.get(id) as Note | undefined
    return result || null
  }

  listNotes(folder?: string): Note[] {
    let stmt
    if (folder) {
      stmt = this.db.prepare(`
        SELECT * FROM notes
        WHERE folder = ? AND deleted_at IS NULL
        ORDER BY updated_at DESC
      `)
      return stmt.all(folder) as Note[]
    } else {
      stmt = this.db.prepare(`
        SELECT * FROM notes
        WHERE deleted_at IS NULL
        ORDER BY updated_at DESC
      `)
      return stmt.all() as Note[]
    }
  }

  searchNotes(query: string): Note[] {
    const stmt = this.db.prepare(`
      SELECT notes.*
      FROM notes
      JOIN notes_fts ON notes.rowid = notes_fts.rowid
      WHERE notes_fts MATCH ? AND notes.deleted_at IS NULL
      ORDER BY rank
      LIMIT 50
    `)

    return stmt.all(query) as Note[]
  }

  // Tag operations

  addTag(noteId: string, tag: string): boolean {
    try {
      const stmt = this.db.prepare('INSERT INTO tags (note_id, tag) VALUES (?, ?)')
      stmt.run(noteId, tag)
      return true
    } catch {
      return false // Tag already exists
    }
  }

  removeTag(noteId: string, tag: string): boolean {
    const stmt = this.db.prepare('DELETE FROM tags WHERE note_id = ? AND tag = ?')
    const result = stmt.run(noteId, tag)
    return result.changes > 0
  }

  getNoteTags(noteId: string): string[] {
    const stmt = this.db.prepare('SELECT tag FROM tags WHERE note_id = ? ORDER BY tag')
    const results = stmt.all(noteId) as { tag: string }[]
    return results.map(r => r.tag)
  }

  // Folder operations

  getFolders(): Folder[] {
    const stmt = this.db.prepare('SELECT * FROM folders ORDER BY sort_order')
    return stmt.all() as Folder[]
  }

  // Link operations

  /**
   * Parse content for [[wiki links]] and update database relationships
   */
  updateNoteLinks(noteId: string, content: string): void {
    // Parse [[links]] from content
    const linkRegex = /\[\[([^\]]+)\]\]/g
    const matches = Array.from(content.matchAll(linkRegex))
    const linkedTitles = matches.map(m => m[1].trim()).filter(Boolean)

    // Delete existing links from this note
    this.db.prepare('DELETE FROM links WHERE source_note_id = ?').run(noteId)

    // Find notes by title and create links
    for (const title of linkedTitles) {
      const targetNote = this.db
        .prepare('SELECT id FROM notes WHERE title = ? AND deleted_at IS NULL')
        .get(title) as { id: string } | undefined

      if (targetNote) {
        try {
          this.db
            .prepare('INSERT OR IGNORE INTO links (source_note_id, target_note_id) VALUES (?, ?)')
            .run(noteId, targetNote.id)
        } catch (error) {
          console.error(`Failed to create link from ${noteId} to ${targetNote.id}:`, error)
        }
      }
    }
  }

  /**
   * Get notes that link to this note (backlinks)
   */
  getBacklinks(noteId: string): Note[] {
    const stmt = this.db.prepare(`
      SELECT notes.* FROM notes
      JOIN links ON notes.id = links.source_note_id
      WHERE links.target_note_id = ? AND notes.deleted_at IS NULL
      ORDER BY notes.updated_at DESC
    `)
    return stmt.all(noteId) as Note[]
  }

  /**
   * Get notes that this note links to (outgoing links)
   */
  getOutgoingLinks(noteId: string): Note[] {
    const stmt = this.db.prepare(`
      SELECT notes.* FROM notes
      JOIN links ON notes.id = links.target_note_id
      WHERE links.source_note_id = ? AND notes.deleted_at IS NULL
      ORDER BY notes.updated_at DESC
    `)
    return stmt.all(noteId) as Note[]
  }

  // Transaction support
  transaction<T>(fn: () => T): T {
    return this.db.transaction(fn)()
  }

  // Cleanup
  close(): void {
    this.db.close()
  }
}
