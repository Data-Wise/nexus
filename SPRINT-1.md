# Sprint 1: Hello World

**Status**: 🟡 In Progress
**Duration**: 10 hours
**Started**: 2025-12-23

---

## Goal

Get a working Electron app that displays notes and looks professional.

**What Success Looks Like**:
- Click app icon → app launches
- See list of notes in sidebar
- Click note → content displays
- Looks modern and polished
- Ready to add database in Sprint 2

---

## Tasks

### 1. Set up Electron + React + TypeScript (2h)

**Subtasks**:
- [ ] Create project with electron-vite
- [ ] Verify hot reload works
- [ ] Configure TypeScript strict mode
- [ ] Add Tailwind CSS
- [ ] Test app launches

**Commands**:
```bash
npm create @quick-start/electron nexus-desktop
cd nexus-desktop
npm install
npm run dev
```

---

### 2. Create Basic Window Layout (2h)

**Subtasks**:
- [ ] Design sidebar + main area layout
- [ ] Add resizable splitter
- [ ] Implement responsive sizing
- [ ] Add window controls (close, minimize, maximize)

**Components to Create**:
- `Layout.tsx` - Main layout shell
- `Sidebar.tsx` - Left sidebar
- `ContentArea.tsx` - Main content area

---

### 3. Hard-code Example Notes (1h)

**Subtasks**:
- [ ] Create mock data structure
- [ ] Add 10-15 example notes
- [ ] Display in sidebar list
- [ ] Group by folder

**Mock Data Structure**:
```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  createdAt: number;
  updatedAt: number;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Nexus',
    content: '# Welcome\n\nThis is your second brain...',
    folder: '00-INBOX',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  // ... more examples
];
```

---

### 4. Add Routing Between Notes (2h)

**Subtasks**:
- [ ] Set up Zustand store for state
- [ ] Implement note selection
- [ ] Display selected note content
- [ ] Add keyboard navigation (arrow keys)
- [ ] Highlight selected note

**Store Structure**:
```typescript
interface AppState {
  notes: Note[];
  selectedNoteId: string | null;
  selectNote: (id: string) => void;
}
```

---

### 5. Polish with Tailwind (2h)

**Subtasks**:
- [ ] Design color scheme (light/dark modes)
- [ ] Add smooth transitions
- [ ] Style note list items
- [ ] Style content area
- [ ] Add loading states
- [ ] Ensure consistent spacing

**Design System**:
```css
/* Colors */
--bg-primary: #1a1a2e
--bg-secondary: #16213e
--text-primary: #e8e8e8
--accent: #0f3460

/* Spacing */
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 2rem
```

---

### 6. Package as Launchable App (1h)

**Subtasks**:
- [ ] Configure electron-builder
- [ ] Create app icon
- [ ] Build for macOS
- [ ] Test built app
- [ ] Document build process

**Build Command**:
```bash
npm run build
```

---

## Deliverables

By end of Sprint 1:

1. **Working Desktop App**
   - Launches without errors
   - Professional appearance
   - Smooth interactions

2. **Core UI Components**
   - Sidebar with note list
   - Content display area
   - Basic navigation

3. **Mock Data**
   - 10-15 example notes
   - Organized by folders
   - Realistic content

4. **Documentation**
   - README with setup instructions
   - Build/run commands
   - Architecture notes

---

## Testing Checklist

Before marking Sprint 1 complete:

- [ ] App launches on macOS
- [ ] No console errors
- [ ] Can click through all notes
- [ ] Keyboard navigation works
- [ ] Dark mode looks good
- [ ] App icon displays correctly
- [ ] Can build production version
- [ ] Git committed with good messages

---

## Notes & Blockers

### Technical Decisions
- Using electron-vite for faster builds
- Zustand over Redux for simplicity
- Tailwind for rapid styling

### Challenges Encountered
- [To be filled during development]

### Learnings
- [To be filled during development]

---

## Next Sprint Preview

**Sprint 2: SQLite Database** (12h)
- Add better-sqlite3
- Create database schema
- Implement CRUD operations
- Replace mock data with real persistence

---

**Started**: 2025-12-23
**Target Completion**: TBD
**Actual Completion**: TBD
