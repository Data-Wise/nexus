# Nexus: Unified Knowledge CLI + Claude Plugin

> **Vision**: A single tool that works both as a standalone CLI and as a Claude Code plugin, providing unified access to your research knowledge.

```
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║     ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗          ║
    ║     ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝          ║
    ║     ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗          ║
    ║     ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║          ║
    ║     ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║          ║
    ║     ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝          ║
    ║                                                           ║
    ║              Your Research Knowledge, Unified             ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Dual-Mode Design](#dual-mode-design)
4. [Complete Feature Set](#complete-feature-set)
5. [CLI Reference](#cli-reference)
6. [Plugin Reference](#plugin-reference)
7. [Implementation Plan](#implementation-plan)
8. [Directory Structure](#directory-structure)
9. [Quick Wins vs Long-Term](#quick-wins-vs-long-term)

---

## Executive Summary

**What**: Nexus is a knowledge integration tool that unifies access to:
- Zotero library (2,728+ items)
- PDF collections (~1,800 files)
- Obsidian vault (PARA structure)
- R package documentation
- Research notes and annotations

**How**: Available in two modes:
1. **CLI Mode**: `nexus <command>` from any terminal
2. **Plugin Mode**: Skills and commands in Claude Code

**Why dual-mode?**
- CLI: Automation, scripts, quick lookups, shell integration
- Plugin: AI-assisted research, conversation context, intelligent synthesis

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACES                            │
├─────────────────────────────┬───────────────────────────────────────┤
│        CLI MODE             │           PLUGIN MODE                 │
│                             │                                       │
│  $ nexus zotero search X    │   Claude Code conversation           │
│  $ nexus pdf extract Y      │   /nexus-search "query"              │
│  $ nexus vault find Z       │   Skills: research, teaching         │
│  $ nexus query "anything"   │   Context-aware suggestions          │
│                             │                                       │
│  Output: JSON, table, md    │   Output: Conversational, rich       │
├─────────────────────────────┴───────────────────────────────────────┤
│                         NEXUS CORE                                  │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   ZOTERO    │  │    PDF      │  │   VAULT     │  │   QUERY    │ │
│  │   MODULE    │  │   MODULE    │  │   MODULE    │  │   ENGINE   │ │
│  │             │  │             │  │             │  │            │ │
│  │ • search    │  │ • extract   │  │ • read      │  │ • unified  │ │
│  │ • cite      │  │ • search    │  │ • write     │  │ • semantic │ │
│  │ • annotate  │  │ • summarize │  │ • search    │  │ • filter   │ │
│  │ • export    │  │ • batch     │  │ • link      │  │ • rank     │ │
│  │ • sync      │  │ • index     │  │ • template  │  │ • format   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                      STORAGE LAYER                                  │
│                                                                     │
│  ~/Zotero/          ~/Documents/PDFs/      ~/Obsidian/Nexus/       │
│  zotero.sqlite      ├── research/          ├── 00-INBOX/           │
│  storage/           └── teaching/          ├── 10-PROJECTS/        │
│                                            └── 30-RESOURCES/       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Dual-Mode Design

### Shared Core Principle

Both CLI and Plugin call the same underlying functions. The difference is only in:
- **Input**: CLI parses args, Plugin receives from Claude
- **Output**: CLI formats for terminal, Plugin formats for conversation

```bash
# Same operation, two interfaces:

# CLI Mode
$ nexus zotero search "mediation analysis" --format json
{
  "count": 47,
  "results": [
    {"key": "ABC123", "title": "Causal Mediation Analysis", ...}
  ]
}

# Plugin Mode (in Claude Code conversation)
User: Find papers on mediation analysis
Claude: [Uses nexus-search skill]
> Found 47 papers on mediation analysis in your Zotero library.
> Top matches:
> 1. "Causal Mediation Analysis" (VanderWeele, 2015) - 234 citations
> 2. ...
```

### Architecture Choice: Hybrid Shell + TypeScript

**Rationale**:
- Shell scripts for fast, simple operations (SQLite queries, file ops)
- TypeScript for complex logic (unified search, ranking, AI integration)
- Plugin wrapper calls both seamlessly

```
nexus/
├── bin/
│   └── nexus                    # Main CLI entrypoint (bash)
│
├── lib/                         # Shell libraries (fast operations)
│   ├── common.sh                # Shared utilities
│   ├── zotero.sh                # Zotero SQLite queries
│   ├── pdf.sh                   # PDF extraction (pdftotext)
│   ├── vault.sh                 # Obsidian file operations
│   └── output.sh                # Formatting (json, table, md)
│
├── src/                         # TypeScript (complex logic)
│   ├── query-engine/
│   │   ├── unified-search.ts    # Cross-source search
│   │   ├── ranking.ts           # Result scoring
│   │   └── semantic.ts          # Semantic similarity
│   ├── knowledge-graph/
│   │   ├── relationships.ts     # Note/paper connections
│   │   └── visualization.ts     # Graph export
│   └── cli/
│       └── index.ts             # TypeScript CLI commands
│
├── plugin/                      # Claude Code plugin
│   ├── plugin.json              # Plugin manifest
│   ├── skills/
│   │   ├── research/
│   │   │   ├── literature-review.md
│   │   │   ├── citation-helper.md
│   │   │   └── methodology.md
│   │   ├── teaching/
│   │   │   ├── lecture-prep.md
│   │   │   └── example-generator.md
│   │   └── knowledge/
│   │       ├── unified-search.md
│   │       └── synthesis.md
│   └── commands/
│       ├── nexus-search.md      # /nexus-search
│       ├── nexus-cite.md        # /nexus-cite
│       ├── nexus-read.md        # /nexus-read
│       └── nexus-write.md       # /nexus-write
│
├── config/
│   ├── nexus.yaml               # User configuration
│   └── defaults.yaml            # Default settings
│
├── tests/
│   ├── lib/                     # Shell tests (bats)
│   └── src/                     # TypeScript tests (vitest)
│
└── docs/
    ├── CLI.md                   # CLI reference
    ├── PLUGIN.md                # Plugin reference
    └── CONFIGURATION.md         # Setup guide
```

---

## Complete Feature Set

### 1. Zotero Module

| Feature | CLI Command | Plugin Command | Description |
|---------|-------------|----------------|-------------|
| Search | `nexus zotero search <query>` | `/nexus-cite search` | Full-text search across library |
| Cite | `nexus zotero cite <key>` | `/nexus-cite format` | Generate citation (APA, BibTeX, etc.) |
| Annotate | `nexus zotero annotate <key>` | Skill: citation-helper | Add notes to item |
| Export | `nexus zotero export <keys>` | `/nexus-cite export` | Export to BibTeX, JSON |
| Recent | `nexus zotero recent [n]` | Skill: literature-review | Recently added items |
| Tags | `nexus zotero tags <tag>` | `/nexus-cite by-tag` | Filter by Zotero tags |
| Collections | `nexus zotero collection <name>` | Skill: literature-review | Browse collections |
| Stats | `nexus zotero stats` | - | Library statistics |
| **Sync** ⭐ | `nexus zotero sync` | - | Sync annotations to vault |

### 2. PDF Module

| Feature | CLI Command | Plugin Command | Description |
|---------|-------------|----------------|-------------|
| Extract | `nexus pdf extract <file>` | `/nexus-read pdf` | Extract text from PDF |
| Search | `nexus pdf search <query>` | Skill: literature-review | Search across all PDFs |
| Summarize | `nexus pdf summarize <file>` | Skill: methodology | AI summary of paper |
| Batch | `nexus pdf batch <dir>` | - | Process multiple PDFs |
| Index | `nexus pdf index` | - | Build/rebuild search index |
| Open | `nexus pdf open <query>` | - | Find and open matching PDF |
| **OCR** ⭐ | `nexus pdf ocr <file>` | - | OCR for scanned PDFs |
| **Highlight** ⭐ | `nexus pdf highlights <file>` | - | Extract highlighted text |

### 3. Vault Module (Obsidian)

| Feature | CLI Command | Plugin Command | Description |
|---------|-------------|----------------|-------------|
| Read | `nexus vault read <path>` | `/nexus-read note` | Read note content |
| Write | `nexus vault write <path>` | `/nexus-write note` | Create/update note |
| Search | `nexus vault search <query>` | `/nexus-search vault` | Full-text search |
| Link | `nexus vault link <from> <to>` | Skill: knowledge | Create wiki link |
| Backlinks | `nexus vault backlinks <path>` | Skill: knowledge | Find incoming links |
| Template | `nexus vault new <template>` | `/nexus-write template` | Create from template |
| Tags | `nexus vault tags [tag]` | `/nexus-search tags` | Tag operations |
| Daily | `nexus vault daily` | Skill: knowledge | Today's note |
| **Graph** ⭐ | `nexus vault graph` | - | Export knowledge graph |
| **Orphans** ⭐ | `nexus vault orphans` | - | Find unlinked notes |

### 4. Query Engine (Unified Search) ⭐⭐

| Feature | CLI Command | Plugin Command | Description |
|---------|-------------|----------------|-------------|
| **Unified** | `nexus query <text>` | `/nexus-search` | Search ALL sources |
| Filter | `nexus query <text> --source zotero,vault` | `/nexus-search --from` | Filter by source |
| Semantic | `nexus query <text> --semantic` | Skill: synthesis | Semantic similarity |
| Related | `nexus related <item>` | Skill: knowledge | Find related items |
| Timeline | `nexus timeline <topic>` | Skill: literature-review | Chronological view |
| **Ask** ⭐⭐ | `nexus ask "question"` | Skill: synthesis | Natural language query |

### 5. Research Workflows

| Workflow | CLI Command | Plugin Skill | Description |
|----------|-------------|--------------|-------------|
| Lit Review | `nexus workflow lit-review <topic>` | literature-review | Guided lit review |
| Methods | `nexus workflow methods <approach>` | methodology | Write methods section |
| Simulation | `nexus workflow simulation` | simulation-design | Design simulation study |
| **Grant** ⭐ | `nexus workflow grant <funder>` | grant-helper | Grant writing assistance |

### 6. Teaching Workflows

| Workflow | CLI Command | Plugin Skill | Description |
|----------|-------------|--------------|-------------|
| Lecture | `nexus workflow lecture <topic>` | lecture-prep | Prepare lecture |
| Examples | `nexus workflow examples <concept>` | example-generator | Generate examples |
| Quiz | `nexus workflow quiz <topic>` | assessment | Create quiz questions |
| **Slides** ⭐ | `nexus workflow slides <topic>` | lecture-prep | Generate Quarto slides |

### 7. R Package Integration

| Feature | CLI Command | Plugin Skill | Description |
|---------|-------------|--------------|-------------|
| Docs | `nexus rpkg docs <pkg>` | package-helper | Search package docs |
| Examples | `nexus rpkg examples <function>` | package-helper | Find usage examples |
| Vignettes | `nexus rpkg vignette <pkg>` | package-helper | Read vignettes |
| **Test** ⭐ | `nexus rpkg test <pkg>` | - | Run package tests |

---

## CLI Reference

### Installation

```bash
# Clone and install
git clone https://github.com/data-wise/nexus-cli.git ~/.nexus
cd ~/.nexus && ./install.sh

# Or via Homebrew (future)
brew install nexus-cli
```

### Configuration

```yaml
# ~/.config/nexus/config.yaml

zotero:
  database: ~/Zotero/zotero.sqlite
  storage: ~/Zotero/storage

pdf:
  directories:
    - ~/Documents/Research/PDFs
    - ~/Documents/Teaching/PDFs
  index_path: ~/.nexus/pdf-index.db

vault:
  path: ~/Obsidian/Nexus
  templates: ~/Obsidian/Nexus/_SYSTEM/templates

output:
  default_format: table  # json, table, markdown
  color: true
  pager: less
```

### Command Structure

```bash
nexus <module> <command> [args] [--options]

# Modules
nexus zotero <command>    # Zotero operations
nexus pdf <command>       # PDF operations
nexus vault <command>     # Obsidian vault
nexus query <text>        # Unified search
nexus ask "<question>"    # Natural language
nexus workflow <name>     # Guided workflows

# Global options
--format, -f    Output format (json|table|md)
--quiet, -q     Minimal output
--verbose, -v   Detailed output
--config, -c    Config file path
--help, -h      Show help
```

### Example Sessions

```bash
# Morning research session
$ nexus vault daily                    # Open/create today's note
$ nexus zotero recent 5                # See recent additions
$ nexus query "sensitivity analysis"   # Search everywhere

# Writing session
$ nexus zotero search "VanderWeele mediation"
$ nexus zotero cite ABC123 --format bibtex >> refs.bib
$ nexus pdf extract ~/Papers/vanderweele2015.pdf | head -50

# Literature review
$ nexus workflow lit-review "causal mediation" --depth 3
$ nexus ask "What are the key assumptions in causal mediation?"

# Teaching prep
$ nexus workflow lecture "regression diagnostics"
$ nexus vault new lecture --template lecture-quarto
```

---

## Plugin Reference

### Plugin Structure

```json
{
  "name": "nexus",
  "version": "1.0.0",
  "description": "Unified knowledge management for research and teaching",
  "skills": [
    "skills/research/literature-review.md",
    "skills/research/citation-helper.md",
    "skills/research/methodology.md",
    "skills/teaching/lecture-prep.md",
    "skills/knowledge/unified-search.md",
    "skills/knowledge/synthesis.md"
  ],
  "commands": [
    "commands/nexus-search.md",
    "commands/nexus-cite.md",
    "commands/nexus-read.md",
    "commands/nexus-write.md"
  ]
}
```

### Key Skills

#### `literature-review` ⭐⭐
```markdown
---
description: Conduct comprehensive literature reviews using Zotero, PDFs, and vault notes
---

When asked to review literature on a topic:

1. Search Zotero: `nexus zotero search "<topic>" --format json`
2. Search PDFs: `nexus pdf search "<topic>" --format json`
3. Search Vault: `nexus vault search "<topic>" --format json`
4. Synthesize findings across sources
5. Create structured review in vault: `nexus vault new literature-note`
```

#### `synthesis` ⭐⭐
```markdown
---
description: Synthesize knowledge across all sources to answer complex questions
---

When asked to synthesize or answer complex research questions:

1. Parse the question for key concepts
2. Use unified query: `nexus query "<concepts>" --format json`
3. Retrieve relevant content from each source
4. Generate synthesis with proper citations
5. Optionally save to vault
```

### Key Commands

#### `/nexus-search`
```markdown
---
command: nexus-search
description: Search across all knowledge sources
arguments:
  - name: query
    description: Search query
    required: true
  - name: --from
    description: Sources to search (zotero,pdf,vault,all)
    default: all
---

Search your entire knowledge base.

Usage: /nexus-search <query> [--from sources]

Examples:
- /nexus-search "causal inference"
- /nexus-search "VanderWeele" --from zotero
- /nexus-search "sensitivity" --from vault,pdf
```

#### `/nexus-cite`
```markdown
---
command: nexus-cite
description: Generate citations from Zotero
arguments:
  - name: action
    description: search, format, export
    required: true
  - name: query
    description: Search query or item key
---

Work with citations from your Zotero library.

Usage: /nexus-cite <action> <query>

Examples:
- /nexus-cite search "mediation"
- /nexus-cite format ABC123 --style apa
- /nexus-cite export ABC123,DEF456 --bibtex
```

---

## Implementation Plan

### Phase 0: Foundation (2 hours)
**Goal**: Set up project structure and shared configuration

```bash
# Create project structure
mkdir -p nexus-cli/{bin,lib,src,plugin,config,tests,docs}

# Initialize
cd nexus-cli
npm init -y
git init
```

**Deliverables**:
- [ ] Directory structure
- [ ] config.yaml schema
- [ ] lib/common.sh (shared utilities)
- [ ] bin/nexus (CLI entrypoint skeleton)

---

### Phase 1: Zotero Module (4 hours)

**Shell Layer** (`lib/zotero.sh`):
```bash
#!/bin/bash
# Zotero SQLite operations

ZOTERO_DB="${NEXUS_ZOTERO_DB:-$HOME/Zotero/zotero.sqlite}"

zotero_search() {
    local query="$1"
    local limit="${2:-20}"

    sqlite3 -json "$ZOTERO_DB" <<EOF
SELECT
    i.key,
    iv_title.value as title,
    iv_date.value as date,
    GROUP_CONCAT(DISTINCT c.firstName || ' ' || c.lastName) as authors
FROM items i
LEFT JOIN itemData id_title ON i.itemID = id_title.itemID
LEFT JOIN itemDataValues iv_title ON id_title.valueID = iv_title.valueID
LEFT JOIN fields f_title ON id_title.fieldID = f_title.fieldID AND f_title.fieldName = 'title'
-- ... more joins
WHERE iv_title.value LIKE '%$query%'
LIMIT $limit;
EOF
}

zotero_cite() {
    local key="$1"
    local style="${2:-apa}"
    # Generate citation using Zotero's citation format
}

zotero_recent() {
    local limit="${1:-10}"
    sqlite3 -json "$ZOTERO_DB" <<EOF
SELECT key, title, dateAdded
FROM items
ORDER BY dateAdded DESC
LIMIT $limit;
EOF
}
```

**CLI Commands**:
```bash
# bin/nexus zotero subcommands
nexus zotero search <query>    # Search library
nexus zotero cite <key>        # Generate citation
nexus zotero recent [n]        # Recent items
nexus zotero tags <tag>        # Filter by tag
nexus zotero export <keys>     # Export to BibTeX
```

**Plugin Commands**:
- `/nexus-cite search <query>`
- `/nexus-cite format <key> [--style]`

**Tests**:
- [ ] Search returns valid JSON
- [ ] Citation formatting works
- [ ] Empty results handled gracefully

---

### Phase 2: PDF Module (3 hours)

**Shell Layer** (`lib/pdf.sh`):
```bash
#!/bin/bash
# PDF operations using pdftotext and ripgrep

PDF_DIRS=(
    "$HOME/Documents/Research/PDFs"
    "$HOME/Documents/Teaching/PDFs"
)

pdf_extract() {
    local file="$1"
    local pages="${2:-all}"

    if [[ "$pages" == "all" ]]; then
        pdftotext -layout "$file" -
    else
        pdftotext -f "$pages" -l "$pages" -layout "$file" -
    fi
}

pdf_search() {
    local query="$1"
    local format="${2:-json}"

    # Search across all PDF directories
    local results=()
    for dir in "${PDF_DIRS[@]}"; do
        while IFS= read -r file; do
            if pdftotext "$file" - 2>/dev/null | grep -qi "$query"; then
                results+=("$file")
            fi
        done < <(find "$dir" -name "*.pdf" -type f)
    done

    # Format output
    if [[ "$format" == "json" ]]; then
        printf '%s\n' "${results[@]}" | jq -R -s 'split("\n") | map(select(. != ""))'
    else
        printf '%s\n' "${results[@]}"
    fi
}

pdf_search_ripgrep() {
    # Faster: use pre-built text index
    local query="$1"
    rg --json "$query" ~/.nexus/pdf-texts/
}
```

**CLI Commands**:
```bash
nexus pdf extract <file> [--pages]
nexus pdf search <query>
nexus pdf index                    # Build search index
nexus pdf open <query>             # Find and open PDF
```

**Indexing Strategy**:
```bash
# Build text index for fast searching
nexus pdf index
# Creates: ~/.nexus/pdf-texts/<hash>.txt for each PDF
# Creates: ~/.nexus/pdf-index.db (SQLite FTS5)
```

---

### Phase 3: Vault Module (4 hours)

**Shell Layer** (`lib/vault.sh`):
```bash
#!/bin/bash
# Obsidian vault operations

VAULT_PATH="${NEXUS_VAULT:-$HOME/Obsidian/Nexus}"

vault_read() {
    local path="$1"
    local full_path="$VAULT_PATH/$path"

    if [[ -f "$full_path" ]]; then
        cat "$full_path"
    elif [[ -f "$full_path.md" ]]; then
        cat "$full_path.md"
    else
        echo "Note not found: $path" >&2
        return 1
    fi
}

vault_write() {
    local path="$1"
    local content="$2"
    local full_path="$VAULT_PATH/$path"

    # Ensure directory exists
    mkdir -p "$(dirname "$full_path")"

    # Write content
    echo "$content" > "$full_path"
}

vault_search() {
    local query="$1"
    rg --json -l "$query" "$VAULT_PATH" --glob "*.md"
}

vault_backlinks() {
    local note="$1"
    local note_name=$(basename "$note" .md)
    rg --json -l "\[\[$note_name\]\]" "$VAULT_PATH" --glob "*.md"
}

vault_template() {
    local template="$1"
    local dest="$2"
    local template_path="$VAULT_PATH/_SYSTEM/templates/$template.md"

    if [[ -f "$template_path" ]]; then
        cp "$template_path" "$VAULT_PATH/$dest"
        # Process template variables
        sed -i '' "s/{{date}}/$(date +%Y-%m-%d)/g" "$VAULT_PATH/$dest"
        sed -i '' "s/{{time}}/$(date +%H:%M)/g" "$VAULT_PATH/$dest"
    fi
}
```

**CLI Commands**:
```bash
nexus vault read <path>
nexus vault write <path> [--content | -]
nexus vault search <query>
nexus vault new <template> --dest <path>
nexus vault daily
nexus vault backlinks <note>
```

**Plugin Commands**:
- `/nexus-read note <path>`
- `/nexus-write note <path>`
- `/nexus-search vault <query>`

---

### Phase 4: Query Engine (3 hours)

**TypeScript Layer** (`src/query-engine/unified-search.ts`):
```typescript
interface SearchResult {
  source: 'zotero' | 'pdf' | 'vault';
  id: string;
  title: string;
  snippet: string;
  score: number;
  metadata: Record<string, any>;
}

interface SearchOptions {
  sources?: ('zotero' | 'pdf' | 'vault')[];
  limit?: number;
  semantic?: boolean;
}

async function unifiedSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const sources = options.sources || ['zotero', 'pdf', 'vault'];
  const results: SearchResult[] = [];

  // Parallel search across sources
  const searches = sources.map(async (source) => {
    switch (source) {
      case 'zotero':
        return searchZotero(query);
      case 'pdf':
        return searchPDFs(query);
      case 'vault':
        return searchVault(query);
    }
  });

  const allResults = await Promise.all(searches);

  // Merge and rank results
  const merged = allResults.flat();
  const ranked = rankResults(merged, query);

  return ranked.slice(0, options.limit || 20);
}

function rankResults(results: SearchResult[], query: string): SearchResult[] {
  // Score based on:
  // - Title match (high weight)
  // - Content match (medium weight)
  // - Recency (low weight)
  // - Source priority (configurable)

  return results.sort((a, b) => b.score - a.score);
}
```

**CLI Command**:
```bash
nexus query "sensitivity analysis in mediation"
nexus query "VanderWeele" --from zotero,vault
nexus ask "What methods exist for sensitivity analysis?"
```

**Plugin Skill**: `unified-search.md`

---

### Phase 5: Plugin Integration (2 hours)

**Plugin Manifest** (`plugin/plugin.json`):
```json
{
  "name": "nexus",
  "version": "1.0.0",
  "description": "Unified knowledge management for research and teaching",
  "author": "Data-Wise",
  "skills": [
    "skills/research/literature-review.md",
    "skills/research/citation-helper.md",
    "skills/research/methodology.md",
    "skills/research/simulation-design.md",
    "skills/teaching/lecture-prep.md",
    "skills/teaching/example-generator.md",
    "skills/knowledge/unified-search.md",
    "skills/knowledge/synthesis.md"
  ],
  "commands": [
    "commands/nexus-search.md",
    "commands/nexus-cite.md",
    "commands/nexus-read.md",
    "commands/nexus-write.md"
  ]
}
```

**Skill Template**:
```markdown
---
description: [Skill description for Claude to understand when to use]
---

[Instructions for how Claude should use this skill]

## Tools Available

- `nexus zotero search "<query>"` - Search Zotero library
- `nexus pdf extract "<file>"` - Extract PDF text
- `nexus vault read "<path>"` - Read vault note
- `nexus query "<text>"` - Unified search

## Workflow

1. [Step-by-step instructions]
2. [How to handle results]
3. [Output format expectations]
```

---

### Phase 6: Polish & Documentation (2 hours)

- [ ] Comprehensive --help for all commands
- [ ] Man pages (groff or markdown)
- [ ] Tab completion (bash/zsh)
- [ ] Error handling and user-friendly messages
- [ ] Example sessions in docs
- [ ] Quick reference card

---

## Timeline Summary

| Phase | Focus | Time | Cumulative |
|-------|-------|------|------------|
| 0 | Foundation | 2h | 2h |
| 1 | Zotero | 4h | 6h |
| 2 | PDF | 3h | 9h |
| 3 | Vault | 4h | 13h |
| 4 | Query Engine | 3h | 16h |
| 5 | Plugin | 2h | 18h |
| 6 | Polish | 2h | **20h** |

**Total: 20 hours** (vs 16h in previous plan)
**Added**: CLI infrastructure, unified architecture, TypeScript query engine

---

## Quick Wins vs Long-Term

### Quick Wins (< 2 hours each) ⚡

| Win | Impact | Time |
|-----|--------|------|
| `nexus zotero search` | Immediate Zotero access | 1h |
| `nexus pdf extract` | PDF text extraction | 30m |
| `nexus vault read/write` | Basic vault ops | 1h |
| `nexus vault daily` | Daily note shortcut | 15m |
| `/nexus-cite` command | Citation in Claude | 1h |

### Medium Effort (2-4 hours each) 🔧

| Feature | Impact | Time |
|---------|--------|------|
| PDF search index | Fast PDF search | 3h |
| Unified query | Cross-source search | 3h |
| Tab completion | Better UX | 2h |
| Zotero → Vault sync | Annotation sync | 4h |

### Long-Term (Future phases) 🏗️

| Feature | Description | Estimate |
|---------|-------------|----------|
| Semantic search | Embedding-based similarity | 8h |
| Knowledge graph | Neo4j or SQLite graph | 12h |
| TUI interface | Rich terminal UI | 16h |
| Nexus daemon | Background indexing | 8h |
| Web dashboard | Local visualization | 20h |

---

## Decision Points

### 1. Where should Nexus CLI live?

| Option | Path | Pros | Cons |
|--------|------|------|------|
| A) Standalone repo | `~/projects/dev-tools/nexus-cli/` | Clean separation | Another repo |
| B) Inside Nexus | `~/projects/dev-tools/nexus/cli/` | Single repo | Mixes docs + code |
| C) Extend statistical-research | `~/...claude-plugins/.../` | Reuse existing | Pollutes plugin |

**Recommendation**: **Option A** - New standalone repo

### 2. Should the plugin be separate?

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| A) Plugin inside CLI repo | `nexus-cli/plugin/` | Single source of truth | Mixed concerns |
| B) Separate plugin repo | `nexus-plugin/` | Clean separation | Two repos to maintain |
| C) Symlink from plugins | Plugin refs CLI | Best of both | Complexity |

**Recommendation**: **Option A** - Plugin lives inside CLI repo, symlinked to plugins folder

### 3. TypeScript for CLI or just shell?

| Approach | Pros | Cons |
|----------|------|------|
| Pure shell | Simple, fast, no deps | Limited for complex logic |
| Pure TypeScript | Type safety, npm | Heavier, node dependency |
| Hybrid | Best of both | Two languages |

**Recommendation**: **Hybrid** - Shell for simple ops, TS for query engine

---

## Next Steps

1. **Confirm architecture decisions** (5 min)
   - Standalone repo vs inside nexus?
   - Hybrid shell + TS approach?
   - Plugin location?

2. **Create project structure** (30 min)
   - Initialize repo
   - Set up directory structure
   - Create config schema

3. **Implement Phase 1: Zotero** (4h)
   - lib/zotero.sh
   - CLI commands
   - Basic plugin command

4. **Iterate through phases** (16h remaining)
   - Each phase builds on previous
   - Test after each phase
   - Document as you go

---

## Comparison: Old Plan vs New Plan

| Aspect | Old Plan | New Plan |
|--------|----------|----------|
| **Scope** | Extend existing plugin | New unified tool |
| **Modes** | Plugin only | CLI + Plugin |
| **Architecture** | Shell scripts | Hybrid Shell + TS |
| **Location** | Inside statistical-research | Standalone repo |
| **Time** | 16 hours | 20 hours |
| **Capabilities** | 4 modules | 7 modules + workflows |
| **CLI** | None | Full CLI with subcommands |
| **Query** | Basic search | Unified + semantic |
| **Maintenance** | Plugin updates | Single codebase |

---

## Conclusion

The revised plan transforms Nexus from a plugin extension into a **comprehensive knowledge CLI** that also works as a Claude Code plugin. This provides:

1. **Flexibility**: Use from terminal OR Claude conversation
2. **Automation**: Script and pipeline integration
3. **Unified Access**: Single tool for all knowledge sources
4. **Future-Proof**: Architecture supports TUI, web, and more

**Recommended first action**: Create the standalone `nexus-cli` repo and implement Phase 0 + Phase 1 (Zotero) in the first session.

