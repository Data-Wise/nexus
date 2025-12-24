# Nexus Development Plan

> **Gradual, Desktop-First Implementation**
> Build a powerful local knowledge management app, one feature at a time

---

## Vision

A sophisticated desktop application for personal knowledge management that:
- Works entirely locally (no cloud dependency)
- Provides ADHD-optimized workflows
- Integrates AI features (added later)
- Maintains data sovereignty

---

## Architecture (Phase 1)

```
Desktop App (Electron + React + TypeScript)
  ├─ Frontend: React 18 + TipTap Editor + Tailwind CSS
  ├─ Database: SQLite (better-sqlite3)
  └─ Storage: Local filesystem (~/.nexus/)

Later Additions:
  - AI Features (Claude API)
  - Cloud Sync
  - Mobile Apps
```

---

## Implementation Phases

### Phase 1: Core Desktop App (10 Sprints, ~116 hours)

**Goal**: Fully functional local knowledge management app

| Sprint | Feature | Hours | Status | Details |
|--------|---------|-------|--------|---------|
| 1 | Hello World UI | 10h | ✅ Complete | [SPRINT-1.md](SPRINT-1.md) |
| 2 | SQLite Database | 12h | ✅ Complete | [SPRINT-2.md](SPRINT-2.md) |
| 3 | Rich Markdown Editor | 15h | ✅ Complete | [SPRINT-3.md](SPRINT-3.md) |
| 4 | PARA Folder Structure | 12h | ✅ Complete | - |
| 5 | Full-Text Search (FTS5) | 10h | ✅ Complete | [SPRINT-5.md](SPRINT-5.md) |
| 6 | Wiki Links & Backlinks | 12h | ✅ Complete | [nexus-desktop/SPRINT-6-COMPLETE.md](nexus-desktop/SPRINT-6-COMPLETE.md) |
| 7 | Tags System | 10h | ✅ Complete | [nexus-desktop/SPRINT-7-COMPLETE.md](nexus-desktop/SPRINT-7-COMPLETE.md) |
| 8 | Search & Filter Enhancements | 12h | 📋 Planned | [nexus-desktop/SPRINT-8-PLAN.md](nexus-desktop/SPRINT-8-PLAN.md) |
| 9 | Task Management | 15h | ⚪ Not Started | - |
| 10 | Dashboards | 12h | ⚪ Not Started |
| 11 | Templates | 10h | ⚪ Not Started |
| 12 | Import/Export | 8h | ⚪ Not Started |

**Deliverables**:
- ✅ Fast, responsive desktop app
- ✅ WYSIWYG markdown editing
- ✅ PARA folder organization
- ✅ Full-text search
- ✅ Wiki-style linking
- ✅ ADHD-friendly task management
- ✅ Visual dashboards
- ✅ Template system
- ✅ Obsidian import/export

---

### Phase 2: AI Features (~43 hours)

**Goal**: Add intelligent assistance

| Sprint | Feature | Hours | Status |
|--------|---------|-------|--------|
| 11 | Claude API Integration | 25h | ⚪ Not Started |
| 12 | Semantic Search | 18h | ⚪ Not Started |

**Features**:
- Smart tagging
- Task extraction from notes
- Related notes suggestions
- Writing assistance
- Daily AI briefing
- Semantic search

---

### Phase 3: Sync & Multi-Device (Future)

**Goal**: Access from anywhere

| Sprint | Feature | Hours | Status |
|--------|---------|-------|--------|
| 13-14 | Cloud Sync | 40-50h | ⚪ Not Started |

**Features**:
- Backend API
- Delta sync
- Conflict resolution
- End-to-end encryption
- Web app
- Mobile apps

---

## Sprint 1: Hello World (Current)

**Goal**: Get something running you can click around in

**Time**: 10 hours

### Tasks

1. **Set up Electron + React + TypeScript project** (2h)
   - Use electron-vite template
   - Configure TypeScript
   - Set up hot reload

2. **Create basic window layout** (2h)
   - Sidebar + main content area
   - Basic styling with Tailwind CSS
   - Responsive layout

3. **Hard-code example notes in UI** (1h)
   - Mock data structure
   - Display in sidebar

4. **Add routing between notes** (2h)
   - Click note → show content
   - URL-based routing
   - Navigation history

5. **Polish with Tailwind** (2h)
   - Professional appearance
   - Dark mode support
   - Smooth transitions

6. **Package as launchable app** (1h)
   - Build scripts
   - Test on macOS
   - Create app icon

### Deliverables

- ✅ App launches successfully
- ✅ Shows list of notes in sidebar
- ✅ Click note → displays content
- ✅ Professional appearance
- ✅ Ready for Sprint 2 (database)

---

## Tech Stack

### Core
- **Framework**: Electron 28+
- **UI**: React 18 + TypeScript
- **State**: Zustand
- **Editor**: TipTap (added Sprint 3)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: SQLite via better-sqlite3 (added Sprint 2)

### Development
- **Build**: electron-vite
- **Package**: electron-builder
- **Linting**: ESLint + Prettier
- **Testing**: Vitest (later)

---

## Project Structure

```
nexus-desktop/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── main.ts
│   │   ├── database.ts       (Sprint 2)
│   │   └── ipc-handlers.ts
│   │
│   ├── renderer/             # React app
│   │   ├── components/
│   │   │   ├── Sidebar/
│   │   │   ├── Editor/       (Sprint 3)
│   │   │   ├── Dashboard/    (Sprint 8)
│   │   │   └── Tasks/        (Sprint 7)
│   │   │
│   │   ├── hooks/
│   │   ├── store/
│   │   └── App.tsx
│   │
│   └── preload.ts
│
├── package.json
├── electron-builder.json
└── tsconfig.json
```

---

## Development Workflow

### Daily Work Cycle
1. Pick next task from current sprint
2. Implement feature
3. Test locally
4. Commit to git
5. Update this plan with progress

### Sprint Completion
1. All tasks ✅ checked
2. App tested end-to-end
3. Git tag: `sprint-N`
4. Document learnings
5. Plan next sprint

### Quality Gates
- Code compiles without errors
- App launches and runs
- Feature works as designed
- No console errors
- Git committed

---

## Success Metrics

### After Phase 1 (Core App)
- [ ] Can capture thoughts in < 5 seconds
- [ ] Can find any note in < 3 seconds
- [ ] App feels faster than Obsidian
- [ ] Using daily for actual work
- [ ] No data loss (robust SQLite)

### After Phase 2 (AI)
- [ ] AI suggestions actually useful
- [ ] Tasks auto-extracted accurately
- [ ] Semantic search finds right notes
- [ ] Daily briefing saves time

---

## Timeline Estimate

**At 10 hours/week**:
- Phase 1: 12 weeks (3 months)
- Phase 2: 5 weeks (1 month)
- Total to AI-powered app: **4 months**

**At 20 hours/week**:
- Phase 1: 6 weeks
- Phase 2: 2-3 weeks
- Total: **2 months**

---

## Principles

1. **One feature at a time** - Complete each sprint fully
2. **Use it yourself** - Dog-food after each sprint
3. **Iterate on pain** - Add features when needed
4. **Keep it simple** - Local-first, no premature optimization
5. **Ship quality** - Every sprint = working software

---

## Notes & Learnings

### Sprint 1 ✅
- Successfully created Electron + React + TypeScript project
- Configured electron-vite build system
- Added Tailwind CSS for styling
- Hot reload working perfectly
- App launches successfully with professional appearance

### Sprint 2 ✅
- Integrated better-sqlite3 with electron-rebuild
- Created DatabaseService with FTS5 full-text search
- Implemented CRUD operations via IPC handlers
- Connected Zustand store to database
- Migration system with schema_version tracking
- WAL mode enabled for performance

### Sprint 3 ✅
- Integrated TipTap editor with ProseMirror
- Created Editor component with formatting toolbar
- 10+ formatting options (bold, italic, headings, lists, code blocks)
- Syntax highlighting with lowlight (VS Code dark theme)
- Real-time auto-save to database
- Editable note titles

### Sprint 4 ✅
- Implemented 5 PARA folders (Inbox, Projects, Areas, Resources, Archive)
- Folder navigation sidebar with emoji icons
- Folder filtering functionality
- "All Notes" view
- Folder badges and note counts

### Sprint 5 ✅
- SearchBar component with Cmd+K keyboard shortcut
- SearchResults component with context snippets
- HighlightedText component for yellow term highlighting
- Search utility functions (snippet extraction, HTML stripping)
- Integrated FTS5 search into UI
- Real-time search as you type
- Case-insensitive multi-term matching
- Empty state and loading state
- Created GETTING-STARTED.md guide

### Sprint 6 ✅
- WikiLink Mark extension for rendering `[[links]]`
- WikiLinkInputRule plugin for detecting `[[` pattern
- WikiLinkAutocomplete component with keyboard navigation
- BacklinksPanel showing incoming/outgoing links
- Database links table for relationship tracking
- Automatic note creation from broken links
- Real-time link updates
- 16 automated tests (8 passing unit tests)

### Sprint 7 ✅
- TagInputRule extension for detecting `#` pattern
- TagMark extension for rendering colored tag badges
- TagAutocomplete component (reused WikiLink pattern)
- TagsPanel showing all tags with note counts
- TagFilter component for multi-tag filtering (AND logic)
- Database tags and note_tags tables (many-to-many)
- Hash-based consistent tag colors
- Auto-parsing tags from content
- Case-insensitive tag matching
- 52 automated tests (100% passing)

### Sprint 8 📋
- **Planned**: Search & Filter Enhancements
- Search highlighting (titles + snippets)
- Advanced filters (folder, date range, tags, sort)
- Search history (persist across sessions)
- Enhanced result cards with metadata
- Keyboard navigation improvements
- See [nexus-desktop/SPRINT-8-PLAN.md](nexus-desktop/SPRINT-8-PLAN.md)

---

**Last Updated**: 2024-12-24
**Current Sprint**: 8 (Search & Filter Enhancements) - 📋 Planned
**Completed Sprints**: 7/12 complete (58%)
**Next Sprint**: 9 (Task Management)
**App Version**: 0.3.0
