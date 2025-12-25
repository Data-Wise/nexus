# Ideas for Nexus

> **Vision:** Claude-powered knowledge management for research, teaching, and package development, synced with existing Obsidian vault.
> **Generated:** 2025-12-24

---

## Quick Wins (< 1hr each)

- [2025-12-24] **Ship vault-template as standalone** — The vault-template/ is complete with PARA structure, templates, dashboards; just needs a simple install script
- [2025-12-24] **Create "Nexus CLI" skill for Claude Code** — A `/nexus` slash command that queries/updates Obsidian vault using existing filesystem MCP
- [2025-12-24] **Add vault sync to existing Obsidian** — Copy vault-template/ contents into actual Obsidian vault location; instant upgrade
- [2025-12-24] **Create "research capture" Claude prompt** — System prompt that captures research insights and creates properly-formatted literature notes

---

## Medium Effort (1-4 hrs each)

- [2025-12-24] **Build Nexus MCP server (minimal)** — Just 3 tools: `vault_search`, `note_create`, `note_update` — enough for Claude to read/write vault
- [2025-12-24] **Create three-mode Claude personas** — Librarian/Builder/Teacher as switchable Claude Code skills with vault context
- [2025-12-24] **Wire Statistical Research MCP to Obsidian** — Existing 14-tool MCP already handles R/Zotero; add vault writing for auto literature notes
- [2025-12-24] **Build "teaching pipeline" workflow** — Research note → Lecture outline → Quarto slides (using existing teaching/ structure)

---

## Big Ideas (1+ days)

- [2025-12-24] **Nexus as Claude Code plugin** — Full plugin with skills for each domain (research, teaching, packages) that manages Obsidian vault
- [2025-12-24] **Bidirectional code↔vault sync** — When working on mediationverse, auto-update package notes; when documenting in Obsidian, generate roxygen
- [2025-12-24] **Kill desktop app, focus on integration** — Desktop app rebuilds Obsidian features; pivot to making Claude + Obsidian work perfectly together
- [2025-12-24] **Smart context loading** — Before any Claude session, auto-load relevant vault context based on current directory

---

## Strategic Insight

**Original Vision:** Claude as the interface to knowledge, not building another PKM app.

**Highest-leverage path:**
1. Use Obsidian for storage, organization, manual browsing
2. Use Claude for intelligent capture, querying, content creation
3. Use MCP to bridge them (infrastructure already exists!)

**Key Assets Ready:**
- `vault-template/` — Complete PARA structure with templates
- Statistical Research MCP — 14 tools for R/Zotero/literature
- Claude Code skills — Existing skill infrastructure

**Missing Piece:** Wiring them together into cohesive workflow.

---

## Related Documents

- `PROPOSAL-STRATEGIC-REFOCUS-V2.md` — Strategic options analysis
- `docs/claude-integration/system-prompt.md` — Nexus persona definition
- `docs/architecture/overview.md` — Full vault architecture
- `integrations/mcp-server/README.md` — MCP server plan (Phase P4)
