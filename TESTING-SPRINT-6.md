# Sprint 6 Testing & Validation

> **Status**: Database layer complete, awaiting next session for UI
> **Checkpoint**: 2025-12-23 - End of Session

---

## ✅ Completed: Database Layer

### Migration 002 Implementation

**Files Modified:**
- `DatabaseService.ts` - Added migration002(), link tracking methods
- `src/main/index.ts` - Added IPC handlers for links
- `src/preload/index.ts` - Exposed link APIs

**Database Schema:**
```sql
CREATE TABLE links (
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
```

**API Methods:**
- `updateNoteLinks(noteId, content)` - Parse `[[links]]` and update database
- `getBacklinks(noteId)` - Get notes linking to this note
- `getOutgoingLinks(noteId)` - Get notes this note links to

---

## 🧪 Pre-Launch Testing Checklist

**Before starting the app:**

Current state:
- Database exists at v1 (from Sprints 1-5)
- Migration 002 code is committed
- Next app launch will auto-migrate v1 → v2

**Expected on next launch:**
```bash
# Console should show:
Running migration 002: Links table

# Database will have:
- schema_version table with version = 2
- links table with indexes
```

---

## ✓ Manual Verification Steps

### Test 1: Migration Executes Successfully

```bash
# Launch app
npm run dev

# Check console output
# Should see: "Running migration 002: Links table"

# Verify database
sqlite3 ~/Library/Application\ Support/nexus-desktop/data/nexus.db "
  SELECT version FROM schema_version;
  -- Should show: 1 and 2

  .schema links
  -- Should show: CREATE TABLE links (...)
"
```

**Expected Result:**
- ✓ No errors in console
- ✓ Version 2 in schema_version table
- ✓ Links table exists with indexes

---

### Test 2: Existing Features Still Work

**CRUD Operations:**
- [ ] Create a new note
- [ ] Edit note content
- [ ] Edit note title
- [ ] Delete a note
- [ ] Notes persist after restart

**Search:**
- [ ] Cmd+K opens search
- [ ] Type query shows results
- [ ] Click result opens note
- [ ] Highlighting works

**Folders:**
- [ ] Switch between PARA folders
- [ ] Create note in specific folder
- [ ] Notes filter by folder
- [ ] "All Notes" shows everything

**Editor:**
- [ ] Bold, italic formatting works
- [ ] Headings render correctly
- [ ] Code blocks with syntax highlighting
- [ ] Bullet and numbered lists
- [ ] Content auto-saves

---

### Test 3: Link Methods Work (API Level)

**In DevTools console:**

```javascript
// Test updateNoteLinks
// Create a note with wiki links
const testNote = await window.api.createNote({
  title: "Test Note",
  content: "<p>Link to [[Another Note]] and [[Third Note]]</p>",
  folder: "inbox"
})

// Update links (parse [[links]] from content)
await window.api.updateNoteLinks(testNote.id, testNote.content)
// Should execute without errors

// Test getBacklinks (should be empty initially)
const backlinks = await window.api.getBacklinks(testNote.id)
console.log('Backlinks:', backlinks)  // Should be []

// Test getOutgoingLinks
const outgoing = await window.api.getOutgoingLinks(testNote.id)
console.log('Outgoing:', outgoing)  // Should be [] (target notes don't exist yet)

// Create target note
const targetNote = await window.api.createNote({
  title: "Another Note",
  content: "<p>This is the target</p>",
  folder: "inbox"
})

// Re-run link update
await window.api.updateNoteLinks(testNote.id, testNote.content)

// Check outgoing links again
const outgoing2 = await window.api.getOutgoingLinks(testNote.id)
console.log('Outgoing after target created:', outgoing2)
// Should show "Another Note"

// Check backlinks from target
const backlinks2 = await window.api.getBacklinks(targetNote.id)
console.log('Backlinks to Another Note:', backlinks2)
// Should show "Test Note"
```

**Expected Results:**
- ✓ `updateNoteLinks` executes without errors
- ✓ `getBacklinks` returns array (empty initially)
- ✓ `getOutgoingLinks` finds target notes
- ✓ Bidirectional relationship works

---

## 🚧 Known Limitations (UI Not Built Yet)

**What DOESN'T work yet:**
- ❌ No visual rendering of `[[links]]` (just plain text)
- ❌ No autocomplete when typing `[[`
- ❌ No clickable links in editor
- ❌ No backlinks panel in UI
- ❌ Manual database queries required to see links

**This is expected!** We only built the database layer in this session.

---

## 📊 Test Results Log

**Date:** 2025-12-23 Night
**Tester:** DT + Claude
**Build:** Sprint 6 checkpoint (database layer + FTS fix)

### Migration Test
- [x] App launched successfully: ✅ Yes
- [x] Console showed migration 002: ✅ Yes
- [x] Database version is 2: ✅ Confirmed
- [x] Links table exists: ✅ Confirmed
- [x] No errors in console: ✅ Clean after FTS fix

### CRUD Test
- [x] Can create notes: ✅ Working
- [x] Can edit content: ✅ Working (after FTS fix)
- [x] Can edit titles: ✅ Working
- [ ] Can delete notes: Not tested (not critical for checkpoint)
- [x] Data persists: ✅ Confirmed

### Search Test
- [x] Search bar works: ✅ Cmd+K focus works
- [x] Results display: ✅ Working
- [x] Highlighting works: ✅ Yellow highlights correct
- [x] Navigation works: ✅ Click to open works

### Folder Test
- [x] Can switch folders: ✅ Working
- [x] Notes filter correctly: ✅ Working
- [x] Counts accurate: ✅ Working

### Link API Test
- [x] updateNoteLinks() works: ✅ Parsed [[links]] correctly
- [x] getBacklinks() works: ✅ Found 1 backlink to 'Target Note'
- [x] getOutgoingLinks() works: ✅ Found 2 outgoing links from 'Main Note'
- [x] Relationships correct: ✅ Bidirectional tracking working

---

## 🐛 Issues Found

| Issue | Severity | Description | Status |
|-------|----------|-------------|--------|
| FTS5 Corruption | Critical | FTS external content mode caused "database disk image is malformed" | ✅ FIXED (commit 9142e12) |
| SQL Syntax Error | Critical | Double quotes in strftime() caused "no such column: %s" | ✅ FIXED (previous commit) |

**Fix Details:**
- Changed FTS from `content=notes, content_rowid=rowid` to standalone table with `note_id UNINDEXED`
- Modified triggers to use `note.id` instead of `rowid`
- Changed UPDATE trigger to DELETE+INSERT pattern
- Updated searchNotes() join condition

---

## ✅ Sign-Off

**Database Layer Complete:** ☑ Pass ☐ Fail

**Blocker Issues:** ☑ None ☐ Found

**Ready for UI Work:** ☑ Yes ☐ No

**Tester Signature:** DT + Claude Sonnet 4.5  **Date:** 2025-12-23

---

## 📋 Next Session Checklist

**Before starting Sprint 6 UI work:**

1. ✓ Verify all tests above pass
2. ✓ No errors in console
3. ✓ Database at version 2
4. ✓ Links table exists and queryable
5. ✓ Link APIs work via DevTools

**Then proceed with:**
- Task 2: WikiLink TipTap extension
- Task 3: Autocomplete dropdown
- Task 4: SuggestionList component
- Task 5: BacklinksPanel component
- Task 6: App integration

**Estimated Time:** 6-8 hours for remaining UI work

---

**Last Updated:** 2025-12-23
**Session:** Sprint 6 Database Layer Complete
**Next:** Sprint 6 UI Layer (next session)
