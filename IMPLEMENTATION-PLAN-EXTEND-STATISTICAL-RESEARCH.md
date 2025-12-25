# Implementation Plan: Extend Statistical Research Plugin
## Adding Knowledge Management (Nexus) Capabilities

**Created:** 2025-12-24
**Estimated Effort:** 16 hours
**Timeline:** 4-5 days

---

## Executive Summary

Extend the existing `statistical-research` plugin with knowledge management capabilities rather than creating a new plugin. This leverages your existing 17 skills, literature commands, and infrastructure.

---

## 1. Current State

### statistical-research Plugin Structure

```
~/projects/dev-tools/claude-plugins/statistical-research/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── commands/
│   ├── literature/           # arxiv, bibtex, crossref, lit-note
│   ├── manuscript/           # manuscript workflows
│   ├── research/             # research workflows
│   └── simulation/           # simulation workflows
├── skills/
│   ├── implementation/       # 5 skills
│   ├── mathematical/         # 4 skills
│   ├── research/             # 5 skills
│   └── writing/              # 3 skills
├── lib/
│   ├── arxiv.sh
│   ├── bibtex.sh
│   └── r-console.sh
├── scripts/
│   ├── install.sh
│   └── uninstall.sh
└── package.json
```

### Available MCP Infrastructure

| MCP Server | Status | Purpose |
|------------|--------|---------|
| `docling` | Exists | PDF parsing |
| `obsidian-ops` | Planned | Vault operations |
| `shell` | Exists | Command execution |
| `rforge` | Exists | R package workflows |

---

## 2. Target State

### New Directory Structure

```
~/projects/dev-tools/claude-plugins/statistical-research/
├── commands/
│   ├── literature/           # EXISTING
│   ├── manuscript/           # EXISTING
│   ├── research/             # EXISTING
│   ├── simulation/           # EXISTING
│   │
│   ├── knowledge/            # NEW - Knowledge queries
│   │   ├── query.md          # Natural language knowledge query
│   │   ├── concept-map.md    # Visualize concept relationships
│   │   ├── sync.md           # Sync knowledge sources
│   │   └── context.md        # Load context for directory
│   │
│   ├── vault/                # NEW - Obsidian operations
│   │   ├── read.md           # Read notes
│   │   ├── write.md          # Create/update notes
│   │   ├── search.md         # Search vault
│   │   └── link.md           # Create wiki links
│   │
│   ├── pdf/                  # NEW - PDF operations
│   │   ├── extract.md        # Extract text/sections
│   │   └── search.md         # Search across PDFs
│   │
│   └── zotero/               # NEW - Zotero operations
│       ├── query.md          # Search library
│       ├── annotations.md    # Get highlights/notes
│       └── collections.md    # Browse collections
│
├── skills/
│   ├── implementation/       # EXISTING (5)
│   ├── mathematical/         # EXISTING (4)
│   ├── research/             # EXISTING (5)
│   ├── writing/              # EXISTING (3)
│   │
│   └── knowledge/            # NEW - Mode skills
│       ├── librarian.md      # Knowledge capture & retrieval
│       ├── teacher.md        # Teaching content creation
│       └── builder.md        # Code development mode
│
├── lib/
│   ├── arxiv.sh              # EXISTING
│   ├── bibtex.sh             # EXISTING
│   ├── r-console.sh          # EXISTING
│   │
│   ├── zotero.sh             # NEW - Zotero SQLite queries
│   ├── obsidian.sh           # NEW - Vault operations
│   └── pdf-extract.sh        # NEW - PDF text extraction
│
└── agents/                   # NEW - Background agents
    └── knowledge-sync.md     # Sync knowledge sources
```

---

## 3. Implementation Phases

### Phase 1: Zotero Integration (4 hours)

**Goal:** Query your Zotero library directly from Claude

#### Task 1.1: Create Zotero Query Library (2 hours)

```bash
# lib/zotero.sh

ZOTERO_DB="$HOME/Zotero/zotero.sqlite"
ZOTERO_STORAGE="$HOME/Zotero/storage"

# Search Zotero items
zotero_search() {
    local query="$1"
    local limit="${2:-20}"

    sqlite3 "$ZOTERO_DB" <<EOF
SELECT
    i.key as item_key,
    iv_title.value as title,
    GROUP_CONCAT(DISTINCT c.firstName || ' ' || c.lastName) as authors,
    iv_date.value as date,
    iv_abstract.value as abstract
FROM items i
LEFT JOIN itemDataValues iv_title ON ...
WHERE iv_title.value LIKE '%$query%'
   OR iv_abstract.value LIKE '%$query%'
LIMIT $limit;
EOF
}

# Get item annotations (highlights, notes)
zotero_annotations() {
    local item_key="$1"

    sqlite3 "$ZOTERO_DB" <<EOF
SELECT
    a.type,
    a.text,
    a.comment,
    a.pageLabel
FROM itemAnnotations a
JOIN items i ON a.parentItemID = i.itemID
WHERE i.key = '$item_key';
EOF
}

# Get PDF path for item
zotero_pdf_path() {
    local item_key="$1"
    echo "$ZOTERO_STORAGE/$item_key"
}
```

#### Task 1.2: Create Zotero Commands (1.5 hours)

**commands/zotero/query.md:**
```markdown
---
description: Search your Zotero library
arguments:
  - name: query
    description: Search terms
    required: true
  - name: filters
    description: "Optional filters (tags:X, year:YYYY, collection:X)"
    required: false
---

# /zotero:query - Search Zotero Library

Search your Zotero library for papers matching the query.

## What This Does

1. Searches title, abstract, and notes in your Zotero database
2. Returns matching items with metadata
3. Shows annotation count and PDF availability

## Implementation

```bash
source "$PLUGIN_DIR/lib/zotero.sh"
zotero_search "{{query}}" 20
```

## Output Format

For each match, display:
- Title, authors, year
- Abstract (truncated)
- Tags
- "📄 Has PDF" / "📝 X annotations"
- Item key for follow-up commands
```

**commands/zotero/annotations.md:**
```markdown
---
description: Get highlights and notes from a Zotero item
arguments:
  - name: item_key
    description: Zotero item key (from /zotero:query)
    required: true
---

# /zotero:annotations - Get Paper Annotations

Retrieve all highlights, notes, and comments from a Zotero item.

## Implementation

```bash
source "$PLUGIN_DIR/lib/zotero.sh"
zotero_annotations "{{item_key}}"
```
```

#### Task 1.3: Testing & Documentation (0.5 hours)

- Test against your Zotero database (2,728 items)
- Verify annotation retrieval works
- Document any Zotero version compatibility issues

---

### Phase 2: PDF Integration (3 hours)

**Goal:** Extract and search PDF content

#### Task 2.1: PDF Extraction Library (1.5 hours)

```bash
# lib/pdf-extract.sh

# Extract text from PDF using pdftotext (poppler)
pdf_extract_text() {
    local pdf_path="$1"
    local page_range="${2:-all}"

    if [[ "$page_range" == "all" ]]; then
        pdftotext -layout "$pdf_path" -
    else
        # Extract specific pages
        local start=$(echo "$page_range" | cut -d- -f1)
        local end=$(echo "$page_range" | cut -d- -f2)
        pdftotext -f "$start" -l "$end" -layout "$pdf_path" -
    fi
}

# Extract sections (heuristic: headers are often ALL CAPS or numbered)
pdf_extract_sections() {
    local pdf_path="$1"
    pdftotext -layout "$pdf_path" - | awk '
        /^[0-9]+\.[0-9]*\s+[A-Z]/ || /^[A-Z][A-Z]+/ {
            print "=== SECTION: " $0
        }
        { print }
    '
}

# Search across PDFs in directory
pdf_search_directory() {
    local query="$1"
    local directory="$2"

    find "$directory" -name "*.pdf" -exec sh -c '
        result=$(pdftotext -layout "$1" - 2>/dev/null | grep -i -C 2 "$2")
        if [ -n "$result" ]; then
            echo "=== $1 ==="
            echo "$result"
            echo ""
        fi
    ' _ {} "$query" \;
}
```

#### Task 2.2: PDF Commands (1 hour)

**commands/pdf/extract.md:**
```markdown
---
description: Extract text from a PDF file
arguments:
  - name: path
    description: Path to PDF file
    required: true
  - name: pages
    description: "Page range (e.g., 1-5, all)"
    required: false
---

# /pdf:extract - Extract PDF Content

Extract text content from a PDF file for analysis.

## Implementation

```bash
source "$PLUGIN_DIR/lib/pdf-extract.sh"
pdf_extract_text "{{path}}" "{{pages}}"
```
```

**commands/pdf/search.md:**
```markdown
---
description: Search for terms across PDF files
arguments:
  - name: query
    description: Search terms
    required: true
  - name: directory
    description: Directory to search (default: current)
    required: false
---

# /pdf:search - Search PDFs

Search for terms across all PDF files in a directory.

## Default Directories

- Research: ~/projects/research/
- Teaching: ~/projects/teaching/
- Zotero: ~/Zotero/storage/

## Implementation

```bash
source "$PLUGIN_DIR/lib/pdf-extract.sh"
pdf_search_directory "{{query}}" "${directory:-$PWD}"
```
```

#### Task 2.3: Integration with Docling MCP (0.5 hours)

- Wire up docling MCP for advanced PDF parsing
- Test with complex academic PDFs
- Handle multi-column layouts

---

### Phase 3: Obsidian Vault Integration (4 hours)

**Goal:** Read/write/search your Obsidian vault

#### Task 3.1: Vault Operations Library (2 hours)

```bash
# lib/obsidian.sh

VAULT_PATH="${NEXUS_VAULT:-$HOME/Obsidian/Nexus}"

# Read a note
vault_read() {
    local note_path="$1"
    cat "$VAULT_PATH/$note_path"
}

# Write/update a note
vault_write() {
    local note_path="$1"
    local content="$2"

    mkdir -p "$(dirname "$VAULT_PATH/$note_path")"
    echo "$content" > "$VAULT_PATH/$note_path"
    echo "Written to $note_path"
}

# Search vault using ripgrep
vault_search() {
    local query="$1"
    local folder="${2:-.}"

    rg --type md -l -i "$query" "$VAULT_PATH/$folder" 2>/dev/null
}

# Search with context
vault_search_context() {
    local query="$1"
    local context="${2:-3}"

    rg --type md -i -C "$context" "$query" "$VAULT_PATH" 2>/dev/null
}

# Get all notes linking to a note (backlinks)
vault_backlinks() {
    local note_name="$1"
    # Remove .md extension for wiki link format
    local link_name="${note_name%.md}"

    rg --type md -l "\[\[$link_name\]\]" "$VAULT_PATH" 2>/dev/null
}

# Create wiki link between notes
vault_link() {
    local from_note="$1"
    local to_note="$2"
    local link_text="${3:-$to_note}"

    # Append link to from_note
    echo "" >> "$VAULT_PATH/$from_note"
    echo "Related: [[$to_note|$link_text]]" >> "$VAULT_PATH/$from_note"
}

# Get frontmatter from note
vault_frontmatter() {
    local note_path="$1"
    sed -n '/^---$/,/^---$/p' "$VAULT_PATH/$note_path" | head -n -1 | tail -n +2
}

# Query notes by frontmatter field
vault_query_frontmatter() {
    local field="$1"
    local value="$2"

    rg --type md -l "^$field:\s*$value" "$VAULT_PATH" 2>/dev/null
}
```

#### Task 3.2: Vault Commands (1.5 hours)

**commands/vault/read.md:**
```markdown
---
description: Read a note from your Obsidian vault
arguments:
  - name: path
    description: Path to note (relative to vault root)
    required: true
---

# /vault:read - Read Vault Note

Read the contents of a note from your Nexus vault.

## Examples

- `/vault:read 20-AREAS/causal-inference/dags.md`
- `/vault:read 10-PROJECTS/research/P_med/status.md`

## Implementation

```bash
source "$PLUGIN_DIR/lib/obsidian.sh"
vault_read "{{path}}"
```
```

**commands/vault/write.md:**
```markdown
---
description: Create or update a note in your vault
arguments:
  - name: path
    description: Path for the note
    required: true
  - name: content
    description: Note content (markdown)
    required: true
---

# /vault:write - Write Vault Note

Create or update a note in your Nexus vault.

## Frontmatter

Always include YAML frontmatter:

```yaml
---
type: [note|literature|project|task]
created: {{date}}
tags: []
---
```

## Implementation

```bash
source "$PLUGIN_DIR/lib/obsidian.sh"
vault_write "{{path}}" "{{content}}"
```
```

**commands/vault/search.md:**
```markdown
---
description: Search your Obsidian vault
arguments:
  - name: query
    description: Search terms
    required: true
  - name: folder
    description: Folder to search (optional)
    required: false
---

# /vault:search - Search Vault

Search for content across your Nexus vault.

## Folder Shortcuts

- `inbox` → 00-INBOX/
- `projects` → 10-PROJECTS/
- `areas` → 20-AREAS/
- `resources` → 30-RESOURCES/
- `archive` → 40-ARCHIVE/
- `daily` → 50-DAILY/
- `tasks` → 60-TASKS/

## Implementation

```bash
source "$PLUGIN_DIR/lib/obsidian.sh"
vault_search "{{query}}" "{{folder}}"
```
```

#### Task 3.3: Set Up Vault Path & Testing (0.5 hours)

- Configure NEXUS_VAULT environment variable
- Copy vault-template to ~/Obsidian/Nexus/ if not exists
- Test all vault operations

---

### Phase 4: Knowledge Query System (3 hours)

**Goal:** Unified natural language queries across all sources

#### Task 4.1: Knowledge Query Skill (1.5 hours)

**skills/knowledge/librarian.md:**
```markdown
---
description: Knowledge capture, organization, and retrieval mode
triggers:
  - "find papers"
  - "what do I know about"
  - "search my library"
  - "literature on"
---

# 🔖 Librarian Mode

You are the Librarian persona of Nexus - the knowledge curator for an academic researcher.

## Your Capabilities

1. **Search across all knowledge sources:**
   - Zotero library (2,728 items)
   - Research PDFs (110 files)
   - Teaching PDFs (1,682 files)
   - Obsidian vault notes
   - BibTeX files

2. **Create and organize knowledge:**
   - Literature notes in Obsidian
   - Concept maps and connections
   - Tag and categorize information

3. **Answer questions using existing knowledge:**
   - "What papers discuss sensitivity analysis?"
   - "Find my notes on E-values"
   - "What did I highlight in VanderWeele 2017?"

## Search Priority

When user asks about a topic:

1. **First: Search Zotero** (your curated library)
   ```
   /zotero:query "topic"
   ```

2. **Then: Search vault** (your notes)
   ```
   /vault:search "topic"
   ```

3. **Then: Search PDFs** (full text)
   ```
   /pdf:search "topic" ~/projects/research/
   ```

4. **Finally: External** (arXiv, CrossRef)
   Only if user explicitly asks for NEW papers

## Response Format

When presenting search results:

```
📚 FROM YOUR LIBRARY:

**Zotero (X matches):**
• [Title] - [Authors] ([Year])
  📝 X annotations | Tags: [tags]
  Key insight: "[first highlight if any]"

**Your Notes (X matches):**
• [[note-path]] - [first line or title]

**PDF Content (X matches):**
• [filename] - "[relevant excerpt]..."

---
Want me to:
[1] Show annotations from a specific paper?
[2] Create a literature note?
[3] Search for NEW papers on arXiv?
```

## Knowledge Creation

When user wants to capture knowledge:

1. Extract key ideas
2. Create properly formatted literature note
3. Add to appropriate vault location
4. Create links to related notes
5. Update relevant project notes
```

#### Task 4.2: Knowledge Commands (1 hour)

**commands/knowledge/query.md:**
```markdown
---
description: Query your knowledge base in natural language
arguments:
  - name: question
    description: Your question
    required: true
---

# /knowledge:query - Ask Your Knowledge Base

Ask a natural language question and get answers from your entire knowledge ecosystem.

## What Gets Searched

1. Zotero library (papers, annotations)
2. Obsidian vault (notes, projects)
3. PDF files (research, teaching)
4. BibTeX files

## Examples

- `/knowledge:query "What do I know about sensitivity analysis?"`
- `/knowledge:query "Papers on mediation effect sizes"`
- `/knowledge:query "My notes on DAGs"`

## Implementation

Activates the Librarian skill which orchestrates searches across:
- /zotero:query
- /vault:search
- /pdf:search
- /literature:bibtex-search
```

**commands/knowledge/context.md:**
```markdown
---
description: Load context for the current directory
arguments: []
---

# /knowledge:context - Load Directory Context

Automatically load relevant knowledge context based on current directory.

## Context Mapping

| Directory Pattern | Context Loaded |
|-------------------|----------------|
| `~/projects/research/*` | Research project notes from vault |
| `~/projects/teaching/*` | Course materials and lecture notes |
| `~/projects/r-packages/*` | Package documentation and related papers |

## Implementation

1. Detect current directory type
2. Load relevant vault notes
3. Load related Zotero items
4. Present summary of available context
```

#### Task 4.3: Teacher & Builder Skills (0.5 hours)

**skills/knowledge/teacher.md:**
```markdown
---
description: Teaching content creation mode
triggers:
  - "create lecture"
  - "make slides"
  - "quiz on"
  - "teaching"
---

# 📚 Teacher Mode

You are the Teacher persona of Nexus - transforming research knowledge into pedagogical materials.

## Capabilities

1. Create lectures from concept notes
2. Generate quizzes and problem sets
3. Build Quarto slides with R examples
4. Reuse and adapt previous materials

## Knowledge Sources

- 20-AREAS/ for concept foundations
- Previous lectures in teaching/
- Research papers for current topics
- R code examples from packages

## Output Formats

- Quarto slides (.qmd)
- R lab notebooks
- Canvas quiz exports
- Solution keys
```

**skills/knowledge/builder.md:**
```markdown
---
description: Code development mode with knowledge integration
triggers:
  - "implement"
  - "code"
  - "function"
  - "package"
---

# 🔧 Builder Mode

You are the Builder persona of Nexus - developing code informed by research knowledge.

## Capabilities

1. Implement methods from papers
2. Generate tests from specifications
3. Create documentation linked to theory
4. Update vault with implementation notes

## Knowledge Sources

- Papers describing algorithms
- Existing package code patterns
- Mathematical specifications in vault
- Previous implementation notes

## Workflow

1. Find specification (paper or vault note)
2. Review existing code patterns
3. Implement with consistent style
4. Generate tests
5. Update vault with implementation note
```

---

### Phase 5: Integration & Testing (2 hours)

#### Task 5.1: Update Plugin Manifest (0.5 hours)

```json
{
  "name": "@data-wise/statistical-research-plugin",
  "version": "2.0.0",
  "description": "Statistical research + Knowledge management for Claude Code",
  "commands": [
    "commands/literature/*",
    "commands/manuscript/*",
    "commands/research/*",
    "commands/simulation/*",
    "commands/knowledge/*",
    "commands/vault/*",
    "commands/pdf/*",
    "commands/zotero/*"
  ],
  "skills": [
    "skills/implementation/*",
    "skills/mathematical/*",
    "skills/research/*",
    "skills/writing/*",
    "skills/knowledge/*"
  ]
}
```

#### Task 5.2: Environment Setup (0.5 hours)

Add to `~/.zshrc` or `~/.config/zsh/env.zsh`:
```bash
# Nexus Knowledge Management
export NEXUS_VAULT="$HOME/Obsidian/Nexus"
export ZOTERO_DB="$HOME/Zotero/zotero.sqlite"
export ZOTERO_STORAGE="$HOME/Zotero/storage"
export RESEARCH_PDFS="$HOME/projects/research"
export TEACHING_PDFS="$HOME/projects/teaching"
```

#### Task 5.3: Integration Testing (1 hour)

Test scenarios:
1. `/zotero:query "mediation"` → finds papers
2. `/zotero:annotations <key>` → shows highlights
3. `/pdf:extract ~/Zotero/storage/*/paper.pdf` → extracts text
4. `/vault:write 00-INBOX/test.md` → creates note
5. `/vault:search "sensitivity"` → finds notes
6. `/knowledge:query "What do I know about E-values?"` → unified search

---

## 4. Implementation Schedule

```
┌─────────────────────────────────────────────────────────────────────┐
│                    IMPLEMENTATION TIMELINE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  DAY 1 (4 hours): Zotero Integration                               │
│  ─────────────────────────────────                                 │
│  □ Create lib/zotero.sh                                            │
│  □ Create commands/zotero/query.md                                 │
│  □ Create commands/zotero/annotations.md                           │
│  □ Test with your 2,728 item library                               │
│                                                                     │
│  DAY 2 (3 hours): PDF Integration                                  │
│  ─────────────────────────────────                                 │
│  □ Create lib/pdf-extract.sh                                       │
│  □ Create commands/pdf/extract.md                                  │
│  □ Create commands/pdf/search.md                                   │
│  □ Test with research/teaching PDFs                                │
│                                                                     │
│  DAY 3 (4 hours): Vault Integration                                │
│  ─────────────────────────────────                                 │
│  □ Create lib/obsidian.sh                                          │
│  □ Create commands/vault/read.md                                   │
│  □ Create commands/vault/write.md                                  │
│  □ Create commands/vault/search.md                                 │
│  □ Set up vault at ~/Obsidian/Nexus/                               │
│                                                                     │
│  DAY 4 (3 hours): Knowledge Query System                           │
│  ─────────────────────────────────                                 │
│  □ Create skills/knowledge/librarian.md                            │
│  □ Create skills/knowledge/teacher.md                              │
│  □ Create skills/knowledge/builder.md                              │
│  □ Create commands/knowledge/query.md                              │
│                                                                     │
│  DAY 5 (2 hours): Integration & Testing                            │
│  ─────────────────────────────────                                 │
│  □ Update plugin.json manifest                                     │
│  □ Set environment variables                                       │
│  □ Run full integration tests                                      │
│  □ Update README documentation                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Success Criteria

### Must Have (MVP)
- [ ] `/zotero:query` returns matching papers
- [ ] `/zotero:annotations` shows highlights
- [ ] `/vault:read`, `/vault:write`, `/vault:search` work
- [ ] `/pdf:extract` extracts text from PDFs
- [ ] Librarian skill activates on knowledge queries

### Should Have
- [ ] `/pdf:search` searches across directories
- [ ] `/knowledge:query` unified search
- [ ] Teacher and Builder skills functional
- [ ] Context auto-loading by directory

### Nice to Have
- [ ] Concept map visualization
- [ ] Automatic link suggestions
- [ ] Knowledge sync agent

---

## 6. File Locations Summary

| New File | Location |
|----------|----------|
| lib/zotero.sh | `~/projects/dev-tools/claude-plugins/statistical-research/lib/` |
| lib/obsidian.sh | `~/projects/dev-tools/claude-plugins/statistical-research/lib/` |
| lib/pdf-extract.sh | `~/projects/dev-tools/claude-plugins/statistical-research/lib/` |
| commands/zotero/* | `~/projects/dev-tools/claude-plugins/statistical-research/commands/zotero/` |
| commands/vault/* | `~/projects/dev-tools/claude-plugins/statistical-research/commands/vault/` |
| commands/pdf/* | `~/projects/dev-tools/claude-plugins/statistical-research/commands/pdf/` |
| commands/knowledge/* | `~/projects/dev-tools/claude-plugins/statistical-research/commands/knowledge/` |
| skills/knowledge/* | `~/projects/dev-tools/claude-plugins/statistical-research/skills/knowledge/` |

---

## 7. Dependencies

### System Requirements
- `pdftotext` (from poppler) - for PDF extraction
- `sqlite3` - for Zotero queries
- `ripgrep` (rg) - for fast vault search
- `jq` - for JSON processing

### Install Dependencies (macOS)
```bash
brew install poppler sqlite ripgrep jq
```

### Verify
```bash
pdftotext -v     # Should show version
sqlite3 --version
rg --version
jq --version
```

---

## 8. Next Steps After Implementation

1. **Week 2:** Add semantic search (embeddings)
2. **Week 3:** Add concept mapping visualization
3. **Week 4:** Add knowledge sync agent
4. **Future:** Cortex memory layer (from bold proposal)

---

**Document Status:** Ready for implementation
**Start Command:** Begin with Phase 1, Task 1.1 (lib/zotero.sh)
