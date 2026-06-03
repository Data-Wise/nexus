# Nexus Proposals Archive

This directory contains historical proposal documents from the Nexus project exploration phase (2024-12-20 to 2024-12-24).

## Context

During the strategic refocus session (2024-12-24), multiple architecture approaches were explored. These proposals document that exploration process.

**Final Decision:** Extend the existing `statistical-research` MCP server (not build standalone CLI or integrate into aiterm).

**See:** `STRATEGIC-DIRECTION.md` (project root) for current approach.

---

## Archived Proposals

### Core Architecture Exploration

| Proposal | Size | Summary |
|----------|------|---------|
| **PROPOSAL-NEXUS-ARCHITECTURE.md** | 54KB | Three architecture options analyzed: MCP extension, standalone app, hybrid |
| **PROPOSAL-CLAUDE-RESEARCH-BRAIN.md** | 68KB | Deep dive into research-focused use cases and workflows |

### Alternative Approaches (Explored but Not Chosen)

| Proposal | Size | Approach Explored |
|----------|------|-------------------|
| PROPOSAL-CLAUDE-POWERED-CLI.md | 19KB | CLI tool with Claude headless mode integration |
| PROPOSAL-NEXUS-CLI-PLUGIN.md | 31KB | Standalone CLI + Claude Code plugin (dual-mode) |
| PROPOSAL-NEXUS-STANDALONE-FINAL.md | 36KB | Comprehensive standalone tool (research/teaching/writing/knowledge) |
| PROPOSAL-NEXUS-AITERM-INTEGRATION.md | 17KB | Integration with existing aiterm tool |
| PROPOSAL-MCP-INTEGRATION.md | 19KB | Pure MCP server approach |
| PROPOSAL-STRATEGIC-REFOCUS-V2.md | 18KB | Problem identification and solution analysis |

### Implementation

| Proposal | Size | Status |
|----------|------|--------|
| PROPOSAL-TEMPLATE-VAULT.md | 15KB | ✅ Completed - See vault-template/ |

---

## Why These Were Archived

**The Problem:**
- 9 proposals (262KB total) explored different directions
- Created decision paralysis
- Lost focus on core goal: **Make Claude know your research**

**The Solution:**
- Consolidate to single strategic direction
- Archive exploration documents for reference
- Keep 2 core architecture proposals (educational value)
- Focus on implementation (16 hours, 5 phases)

---

## Key Insights from Exploration

### What We Learned

1. **Leverage Existing Infrastructure**
   - statistical-research MCP already has 17 skills, 9 tools
   - Building from scratch would duplicate effort
   - Extending existing server is faster (16h vs 40h+)

2. **Shell Scripts > TypeScript for Simple Ops**
   - Zotero queries: SQLite (shell)
   - PDF extraction: pdftotext (shell)
   - Vault ops: File operations (shell)
   - Only complex logic needs TypeScript

3. **Claude is the Brain, Not the Tool**
   - Nexus provides data and operations
   - Claude provides synthesis and intelligence
   - No need for local LLM (Ollama) - use Claude subscription

4. **Desktop App Was Product Drift**
   - Started as "Claude + Obsidian"
   - Became "Obsidian clone"
   - Split to separate Scribe project (capture tool)
   - Nexus focuses on knowledge integration

### Architecture Patterns Discovered

**Three-Layer Model:**
```
Claude (Brain)
  ↓
MCP Server (Operations)
  ↓
Storage (Zotero/PDFs/Vault)
```

**Three Modes:**
- 🔖 Librarian (capture, organize, retrieve)
- 🔧 Builder (code, packages, tests)
- 📚 Teacher (lectures, examples, slides)

**PARA Structure:**
- 00-INBOX (quick capture)
- 10-PROJECTS (active work)
- 20-AREAS (ongoing domains)
- 30-RESOURCES (reference)
- 40-ARCHIVE (completed)
- 50-DAILY (daily notes)
- 60-TASKS (task management)

---

## How These Proposals Were Used

1. **PROPOSAL-NEXUS-ARCHITECTURE.md**
   - Identified three options
   - Analyzed pros/cons
   - Recommended MCP extension

2. **PROPOSAL-CLAUDE-RESEARCH-BRAIN.md**
   - Defined research use cases
   - Inventoried knowledge assets (2,728 Zotero, ~1,800 PDFs)
   - Designed workflows

3. **Exploration Proposals**
   - Evaluated alternatives (CLI, aiterm, standalone)
   - Identified trade-offs
   - Justified final decision

4. **Strategic Refocus**
   - Identified product drift
   - Proposed desktop app split
   - Created implementation roadmap

---

## Current Status

**Active Documents:**
- `STRATEGIC-DIRECTION.md` - Executive summary of current approach
- `IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md` - Detailed 16-hour plan
- `PROJECT-HUB.md` - Strategic roadmap and progress tracking
- `.STATUS` - Daily progress updates

**Repository:**
- `~/projects/dev-tools/nexus/` - Documentation and vault template
- `~/projects/dev-tools/claude-plugins/local/statistical-research/` - MCP server to extend

---

**Archive Created:** 2025-01-11
**Documents:** 8 proposals (262KB)
**Period Covered:** 2024-12-20 to 2024-12-24 (Strategic exploration phase)
