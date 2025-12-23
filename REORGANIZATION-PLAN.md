# Nexus Reorganization Plan - Hybrid Structure

**Date:** 2025-12-21
**Goal:** Implement Option C (Hybrid Structure) for better organization and scalability

---

## Current Structure (Flat)

```
nexus/
├── .STATUS
├── ARCHITECTURE-COMMAND-REFERENCE.md
├── ARCHITECTURE-DECISION-MONOREPO.md
├── architecture.md                        # → docs/architecture/
├── claude-obsidian-system-prompt.md       # → docs/claude-integration/
├── claude-system-prompt.md                # → docs/claude-integration/
├── CLAUDE.md                              # KEEP at root
├── MONOREPO-DECISION-SUMMARY.md           # → docs/architecture/
├── nexus-icon.svg                         # → assets/
├── nexus-logo.svg                         # → assets/
├── nexus.code-workspace                   # KEEP at root
├── obsidian-claude-brain-architecture.md  # → docs/architecture/
├── obsidian-quickstart.md                 # → docs/getting-started/
├── P2-TASKS.md                            # KEEP at root (active work)
├── PROJECT-HUB.md                         # KEEP at root
├── PROPOSAL-MCP-INTEGRATION.md            # KEEP at root
├── PROPOSAL-TEMPLATE-VAULT.md             # KEEP at root
├── QUICK-START.md                         # KEEP at root
├── quickstart.md                          # → docs/getting-started/
├── README.md                              # KEEP at root
└── standards/                             # KEEP at root
```

---

## Target Structure (Hybrid)

```
nexus/
├── README.md                              # ✅ Main entry point
├── QUICK-START.md                         # ✅ 5-minute start
├── .STATUS                                # ✅ Daily tracking
├── PROJECT-HUB.md                         # ✅ Strategic planning
├── CLAUDE.md                              # ✅ For Claude Code instances
├── P2-TASKS.md                            # ✅ Active work tracking
├── nexus.code-workspace                   # ✅ VS Code workspace
│
├── ARCHITECTURE-DECISION-*.md             # ✅ Key decisions at root
├── PROPOSAL-*.md                          # ✅ Proposals at root
│
├── docs/                                  # 📚 All documentation
│   ├── getting-started/
│   │   ├── quick-start.md                 # Copy of root QUICK-START.md
│   │   ├── quickstart.md                  # Detailed guide
│   │   └── obsidian-quickstart.md
│   ├── architecture/
│   │   ├── overview.md                    # Renamed from architecture.md
│   │   ├── monorepo-decision.md           # Summary
│   │   └── obsidian-claude-brain.md       # Detailed architecture
│   ├── claude-integration/
│   │   ├── system-prompt.md
│   │   └── obsidian-prompt.md
│   └── reference/
│       └── architecture-commands.md       # Command reference
│
├── standards/                             # ✅ Universal standards
│   ├── vault/
│   ├── documentation/
│   └── workflow/
│
├── vault-template/                        # 🎯 THE PRODUCT (Phase P2)
│   ├── .obsidian/
│   ├── 00-INBOX/
│   ├── ...                                # Full PARA structure
│   └── README.md
│
├── integrations/                          # 🔌 Claude & other integrations
│   └── mcp-server/                        # (Future - Phase P4)
│       └── README.md                      # Placeholder
│
├── automation/                            # 🤖 Tools & scripts
│   └── setup/                             # (Future - Phase P3)
│       └── README.md                      # Placeholder
│
├── examples/                              # 📋 Real-world examples
│   └── README.md                          # (Future - Phase P3)
│
└── assets/                                # 🎨 Images, icons, etc.
    ├── nexus-icon.svg
    └── nexus-logo.svg
```

---

## Migration Steps

### Step 1: Create New Directory Structure
```bash
mkdir -p docs/{getting-started,architecture,claude-integration,reference}
mkdir -p integrations/mcp-server
mkdir -p automation/setup
mkdir -p examples
mkdir -p assets
```

### Step 2: Move Documentation Files
```bash
# Getting Started
mv quickstart.md docs/getting-started/
mv obsidian-quickstart.md docs/getting-started/
cp QUICK-START.md docs/getting-started/quick-start.md  # Copy, keep at root

# Architecture
mv architecture.md docs/architecture/overview.md
mv obsidian-claude-brain-architecture.md docs/architecture/obsidian-claude-brain.md
mv MONOREPO-DECISION-SUMMARY.md docs/architecture/monorepo-decision.md

# Claude Integration
mv claude-system-prompt.md docs/claude-integration/system-prompt.md
mv claude-obsidian-system-prompt.md docs/claude-integration/obsidian-prompt.md

# Reference
mv ARCHITECTURE-COMMAND-REFERENCE.md docs/reference/architecture-commands.md
```

### Step 3: Move Assets
```bash
mv nexus-icon.svg assets/
mv nexus-logo.svg assets/
```

### Step 4: Create Placeholder READMEs
```bash
# integrations/mcp-server/README.md
# automation/setup/README.md
# examples/README.md
```

### Step 5: Update Cross-References

**Files to Update:**
- README.md (update all links)
- QUICK-START.md (update links to docs/)
- CLAUDE.md (update links to docs/)
- PROJECT-HUB.md (update links)
- PROPOSAL-*.md (update links)
- .STATUS (update file references)

**Link Pattern Changes:**
```
Old: [architecture.md](architecture.md)
New: [architecture.md](docs/architecture/overview.md)

Old: [quickstart.md](quickstart.md)
New: [quickstart.md](docs/getting-started/quickstart.md)

Old: nexus-logo.svg
New: assets/nexus-logo.svg
```

---

## Files That Stay at Root

**Project Management:**
- `.STATUS` - Daily progress tracking
- `PROJECT-HUB.md` - Strategic roadmap
- `P2-TASKS.md` - Current phase tasks

**Entry Points:**
- `README.md` - Main overview
- `QUICK-START.md` - 5-minute start
- `CLAUDE.md` - For Claude Code

**Key Decisions:**
- `ARCHITECTURE-DECISION-MONOREPO.md`
- Any future `ARCHITECTURE-DECISION-*.md`

**Proposals:**
- `PROPOSAL-TEMPLATE-VAULT.md`
- `PROPOSAL-MCP-INTEGRATION.md`
- Any future `PROPOSAL-*.md`

**Development:**
- `nexus.code-workspace`

---

## Benefits of New Structure

### ADHD-Friendly
✅ **Scan root directory** → See most important files immediately
✅ **Predictable locations** → Docs in docs/, integrations in integrations/
✅ **Less clutter** → Root has ~10 files instead of ~20

### Scalable
✅ **Room to grow** → Can add more under integrations/, automation/, examples/
✅ **Clear boundaries** → Each directory has clear purpose
✅ **No naming conflicts** → docs/architecture/ vs root-level decisions

### Maintainable
✅ **DRY principle** → Standards in one place (standards/)
✅ **Co-located content** → All architecture docs in docs/architecture/
✅ **Future-proof** → Structure supports Phase P3, P4, P5

---

## Validation Checklist

After reorganization:

- [ ] All files moved to correct locations
- [ ] No broken links in any markdown files
- [ ] README.md quick links table updated
- [ ] QUICK-START.md links work
- [ ] CLAUDE.md references correct paths
- [ ] .STATUS file paths updated
- [ ] Git-friendly (if/when initialized)
- [ ] Can still find everything easily

---

## Timeline

**Estimated Time:** 45 minutes - 1 hour

- **Step 1-3:** Create dirs + move files (15 min)
- **Step 4:** Create placeholders (5 min)
- **Step 5:** Update references (25-45 min)
- **Validation:** Test all links (10 min)

---

**Status:** 📋 Ready to execute
**Next:** Begin Step 1 (create directory structure)
