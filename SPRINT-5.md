# Sprint 5: Full-Text Search UI

> **Goal**: Add search interface to expose FTS5 full-text search capabilities
> **Time**: 10 hours
> **Dependencies**: Sprint 2 (FTS5 already implemented in database)

---

## Overview

Sprint 2 built a powerful FTS5 full-text search engine into the database. Sprint 5 adds the UI layer to make this feature accessible to users.

**What's Already Done:**
- ✅ FTS5 virtual table (`notes_fts`) with title + content indexing
- ✅ Database method: `searchNotes(query: string): Note[]`
- ✅ IPC handler: `notes:search`
- ✅ Zustand store method: `searchNotes(query: string)`

**What We're Building:**
- 🔍 Search bar component with input field
- ⌨️ Keyboard shortcut (Cmd+K) to focus search
- 📋 Search results display
- 🎨 Highlight matching terms in results
- 🚀 Fast, responsive search experience

---

## Tasks Breakdown

### Task 1: Create SearchBar Component (2h)

**File**: `src/renderer/src/components/SearchBar.tsx`

**Features:**
- Text input with search icon
- Clear button (X) when text entered
- Keyboard shortcut listener (Cmd+K)
- Auto-focus on Cmd+K
- Escape to clear/close

**Implementation:**

```typescript
import { useState, useEffect, useRef } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
}

export function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        handleClear()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      onSearch(value.trim())
    } else {
      onClear()
    }
  }

  const handleClear = () => {
    setQuery('')
    onClear()
    inputRef.current?.blur()
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search notes... (Cmd+K)"
        className="w-full px-4 py-2 pl-10 pr-8 bg-nexus-bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-nexus-accent"
      />
      {/* Search icon */}
      <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400">
        {/* Search icon SVG */}
      </svg>
      {/* Clear button */}
      {query && (
        <button onClick={handleClear}>
          <svg className="w-4 h-4 text-gray-400 hover:text-white">
            {/* X icon SVG */}
          </svg>
        </button>
      )}
    </div>
  )
}
```

**Acceptance Criteria:**
- [ ] Component renders with search icon
- [ ] Cmd+K focuses input
- [ ] Escape clears and blurs
- [ ] Clear button appears when typing
- [ ] Calls `onSearch` for non-empty queries
- [ ] Calls `onClear` when empty

---

### Task 2: Integrate Search into App (1.5h)

**File**: `src/renderer/src/App.tsx`

**Changes:**

1. **Add search state:**
   ```typescript
   const [searchQuery, setSearchQuery] = useState('')
   const [searchResults, setSearchResults] = useState<Note[]>([])
   const [isSearching, setIsSearching] = useState(false)
   ```

2. **Add search handler:**
   ```typescript
   const handleSearch = async (query: string) => {
     setSearchQuery(query)
     setIsSearching(true)
     try {
       const results = await window.api.searchNotes(query)
       setSearchResults(results)
     } catch (error) {
       console.error('Search failed:', error)
     }
   }

   const handleClearSearch = () => {
     setSearchQuery('')
     setSearchResults([])
     setIsSearching(false)
   }
   ```

3. **Add SearchBar to UI:**
   ```typescript
   <div className="p-4 border-b border-gray-700">
     <h1 className="text-2xl font-bold mb-3">Nexus</h1>
     <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
     <button onClick={handleCreateNote}>New Note</button>
   </div>
   ```

4. **Conditional rendering:**
   ```typescript
   {/* Show search results when searching, otherwise show folder notes */}
   {isSearching ? (
     <SearchResults
       results={searchResults}
       query={searchQuery}
       onSelectNote={selectNote}
       selectedNoteId={selectedNoteId}
     />
   ) : (
     <NotesList
       notes={notes}
       selectedNoteId={selectedNoteId}
       onSelectNote={selectNote}
     />
   )}
   ```

**Acceptance Criteria:**
- [ ] SearchBar appears in sidebar header
- [ ] Typing triggers search
- [ ] Search results replace notes list
- [ ] Clearing search shows folder notes again
- [ ] Error handling for failed searches

---

### Task 3: Create SearchResults Component (2h)

**File**: `src/renderer/src/components/SearchResults.tsx`

**Features:**
- Display list of matching notes
- Show snippet of matching content
- Highlight search terms in title and snippet
- Show folder badge
- Empty state for no results

**Implementation:**

```typescript
interface SearchResultsProps {
  results: Note[]
  query: string
  onSelectNote: (id: string) => void
  selectedNoteId: string | null
}

export function SearchResults({ results, query, onSelectNote, selectedNoteId }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <svg className="w-12 h-12 mx-auto mb-2 opacity-50">
          {/* Search icon */}
        </svg>
        <p>No notes found for "{query}"</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2 text-xs text-gray-400 border-b border-gray-700">
        {results.length} result{results.length !== 1 ? 's' : ''}
      </div>
      {results.map((note) => (
        <SearchResultItem
          key={note.id}
          note={note}
          query={query}
          isSelected={note.id === selectedNoteId}
          onClick={() => onSelectNote(note.id)}
        />
      ))}
    </div>
  )
}

function SearchResultItem({ note, query, isSelected, onClick }: {
  note: Note
  query: string
  isSelected: boolean
  onClick: () => void
}) {
  // Extract snippet with context around match
  const snippet = extractSnippet(note.content, query)

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-nexus-bg-primary ${
        isSelected ? 'bg-nexus-accent/20 border-l-4 border-l-nexus-accent' : ''
      }`}
    >
      <div className="font-medium mb-1">
        <HighlightedText text={note.title} query={query} />
      </div>
      <div className="text-sm text-gray-400 mb-2">
        <HighlightedText text={snippet} query={query} />
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="px-2 py-1 bg-gray-700 rounded">
          {FOLDERS.find(f => f.path === note.folder)?.name.split(' ')[1] || note.folder}
        </span>
        <span className="text-gray-500">
          {new Date(note.updated_at * 1000).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
```

**Acceptance Criteria:**
- [ ] Results list displays all matches
- [ ] Shows snippet of content (50-100 chars)
- [ ] Selected result highlighted
- [ ] Empty state shows helpful message
- [ ] Folder badges displayed
- [ ] Click result selects note

---

### Task 4: Text Highlighting Component (2.5h)

**File**: `src/renderer/src/components/HighlightedText.tsx`

**Features:**
- Case-insensitive highlighting
- Multiple term support (split by spaces)
- HTML entity handling
- Proper React key handling

**Implementation:**

```typescript
interface HighlightedTextProps {
  text: string
  query: string
}

export function HighlightedText({ text, query }: HighlightedTextProps) {
  if (!query.trim()) {
    return <>{text}</>
  }

  // Strip HTML tags for display
  const plainText = stripHtml(text)

  // Split query into terms
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  // Create regex to match any term
  const regex = new RegExp(
    `(${terms.map(escapeRegex).join('|')})`,
    'gi'
  )

  const parts = plainText.split(regex)

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = terms.some(term =>
          part.toLowerCase() === term.toLowerCase()
        )
        return isMatch ? (
          <mark
            key={index}
            className="bg-yellow-500 text-black px-1 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      })}
    </>
  )
}

function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractSnippet(content: string, query: string, contextLength = 50): string {
  const plainText = stripHtml(content)
  const lowerText = plainText.toLowerCase()
  const lowerQuery = query.toLowerCase().split(/\s+/)[0] // First term

  const matchIndex = lowerText.indexOf(lowerQuery)

  if (matchIndex === -1) {
    // No match, return beginning
    return plainText.slice(0, contextLength * 2) + '...'
  }

  // Extract context around match
  const start = Math.max(0, matchIndex - contextLength)
  const end = Math.min(plainText.length, matchIndex + lowerQuery.length + contextLength)

  let snippet = plainText.slice(start, end)

  if (start > 0) snippet = '...' + snippet
  if (end < plainText.length) snippet = snippet + '...'

  return snippet
}
```

**Acceptance Criteria:**
- [ ] Highlights all matching terms
- [ ] Case-insensitive matching
- [ ] Multiple terms highlighted separately
- [ ] HTML stripped before highlighting
- [ ] Yellow background on matches
- [ ] No React key warnings

---

### Task 5: Snippet Extraction Utility (1h)

**File**: `src/renderer/src/utils/search.ts`

**Features:**
- Extract text snippet around first match
- Handle multiple search terms
- Strip HTML tags
- Add ellipsis for truncation

**Implementation:**

```typescript
export function extractSearchSnippet(
  html: string,
  query: string,
  maxLength = 150
): string {
  // Strip HTML
  const text = stripHtml(html)

  // Get first search term
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
  }

  const firstTerm = terms[0]
  const lowerText = text.toLowerCase()
  const matchIndex = lowerText.indexOf(firstTerm)

  if (matchIndex === -1) {
    // No match found, return beginning
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')
  }

  // Calculate snippet boundaries
  const contextBefore = 50
  const contextAfter = maxLength - firstTerm.length - contextBefore

  const start = Math.max(0, matchIndex - contextBefore)
  const end = Math.min(text.length, matchIndex + firstTerm.length + contextAfter)

  let snippet = text.slice(start, end)

  // Add ellipsis
  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'

  return snippet
}

function stripHtml(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
```

**Acceptance Criteria:**
- [ ] Returns snippet centered on first match
- [ ] Handles no matches gracefully
- [ ] Strips all HTML tags
- [ ] Adds ellipsis appropriately
- [ ] Respects maxLength parameter

---

### Task 6: UI Polish & Testing (1h)

**Polish Items:**

1. **Loading state** while searching:
   ```typescript
   {isLoading && (
     <div className="p-4 text-center text-gray-400">
       <div className="animate-spin w-6 h-6 border-2 border-nexus-accent border-t-transparent rounded-full mx-auto" />
       <p className="mt-2">Searching...</p>
     </div>
   )}
   ```

2. **Search count in header:**
   ```typescript
   <div className="text-xs text-gray-400 px-4 py-2">
     Searching for: "{searchQuery}" ({searchResults.length} results)
   </div>
   ```

3. **Keyboard navigation** (bonus):
   - Arrow keys to navigate results
   - Enter to select
   - Escape to close search

4. **Search persistence** (bonus):
   - Remember last search when switching views
   - Clear search when creating new note

**Testing Checklist:**

- [ ] Search works with single word
- [ ] Search works with multiple words
- [ ] Case-insensitive matching
- [ ] Highlights appear correctly
- [ ] Cmd+K focuses search
- [ ] Escape clears search
- [ ] Search across folders
- [ ] Empty results show message
- [ ] Loading state appears
- [ ] No console errors

---

## Technical Notes

### FTS5 Query Syntax

The database already supports FTS5 syntax:

```sql
-- Simple term
SELECT * FROM notes_fts WHERE notes_fts MATCH 'mediation'

-- Multiple terms (AND)
SELECT * FROM notes_fts WHERE notes_fts MATCH 'mediation analysis'

-- Phrase search
SELECT * FROM notes_fts WHERE notes_fts MATCH '"exact phrase"'

-- OR search
SELECT * FROM notes_fts WHERE notes_fts MATCH 'mediation OR regression'

-- Column-specific
SELECT * FROM notes_fts WHERE notes_fts MATCH 'title:mediation'
```

For Sprint 5, we'll use simple term matching. Advanced syntax can be Sprint 6+.

### Performance Considerations

- FTS5 is already indexed (no performance issues expected)
- Debounce search input (300ms) to avoid excessive queries
- Limit results to 50 (already done in DatabaseService)
- Use virtual scrolling for 100+ results (future enhancement)

### Styling

Use existing Tailwind classes:
- `bg-nexus-bg-primary` - Primary background
- `bg-nexus-bg-secondary` - Secondary background
- `text-nexus-text-primary` - Primary text
- `border-gray-700` - Borders
- `bg-nexus-accent` - Accent color (blue)
- `bg-yellow-500` - Search highlights

---

## Definition of Done

**Sprint 5 is complete when:**

1. ✅ SearchBar component created and functional
2. ✅ Cmd+K keyboard shortcut works
3. ✅ Search integrated into App.tsx
4. ✅ SearchResults component displays matches
5. ✅ HighlightedText component highlights terms
6. ✅ Snippet extraction works correctly
7. ✅ All tests pass (manual checklist)
8. ✅ No console errors or warnings
9. ✅ Search performance is fast (< 100ms for 100 notes)
10. ✅ Code committed with message: `feat(sprint-5): Complete Full-Text Search UI`

---

## Files to Create/Modify

**New Files:**
- `src/renderer/src/components/SearchBar.tsx` (~100 lines)
- `src/renderer/src/components/SearchResults.tsx` (~150 lines)
- `src/renderer/src/components/HighlightedText.tsx` (~60 lines)
- `src/renderer/src/utils/search.ts` (~50 lines)

**Modified Files:**
- `src/renderer/src/App.tsx` (+80 lines)
- `src/renderer/src/index.css` (+20 lines for highlight styles)

**Total:** ~460 lines of code

---

## Next Sprint

After Sprint 5, we'll move to **Sprint 6: Internal Links & Backlinks**:
- Wiki-style `[[note-name]]` links
- Link autocomplete
- Backlinks panel
- Graph view (optional)

---

**Created**: 2025-12-23
**Estimated Time**: 10 hours
**Actual Time**: TBD
**Status**: 🟢 Ready to start
