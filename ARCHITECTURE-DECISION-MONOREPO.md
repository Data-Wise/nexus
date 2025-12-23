# Architecture Decision: Monorepo Approach

**Date:** 2025-12-21
**Status:** ✅ Decided
**Decision:** Keep all Nexus components in a single repository (monorepo)

---

## Context

During brainstorming for Nexus architecture, an initial proposal suggested creating separate repositories:
- `nexus/` - Documentation (current)
- `nexus-vault-template/` - Template vault (NEW repo)
- `nexus-cli/` - CLI tools (future, NEW repo)
- `nexus-mcp/` - MCP server (future, NEW repo)

**User Question:**
> "check the dev-tools project for existing doc project/repo. Why creating a new repo? why not storing here in the project"

This prompted an examination of existing patterns in `/Users/dt/projects/dev-tools/`.

---

## Analysis of Existing dev-tools Patterns

### zsh-configuration (Primary Reference)

**Structure:**
```
zsh-configuration/
├── docs/                    # MkDocs documentation site
│   ├── architecture/
│   ├── reference/
│   └── user/
├── templates/               # Template content IN REPO
│   ├── quarto-manuscript/
│   ├── r-package/
│   ├── research-project/
│   └── teaching-course/
├── standards/               # Universal standards
│   ├── adhd/
│   ├── code/
│   ├── documentation/
│   ├── project/
│   └── workflow/
├── config/                  # Configuration files
│   └── examples/
├── cli/                     # CLI tools
└── [all docs at root]       # README, .STATUS, PROJECT-HUB, etc.
```

**Key Observations:**
1. ✅ Templates stored as subdirectories, not separate repos
2. ✅ Standards directory alongside implementation
3. ✅ Documentation lives with code
4. ✅ Single `.STATUS` and `PROJECT-HUB.md` for entire project
5. ✅ Everything versioned together

### Other dev-tools Projects

**mcp-servers/** - Monorepo containing multiple MCP servers:
```
mcp-servers/
├── statistical-research/
├── project-refactor/
├── shell/
├── rforge/
└── [shared docs]
```

**Pattern:** Multiple related components in one repo, not split across repos.

---

## Decision: Monorepo for Nexus

### Rationale

**1. Consistency with dev-tools Ecosystem**
- Follows established pattern from zsh-configuration
- Maintains consistency across DT's projects
- Easier to apply lessons learned from one project to another

**2. Atomic Updates**
- Change docs + templates + standards in one commit
- No version sync issues between repositories
- Single source of truth for all components

**3. Simpler Maintenance**
- One repo to clone
- One issue tracker
- One set of CI/CD pipelines
- One place for contributors to find everything

**4. Better Discoverability**
- Users get everything when they clone
- No hunting for "where's the template vault?"
- Clear structure: docs/, templates/, standards/, vault-template/

**5. ADHD-Friendly**
- Single mental model: "Everything for Nexus is in the Nexus repo"
- No context switching between multiple repos
- No "which repo was that file in?" confusion

---

## Revised Architecture

### Current Structure (Before)
```
nexus/
├── .STATUS
├── PROJECT-HUB.md
├── CLAUDE.md
├── README.md
├── architecture.md
├── QUICK-START.md
├── PROPOSAL-*.md
├── ARCHITECTURE-COMMAND-REFERENCE.md
└── standards/
    ├── vault/
    ├── documentation/
    └── workflow/
```

### Proposed Structure (Monorepo)
```
nexus/
├── .STATUS                          # Project tracking
├── PROJECT-HUB.md                   # Strategic roadmap
├── CLAUDE.md                        # For Claude Code instances
├── README.md                        # Main entry point
│
├── docs/                            # Documentation (Phase P0)
│   ├── architecture.md
│   ├── quickstart.md
│   ├── QUICK-START.md
│   └── claude-system-prompt.md
│
├── standards/                       # Universal standards (Phase P1) ✅
│   ├── vault/
│   │   ├── VAULT-STRUCTURE.md
│   │   └── TEMPLATE-STANDARDS.md
│   ├── documentation/
│   │   └── ADHD-FRIENDLY-DOCS.md
│   └── workflow/
│
├── vault-template/                  # Template vault (Phase P2) 📋
│   ├── .obsidian/
│   ├── 00-INBOX/
│   ├── 10-PROJECTS/
│   ├── 20-AREAS/
│   ├── 30-RESOURCES/
│   │   └── templates/              # Obsidian templates
│   ├── 40-ARCHIVE/
│   ├── 50-DAILY/
│   ├── 60-TASKS/
│   ├── _SYSTEM/
│   └── _master-dashboard.md
│
├── scripts/                         # Setup scripts (Phase P3) 📋
│   ├── setup-vault.sh
│   ├── install-plugins.sh
│   └── validate-vault.sh
│
├── mcp-server/                      # MCP server (Phase P4) 📋
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── examples/                        # Example content (Phase P3) 📋
    ├── research-project/
    ├── teaching-course/
    └── literature-notes/
```

---

## Benefits of This Approach

### For Users

| Aspect | Monorepo | Multi-Repo |
|--------|----------|------------|
| **Clone** | `git clone nexus` (everything) | Clone 3-4 separate repos |
| **Updates** | `git pull` (all in sync) | Pull each repo separately |
| **Discovery** | Everything in one place | Hunt across repos |
| **Issues** | One issue tracker | Which repo for this issue? |
| **Versioning** | Coordinated | Manual sync needed |

### For Maintainers

| Task | Monorepo | Multi-Repo |
|------|----------|------------|
| **Update docs + templates** | 1 commit, 1 PR | 2+ commits, 2+ PRs |
| **Breaking changes** | Atomic change | Coordinate across repos |
| **CI/CD** | 1 pipeline | N pipelines |
| **Release** | 1 tag | Sync N tags |
| **Standards** | Single source | Duplicate or link |

### For ADHD Workflows

✅ **Single mental model:** "Go to nexus repo"
✅ **No context switching:** Everything in one place
✅ **Clear structure:** Subdirectories show relationship
✅ **Atomic commits:** Change related things together
✅ **One .STATUS file:** Track entire project in one place

---

## Implementation Impact

### Proposals Affected

**PROPOSAL-TEMPLATE-VAULT.md** - Update paths:
```diff
- Create new repository: nexus-vault-template
+ Create directory: nexus/vault-template/
```

**PROPOSAL-MCP-INTEGRATION.md** - Update paths:
```diff
- Create new repository: nexus-mcp
+ Create directory: nexus/mcp-server/
```

### No Impact On

- ✅ standards/ directory (already exists)
- ✅ CLAUDE.md (already references monorepo)
- ✅ .STATUS (single file for whole project)
- ✅ PROJECT-HUB.md (tracks all phases together)
- ✅ ARCHITECTURE-COMMAND-REFERENCE.md (reusable patterns)

---

## Migration Path (For Future)

If we ever need to split (unlikely), we can:

1. **Extract vault-template** → `git filter-branch` to new repo
2. **Extract mcp-server** → `git filter-branch` to new repo
3. **Keep core docs** → In original nexus repo

But this is **NOT recommended** based on dev-tools patterns.

---

## Comparison with Other Projects

### Similar Monorepo Projects (Good Examples)

| Project | Structure |
|---------|-----------|
| **zsh-configuration** | docs/ + templates/ + standards/ + cli/ |
| **mcp-servers** | Multiple servers + shared docs |
| **spacemacs-rstats** | Config + docs + examples |

### Multi-Repo Anti-Pattern (What to Avoid)

Splitting Nexus would create:
- `nexus` (docs only)
- `nexus-vault-template` (vault only)
- `nexus-mcp` (MCP only)
- `nexus-cli` (CLI only)

**Problems:**
- 4 repos to maintain
- Version drift
- Duplicate standards
- Confusing for users
- Against dev-tools patterns

---

## Decision Validation Checklist

- [x] Checked existing dev-tools patterns
- [x] Confirmed zsh-configuration uses monorepo
- [x] Identified benefits for ADHD workflows
- [x] Considered maintainability
- [x] Evaluated user experience
- [x] Confirmed atomic updates advantage
- [x] Verified discoverability improvement

---

## Next Steps

1. **Revise proposals** - Update PROPOSAL-TEMPLATE-VAULT.md to use `vault-template/` subdirectory
2. **Update PROJECT-HUB.md** - Reflect monorepo architecture in roadmap
3. **Proceed with P2** - Create `vault-template/` directory structure
4. **Keep standards/** - Already following monorepo pattern

---

## References

- `/Users/dt/projects/dev-tools/zsh-configuration/` - Primary pattern reference
- `/Users/dt/projects/dev-tools/mcp-servers/` - Multi-component monorepo example
- `standards/documentation/ADHD-FRIENDLY-DOCS.md` - Documentation standards
- `standards/vault/VAULT-STRUCTURE.md` - Vault organization

---

**Decision:** ✅ Monorepo (single repository for all Nexus components)
**Rationale:** Consistency with dev-tools, atomic updates, ADHD-friendly, simpler maintenance
**Status:** Confirmed and documented

---

**Created:** 2025-12-21
**Maintainer:** DT
**Pattern Source:** zsh-configuration monorepo architecture
