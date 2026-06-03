# Nexus Strategic Direction
**Last Updated:** 2025-01-11
**Status:** Active Development

---

## Executive Summary

**What is Nexus?**
Knowledge management architecture that connects:
1. **Obsidian** - External memory (vault, notes, links)
2. **Claude** - Cognitive interface (skills, tools, queries)
3. **Code** - R packages, Quarto, LaTeX

**Implementation Strategy:**
Extend existing `statistical-research` MCP server with Zotero/PDF/Vault integration (**not** build from scratch)

**Timeline:** 16 hours over 4-5 days (5 phases)

---

## The Refocus Decision (2024-12-24)

### Problem Identified
- Product drift: Two unclear products (desktop app + template vault)
- Desktop app competed with Obsidian instead of enhancing it
- Missing connection to existing infrastructure

### Solution
1. **Desktop app → Scribe** (moved to separate repo)
2. **Nexus → Knowledge integration** (extend statistical-research MCP)
3. **Leverage existing**: 17 skills, 9 tools already built

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXUS ARCHITECTURE                           │
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
│              ┌──────────────────────────┐                      │
│              │ STATISTICAL-RESEARCH MCP │                      │
│              │  (Extended for Nexus)    │                      │
│              │                          │                      │
│              │ • Zotero  (2,728 items)  │                      │
│              │ • PDFs    (~1,800 files) │                      │
│              │ • Vault   (Obsidian)     │                      │
│              │ • R tools (existing)     │                      │
│              │ • Literature (existing)  │                      │
│              └──────────────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Three Modes

### 🔖 Librarian
- Knowledge capture, organization, retrieval
- Zotero → Vault sync
- Literature review workflows
- Citation management

### 🔧 Builder  
- Code development, package maintenance
- R package tools (existing in statistical-research)
- Simulation workflows
- Test generation

### 📚 Teacher
- Lecture creation, pedagogical materials
- Course material search
- Example generation
- Quarto slides

---

## Implementation Plan Summary

**Base:** statistical-research MCP server
- Location: `~/projects/dev-tools/claude-plugins/local/statistical-research/`
- Current state: 17 skills, 9 tools, working R integration
- Strategy: Extend with new lib/ scripts and commands/

### Phase 1: Zotero Integration (4 hours)
```bash
lib/zotero.sh           # SQLite queries
commands/zotero/
  ├── search.sh         # Search library
  ├── cite.sh           # Generate citations
  └── annotate.sh       # Access annotations
```

**Capabilities:**
- Search 2,728 Zotero items
- Generate citations (APA, BibTeX)
- Access annotations and notes

### Phase 2: PDF Integration (3 hours)
```bash
lib/pdf-extract.sh      # pdftotext wrapper
commands/pdf/
  ├── extract.sh        # Extract text
  ├── search.sh         # Search ~1,800 PDFs
  └── summarize.sh      # Section extraction
```

**Capabilities:**
- Full-text extraction from PDFs
- Search across research (~110) + teaching (~1,682) PDFs
- Section-aware summarization

### Phase 3: Vault Operations (4 hours)
```bash
lib/obsidian.sh         # File operations
commands/vault/
  ├── read.sh           # Read notes
  ├── write.sh          # Create/update notes
  ├── search.sh         # Full-text search
  └── link.sh           # Manage wiki links
```

**Capabilities:**
- Full Obsidian vault access
- Read/write notes (PARA structure)
- Search and link management
- Template instantiation

### Phase 4: Knowledge Query (3 hours)
```bash
skills/knowledge/
  ├── unified-search.md  # Cross-source queries
  └── synthesis.md       # AI-assisted synthesis

commands/knowledge/
  └── search.sh          # Unified search command
```

**Capabilities:**
- Unified search across Zotero + PDFs + Vault
- Result ranking and aggregation
- Context-aware synthesis

### Phase 5: Integration & Testing (2 hours)
- End-to-end workflows
- Error handling
- Documentation
- Usage examples

**Total:** 16 hours

---

## Deliverables

### Vault Template ✅ (Complete)
```
vault-template/
├── 00-INBOX/          # Quick capture
├── 10-PROJECTS/       # Active work
├── 20-AREAS/          # Ongoing domains
├── 30-RESOURCES/      # Reference + templates
├── 40-ARCHIVE/        # Completed work
├── 50-DAILY/          # Daily notes
├── 60-TASKS/          # Task management
└── _SYSTEM/           # Configuration
```

**Includes:**
- 10+ Obsidian templates
- 4 dashboard files
- Complete PARA structure
- Setup documentation

### MCP Extension 🔄 (In Progress)
Extend `statistical-research` with:
- Zotero tools (Phase 1)
- PDF tools (Phase 2)
- Vault tools (Phase 3)
- Knowledge tools (Phase 4)

---

## Integration Points

| Tool | Integration Type | Status |
|------|------------------|--------|
| **Claude Code** | MCP server | ✅ Working (extend existing) |
| **Claude Desktop** | MCP server | ✅ Working (extend existing) |
| **Claude.ai** | MCP browser ext | ✅ Working (extend existing) |
| **Zotero** | SQLite queries | 📋 Phase 1 |
| **Obsidian** | File operations | 📋 Phase 3 |
| **PDFs** | pdftotext | 📋 Phase 2 |
| **R** | Existing tools | ✅ Already in statistical-research |

---

## Why Extend statistical-research?

**Pros:**
- ✅ 17 skills already built (A-grade quality)
- ✅ 9 tools working (R execution, literature search)
- ✅ Deployed and tested
- ✅ Single integration point for Claude
- ✅ Faster to market (16h vs 40h+ from scratch)

**Cons:**
- ⚠️ Broadens scope of statistical-research project
- ⚠️ Requires coordination with that codebase

**Decision:** Pros outweigh cons. Build on existing infrastructure.

---

## Example Workflows

### Literature Review
```
User: "Find papers on mediation sensitivity analysis"

Claude: [Uses statistical-research MCP]
        [Runs: commands/zotero/search.sh "mediation sensitivity"]
        
        Found 23 papers in your Zotero library:
        1. VanderWeele (2015) - E-values for sensitivity...
        2. Imai et al. (2010) - Sequential ignorability...
        ...
        
        Would you like me to:
        - Create a literature note in your vault?
        - Extract methods sections from the PDFs?
        - Find related papers you haven't read?
```

### Manuscript Writing
```
User: "Help me write the methods section for the P_med paper"

Claude: [Searches vault for project notes]
        [Reads commands/vault/read.sh "10-PROJECTS/pmed/methods.md"]
        [Searches Zotero for cited papers]
        
        Based on your notes and papers, here's a draft:
        
        [Methods section with proper citations]
        
        Shall I save this to your vault and update the manuscript?
```

### Teaching Prep
```
User: "Prepare lecture on regression diagnostics"

Claude: [Searches teaching materials]
        [Reads relevant course notes from vault]
        [Finds example datasets]
        
        I found:
        - Your STAT 440 notes on diagnostics (Fall 2024)
        - 5 datasets with diagnostic issues
        - R code examples from mediationverse
        
        Would you like me to:
        - Generate Quarto slides?
        - Create coding examples?
        - Draft practice problems?
```

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Zotero items accessible | 2,728 | 0 |
| PDFs searchable | ~1,800 | 0 |
| Vault notes accessible | All | 0 |
| Skills (total) | 25+ | 17 |
| Tools (total) | 15+ | 9 |
| Query speed | < 5s | N/A |

---

## Next Actions

1. **Immediate:** Start Phase 1 (Zotero Integration) - 4 hours
2. **This Week:** Complete Phase 1-2 (Zotero + PDF)
3. **Next Week:** Phase 3-4 (Vault + Knowledge Query)
4. **Following:** Phase 5 (Testing & documentation)

---

## Related Documents

**Core:**
- `IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md` - Detailed technical plan (25KB)
- `PROJECT-HUB.md` - Strategic roadmap and progress tracking
- `.STATUS` - Daily progress (updated each session)

**Architecture (Archive):**
- `docs/proposals/archive/PROPOSAL-NEXUS-ARCHITECTURE.md` - Architecture exploration
- `docs/proposals/archive/PROPOSAL-CLAUDE-RESEARCH-BRAIN.md` - Research focus deep dive
- `docs/proposals/archive/PROPOSAL-*` - Other exploration documents

**Vault Template:**
- `vault-template/` - Complete PARA structure, templates, dashboards
- `docs/architecture/overview.md` - Full vault architecture
- `docs/getting-started/quickstart.md` - 2-hour setup guide

---

## Key Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Extend statistical-research (not standalone) | Leverage existing 17 skills, 9 tools | 2024-12-24 |
| Desktop app → Scribe (separate repo) | Focus Nexus on knowledge integration | 2024-12-24 |
| MCP server (not Claude plugin only) | Works in Desktop, Code, and browser | 2024-12-24 |
| Shell scripts (not TypeScript) | Fast, simple, no dependencies | 2024-12-24 |
| Vault template (complete) | Users need starting point | 2024-12-23 |

---

**Created:** 2025-01-11
**Maintainer:** DT
**Repository:** ~/projects/dev-tools/nexus/
**Related:** ~/projects/dev-tools/claude-plugins/local/statistical-research/
