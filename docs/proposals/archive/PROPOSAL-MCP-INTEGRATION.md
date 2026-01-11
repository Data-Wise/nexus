# MCP Server for Obsidian Vault Access - Proposal

**Date:** 2025-12-21
**Status:** 📋 Proposal
**Priority:** P3 (Future Enhancement)
**Estimated Effort:** 12-16 hours
**Phase:** Future (after P2 template vault)
**Location:** `nexus/mcp-server/` (monorepo subdirectory)

> **Architecture Note:** This MCP server will be implemented within the nexus monorepo as `nexus/mcp-server/`, following the dev-tools pattern. See [ARCHITECTURE-DECISION-MONOREPO.md](ARCHITECTURE-DECISION-MONOREPO.md) for rationale.

---

## TL;DR

Create an MCP (Model Context Protocol) server that gives Claude direct read/write access to Obsidian vaults. Enables Claude to search notes, create links, update dashboards, and manage tasks without manual intervention.

**Key capabilities:**
- 🔍 Search vault by content, tags, or frontmatter
- 📝 Create and update notes
- 🔗 Manage bidirectional links automatically
- 📊 Update dashboard queries
- ✅ Task management (create, complete, reschedule)

---

## Motivation

### Current State: Manual Workflow

**What works:**
- Claude understands vault structure via system prompt
- Can suggest what to do
- Can generate content to paste

**What's friction:**
- ❌ User must manually create/update files
- ❌ No automatic linking across notes
- ❌ Can't search existing notes automatically
- ❌ Dashboards require manual updates
- ❌ Task management is manual

**Example friction:**

```
User: "Capture this paper: VanderWeele 2015 on mediation"
Claude: "I'll create a literature note. Here's the markdown..."
User: [copies markdown, creates file manually, adds to index]
```

### Proposed State: MCP-Powered

**With MCP server:**

```
User: "Capture this paper: VanderWeele 2015 on mediation"
Claude: [Creates file, populates template, links to P_med project, updates index]
Claude: "✅ Created literature note and linked to 2 relevant projects"
```

---

## Technical Design

### MCP Server Architecture

```
┌─────────────────────────────────────────────────────┐
│                Claude (Client)                      │
│  - Receives tool use requests                       │
│  - Processes vault content                          │
└────────────────┬────────────────────────────────────┘
                 │
                 │ MCP Protocol (stdio/SSE)
                 ▼
┌─────────────────────────────────────────────────────┐
│           Obsidian MCP Server                       │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │              Tool Registry                   │  │
│  │  - vault_search                              │  │
│  │  - note_create                               │  │
│  │  - note_update                               │  │
│  │  - note_read                                 │  │
│  │  - link_create                               │  │
│  │  - task_create / task_complete               │  │
│  │  - dashboard_query                           │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │         Obsidian Vault Interface             │  │
│  │  - File I/O (read/write .md files)           │  │
│  │  - Frontmatter parsing (YAML)                │  │
│  │  - Link extraction/injection                 │  │
│  │  - Full-text search                          │  │
│  │  - Dataview query execution (optional)       │  │
│  └──────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────┘
                 │
                 │ File System
                 ▼
┌─────────────────────────────────────────────────────┐
│              Obsidian Vault                         │
│  ~/Obsidian/Nexus/                                  │
│  - Notes as markdown files                          │
│  - YAML frontmatter                                 │
│  - Wikilinks [[note]]                               │
└─────────────────────────────────────────────────────┘
```

### Core Tools

#### 1. vault_search

**Purpose:** Search vault by content, tags, frontmatter

**Parameters:**
```typescript
{
  query: string,           // Search term
  scope?: string[],        // Folders to search (default: all)
  type?: string,           // Filter by frontmatter type
  tags?: string[],         // Filter by tags
  limit?: number           // Max results (default: 20)
}
```

**Returns:**
```typescript
{
  results: [
    {
      path: string,
      title: string,
      excerpt: string,      // Snippet with match
      frontmatter: object,
      score: number         // Relevance
    }
  ]
}
```

**Use cases:**
- Find papers on specific topic
- Locate project by status
- Search for existing notes before creating

---

#### 2. note_create

**Purpose:** Create new note from template or scratch

**Parameters:**
```typescript
{
  path: string,            // Full path in vault
  template?: string,       // Template name (e.g., "paper-note")
  frontmatter: object,     // YAML properties
  content: string,         // Markdown body
  createFolders?: boolean  // Create parent dirs (default: true)
}
```

**Returns:**
```typescript
{
  success: boolean,
  path: string,
  message: string
}
```

**Use cases:**
- Create literature note from paper
- Create new project
- Add fleeting note to inbox

---

#### 3. note_update

**Purpose:** Update existing note (append, prepend, replace section)

**Parameters:**
```typescript
{
  path: string,
  operation: "append" | "prepend" | "replace" | "update_frontmatter",
  content?: string,
  section?: string,        // Heading to update
  frontmatter?: object     // For update_frontmatter
}
```

**Returns:**
```typescript
{
  success: boolean,
  message: string
}
```

**Use cases:**
- Add to research log
- Update project status
- Append to daily note

---

#### 4. note_read

**Purpose:** Read note content and metadata

**Parameters:**
```typescript
{
  path: string,
  includeBacklinks?: boolean  // Find notes linking to this
}
```

**Returns:**
```typescript
{
  path: string,
  frontmatter: object,
  content: string,
  backlinks?: string[]     // Paths of notes linking here
}
```

**Use cases:**
- Retrieve paper notes for context
- Check project status
- Get task details

---

#### 5. link_create

**Purpose:** Create bidirectional link between notes

**Parameters:**
```typescript
{
  sourcePath: string,
  targetPath: string,
  context?: string         // Where to insert link in source
}
```

**Returns:**
```typescript
{
  success: boolean,
  message: string
}
```

**Use cases:**
- Link paper to project
- Connect related ideas
- Build knowledge graph

---

#### 6. task_create

**Purpose:** Create task in vault task system

**Parameters:**
```typescript
{
  task: string,            // Task description
  project?: string,        // Project link
  priority?: number,       // 1-5
  due?: string,           // YYYY-MM-DD
  energy?: "high" | "medium" | "low",
  timeEstimate?: string   // "15m", "1h", etc.
}
```

**Returns:**
```typescript
{
  success: boolean,
  taskPath: string,
  message: string
}
```

**Use cases:**
- Add task to project
- Create next action
- Capture TODO from conversation

---

#### 7. task_complete

**Purpose:** Mark task as completed

**Parameters:**
```typescript
{
  taskPath: string,
  taskDescription: string  // To identify specific task
}
```

**Returns:**
```typescript
{
  success: boolean,
  message: string
}
```

**Use cases:**
- Complete task after doing
- Update progress tracking
- Celebrate wins

---

#### 8. dashboard_query

**Purpose:** Execute Dataview query on vault

**Parameters:**
```typescript
{
  query: string,          // Dataview query
  format: "list" | "table" | "task"
}
```

**Returns:**
```typescript
{
  results: any[],
  formatted: string       // Markdown table/list
}
```

**Use cases:**
- Show active projects
- List recent tasks
- Display literature by topic

---

## Implementation Details

### Technology Stack

**Language:** TypeScript/Node.js
- Familiar ecosystem
- Good file I/O libraries
- MCP SDK available

**Key Libraries:**
- `@anthropic-ai/sdk` - MCP server SDK
- `gray-matter` - YAML frontmatter parsing
- `remark` / `unified` - Markdown parsing
- `globby` - File pattern matching
- `lunr` or `flexsearch` - Full-text search

### Project Structure

```
obsidian-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/                # Tool implementations
│   │   ├── vault-search.ts
│   │   ├── note-create.ts
│   │   ├── note-update.ts
│   │   ├── note-read.ts
│   │   ├── link-create.ts
│   │   ├── task-create.ts
│   │   ├── task-complete.ts
│   │   └── dashboard-query.ts
│   ├── vault/                # Vault interface
│   │   ├── file-ops.ts       # Read/write operations
│   │   ├── frontmatter.ts    # YAML parsing
│   │   ├── links.ts          # Link extraction/injection
│   │   ├── search.ts         # Full-text search
│   │   └── dataview.ts       # Query execution (optional)
│   └── utils/
│       ├── templates.ts      # Template loading
│       └── validation.ts     # Input validation
├── tests/
│   └── *.test.ts
└── README.md
```

### Configuration

**MCP Server Config** (`~/.config/claude/mcp-servers.json`):

```json
{
  "obsidian-vault": {
    "command": "node",
    "args": ["/path/to/obsidian-mcp-server/dist/index.js"],
    "env": {
      "VAULT_PATH": "/Users/dt/Obsidian/Nexus",
      "TEMPLATE_DIR": "30-RESOURCES/templates",
      "TASK_INBOX": "60-TASKS/_task-inbox.md",
      "ALLOWED_OPERATIONS": "read,write,search,create"
    }
  }
}
```

### Security Considerations

**File System Access:**
- Limit operations to vault directory only
- No access to .obsidian/ config
- Read-only mode option
- Validate all paths (no ../ escapes)

**Operation Permissions:**
- Configure allowed operations via env var
- Default: read-only
- Require explicit write permission

**Input Validation:**
- Sanitize all user inputs
- Validate frontmatter types
- Check file path safety
- Limit search result size

---

## Development Phases

### Phase 1: Core Infrastructure (4 hours)

**Tasks:**
1. [ ] Set up TypeScript project
2. [ ] Implement MCP server skeleton
3. [ ] Create vault file interface (read/write)
4. [ ] Add frontmatter parsing
5. [ ] Basic error handling

**Deliverables:**
- Running MCP server
- Can connect from Claude
- Read single note
- Parse frontmatter

**Validation:**
```bash
# Start server
node dist/index.js

# Test with MCP client
mcp-client test obsidian-vault note_read path="README.md"
```

---

### Phase 2: Search & Read (3 hours)

**Tasks:**
1. [ ] Implement full-text search
2. [ ] Add vault_search tool
3. [ ] Add note_read tool with backlinks
4. [ ] Optimize search performance
5. [ ] Add caching layer

**Deliverables:**
- Fast full-text search
- Frontmatter filtering
- Backlink discovery

**Validation:**
- Search for "mediation" → finds relevant papers
- Filter by type="manuscript" → returns projects
- Read note → includes backlinks

---

### Phase 3: Write Operations (3 hours)

**Tasks:**
1. [ ] Implement note_create tool
2. [ ] Add template loading
3. [ ] Implement note_update tool
4. [ ] Add section replacement logic
5. [ ] Test file creation safety

**Deliverables:**
- Create notes from templates
- Update existing notes safely
- Section-based editing

**Validation:**
- Create literature note → uses template
- Append to daily note → preserves structure
- Update frontmatter → keeps content

---

### Phase 4: Links & Tasks (2 hours)

**Tasks:**
1. [ ] Implement link_create tool
2. [ ] Add bidirectional link logic
3. [ ] Implement task_create tool
4. [ ] Implement task_complete tool
5. [ ] Add task parsing

**Deliverables:**
- Automatic bidirectional links
- Task creation/completion
- Task inbox integration

**Validation:**
- Link paper to project → both updated
- Create task → appears in inbox
- Complete task → marked done

---

### Phase 5: Advanced Features (2-4 hours)

**Tasks:**
1. [ ] Implement dashboard_query tool (optional)
2. [ ] Add Dataview query support
3. [ ] Optimize performance
4. [ ] Add comprehensive testing
5. [ ] Write documentation

**Deliverables:**
- Dataview integration (if feasible)
- Performance tuned
- Full test coverage
- Complete README

**Validation:**
- Query active projects → returns correct list
- Complex searches performant (< 100ms)
- All edge cases tested

---

## Integration with Nexus

### Updated Claude System Prompt

**Add to docs/claude-integration/system-prompt.md:**

```markdown
## MCP Tools Available

You have direct access to my Nexus vault via MCP tools:

### Search
- `vault_search` - Find notes by content, tags, or frontmatter
- Always search before creating to avoid duplicates

### Create
- `note_create` - Create new notes from templates
- `task_create` - Add tasks to inbox or projects
- `link_create` - Connect related notes

### Update
- `note_update` - Append to logs, update status
- `task_complete` - Mark tasks done

### Read
- `note_read` - Get full note content
- `dashboard_query` - Run Dataview queries (if available)

## Workflow Automations (Now Automatic)

### Paper Capture
1. Search vault for existing note
2. Create literature note from template
3. Link to relevant projects automatically
4. Update literature index
5. Create "Read paper" task if needed

### Research → Teaching
1. Search vault for topic materials
2. Gather relevant papers and code
3. Create lecture from template
4. Link to course project
5. Update teaching dashboard

### Daily Updates
1. Append to today's daily note
2. Update project status
3. Create follow-up tasks
4. Link to relevant notes
```

### Workflow Examples

**Before MCP:**
```
User: "Create literature note for VanderWeele 2015"
Claude: "Here's the markdown for a literature note..."
User: [manually creates file, adds to index]
```

**After MCP:**
```
User: "Create literature note for VanderWeele 2015"
Claude: [vault_search for existing] → not found
        [note_create with template] → created
        [link_create to P_med project] → linked
        [note_update literature index] → updated
        ✅ "Created and linked literature note"
```

---

## Benefits

### For Users
- ⚡ **10x faster** capture workflows
- 🔗 **Automatic linking** - no manual work
- 🎯 **Zero context switching** - stay in conversation
- ✅ **Task tracking** - automatic updates
- 📊 **Live queries** - real-time dashboard data

### For Claude
- 🧠 **Direct knowledge access** - read actual notes
- ✍️ **Autonomous workflows** - complete tasks independently
- 🔍 **Contextual awareness** - search for related content
- 🎨 **Proactive linking** - surface connections

### For System
- 📈 **Better organization** - consistent structure
- 🔄 **Always up-to-date** - dashboards reflect reality
- 🎓 **Learning enabled** - Claude sees usage patterns
- 🚀 **Scalable** - handles large vaults

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| File corruption | Critical | Atomic writes, backups before changes |
| Performance issues | High | Caching, indexing, query limits |
| Security vulnerabilities | Critical | Path validation, permission controls |
| Dataview dependency | Medium | Make Dataview optional, fallback to basic queries |
| Complex frontmatter | Medium | Robust YAML parsing, error handling |
| Link ambiguity | Low | Unique filenames, path resolution |

---

## Success Criteria

### Must Have
- ✅ Search vault by content and frontmatter
- ✅ Create notes from templates
- ✅ Update existing notes safely
- ✅ Create bidirectional links
- ✅ Basic task management

### Should Have
- ✅ Fast search (< 100ms for medium vault)
- ✅ Dataview query support
- ✅ Comprehensive error handling
- ✅ Test coverage > 80%

### Nice to Have
- ✅ Graph analysis (find orphan notes)
- ✅ Automatic tag suggestions
- ✅ Smart template selection
- ✅ Conflict resolution

---

## Alternatives Considered

### 1. Obsidian Plugin Instead of MCP Server

**Pros:**
- Native Obsidian integration
- Access to Obsidian API
- Can use Dataview directly

**Cons:**
- Only works with Obsidian running
- Plugin development more complex
- Can't use with Claude Code CLI
- Requires Obsidian approval

**Verdict:** MCP server better for cross-platform use

---

### 2. Direct File Access (No MCP)

**Pros:**
- Simpler implementation
- No server to run
- Direct file manipulation

**Cons:**
- No standardized interface
- Each Claude instance implements own logic
- No permission control
- Harder to test

**Verdict:** MCP provides better abstraction

---

### 3. Dataview CLI Tool

**Pros:**
- Leverage existing Dataview queries
- No need to reimplement query logic

**Cons:**
- Requires Obsidian running
- Complex setup
- Limited to queries

**Verdict:** Not sufficient for write operations

---

## Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| P1: Core | MCP server, file I/O, frontmatter | 4 hours |
| P2: Search | Full-text search, vault_search | 3 hours |
| P3: Write | note_create, note_update | 3 hours |
| P4: Links & Tasks | Linking, task management | 2 hours |
| P5: Polish | Dataview, testing, docs | 2-4 hours |

**Total:** 14-18 hours over 2-3 days

---

## Next Steps

1. [ ] Discuss proposal with stakeholders
2. [ ] Decide on Dataview integration approach
3. [ ] Set up development environment
4. [ ] Create GitHub repository
5. [ ] Implement Phase 1 (core infrastructure)
6. [ ] Test with sample vault
7. [ ] Iterate based on feedback

---

## References

**MCP Resources:**
- MCP Documentation - Model Context Protocol spec
- MCP SDK - Anthropic's TypeScript SDK
- Example MCP Servers - Reference implementations

**Similar Projects:**
- Statistical Research MCP - Example custom MCP server
- Shell MCP Server - Another custom server
- Obsidian Git Plugin - File operation patterns

**Standards:**
- Nexus docs/architecture/overview.md - Vault structure
- Nexus standards/vault/TEMPLATE-STANDARDS.md - Template definitions
- zsh-configuration standards - ADHD-friendly patterns

---

**Proposal Author:** DT (via Claude Code)
**Date:** 2025-12-21
**Status:** Awaiting Approval
**Dependencies:** P2 (Template Vault) should be complete first
