# Nexus Standards Hub

> **TL;DR:** Universal standards for Nexus knowledge management architecture. Reference these when setting up vaults or creating templates.

---

## Role in Nexus Architecture

This is the **Standards Hub** for Nexus - the single source of truth for:

```
┌─────────────────────────────────────────────────────────────┐
│  Nexus Project                                              │
├─────────────────────────────────────────────────────────────┤
│  standards/                    ← YOU ARE HERE               │
│    ├─ vault/                   → Obsidian vault structure   │
│    ├─ documentation/           → Documentation formats      │
│    └─ workflow/                → User workflows             │
│                                                             │
│  Universal conventions for ALL Nexus implementations        │
└─────────────────────────────────────────────────────────────┘
```

**This folder contains:** Universal standards referenced by all Nexus vaults and implementations.

---

## Quick Links

| Category | What's There |
|----------|--------------|
| [**vault/**](vault/) | PARA structure, template specs, frontmatter standards |
| [**documentation/**](documentation/) | TL;DR format, ADHD-friendly docs, visual hierarchy |
| [**workflow/**](workflow/) | Capture workflows, review processes, Claude integration |

---

## Philosophy

1. **Copy-paste ready** — Every standard includes working examples
2. **TL;DR first** — Summary at the top, details below
3. **Decision trees** — "If X, use Y" not essays
4. **One source of truth** — Standards live here, nowhere else
5. **ADHD-optimized** — Visual cues, time estimates, clear steps

---

## How to Use

```bash
# Quick reference
cat standards/vault/VAULT-STRUCTURE.md

# When creating new vault
# Use standards/vault/ as blueprint

# Check template compliance
# Compare against standards/vault/TEMPLATE-STANDARDS.md

# Review workflow patterns
cat standards/workflow/CAPTURE-WORKFLOWS.md
```

---

## Index

### Vault Standards
- `vault/VAULT-STRUCTURE.md` — PARA folder organization
- `vault/TEMPLATE-STANDARDS.md` — YAML frontmatter and template format
- `vault/DATAVIEW-STANDARDS.md` — Query patterns and dashboard design
- `vault/NAMING-CONVENTIONS.md` — File and folder naming rules

### Documentation Standards
- `documentation/ADHD-FRIENDLY-DOCS.md` — Visual hierarchy, TL;DR format
- `documentation/QUICK-START-TEMPLATE.md` — 30-second overview pattern
- `documentation/PROGRESS-INDICATORS.md` — Progress bars, status emojis

### Workflow Standards
- `workflow/CAPTURE-WORKFLOWS.md` — Quick capture patterns
- `workflow/REVIEW-PROCESS.md` — Daily, weekly, monthly reviews
- `workflow/CLAUDE-INTEGRATION.md` — MCP and prompt patterns

---

## Standards Version

**Version:** 1.0.0
**Last Updated:** 2025-12-21
**Based on:**
- zsh-configuration standards
- Tiago Forte's PARA method
- Obsidian community best practices

---

## Contributing

When adding new standards:

1. **Follow existing format** — Use TL;DR, examples, decision trees
2. **Test in practice** — Validate with actual vault usage
3. **Keep ADHD-friendly** — Visual cues, time estimates, clear steps
4. **Cross-reference** — Link related standards
5. **Version control** — Update version when making changes

---

**Maintainer:** DT
**See Also:**
- [../ARCHITECTURE-COMMAND-REFERENCE.md](../ARCHITECTURE-COMMAND-REFERENCE.md) - Reusable commands
- [../architecture.md](../architecture.md) - Complete system architecture
- [../PROJECT-HUB.md](../PROJECT-HUB.md) - Project roadmap
