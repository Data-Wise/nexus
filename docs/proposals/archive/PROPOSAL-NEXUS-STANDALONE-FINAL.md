# Nexus: Standalone Knowledge Workflow CLI

> **Vision**: Nexus is Claude's body for research, teaching, and writing. Claude is the brain, Nexus is the hands.

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
    ║         Research • Teaching • Writing • Knowledge         ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

---

## Core Philosophy

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE NEXUS ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      ┌─────────────┐                           │
│                      │   CLAUDE    │                           │
│                      │   (Brain)   │                           │
│                      │             │                           │
│                      │ • Thinking  │                           │
│                      │ • Planning  │                           │
│                      │ • Writing   │                           │
│                      │ • Teaching  │                           │
│                      └──────┬──────┘                           │
│                             │                                   │
│                             │ uses                              │
│                             ▼                                   │
│                      ┌─────────────┐                           │
│                      │   NEXUS     │                           │
│                      │   (Body)    │                           │
│                      │             │                           │
│                      │ • Searching │                           │
│                      │ • Reading   │                           │
│                      │ • Writing   │                           │
│                      │ • Organizing│                           │
│                      └──────┬──────┘                           │
│                             │                                   │
│              ┌──────────────┼──────────────┐                   │
│              │              │              │                   │
│              ▼              ▼              ▼                   │
│       ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│       │  ZOTERO  │   │   PDFs   │   │  VAULT   │              │
│       │  2,728   │   │  1,800   │   │ Obsidian │              │
│       │  papers  │   │  files   │   │  notes   │              │
│       └──────────┘   └──────────┘   └──────────┘              │
│                                                                 │
│  + R Packages • Quarto • LaTeX • Git • Teaching Materials      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key Principle**: Nexus does NOT do AI. It provides data and operations. Claude does the thinking.

---

## The Four Domains

### 🔬 Research
- Search literature (Zotero, PDFs, papers)
- Extract citations and annotations
- Manage research projects
- Track manuscript progress
- Run simulations (R)

### 📚 Teaching
- Access course materials
- Find lecture examples
- Generate teaching content
- Manage student resources
- Build course websites (Quarto)

### ✍️ Writing
- Draft manuscripts
- Manage bibliography
- Format for journals
- Generate LaTeX/Quarto
- Track revisions

### 🧠 Knowledge
- Search everything
- Connect ideas
- Organize notes
- Build knowledge graph
- Surface insights

---

## Standalone Architecture

```
nexus/                              # Standalone repo
├── bin/
│   └── nexus                       # Main CLI entrypoint
│
├── nexus/                          # Python package
│   ├── __init__.py
│   ├── cli.py                      # Typer CLI
│   │
│   ├── research/                   # 🔬 Research domain
│   │   ├── __init__.py
│   │   ├── zotero.py              # Zotero integration
│   │   ├── pdf.py                 # PDF extraction
│   │   ├── literature.py          # Literature search
│   │   └── simulation.py          # R simulation runner
│   │
│   ├── teaching/                   # 📚 Teaching domain
│   │   ├── __init__.py
│   │   ├── courses.py             # Course management
│   │   ├── materials.py           # Teaching materials
│   │   └── quarto.py              # Quarto generation
│   │
│   ├── writing/                    # ✍️ Writing domain
│   │   ├── __init__.py
│   │   ├── manuscript.py          # Manuscript management
│   │   ├── bibliography.py        # BibTeX/citation
│   │   └── latex.py               # LaTeX helpers
│   │
│   ├── knowledge/                  # 🧠 Knowledge domain
│   │   ├── __init__.py
│   │   ├── vault.py               # Obsidian vault
│   │   ├── search.py              # Unified search
│   │   └── graph.py               # Knowledge graph
│   │
│   ├── integrations/               # 🔌 Tool integrations
│   │   ├── __init__.py
│   │   ├── aiterm.py              # aiterm integration
│   │   ├── obsidian.py            # Obsidian plugin API
│   │   ├── r.py                   # R/RStudio integration
│   │   └── git.py                 # Git operations
│   │
│   └── utils/                      # Shared utilities
│       ├── __init__.py
│       ├── config.py              # Configuration
│       ├── output.py              # Rich formatting
│       └── paths.py               # Path resolution
│
├── plugin/                         # Claude Code plugin
│   ├── plugin.json
│   ├── skills/
│   │   ├── research/
│   │   │   ├── literature-review.md
│   │   │   ├── citation-helper.md
│   │   │   ├── methodology.md
│   │   │   └── simulation-design.md
│   │   ├── teaching/
│   │   │   ├── lecture-prep.md
│   │   │   ├── example-generator.md
│   │   │   └── course-builder.md
│   │   ├── writing/
│   │   │   ├── manuscript-drafter.md
│   │   │   ├── revision-helper.md
│   │   │   └── journal-formatter.md
│   │   └── knowledge/
│   │       ├── unified-search.md
│   │       ├── synthesis.md
│   │       └── connection-finder.md
│   └── commands/
│       ├── nexus-search.md
│       ├── nexus-cite.md
│       ├── nexus-read.md
│       ├── nexus-write.md
│       └── nexus-teach.md
│
├── config/
│   ├── nexus.yaml                  # Default configuration
│   └── nexus.example.yaml          # Example config
│
├── tests/
│   ├── research/
│   ├── teaching/
│   ├── writing/
│   └── knowledge/
│
├── docs/
│   ├── index.md
│   ├── quickstart.md
│   ├── cli-reference.md
│   └── plugin-reference.md
│
├── pyproject.toml                  # Python project
├── README.md
├── CLAUDE.md
└── .STATUS
```

---

## Complete CLI Reference

### Core Commands

```bash
nexus --help                        # Show all commands
nexus --version                     # Version info
nexus doctor                        # Health check
nexus config                        # View/edit configuration
```

### 🔬 Research Commands

```bash
# Zotero
nexus research zotero search "mediation analysis"
nexus research zotero cite ABC123 --style apa
nexus research zotero recent 10
nexus research zotero tags "causal-inference"
nexus research zotero export ABC123,DEF456 --bibtex

# PDF
nexus research pdf extract ~/Papers/vanderweele2015.pdf
nexus research pdf search "sensitivity bounds"
nexus research pdf summarize ~/Papers/paper.pdf

# Literature
nexus research lit search "propensity score"
nexus research lit related ABC123              # Find similar papers
nexus research lit timeline "mediation"        # Chronological view

# Simulation
nexus research sim run ~/project/simulation.R
nexus research sim status                      # Running sims
nexus research sim results ~/project/results/
```

### 📚 Teaching Commands

```bash
# Courses
nexus teach course list
nexus teach course show STAT-440
nexus teach course materials STAT-440 week-5

# Materials
nexus teach material find "regression"
nexus teach material examples "logistic regression"
nexus teach material slides "hypothesis testing"

# Quarto
nexus teach quarto new lecture --topic "ANOVA"
nexus teach quarto preview ~/teaching/lecture.qmd
nexus teach quarto build ~/teaching/
```

### ✍️ Writing Commands

```bash
# Manuscripts
nexus write manuscript list
nexus write manuscript status probmed-paper
nexus write manuscript draft methods --project probmed

# Bibliography
nexus write bib add ABC123 --to ~/paper/refs.bib
nexus write bib format ~/paper/refs.bib --style nature
nexus write bib check ~/paper/manuscript.tex

# LaTeX
nexus write latex compile ~/paper/manuscript.tex
nexus write latex clean ~/paper/
nexus write latex diff v1.tex v2.tex
```

### 🧠 Knowledge Commands

```bash
# Vault (Obsidian)
nexus knowledge vault read "research/probmed/methods.md"
nexus knowledge vault write "inbox/new-idea.md" --content "..."
nexus knowledge vault search "sensitivity analysis"
nexus knowledge vault link source.md target.md
nexus knowledge vault backlinks "topic.md"
nexus knowledge vault daily                     # Today's note
nexus knowledge vault template project --dest "projects/new.md"

# Unified Search
nexus knowledge search "mediation sensitivity"
nexus knowledge search "VanderWeele" --source zotero
nexus knowledge search "lecture" --source vault,teaching

# Graph
nexus knowledge graph show                      # Open graph view
nexus knowledge graph export --format json
nexus knowledge graph orphans                   # Unlinked notes
nexus knowledge graph clusters                  # Topic clusters
```

### 🔌 Integration Commands

```bash
# aiterm
nexus integrate aiterm install                  # Add to aiterm
nexus integrate aiterm status

# R
nexus integrate r package-check ~/rpackage/
nexus integrate r vignette ~/rpackage/vignettes/intro.Rmd

# Git
nexus integrate git status
nexus integrate git sync                        # Pull, add, commit, push
```

---

## Integration Points

### 1. Claude Code (Primary) ⭐⭐⭐

Nexus is designed to be Claude's "body" in Claude Code:

```
User: "Find papers on mediation sensitivity analysis"

Claude: [Runs: nexus research zotero search "mediation sensitivity"]
        Found 23 papers in your Zotero library:
        1. VanderWeele (2015) - Sensitivity Analysis...
        2. ...

User: "Create a literature note for the first one"

Claude: [Runs: nexus knowledge vault template literature-note --dest "..."]
        [Runs: nexus research zotero cite ABC123 --format markdown]
        Created note at 30-RESOURCES/literature/vanderweele-2015.md
```

**Plugin Skills provide the intelligence, Nexus CLI provides the operations.**

### 2. aiterm (Terminal Optimization)

```bash
# aiterm can call nexus
ait nexus search "query"           # Wrapper command

# Or nexus detects aiterm context
nexus doctor                       # Shows aiterm integration status
```

### 3. Obsidian (Knowledge Base)

```bash
# Two-way integration
nexus knowledge vault search "topic"    # Search vault
nexus knowledge vault write "note.md"   # Write to vault

# Future: Obsidian plugin that calls nexus
```

### 4. R/RStudio (Statistical Computing)

```bash
# Run R scripts
nexus research sim run simulation.R

# Check R packages
nexus integrate r package-check ~/rmediation/

# Execute R expressions
nexus integrate r eval "summary(lm(y ~ x, data))"
```

### 5. Zotero (Bibliography)

```bash
# Direct SQLite queries
nexus research zotero search "author:VanderWeele"

# Sync annotations to vault
nexus research zotero sync-annotations
```

### 6. Quarto (Publishing)

```bash
# Generate from templates
nexus teach quarto new manuscript --journal jasa

# Build and preview
nexus teach quarto build
```

---

## Claude Integration (No API Needed!) ⭐⭐⭐

**Key Insight**: You already have Claude access through your subscription. No API keys, no extra costs.

```
┌─────────────────────────────────────────────────────────────────┐
│                 THREE WAYS TO ACCESS CLAUDE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  CLAUDE CODE    │  │  CLAUDE DESKTOP │  │  CLAUDE.AI      │ │
│  │  (Terminal)     │  │  (App)          │  │  (Browser)      │ │
│  │                 │  │                 │  │                 │ │
│  │ • Headless mode │  │ • MCP servers   │  │ • MCP extension │ │
│  │ • Piping        │  │ • Local files   │  │ • Multi-tab     │ │
│  │ • Bash calls    │  │ • Desktop UI    │  │ • Parallel      │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │          │
│           └────────────────────┴────────────────────┘          │
│                               │                                 │
│                               ▼                                 │
│                      ┌─────────────────┐                       │
│                      │   NEXUS CLI     │                       │
│                      │  (Your Data)    │                       │
│                      └─────────────────┘                       │
│                                                                 │
│  ALL USE YOUR EXISTING SUBSCRIPTION • NO API COSTS             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Pattern 1: Pipe CLI Output TO Claude ⭐ SIMPLEST

```bash
# Nexus provides data, Claude analyzes it
nexus research zotero search "mediation" --json | \
  claude -p "Summarize these papers and identify key themes"

# Search vault, Claude synthesizes
nexus knowledge vault search "sensitivity" --json | \
  claude -p "Create a literature review outline"

# Extract PDF, Claude explains
nexus research pdf extract paper.pdf | \
  claude -p "Explain the methodology section"
```

**Flow:**
```
nexus (data) ──► claude -p (analysis) ──► Response (insights)
```

### Pattern 2: Claude Calls Nexus ⭐ PRIMARY PATTERN

Inside Claude Code, Claude uses Bash to call nexus:

```
User: "Find all papers by VanderWeele on mediation"

Claude: Let me search your Zotero library.
        [Runs: nexus research zotero search "VanderWeele mediation"]

        Found 12 papers:
        1. VanderWeele (2015) - Explanation in Causal Inference
        2. VanderWeele & Vansteelandt (2014) - Mediation Analysis...
        ...

        Would you like me to create a literature note?
```

**Flow:**
```
User ──► Claude (thinks) ──► nexus (executes) ──► Claude (synthesizes)
```

### Pattern 3: Headless Mode in Scripts

```bash
#!/bin/bash
# nexus-ask: AI-powered question answering

query="$1"

# Step 1: Get data from all sources
zotero_results=$(nexus research zotero search "$query" --json)
vault_results=$(nexus knowledge vault search "$query" --json)

# Step 2: Combine and ask Claude
cat <<EOF | claude -p "Answer based on this context: $query"
Zotero Results: $zotero_results
Vault Notes: $vault_results
EOF
```

**Usage:**
```bash
./nexus-ask "What are the key methods for sensitivity analysis?"
```

### Pattern 4: Shell Aliases for Quick AI Queries

```bash
# Add to ~/.zshrc
alias nexus-ai='f() {
  nexus knowledge search "$1" --json | \
  claude -p "Based on my knowledge base, answer: $1"
}; f'

alias zotero-ai='f() {
  nexus research zotero search "$1" --json | \
  claude -p "Summarize these papers about: $1"
}; f'

alias vault-ai='f() {
  nexus knowledge vault search "$1" --json | \
  claude -p "Synthesize my notes on: $1"
}; f'
```

**Usage:**
```bash
nexus-ai "sensitivity analysis methods"
zotero-ai "VanderWeele mediation"
vault-ai "JASA submission checklist"
```

### Pattern 5: MCP Server (Advanced)

Create a Nexus MCP server for Claude Desktop and Claude Code:

```typescript
// mcp-servers/nexus/src/index.ts
const tools = [
  {
    name: "nexus_zotero_search",
    description: "Search Zotero library",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" }
      }
    }
  },
  {
    name: "nexus_vault_search",
    description: "Search Obsidian vault"
  },
  {
    name: "nexus_unified_search",
    description: "Search all knowledge sources"
  }
];

// Tools call nexus CLI and return results
```

**Config for Claude Desktop:**
```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": ["/path/to/mcp-servers/nexus/dist/index.js"]
    }
  }
}
```

### Recommended Implementation Order

| Phase | Pattern | Time | Priority |
|-------|---------|------|----------|
| 1 | Piping (`nexus | claude -p`) | 5 min | Immediate |
| 2 | Shell aliases | 10 min | Quick win |
| 3 | Claude Code Plugin | 3h | Core |
| 4 | MCP Server | 4h | Optional |

### Example Workflows

**Literature Review:**
```bash
# Get papers, Claude creates outline
nexus research zotero search "propensity score" --json | \
  claude -p "Create a structured literature review with:
  - Key foundational papers
  - Recent developments (2020+)
  - Identified gaps
  - Suggested next readings"
```

**Teaching Prep:**
```bash
# Find materials, Claude suggests approach
nexus teach material find "regression diagnostics" --json | \
  claude -p "How should I explain these concepts to undergraduates?
  Include: analogies, examples, common misconceptions"
```

**Manuscript Status:**
```bash
# Check status, Claude prioritizes
nexus write manuscript status probmed --json | \
  claude -p "What sections need work? Prioritize by importance for JASA submission"
```

**Knowledge Synthesis:**
```bash
# Search everything, Claude connects
nexus knowledge search "causal inference" --json | \
  claude -p "Synthesize what I know about causal inference from my notes and papers.
  Identify connections between ideas I might have missed."
```

---

## Configuration

```yaml
# ~/.config/nexus/config.yaml

# Core paths
zotero:
  database: ~/Zotero/zotero.sqlite
  storage: ~/Zotero/storage

vault:
  path: ~/Obsidian/Nexus
  templates: ~/Obsidian/Nexus/_SYSTEM/templates

pdf:
  directories:
    - ~/Documents/Research/PDFs
    - ~/Documents/Teaching/PDFs
  index: ~/.nexus/pdf-index.db

teaching:
  courses_dir: ~/projects/teaching
  materials_dir: ~/Documents/Teaching

writing:
  manuscripts_dir: ~/projects/research
  templates_dir: ~/.nexus/templates

# R integration
r:
  executable: /usr/local/bin/R
  packages_dir: ~/projects/r-packages

# Output preferences
output:
  format: rich          # rich, json, plain
  color: true
  pager: false

# Integrations
integrations:
  aiterm: true          # Enable aiterm integration
  obsidian: true        # Enable Obsidian plugin
  claude_plugin: true   # Install Claude Code plugin
```

---

## Implementation Plan

### Phase 1: Core Infrastructure (4 hours)

```python
# nexus/cli.py - Main CLI structure
import typer
from rich.console import Console

app = typer.Typer(
    name="nexus",
    help="Knowledge workflow CLI for research, teaching, and writing",
    no_args_is_help=True,
)

# Domain subcommands
research_app = typer.Typer(help="🔬 Research operations")
teach_app = typer.Typer(help="📚 Teaching operations")
write_app = typer.Typer(help="✍️ Writing operations")
knowledge_app = typer.Typer(help="🧠 Knowledge operations")
integrate_app = typer.Typer(help="🔌 Tool integrations")

app.add_typer(research_app, name="research")
app.add_typer(teach_app, name="teach")
app.add_typer(write_app, name="write")
app.add_typer(knowledge_app, name="knowledge")
app.add_typer(integrate_app, name="integrate")

@app.command()
def doctor():
    """Check Nexus health and integrations."""
    console = Console()
    # Check Zotero, vault, R, etc.
    ...

@app.command()
def config(key: str = None, value: str = None):
    """View or set configuration."""
    ...
```

**Deliverables:**
- [ ] CLI skeleton with Typer
- [ ] Configuration loading (YAML)
- [ ] Doctor command
- [ ] Rich output formatting

### Phase 2: Knowledge Domain (3 hours)

```python
# nexus/knowledge/vault.py
from pathlib import Path
from typing import Optional, List
import subprocess

class VaultManager:
    def __init__(self, vault_path: Path):
        self.vault_path = vault_path

    def read(self, note_path: str) -> str:
        """Read a note from the vault."""
        full_path = self.vault_path / note_path
        if not full_path.suffix:
            full_path = full_path.with_suffix(".md")
        return full_path.read_text()

    def write(self, note_path: str, content: str) -> Path:
        """Write content to a note."""
        full_path = self.vault_path / note_path
        if not full_path.suffix:
            full_path = full_path.with_suffix(".md")
        full_path.parent.mkdir(parents=True, exist_ok=True)
        full_path.write_text(content)
        return full_path

    def search(self, query: str) -> List[dict]:
        """Full-text search using ripgrep."""
        result = subprocess.run(
            ["rg", "--json", "-l", query, str(self.vault_path), "--glob", "*.md"],
            capture_output=True, text=True
        )
        # Parse JSON output...
        return results

    def backlinks(self, note_path: str) -> List[str]:
        """Find notes linking to this one."""
        note_name = Path(note_path).stem
        pattern = f"\\[\\[{note_name}\\]\\]"
        return self.search(pattern)

    def daily(self) -> Path:
        """Get or create today's daily note."""
        from datetime import date
        today = date.today().isoformat()
        daily_path = f"50-DAILY/{today}.md"
        if not (self.vault_path / daily_path).exists():
            template = self._load_template("daily")
            self.write(daily_path, template)
        return self.vault_path / daily_path

    def template(self, template_name: str, dest: str, **vars) -> Path:
        """Create note from template."""
        template = self._load_template(template_name)
        content = template.format(**vars, date=date.today().isoformat())
        return self.write(dest, content)
```

**Deliverables:**
- [ ] VaultManager class
- [ ] Search with ripgrep
- [ ] Template system
- [ ] CLI commands: `nexus knowledge vault ...`

### Phase 3: Research Domain (4 hours)

```python
# nexus/research/zotero.py
import sqlite3
from pathlib import Path
from typing import List, Optional
from dataclasses import dataclass

@dataclass
class ZoteroItem:
    key: str
    title: str
    authors: List[str]
    date: str
    item_type: str
    tags: List[str]
    abstract: Optional[str] = None

class ZoteroClient:
    def __init__(self, db_path: Path):
        self.db_path = db_path

    def search(self, query: str, limit: int = 20) -> List[ZoteroItem]:
        """Search Zotero library."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Complex query joining items, creators, tags
        sql = """
        SELECT DISTINCT
            i.key,
            (SELECT value FROM itemDataValues WHERE valueID = (
                SELECT valueID FROM itemData WHERE itemID = i.itemID AND fieldID = (
                    SELECT fieldID FROM fields WHERE fieldName = 'title'
                )
            )) as title,
            (SELECT GROUP_CONCAT(firstName || ' ' || lastName, '; ')
             FROM itemCreators ic
             JOIN creators c ON ic.creatorID = c.creatorID
             WHERE ic.itemID = i.itemID) as authors,
            (SELECT value FROM itemDataValues WHERE valueID = (
                SELECT valueID FROM itemData WHERE itemID = i.itemID AND fieldID = (
                    SELECT fieldID FROM fields WHERE fieldName = 'date'
                )
            )) as date
        FROM items i
        WHERE i.itemTypeID NOT IN (1, 14)  -- Exclude attachments, notes
        AND (
            title LIKE ?
            OR authors LIKE ?
        )
        LIMIT ?
        """

        pattern = f"%{query}%"
        cursor.execute(sql, (pattern, pattern, limit))
        results = cursor.fetchall()
        conn.close()

        return [ZoteroItem(key=r[0], title=r[1], authors=r[2].split('; ') if r[2] else [],
                          date=r[3], item_type='', tags=[]) for r in results]

    def cite(self, key: str, style: str = "apa") -> str:
        """Generate citation for item."""
        item = self.get_item(key)
        if style == "apa":
            authors = ", ".join(item.authors[:3])
            if len(item.authors) > 3:
                authors += " et al."
            year = item.date[:4] if item.date else "n.d."
            return f"{authors} ({year}). {item.title}."
        elif style == "bibtex":
            return self._format_bibtex(item)
        # ... more styles
```

**Deliverables:**
- [ ] ZoteroClient class
- [ ] PDF extractor (using pdftotext)
- [ ] Literature search aggregator
- [ ] CLI commands: `nexus research ...`

### Phase 4: Teaching & Writing Domains (3 hours)

```python
# nexus/teaching/courses.py
from pathlib import Path
from typing import List
import yaml

class CourseManager:
    def __init__(self, courses_dir: Path):
        self.courses_dir = courses_dir

    def list_courses(self) -> List[dict]:
        """List all courses."""
        courses = []
        for course_dir in self.courses_dir.iterdir():
            if course_dir.is_dir():
                config_file = course_dir / "course.yaml"
                if config_file.exists():
                    config = yaml.safe_load(config_file.read_text())
                    courses.append({
                        "id": course_dir.name,
                        "name": config.get("name", course_dir.name),
                        "term": config.get("term", ""),
                        "path": str(course_dir)
                    })
        return courses

    def get_materials(self, course_id: str, week: int = None) -> List[dict]:
        """Get course materials."""
        course_dir = self.courses_dir / course_id
        materials = []
        # Scan for lectures, labs, homework...
        return materials
```

```python
# nexus/writing/manuscript.py
from pathlib import Path
from typing import List
import yaml

class ManuscriptManager:
    def __init__(self, manuscripts_dir: Path):
        self.manuscripts_dir = manuscripts_dir

    def list_manuscripts(self) -> List[dict]:
        """List all manuscripts."""
        manuscripts = []
        for ms_dir in self.manuscripts_dir.iterdir():
            status_file = ms_dir / ".STATUS"
            if status_file.exists():
                status = self._parse_status(status_file)
                manuscripts.append({
                    "id": ms_dir.name,
                    "status": status.get("status", "unknown"),
                    "progress": status.get("progress", 0),
                    "target": status.get("target", ""),
                    "path": str(ms_dir)
                })
        return manuscripts

    def draft_section(self, manuscript_id: str, section: str) -> str:
        """Get section draft for editing."""
        ms_dir = self.manuscripts_dir / manuscript_id
        # Find and return section content
        ...
```

**Deliverables:**
- [ ] CourseManager class
- [ ] ManuscriptManager class
- [ ] Quarto integration
- [ ] CLI commands: `nexus teach ...`, `nexus write ...`

### Phase 5: Claude Code Plugin (3 hours)

```markdown
<!-- plugin/skills/research/literature-review.md -->
---
description: Conduct literature reviews using Nexus CLI to search Zotero, PDFs, and notes
---

When asked to find literature, search for papers, or conduct a literature review:

## Tools Available

```bash
# Search Zotero library
nexus research zotero search "query"

# Search PDFs
nexus research pdf search "query"

# Search vault notes
nexus knowledge vault search "query"

# Get citation
nexus research zotero cite KEY --style apa
```

## Workflow

1. **Understand the query**: What topic, time range, specific authors?

2. **Search sources**:
   ```bash
   nexus research zotero search "causal mediation" --format json
   ```

3. **Present results** in organized format:
   - Group by relevance or date
   - Show key papers first
   - Include citation counts if available

4. **Offer next steps**:
   - Create vault note with findings
   - Generate bibliography
   - Find related papers

## Example Response

"I found 23 papers on causal mediation in your library:

**Foundational:**
1. VanderWeele & Vansteelandt (2014) - Mediation Analysis with... ⭐
2. Pearl (2001) - Direct and Indirect Effects

**Recent (2020-2024):**
3. Smith et al. (2023) - New developments in...
...

Would you like me to:
- Create a literature note summarizing these?
- Export citations for a manuscript?
- Find papers citing any of these?"
```

**Deliverables:**
- [ ] 8 skills (research, teaching, writing, knowledge)
- [ ] 5 commands (/nexus-search, /nexus-cite, etc.)
- [ ] Plugin manifest
- [ ] Installation script

### Phase 6: Testing & Documentation (3 hours)

**Deliverables:**
- [ ] pytest test suite (80%+ coverage)
- [ ] CLI --help documentation
- [ ] Quickstart guide
- [ ] Full reference documentation
- [ ] MkDocs site

---

## Timeline Summary

| Phase | Focus | Hours |
|-------|-------|-------|
| 1 | Core Infrastructure | 4h |
| 2 | Knowledge Domain | 3h |
| 3 | Research Domain | 4h |
| 4 | Teaching & Writing | 3h |
| 5 | Claude Plugin | 3h |
| 6 | Testing & Docs | 3h |
| **Total** | | **20h** |

**Distribution**: 4-5 days at 4-5 hours/day

---

## Integration Matrix

| Tool | Integration Type | Status |
|------|------------------|--------|
| **Claude Code** | Primary - Plugin + CLI | Core |
| **Zotero** | SQLite queries | Core |
| **Obsidian** | File operations | Core |
| **PDFs** | pdftotext extraction | Core |
| **aiterm** | Optional wrapper | Integration |
| **R/RStudio** | Script execution | Integration |
| **Quarto** | Build/preview | Integration |
| **Git** | Version control | Integration |

---

## Distribution

### Installation

```bash
# PyPI (after publish)
pip install nexus-cli

# From GitHub
pip install git+https://github.com/Data-Wise/nexus-cli

# With uv (recommended)
uv tool install nexus-cli

# Homebrew (macOS)
brew install data-wise/tap/nexus
```

### Claude Code Plugin

```bash
# Install plugin
nexus integrate claude install

# Or manually
cp -r ~/projects/dev-tools/nexus-cli/plugin ~/.claude/plugins/nexus
```

---

## Comparison with Previous Proposals

| Aspect | CLI + Plugin (v1) | aiterm Module | **Standalone (Final)** |
|--------|-------------------|---------------|------------------------|
| Independence | Standalone | Coupled | **Standalone** |
| Focus | Generic CLI | Terminal tools | **Research workflow** |
| Domains | 4 modules | N/A | **4 domains** |
| AI | Ollama option | Via aiterm | **Claude is the brain** |
| Integration | None | Tight | **Optional (aiterm)** |
| Time | 20h | 14h | **20h** |

---

## Quick Wins vs Long-Term

### Quick Wins (< 2 hours each) ⚡

| Win | Impact |
|-----|--------|
| `nexus knowledge vault search` | Immediate vault access |
| `nexus research zotero search` | Immediate Zotero access |
| `nexus doctor` | Validate setup |
| Basic Claude plugin | AI-assisted search |

### Medium Term (2-4 hours each) 🔧

| Feature | Impact |
|---------|--------|
| PDF extraction & search | Literature review |
| Teaching materials | Course prep |
| Manuscript tracking | Writing workflow |

### Long Term (Future phases) 🏗️

| Feature | Description |
|---------|-------------|
| Knowledge graph | Visualize connections |
| Semantic search | Embedding-based |
| R package integration | Full mediationverse |
| Obsidian plugin | Two-way sync |

---

## Success Criteria

### MVP (v0.1.0)
- [ ] Search Zotero from CLI
- [ ] Search vault from CLI
- [ ] Extract PDF text
- [ ] Basic Claude plugin works
- [ ] Configuration system
- [ ] Doctor command

### v0.2.0
- [ ] All 4 domains functional
- [ ] Full Claude plugin (8 skills)
- [ ] aiterm integration
- [ ] 80%+ test coverage

### v1.0.0
- [ ] Knowledge graph
- [ ] Semantic search
- [ ] Complete documentation
- [ ] Public release

---

## Next Steps

1. **Create repo structure** (30 min)
   ```bash
   mkdir -p ~/projects/dev-tools/nexus-cli/{nexus,plugin,tests,docs}
   cd ~/projects/dev-tools/nexus-cli
   uv init
   ```

2. **Implement Phase 1** (4 hours)
   - CLI skeleton
   - Configuration
   - Doctor command

3. **Test with Claude Code** (1 hour)
   - Install plugin
   - Run basic search
   - Validate workflow

**Ready to start?**

