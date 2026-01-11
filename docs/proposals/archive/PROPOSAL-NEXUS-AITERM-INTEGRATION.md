# Nexus + aiterm Integration Proposal

> **Insight**: You already have aiterm - a complete AI terminal platform. Nexus should integrate with it, not compete.

---

## The Key Realization

**No Claude API needed!** Here's why:

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOW IT WORKS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐         ┌─────────────┐         ┌───────────┐ │
│  │  CLAUDE     │ calls   │   NEXUS     │ returns │   DATA    │ │
│  │  (AI Brain) │ ──────► │   CLI       │ ──────► │   (JSON)  │ │
│  │             │         │             │         │           │ │
│  │ "Search for │         │ nexus query │         │ results   │ │
│  │  mediation  │         │ "mediation" │         │ from all  │ │
│  │  papers"    │         │             │         │ sources   │ │
│  └─────────────┘         └─────────────┘         └───────────┘ │
│        │                                               │       │
│        └───────────────────────────────────────────────┘       │
│                    Claude synthesizes response                  │
│                                                                 │
│  NO API NEEDED - Claude Code IS the AI layer!                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**For standalone CLI (outside Claude Code)**, options:
1. **Ollama** (local, free, private) ⭐ Recommended
2. **OpenAI API** (fast, costs money)
3. **Google Gemini** (good, requires API key)
4. **No AI** (just data retrieval, user synthesizes)

---

## Architecture Options

### Option A: Nexus as aiterm Module ⭐⭐⭐ RECOMMENDED

```
aiterm/
├── src/aiterm/
│   ├── claude/        # Existing
│   ├── context/       # Existing
│   ├── hooks/         # Existing
│   ├── mcp/           # Existing
│   ├── commands/      # Existing
│   ├── docs/          # Existing
│   │
│   └── nexus/         # NEW MODULE
│       ├── __init__.py
│       ├── cli.py     # ait nexus <command>
│       ├── zotero.py  # Zotero integration
│       ├── pdf.py     # PDF extraction
│       ├── vault.py   # Obsidian vault
│       ├── query.py   # Unified search
│       └── ai.py      # Optional AI layer (Ollama)
```

**Commands:**
```bash
ait nexus zotero search "mediation"
ait nexus pdf extract paper.pdf
ait nexus vault search "sensitivity"
ait nexus query "all about mediation"
ait nexus ask "What methods exist?"  # Uses Ollama if configured
```

**Pros:**
- Leverages aiterm's existing infrastructure (Rich, Typer, testing)
- Single tool for all AI terminal needs
- Already has MCP integration patterns
- Homebrew distribution ready

**Cons:**
- Larger aiterm package
- Couples Nexus to aiterm release cycle

---

### Option B: Nexus as Standalone + aiterm Integration

```
nexus-cli/              # Separate repo
├── bin/nexus           # Standalone CLI
├── lib/                # Core functionality
└── plugin/             # Claude Code plugin

aiterm/
└── src/aiterm/
    └── integrations/
        └── nexus.py    # ait nexus → calls nexus CLI
```

**Commands:**
```bash
# Direct CLI
nexus zotero search "mediation"
nexus ask "What methods exist?"

# Through aiterm
ait nexus search "mediation"  # Wrapper
```

**Pros:**
- Clean separation
- Nexus can evolve independently
- Lighter aiterm

**Cons:**
- Two repos to maintain
- Duplicated patterns
- Separate distribution

---

### Option C: Nexus as MCP Server ⭐⭐

```
mcp-servers/
└── nexus/
    ├── package.json
    └── src/
        ├── index.ts
        └── tools/
            ├── zotero_search.ts
            ├── pdf_extract.ts
            ├── vault_search.ts
            └── unified_query.ts
```

**Usage in Claude Code:**
```
User: Search my Zotero for mediation papers

Claude: [Uses nexus_zotero_search tool]
Found 47 papers on mediation...
```

**Pros:**
- Native Claude Code integration
- Works in Claude Desktop too
- No CLI needed for Claude users
- aiterm can manage it (`ait mcp list`, `ait mcp test nexus`)

**Cons:**
- TypeScript (different stack)
- No standalone CLI for terminal users
- MCP-only

---

### Option D: Hybrid - CLI + MCP + aiterm ⭐⭐⭐

**Best of all worlds:**

```
nexus/                          # Main repo
├── cli/                        # Python CLI (like aiterm)
│   ├── nexus/
│   │   ├── zotero.py
│   │   ├── pdf.py
│   │   ├── vault.py
│   │   └── query.py
│   └── pyproject.toml
│
├── mcp/                        # TypeScript MCP server
│   ├── src/tools/*.ts
│   └── package.json
│
└── plugin/                     # Claude Code plugin
    ├── plugin.json
    ├── skills/*.md
    └── commands/*.md

aiterm/                         # Integration
└── src/aiterm/integrations/
    └── nexus.py               # ait nexus → calls CLI
```

**Commands:**
```bash
# Standalone CLI
nexus zotero search "mediation"
nexus ask "What methods exist?"

# Through aiterm
ait nexus search "mediation"

# In Claude Code (MCP)
[Claude uses nexus_search tool]

# In Claude Code (plugin)
/nexus-search "mediation"
```

---

## AI Integration Without Claude API

### Option 1: Ollama (Local LLM) ⭐⭐⭐ RECOMMENDED

```bash
# Install Ollama
brew install ollama
ollama pull llama3.2

# Configure Nexus
nexus config set ai.backend ollama
nexus config set ai.model llama3.2

# Use AI features
nexus ask "What are the key methods for sensitivity analysis?"
```

**Implementation:**
```python
# nexus/ai.py
import requests

def query_ollama(prompt: str, model: str = "llama3.2") -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": model, "prompt": prompt, "stream": False}
    )
    return response.json()["response"]

def synthesize_results(query: str, results: list) -> str:
    """Use local LLM to synthesize search results."""
    context = "\n".join([f"- {r['title']}: {r['snippet']}" for r in results])
    prompt = f"""Based on these search results, answer: {query}

Results:
{context}

Synthesize a helpful response:"""

    return query_ollama(prompt)
```

**Pros:**
- Free, private, no API keys
- Fast on M1/M2/M3 Macs
- Works offline
- No usage limits

**Cons:**
- Requires ~4GB RAM
- Slightly slower than cloud APIs
- Need to install Ollama

---

### Option 2: aichat CLI ⭐⭐

[aichat](https://github.com/sigoden/aichat) is an "all-in-one LLM CLI" that supports:
- OpenAI, Claude, Gemini, Ollama, Groq, and more
- RAG (Retrieval Augmented Generation)
- Shell assistant mode
- Agent capabilities

```bash
# Install
brew install aichat

# Configure (uses your existing API keys)
aichat --list-providers

# Use as backend for Nexus
nexus config set ai.backend aichat
```

**Implementation:**
```python
# nexus/ai.py
import subprocess

def query_aichat(prompt: str) -> str:
    result = subprocess.run(
        ["aichat", "-e", prompt],
        capture_output=True, text=True
    )
    return result.stdout
```

---

### Option 3: No AI (Data Only)

CLI just returns data, user synthesizes themselves (or uses Claude Code).

```bash
# Returns JSON/table, no AI interpretation
nexus zotero search "mediation" --format json
nexus query "sensitivity" --format table
```

When used in Claude Code, Claude does the synthesis.

---

## Recommended Architecture: Option A + Ollama

### Phase 1: Nexus as aiterm Module (8 hours)

```python
# src/aiterm/nexus/__init__.py
"""Nexus - Knowledge integration for research."""

from .zotero import ZoteroClient
from .pdf import PDFExtractor
from .vault import VaultManager
from .query import QueryEngine
from .ai import AIBackend

__all__ = ["ZoteroClient", "PDFExtractor", "VaultManager", "QueryEngine", "AIBackend"]
```

```python
# src/aiterm/nexus/cli.py
import typer
from rich.console import Console
from rich.table import Table

app = typer.Typer(help="Nexus - Knowledge integration for research")
console = Console()

@app.command()
def zotero(
    action: str = typer.Argument(..., help="search, cite, recent"),
    query: str = typer.Argument(None),
    format: str = typer.Option("table", "--format", "-f"),
):
    """Zotero library operations."""
    from .zotero import ZoteroClient
    client = ZoteroClient()

    if action == "search":
        results = client.search(query)
        _display_results(results, format)
    elif action == "recent":
        results = client.recent(limit=10)
        _display_results(results, format)
    elif action == "cite":
        citation = client.cite(query)
        console.print(citation)

@app.command()
def pdf(
    action: str = typer.Argument(..., help="extract, search"),
    path_or_query: str = typer.Argument(...),
):
    """PDF operations."""
    from .pdf import PDFExtractor
    extractor = PDFExtractor()

    if action == "extract":
        text = extractor.extract(path_or_query)
        console.print(text)
    elif action == "search":
        results = extractor.search(path_or_query)
        _display_results(results)

@app.command()
def vault(
    action: str = typer.Argument(..., help="read, write, search"),
    path: str = typer.Argument(...),
    content: str = typer.Option(None, "--content", "-c"),
):
    """Obsidian vault operations."""
    from .vault import VaultManager
    manager = VaultManager()

    if action == "read":
        note = manager.read(path)
        console.print(note)
    elif action == "write":
        manager.write(path, content)
        console.print(f"✅ Written to {path}")
    elif action == "search":
        results = manager.search(path)  # path is query here
        _display_results(results)

@app.command()
def query(
    text: str = typer.Argument(..., help="Search query"),
    sources: str = typer.Option("all", "--from", "-s"),
    format: str = typer.Option("table", "--format", "-f"),
):
    """Unified search across all sources."""
    from .query import QueryEngine
    engine = QueryEngine()

    source_list = sources.split(",") if sources != "all" else None
    results = engine.search(text, sources=source_list)
    _display_results(results, format)

@app.command()
def ask(
    question: str = typer.Argument(..., help="Natural language question"),
    sources: str = typer.Option("all", "--from", "-s"),
):
    """Ask a question across all knowledge sources (requires Ollama)."""
    from .query import QueryEngine
    from .ai import AIBackend

    engine = QueryEngine()
    ai = AIBackend()

    # Get relevant context
    results = engine.search(question, sources=sources.split(",") if sources != "all" else None)

    # Synthesize with AI
    answer = ai.synthesize(question, results)
    console.print(answer)
```

### Phase 2: Ollama Integration (2 hours)

```python
# src/aiterm/nexus/ai.py
import requests
from typing import Optional
from rich.console import Console

console = Console()

class AIBackend:
    """AI backend for Nexus (Ollama by default)."""

    def __init__(self, backend: str = "ollama", model: str = "llama3.2"):
        self.backend = backend
        self.model = model
        self.ollama_url = "http://localhost:11434/api/generate"

    def is_available(self) -> bool:
        """Check if AI backend is available."""
        if self.backend == "ollama":
            try:
                requests.get("http://localhost:11434/api/version", timeout=1)
                return True
            except:
                return False
        return False

    def generate(self, prompt: str) -> str:
        """Generate response from prompt."""
        if self.backend == "ollama":
            return self._ollama_generate(prompt)
        elif self.backend == "aichat":
            return self._aichat_generate(prompt)
        else:
            return "[AI not configured - run: ollama serve]"

    def _ollama_generate(self, prompt: str) -> str:
        try:
            response = requests.post(
                self.ollama_url,
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=60
            )
            return response.json().get("response", "")
        except requests.exceptions.ConnectionError:
            return "❌ Ollama not running. Start with: ollama serve"
        except Exception as e:
            return f"❌ Error: {e}"

    def synthesize(self, question: str, results: list) -> str:
        """Synthesize search results into an answer."""
        if not results:
            return "No results found to synthesize."

        # Build context from results
        context = "\n\n".join([
            f"**{r.get('title', 'Untitled')}** ({r.get('source', 'unknown')})\n{r.get('snippet', '')[:500]}"
            for r in results[:10]  # Top 10 results
        ])

        prompt = f"""You are a research assistant. Based on the following search results from the user's knowledge base, answer their question.

Question: {question}

Search Results:
{context}

Instructions:
- Synthesize the information from the search results
- Cite sources when possible (by title)
- If results don't fully answer the question, say so
- Be concise but thorough

Answer:"""

        return self.generate(prompt)
```

### Phase 3: Claude Code Plugin (2 hours)

```markdown
<!-- plugin/skills/knowledge/nexus-search.md -->
---
description: Search across all knowledge sources (Zotero, PDFs, vault) using Nexus CLI
---

When the user asks to search their knowledge base, literature, or research:

## Available Commands

```bash
# Unified search (all sources)
ait nexus query "sensitivity analysis mediation"

# Zotero only
ait nexus zotero search "VanderWeele"

# PDF search
ait nexus pdf search "confidence intervals"

# Vault search
ait nexus vault search "JASA submission"
```

## Workflow

1. Parse user's search intent
2. Run appropriate nexus command
3. Present results in organized format
4. Offer to:
   - Create a vault note with findings
   - Generate citations
   - Synthesize information

## Output Format

Present results as:
- Numbered list with titles
- Source indicators (📚 Zotero, 📄 PDF, 📝 Vault)
- Brief snippets
- Actionable next steps
```

---

## Implementation Timeline

| Phase | Task | Time | Cumulative |
|-------|------|------|------------|
| 1.1 | Zotero module in aiterm | 3h | 3h |
| 1.2 | PDF module | 2h | 5h |
| 1.3 | Vault module | 2h | 7h |
| 1.4 | Query engine | 1h | 8h |
| 2.1 | Ollama integration | 2h | 10h |
| 3.1 | Claude plugin | 2h | 12h |
| 4.1 | Testing & docs | 2h | **14h** |

**Total: 14 hours** (vs 20h standalone)

---

## Quick Start After Implementation

```bash
# 1. Update aiterm
brew upgrade aiterm

# 2. Configure
ait nexus config set zotero.path ~/Zotero/zotero.sqlite
ait nexus config set vault.path ~/Obsidian/Nexus
ait nexus config set pdf.dirs ~/Documents/Research/PDFs

# 3. Optional: Enable AI
brew install ollama
ollama pull llama3.2
ollama serve &
ait nexus config set ai.backend ollama

# 4. Use!
ait nexus query "mediation sensitivity analysis"
ait nexus ask "What are the key methods for sensitivity?"
```

---

## Decision Points

### 1. Should Nexus be an aiterm module or standalone?

| Approach | Pros | Cons |
|----------|------|------|
| **aiterm module** ⭐ | Reuse infrastructure, single tool | Couples to aiterm |
| Standalone | Independent | Duplicate work |

**Recommendation**: aiterm module

### 2. What AI backend for standalone use?

| Backend | Pros | Cons |
|---------|------|------|
| **Ollama** ⭐ | Free, private, local | Needs 4GB RAM |
| aichat | Multi-provider | Needs API keys |
| None | Simplest | No synthesis |

**Recommendation**: Ollama (optional, with graceful fallback)

### 3. MCP server too?

| Approach | When |
|----------|------|
| aiterm module first | Now |
| MCP server later | After validation |

**Recommendation**: Start with aiterm, add MCP later if needed

---

## Summary

**The revised plan:**

1. **Add Nexus as aiterm module** (not separate repo)
2. **Use Ollama for AI** (local, free, private)
3. **Create Claude plugin** for skill-based access
4. **Total: 14 hours** (saved 6 hours by reusing aiterm)

**Commands after implementation:**
```bash
ait nexus zotero search "query"     # Search Zotero
ait nexus pdf extract file.pdf       # Extract PDF
ait nexus vault search "query"       # Search vault
ait nexus query "anything"           # Unified search
ait nexus ask "question"             # AI-assisted answer
```

**Would you like me to start implementation?**

