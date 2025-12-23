# MCP Server for Nexus

**Status:** 📋 Planned (Phase P4)
**Estimated Effort:** 14-18 hours
**Reference:** [PROPOSAL-MCP-INTEGRATION.md](../../PROPOSAL-MCP-INTEGRATION.md)

---

## Overview

This directory will contain the Model Context Protocol (MCP) server that gives Claude direct read/write access to Obsidian vaults.

**Features (Planned):**
- 🔍 Search vault by content, tags, or frontmatter
- 📝 Create and update notes
- 🔗 Manage bidirectional links
- 📊 Update dashboard queries
- ✅ Task management

---

## Implementation Status

**Phase P4 is not yet started.**

Current phase: **Phase P2** (Template Vault Creation)

See [P2-TASKS.md](../../P2-TASKS.md) for current work.

---

## Future Structure

```
mcp-server/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── tools/                # MCP tool implementations
│   │   ├── vault-search.ts
│   │   ├── note-create.ts
│   │   ├── note-update.ts
│   │   └── ...
│   └── workflows/            # High-level workflows
│       ├── research.ts
│       ├── teaching.ts
│       └── tasks.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

**Created:** 2025-12-21
**Next Steps:** Complete Phase P2 and P3 first
