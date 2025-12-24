# Sprint 6: Internal Links & Backlinks

> **Goal**: Implement wiki-style note linking with bidirectional relationships
> **Time**: 12 hours
> **Dependencies**: Sprints 1-5 (working app with database and editor)

---

## Overview

Transform Nexus from isolated notes into a connected knowledge graph using wiki-style `[[note-name]]` links. This sprint implements the core feature that makes note-taking apps powerful: the ability to connect ideas across notes.

**What We're Building:**
- `[[Note Title]]` syntax creates clickable links
- Autocomplete dropdown while typing `[[`
- Backlinks panel showing which notes link to current note
- Database tracking of link relationships
- Click link to navigate to target note

**Why This Matters:**
- Enables "networked thinking" and Zettelkasten workflows
- Automatic relationship discovery
- Foundation for graph visualization (future sprint)
- Core feature of modern note-taking apps (Obsidian, Roam, Logseq)

---

## Tasks Breakdown

### Task 1: Database Schema for Links (1.5h)

**File**: `src/main/database/DatabaseService.ts`

**Changes:**

1. **Add links table migration:**

```typescript
private runMigration002(): void {
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

    CREATE INDEX idx_links_source ON links(source_note_id);
    CREATE INDEX idx_links_target ON links(target_note_id);

    -- Update schema version
    UPDATE schema_version SET version = 2;
  `)
}
```

2. **Add link tracking methods:**

```typescript
// Parse content for [[links]] and update database
updateNoteLinks(noteId: string, content: string): void {
  const linkRegex = /\[\[([^\]]+)\]\]/g
  const matches = Array.from(content.matchAll(linkRegex))
  const linkedTitles = matches.map(m => m[1].trim())

  // Delete existing links from this note
  this.db.prepare('DELETE FROM links WHERE source_note_id = ?').run(noteId)

  // Find notes by title and create links
  for (const title of linkedTitles) {
    const targetNote = this.db
      .prepare('SELECT id FROM notes WHERE title = ? AND deleted_at IS NULL')
      .get(title) as { id: string } | undefined

    if (targetNote) {
      this.db
        .prepare('INSERT OR IGNORE INTO links (source_note_id, target_note_id) VALUES (?, ?)')
        .run(noteId, targetNote.id)
    }
  }
}

// Get notes that link to this note (backlinks)
getBacklinks(noteId: string): Note[] {
  const stmt = this.db.prepare(`
    SELECT notes.* FROM notes
    JOIN links ON notes.id = links.source_note_id
    WHERE links.target_note_id = ? AND notes.deleted_at IS NULL
    ORDER BY notes.updated_at DESC
  `)
  return stmt.all(noteId) as Note[]
}

// Get notes that this note links to
getOutgoingLinks(noteId: string): Note[] {
  const stmt = this.db.prepare(`
    SELECT notes.* FROM notes
    JOIN links ON notes.id = links.target_note_id
    WHERE links.source_note_id = ? AND notes.deleted_at IS NULL
    ORDER BY notes.updated_at DESC
  `)
  return stmt.all(noteId) as Note[]
}
```

**Acceptance Criteria:**
- [ ] Links table created with proper indexes
- [ ] Migration runs successfully
- [ ] Can parse `[[links]]` from content
- [ ] Backlinks query returns correct notes
- [ ] Links cascade delete when notes deleted

---

### Task 2: Custom TipTap Extension for Wiki Links (3h)

**File**: `src/renderer/src/extensions/WikiLink.ts`

**Implementation:**

```typescript
import { Mark, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

export interface WikiLinkOptions {
  HTMLAttributes: Record<string, any>
  onLinkClick: (title: string) => void
}

export const WikiLink = Mark.create<WikiLinkOptions>({
  name: 'wikiLink',

  addOptions() {
    return {
      HTMLAttributes: {},
      onLinkClick: () => {}
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="wiki-link"]'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        {
          'data-type': 'wiki-link',
          class: 'wiki-link cursor-pointer text-blue-400 hover:text-blue-300 hover:underline'
        }
      ),
      0
    ]
  },

  addAttributes() {
    return {
      title: {
        default: null,
        parseHTML: element => element.getAttribute('data-title'),
        renderHTML: attributes => {
          return {
            'data-title': attributes.title
          }
        }
      }
    }
  },

  // Parse [[wiki links]] as you type
  addProseMirrorPlugins() {
    const { onLinkClick } = this.options

    return [
      new Plugin({
        key: new PluginKey('wikiLinkParser'),

        // Decorate [[links]] in the document
        props: {
          decorations(state) {
            const { doc } = state
            const decorations: Decoration[] = []
            const regex = /\[\[([^\]]+)\]\]/g

            doc.descendants((node, pos) => {
              if (!node.isText) return

              const text = node.text || ''
              let match

              while ((match = regex.exec(text)) !== null) {
                const start = pos + match.index
                const end = start + match[0].length
                const title = match[1]

                decorations.push(
                  Decoration.inline(start, end, {
                    class: 'wiki-link-candidate bg-blue-900/30 rounded px-1',
                    'data-title': title
                  })
                )
              }
            })

            return DecorationSet.create(doc, decorations)
          },

          // Handle clicks on wiki links
          handleClick(view, pos, event) {
            const { doc, schema } = view.state
            const $pos = doc.resolve(pos)
            const node = $pos.parent

            if (!node.isText) return false

            const text = node.text || ''
            const offset = $pos.parentOffset
            const regex = /\[\[([^\]]+)\]\]/g
            let match

            while ((match = regex.exec(text)) !== null) {
              const start = match.index
              const end = start + match[0].length

              if (offset >= start && offset <= end) {
                const title = match[1]
                onLinkClick(title)
                event.preventDefault()
                return true
              }
            }

            return false
          }
        }
      })
    ]
  }
})
```

**Acceptance Criteria:**
- [ ] `[[Note Title]]` renders as clickable link
- [ ] Links styled with blue color
- [ ] Click opens target note
- [ ] Links update as you type
- [ ] Works with multi-word titles

---

### Task 3: Link Autocomplete Suggestion (3h)

**File**: `src/renderer/src/extensions/WikiLinkSuggestion.ts`

**Implementation:**

```typescript
import { ReactRenderer } from '@tiptap/react'
import { SuggestionOptions } from '@tiptap/suggestion'
import tippy, { Instance as TippyInstance } from 'tippy.js'
import { SuggestionList } from '../components/SuggestionList'

export const createWikiLinkSuggestion = (
  notes: Array<{ id: string; title: string }>
): Partial<SuggestionOptions> => ({
  char: '[[',

  // Only trigger at start of [[
  startOfLine: false,

  // Search notes by title
  items: ({ query }) => {
    return notes
      .filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10)
  },

  // Render suggestion dropdown
  render: () => {
    let component: ReactRenderer
    let popup: TippyInstance[]

    return {
      onStart: props => {
        component = new ReactRenderer(SuggestionList, {
          props,
          editor: props.editor
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as any,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start'
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as any
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }
        return component.ref?.onKeyDown(props) ?? false
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      }
    }
  },

  // Insert [[Note Title]] when selected
  command: ({ editor, range, props }) => {
    editor
      .chain()
      .focus()
      .insertContentAt(range, `[[${props.title}]]`)
      .run()
  }
})
```

**File**: `src/renderer/src/components/SuggestionList.tsx`

```typescript
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

interface SuggestionListProps {
  items: Array<{ id: string; title: string }>
  command: (item: any) => void
}

export const SuggestionList = forwardRef((props: SuggestionListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedIndex(0)
  }, [props.items])

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
        return true
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length)
        return true
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex)
        return true
      }
      return false
    }
  }))

  if (props.items.length === 0) {
    return (
      <div className="bg-nexus-bg-secondary border border-gray-600 rounded-lg shadow-lg p-2 text-gray-400 text-sm">
        No notes found
      </div>
    )
  }

  return (
    <div className="bg-nexus-bg-secondary border border-gray-600 rounded-lg shadow-lg overflow-hidden">
      {props.items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => selectItem(index)}
          className={`w-full text-left px-3 py-2 text-sm hover:bg-nexus-bg-primary transition-colors ${
            index === selectedIndex ? 'bg-nexus-accent text-white' : 'text-gray-300'
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
})

SuggestionList.displayName = 'SuggestionList'
```

**Acceptance Criteria:**
- [ ] Typing `[[` shows dropdown
- [ ] Dropdown filters as you type
- [ ] Arrow keys navigate suggestions
- [ ] Enter selects item
- [ ] Escape closes dropdown
- [ ] Shows max 10 suggestions

---

### Task 4: Backlinks Panel Component (2.5h)

**File**: `src/renderer/src/components/BacklinksPanel.tsx`

```typescript
import { useEffect, useState } from 'react'
import { Note } from '../types'

interface BacklinksPanelProps {
  noteId: string | null
  onSelectNote: (id: string) => void
}

export function BacklinksPanel({ noteId, onSelectNote }: BacklinksPanelProps) {
  const [backlinks, setBacklinks] = useState<Note[]>([])
  const [outgoingLinks, setOutgoingLinks] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!noteId) {
      setBacklinks([])
      setOutgoingLinks([])
      return
    }

    loadLinks()
  }, [noteId])

  const loadLinks = async () => {
    if (!noteId) return

    setIsLoading(true)
    try {
      const [incoming, outgoing] = await Promise.all([
        window.api.getBacklinks(noteId),
        window.api.getOutgoingLinks(noteId)
      ])
      setBacklinks(incoming)
      setOutgoingLinks(outgoing)
    } catch (error) {
      console.error('Failed to load links:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!noteId) {
    return (
      <div className="p-4 text-center text-gray-400 text-sm">
        Select a note to view links
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Backlinks Section */}
      <div className="border-b border-gray-700">
        <h3 className="px-4 py-3 text-sm font-semibold text-gray-300 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            />
          </svg>
          Backlinks ({backlinks.length})
        </h3>
        <div className="max-h-48 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
          ) : backlinks.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm">No backlinks</div>
          ) : (
            backlinks.map(note => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className="w-full text-left px-4 py-2 hover:bg-nexus-bg-primary transition-colors border-b border-gray-700/50"
              >
                <div className="text-sm font-medium text-gray-300">{note.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(note.updated_at * 1000).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Outgoing Links Section */}
      <div>
        <h3 className="px-4 py-3 text-sm font-semibold text-gray-300">
          Linked Notes ({outgoingLinks.length})
        </h3>
        <div className="max-h-48 overflow-y-auto">
          {outgoingLinks.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-sm">No outgoing links</div>
          ) : (
            outgoingLinks.map(note => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className="w-full text-left px-4 py-2 hover:bg-nexus-bg-primary transition-colors border-b border-gray-700/50"
              >
                <div className="text-sm font-medium text-gray-300">{note.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(note.updated_at * 1000).toLocaleDateString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
```

**Acceptance Criteria:**
- [ ] Shows backlinks (notes linking to current)
- [ ] Shows outgoing links (notes current links to)
- [ ] Click link navigates to note
- [ ] Updates when switching notes
- [ ] Shows count badges
- [ ] Handles empty states

---

### Task 5: Integrate Wiki Links into Editor (1.5h)

**File**: `src/renderer/src/components/Editor.tsx`

**Changes:**

```typescript
import Suggestion from '@tiptap/suggestion'
import { WikiLink } from '../extensions/WikiLink'
import { createWikiLinkSuggestion } from '../extensions/WikiLinkSuggestion'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  onLinkClick: (title: string) => void
  notes: Array<{ id: string; title: string }>
  editable?: boolean
}

export function Editor({ content, onChange, onLinkClick, notes, editable = true }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      WikiLink.configure({
        onLinkClick
      }),
      Suggestion.configure(createWikiLinkSuggestion(notes)),
      // ... other extensions
    ],
    // ... rest of config
  })

  // ... rest of component
}
```

**Acceptance Criteria:**
- [ ] WikiLink extension loads
- [ ] Suggestion dropdown appears on `[[`
- [ ] Click link triggers onLinkClick
- [ ] Notes list passed for autocomplete

---

### Task 6: Wire Up Link Tracking in App (0.5h)

**File**: `src/renderer/src/App.tsx`

**Changes:**

1. **Update note saves to track links:**

```typescript
const handleContentChange = async (content: string) => {
  if (selectedNote) {
    await updateNote(selectedNote.id, { content })
    // Update link relationships
    await window.api.updateNoteLinks(selectedNote.id, content)
  }
}
```

2. **Handle wiki link clicks:**

```typescript
const handleLinkClick = async (title: string) => {
  // Find note by title
  const targetNote = notes.find(n => n.title === title)
  if (targetNote) {
    selectNote(targetNote.id)
  } else {
    // Create new note if doesn't exist
    const newNote = await createNote({
      title,
      content: '<p></p>',
      folder: currentFolder || 'inbox'
    })
    selectNote(newNote.id)
  }
}
```

3. **Add BacklinksPanel to layout:**

```typescript
<div className="flex-1 flex">
  {/* Editor */}
  <div className="flex-1">
    <Editor
      content={selectedNote.content}
      onChange={handleContentChange}
      onLinkClick={handleLinkClick}
      notes={notes.map(n => ({ id: n.id, title: n.title }))}
    />
  </div>

  {/* Backlinks Sidebar */}
  <div className="w-64 border-l border-gray-700 bg-nexus-bg-secondary">
    <BacklinksPanel
      noteId={selectedNoteId}
      onSelectNote={selectNote}
    />
  </div>
</div>
```

**Acceptance Criteria:**
- [ ] Saving note updates link relationships
- [ ] Clicking link navigates to note
- [ ] Non-existent links create new notes
- [ ] Backlinks panel shows in sidebar

---

## Technical Notes

### Database Considerations

**Link Storage:**
- Store as relationships, not embedded in content
- Allows querying "all notes linking to X"
- Enables graph visualization later
- Cascades delete when notes deleted

**Performance:**
- Index both source and target for fast queries
- Max ~1000 links per note (reasonable limit)
- Links update on save (debounce if needed)

### Link Parsing Strategy

**Two-phase approach:**
1. **Visual decoration** (ProseMirror plugin): Highlight `[[...]]` as you type
2. **Database tracking** (on save): Parse content, update links table

**Why separate?**
- Visual feedback is instant
- Database updates happen on save (not every keystroke)
- Can show "broken links" (links to non-existent notes)

### Autocomplete UX

**Design decisions:**
- Show on `[[` (2 characters minimum)
- Filter as you continue typing
- Max 10 results (prevent overwhelming)
- Arrow keys + Enter to select
- Escape to cancel
- Click outside to dismiss

### Styling

```css
/* Wiki link styles */
.wiki-link {
  @apply text-blue-400 hover:text-blue-300 cursor-pointer hover:underline;
}

.wiki-link-candidate {
  @apply bg-blue-900/30 rounded px-1;
}

/* Broken link (no target found) */
.wiki-link-broken {
  @apply text-red-400 hover:text-red-300;
}
```

---

## Dependencies to Install

```bash
npm install @tiptap/extension-mention @tiptap/suggestion tippy.js
```

**Why each package:**
- `@tiptap/suggestion` - Autocomplete dropdown infrastructure
- `tippy.js` - Tooltip/popover positioning library
- We'll adapt Mention extension pattern for wiki links

---

## Definition of Done

**Sprint 6 is complete when:**

1. ✅ Database has links table with indexes
2. ✅ WikiLink TipTap extension working
3. ✅ `[[Note Title]]` renders as clickable link
4. ✅ Autocomplete dropdown appears on `[[`
5. ✅ Selecting from dropdown inserts link
6. ✅ Clicking link navigates to target note
7. ✅ BacklinksPanel shows incoming/outgoing links
8. ✅ Link relationships update on save
9. ✅ Non-existent links create new notes
10. ✅ All tests pass (manual checklist)
11. ✅ No console errors
12. ✅ Code committed with message: `feat(sprint-6): Complete Internal Links & Backlinks`

---

## Files to Create/Modify

**New Files:**
- `src/main/database/migration-002.sql` (or inline in DatabaseService)
- `src/renderer/src/extensions/WikiLink.ts` (~150 lines)
- `src/renderer/src/extensions/WikiLinkSuggestion.ts` (~100 lines)
- `src/renderer/src/components/SuggestionList.tsx` (~80 lines)
- `src/renderer/src/components/BacklinksPanel.tsx` (~150 lines)

**Modified Files:**
- `src/main/database/DatabaseService.ts` (+100 lines for links methods)
- `src/main/index.ts` (+3 IPC handlers)
- `src/preload/index.ts` (+3 API methods)
- `src/renderer/src/components/Editor.tsx` (+15 lines)
- `src/renderer/src/App.tsx` (+50 lines)
- `src/renderer/src/index.css` (+15 lines for wiki-link styles)
- `package.json` (+3 dependencies)

**Total:** ~800 lines of code

---

## Testing Checklist

**Basic Linking:**
- [ ] Type `[[` shows autocomplete
- [ ] Autocomplete filters notes
- [ ] Select note inserts `[[Title]]`
- [ ] `[[Title]]` renders as blue link
- [ ] Click link opens target note
- [ ] Link to non-existent note creates it

**Backlinks:**
- [ ] Create link from Note A to Note B
- [ ] Note B shows Note A in backlinks
- [ ] Delete link updates backlinks
- [ ] Delete note removes all its links

**Edge Cases:**
- [ ] Link with special characters
- [ ] Link to note with same name (rare)
- [ ] Multiple links in same paragraph
- [ ] Link at start/end of document
- [ ] Empty autocomplete (no matches)

---

## Next Sprint

After Sprint 6, we'll move to **Sprint 7: Task Management**:
- Checkbox syntax `- [ ]` and `- [x]`
- Task list view with filtering
- Due dates and priorities
- Task completion tracking

---

**Created**: 2025-12-23
**Estimated Time**: 12 hours
**Actual Time**: TBD
**Status**: 🟢 Starting now
