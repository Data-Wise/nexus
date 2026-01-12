# Integration Analysis: Atlas, flow-cli, Scribe → Nexus

**Created:** 2025-01-11  
**Purpose:** Identify overlap, redundancy, and integration opportunities

---

## Executive Summary

### Current State

**4 separate tools with overlapping concerns:**

| Tool | Type | Purpose | Status | Version |
|------|------|---------|--------|---------|
| **atlas** | Node.js CLI | Project state engine (registry, sessions, capture) | Active | v0.7.0 |
| **flow-cli** | ZSH plugin | ADHD workflow (work/win/finish, dashboard) | Production | v5.2.0 |
| **scribe** | Tauri app | Distraction-free writer (markdown, projects, AI) | Active | v1.16.0 |
| **nexus** | Documentation | Knowledge architecture (Obsidian + Claude + MCP) | Planning | v0.1.0 |

### Key Finding

**Significant overlap exists** - Each tool addresses different layers of the same problem:

```
┌─────────────────────────────────────────────────────────────────┐
│                  THE KNOWLEDGE WORK STACK                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Layer 5: Cognitive (AI Brain)        → NEXUS (Claude + MCP)   │
│  Layer 4: Content Creation            → SCRIBE (Editor)        │
│  Layer 3: Workflow Management         → FLOW-CLI (ZSH)         │
│  Layer 2: State Management            → ATLAS (Engine)         │
│  Layer 1: Storage                     → Filesystem/Obsidian    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detailed Analysis

### 1. Atlas (State Engine)

**Location:** `~/projects/dev-tools/atlas/`  
**Runtime:** Node.js  
**Architecture:** Clean Architecture (domain, use-cases, adapters)

#### Core Capabilities

**Project Management:**
- Project registry (scan, register, list)
- `.STATUS` file integration
- Project type detection
- Recent projects tracking

**Session Tracking:**
- Work sessions with duration
- Session stats and history
- Export sessions

**Quick Capture:**
- Capture ideas/tasks/bugs
- Inbox triage workflow
- Quick notes

**Context Management:**
- Breadcrumb trail ("where was I?")
- Context parking/unparking
- Context restoration

**ADHD Helpers:**
- Streak calculator
- Time blindness helper
- Session completion helper
- Celebration helper

#### Storage Backends
- Filesystem (JSON files)
- SQLite (optional)

#### CLI Commands
```bash
atlas init
atlas sync                    # Sync from .STATUS files
atlas session start <project>
atlas catch "idea"
atlas crumb "breadcrumb"
atlas where                   # Show context
```

---

### 2. flow-cli (Workflow ZSH)

**Location:** `~/projects/dev-tools/flow-cli/`  
**Runtime:** ZSH  
**Integration:** Uses atlas as state engine

#### Core Capabilities

**Session Management:**
- `work <project>` - Start session
- `finish` - End session
- `hop <project>` - Quick switch (tmux)

**Motivation System:**
- `win "achievement"` - Log win
- `yay` - Show wins
- `flow goal set N` - Daily targets

**Context Awareness:**
- `dash` - Dashboard (what's happening?)
- `why` - Where was I?
- `pick` - Project picker (fzf)

**Sync & Tracking:**
- `flow sync` - Sync wins across devices
- Win streaks and daily goals
- Conventional commit integration

**Dispatchers (Many!):**
- `cc` - Claude Code integration
- `mcp` - MCP server management
- `r` - R/RStudio integration
- `v` - VS Code integration
- `wt` - Worktree management
- `tm` - Tmux integration
- `qu` - Quarto integration
- `obs` - Obsidian integration
- `g` - Git operations

#### ADHD Optimizations
- 10-second start time
- Visible wins for dopamine
- Dashboard for orientation
- Quick project switching
- Friction-free capture

---

### 3. Scribe (Writer App)

**Location:** `~/projects/dev-tools/scribe/`  
**Runtime:** Tauri (Rust + React)  
**Purpose:** ADHD-friendly distraction-free writing

#### Core Capabilities

**Editor (HybridEditor++):**
- Three modes: Source, Live Preview, Reading
- Obsidian-style callouts (11 types)
- Focus mode
- Wiki links with autocomplete
- Tags with autocomplete
- Citations (@cite)
- Math (KaTeX)

**Projects:**
- Project-based organization
- Templates (Research+, Teaching+, Dev+, Writing+)
- Project switcher

**AI Integration (CLI-based):**
- Claude + Gemini chat
- Quick Actions (✨ Improve, 📝 Expand, etc.)
- Chat persistence per note
- @ References (include other notes)
- No API keys (uses CLI tools)

**Export:**
- PDF, Word, LaTeX, HTML (via Pandoc)

**Themes & Fonts:**
- 8 visual themes
- 14 fonts
- Dark/light modes

**Keyboard Shortcuts:**
- ⌘⇧N - Global hotkey
- ⌘K - Command palette
- ⌘D - Daily note

#### Storage
- Local markdown files
- SQLite for metadata
- Browser DB for projects/notes

---

### 4. Nexus (Knowledge Architecture)

**Location:** `~/projects/dev-tools/nexus/`  
**Type:** Documentation + MCP Extension  
**Purpose:** Claude + Obsidian knowledge integration

#### Current State (Planning)

**Deliverables:**
- ✅ Vault template (PARA structure)
- ✅ Architecture documentation
- ✅ Strategic direction
- 🔄 MCP extension (Phase 1-5)

**Target Capabilities (via MCP):**

**Zotero (Phase 1):**
- Search 2,728+ library items
- Generate citations
- Access annotations

**PDFs (Phase 2):**
- Extract text from ~1,800 PDFs
- Search across all PDFs
- Summarize sections

**Vault (Phase 3):**
- Read/write Obsidian notes
- Search vault
- Manage wiki links

**Knowledge Query (Phase 4):**
- Unified search across all sources
- Semantic connections
- AI-assisted synthesis

**Three Modes:**
- 🔖 Librarian (capture, organize, retrieve)
- 🔧 Builder (code, packages, tests)
- 📚 Teacher (lectures, examples)

---

## Overlap & Redundancy Analysis

### 🔴 Significant Overlap

#### 1. Project Management

| Feature | atlas | flow-cli | scribe | nexus |
|---------|-------|----------|--------|-------|
| Project registry | ✅ Core | ✅ (uses atlas) | ✅ Separate | - |
| .STATUS files | ✅ | ✅ | ✅ | ✅ (proposed) |
| Project picker | ✅ | ✅ fzf | ✅ UI | - |
| Project templates | - | - | ✅ | ✅ (vault) |

**Redundancy:** Three separate project registries (atlas, scribe, potential nexus)

#### 2. Session Tracking

| Feature | atlas | flow-cli | scribe | nexus |
|---------|-------|----------|--------|-------|
| Work sessions | ✅ | ✅ | - | - |
| Session duration | ✅ | ✅ | - | - |
| Session stats | ✅ | ✅ | - | - |

**Redundancy:** None (flow-cli uses atlas correctly)

#### 3. Quick Capture

| Feature | atlas | flow-cli | scribe | nexus |
|---------|-------|----------|--------|-------|
| Capture ideas | ✅ | ✅ `win` | - | - |
| Inbox triage | ✅ | - | - | - |
| Daily notes | - | - | ✅ | ✅ (vault) |

**Redundancy:** Multiple capture mechanisms for different purposes

#### 4. Note Management

| Feature | atlas | flow-cli | scribe | nexus |
|---------|-------|----------|--------|-------|
| Markdown editor | - | - | ✅ Core | - |
| Wiki links | - | - | ✅ | ✅ (vault) |
| Tags | - | - | ✅ | ✅ (vault) |
| Projects | ✅ | ✅ | ✅ | ✅ (vault) |

**Redundancy:** Scribe and Nexus vault both manage markdown notes

#### 5. AI Integration

| Feature | atlas | flow-cli | scribe | nexus |
|---------|-------|----------|--------|-------|
| Claude integration | - | ✅ `cc` | ✅ Chat | ✅ Core (MCP) |
| Quick Actions | - | - | ✅ | - |
| Context | - | ✅ `why` | - | ✅ (knowledge) |

**Redundancy:** Multiple Claude integrations for different use cases

---

## Integration Opportunities

### 🎯 Strategy: Unified Knowledge Stack

**Principle:** Each tool focuses on its layer, integrates with others

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROPOSED INTEGRATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  NEXUS (Layer 5: AI Brain)                               │  │
│  │  • Claude MCP server                                     │  │
│  │  • Unified knowledge query                               │  │
│  │  • Cross-tool intelligence                               │  │
│  │                                                          │  │
│  │  Integrates with:                                        │  │
│  │  → Scribe (read/write notes)                            │  │
│  │  → Atlas (read project state)                           │  │
│  │  → Zotero/PDFs (read literature)                        │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────┴─────────────────────────────────────┐  │
│  │  SCRIBE (Layer 4: Content Creation)                      │  │
│  │  • Distraction-free editor                               │  │
│  │  • Project-based writing                                 │  │
│  │  • Export to multiple formats                            │  │
│  │                                                          │  │
│  │  Integrates with:                                        │  │
│  │  → Nexus vault (read/write)                             │  │
│  │  → Atlas (project metadata)                             │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────┴─────────────────────────────────────┐  │
│  │  FLOW-CLI (Layer 3: Workflow)                            │  │
│  │  • ZSH commands (work/win/finish)                        │  │
│  │  • Dashboard and context                                 │  │
│  │  • Dispatchers (cc, mcp, r, qu, obs, etc.)              │  │
│  │                                                          │  │
│  │  Integrates with:                                        │  │
│  │  → Atlas (state management)                             │  │
│  │  → Nexus (via `obs` dispatcher)                         │  │
│  │  → Scribe (via `scribe` command)                        │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                         │
│  ┌────────────────────┴─────────────────────────────────────┐  │
│  │  ATLAS (Layer 2: State Engine)                           │  │
│  │  • Project registry                                      │  │
│  │  • Session tracking                                      │  │
│  │  • Quick capture                                         │  │
│  │  • Context management                                    │  │
│  │                                                          │  │
│  │  Reads from:                                             │  │
│  │  → .STATUS files (all projects)                         │  │
│  │  → Nexus vault metadata                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  STORAGE (Layer 1)                                       │  │
│  │  • Filesystem (.STATUS, markdown)                        │  │
│  │  • Obsidian vault (Nexus)                               │  │
│  │  • Zotero database (research)                            │  │
│  │  • PDFs (teaching + research)                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Concrete Integration Plan

### Phase 1: Atlas ↔ Nexus (Immediate)

**Goal:** Nexus MCP can read Atlas state

**Implementation:**
```typescript
// In statistical-research MCP server
// src/tools/atlas.ts

export const atlasTools = [
  {
    name: "atlas_get_context",
    description: "Get current work context (project, session, breadcrumbs)",
    handler: async () => {
      const result = await Bun.$`atlas where --json`;
      return JSON.parse(result.stdout);
    }
  },
  {
    name: "atlas_get_recent",
    description: "Get recent projects",
    handler: async ({ limit = 10 }) => {
      const result = await Bun.$`atlas recent --limit ${limit} --json`;
      return JSON.parse(result.stdout);
    }
  },
  {
    name: "atlas_get_session_stats",
    description: "Get session statistics",
    handler: async () => {
      const result = await Bun.$`atlas stats --json`;
      return JSON.parse(result.stdout);
    }
  }
];
```

**Claude Usage:**
```
User: "What was I working on today?"

Claude: [Uses atlas_get_context]
        You've been working on:
        - Project: nexus (ADHD knowledge management)
        - Session: 47 minutes
        - Last breadcrumb: "Phase 1 Zotero integration planning"
        
        Would you like me to search your vault for related notes?
```

**Effort:** 1 hour

---

### Phase 2: Scribe ↔ Nexus Vault (High Priority)

**Problem:** Scribe and Nexus vault are redundant

**Solution Options:**

#### Option A: Scribe Uses Nexus Vault ⭐ RECOMMENDED

**Change:** Point Scribe's project storage to Nexus vault

```typescript
// scribe/src/lib/preferences.ts
const DEFAULT_VAULT_PATH = process.env.NEXUS_VAULT || 
  `${process.env.HOME}/Obsidian/Nexus`;

// Scribe projects live in:
// ~/Obsidian/Nexus/10-PROJECTS/
// ~/Obsidian/Nexus/50-DAILY/
```

**Benefits:**
- ✅ Single source of truth for notes
- ✅ Scribe becomes the editor for Nexus
- ✅ Claude can read/write via both Scribe and MCP
- ✅ No data synchronization needed

**Changes Required:**
- Scribe: Update default paths to Nexus vault structure
- Scribe: Map project types to PARA folders
- Nexus: Document Scribe as recommended editor

**Effort:** 2-3 hours

#### Option B: Keep Separate, Sync Via MCP

Scribe keeps its own storage, Nexus MCP can read from both.

**Not recommended** - Creates sync issues

---

### Phase 3: flow-cli ↔ Nexus Integration (Medium Priority)

**Goal:** flow-cli commands work with Nexus vault

**New Dispatcher:** `obs` (Obsidian/Nexus)

```bash
# lib/dispatchers/obs.zsh

obs() {
  local cmd="$1"
  shift
  
  case "$cmd" in
    search)
      # Search Nexus vault
      nexus knowledge vault search "$@"
      ;;
    daily)
      # Open today's note
      nexus knowledge vault daily
      ;;
    new)
      # Create note from template
      nexus knowledge vault new "$@"
      ;;
    link)
      # Create wiki link
      nexus knowledge vault link "$@"
      ;;
    *)
      echo "Usage: obs {search|daily|new|link} ..."
      ;;
  esac
}
```

**Integration with `work` command:**
```bash
work() {
  local project="$1"
  
  # Start atlas session
  atlas session start "$project"
  
  # Load project context from Nexus vault
  if [[ -f ~/Obsidian/Nexus/10-PROJECTS/$project/_dashboard.md ]]; then
    obs read "10-PROJECTS/$project/_dashboard.md"
  fi
  
  # ... existing work command logic
}
```

**Effort:** 2 hours

---

### Phase 4: Unified AI Layer (Long-term)

**Goal:** All tools use Nexus MCP for Claude integration

**Current State:**
- flow-cli: `cc` dispatcher calls `claude` CLI
- scribe: AI Chat calls `claude`/`gemini` CLI
- nexus: MCP server provides tools

**Proposed:**
- All tools call Nexus MCP for intelligence
- Nexus MCP has full context (atlas, scribe notes, vault, zotero)
- Single source of truth for AI capabilities

**Example:**

In Scribe:
```typescript
// Instead of:
const response = await callClaudeCLI(prompt);

// Use:
const response = await mcpClient.call("nexus_synthesize", {
  question: prompt,
  context: {
    current_note: noteContent,
    project: currentProject,
    session: atlasSession
  }
});
```

**Benefits:**
- ✅ Claude has full context across all tools
- ✅ Consistent AI behavior
- ✅ Easier to add new AI features
- ✅ Single place to manage prompts/skills

**Effort:** 8-10 hours (across all tools)

---

## Recommendations

### Immediate Actions (Next Week)

1. **Phase 1: Atlas ↔ Nexus** (1 hour)
   - Add `atlas_*` tools to statistical-research MCP
   - Test with Claude Code
   - Document integration

2. **Phase 2: Scribe → Nexus Vault** (3 hours)
   - Change Scribe default vault path
   - Map Scribe projects to PARA folders
   - Test round-trip (create in Scribe, read via MCP)

### Short-term (This Month)

3. **Phase 3: flow-cli → Nexus** (2 hours)
   - Add `obs` dispatcher
   - Integrate with `work` command
   - Document workflows

### Long-term (Next Quarter)

4. **Phase 4: Unified AI Layer** (10 hours)
   - Migrate all tools to use Nexus MCP
   - Create comprehensive context system
   - Add cross-tool intelligence

---

## Risks & Mitigation

### Risk 1: Breaking Existing Workflows

**Mitigation:**
- Make all integrations opt-in initially
- Provide migration guides
- Keep existing functionality working

### Risk 2: Performance Impact

**Mitigation:**
- Cache frequently accessed data
- Use lazy loading
- Profile and optimize

### Risk 3: Complexity Increase

**Mitigation:**
- Clear documentation for each integration
- Simple user-facing APIs
- Hide complexity behind clean interfaces

---

## Success Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| **Tools Used** | 4 separate | 4 integrated | All share common data |
| **Context Switching** | Manual | Automatic | Time to recover context |
| **Data Duplication** | 3 registries | 1 source of truth | Count of project lists |
| **AI Context** | Tool-specific | Cross-tool | Can Claude see all? |
| **Setup Time** | 4x install | 1 install + enable | New user onboarding |

---

## Questions for Decision

1. **Scribe Integration:** Should Scribe use Nexus vault by default, or stay separate with sync?

2. **Atlas Evolution:** Should Atlas become the universal state engine for all tools?

3. **flow-cli Scope:** Should flow-cli remain ZSH-only, or add TypeScript components for tighter integration?

4. **Nexus MCP:** Should it be standalone or merged into statistical-research?

5. **Migration Path:** Big bang integration or incremental rollout?

---

## Next Steps

**Awaiting your decision on:**
1. Approve Phase 1 (Atlas ↔ Nexus) - 1 hour
2. Approve Phase 2 (Scribe → Nexus vault) - 3 hours
3. Prioritize Phase 3 (flow-cli integration) - 2 hours

**Or:**
- Defer integration to focus on Phase 1 Zotero implementation first?

---

**Created:** 2025-01-11  
**Maintainer:** DT  
**Related:** PHASE-1-PLAN.md, STRATEGIC-DIRECTION.md
