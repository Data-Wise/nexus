# Nexus

**The Obsidian + Claude Second Brain for Academic Researchers**

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
    ║              Connect Everything You Know                  ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

> **Nexus** (/ˈneksəs/) — *noun*: A connection or series of connections linking two or more things; the central and most important point.

---

## 🚀 Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[QUICK-START.md](QUICK-START.md)** | 30-second overview + 2-hour setup | 5 min |
| **[docs/getting-started/quickstart.md](docs/getting-started/quickstart.md)** | Detailed setup guide with explanations | 30 min |
| **[docs/architecture/overview.md](docs/architecture/overview.md)** | Complete system architecture | 15 min |
| **[docs/claude-integration/system-prompt.md](docs/claude-integration/system-prompt.md)** | Claude integration prompt | 5 min |
| **[.STATUS](.STATUS)** | Current project status | 2 min |
| **[PROJECT-HUB.md](PROJECT-HUB.md)** | Strategic roadmap & milestones | 10 min |

**For Contributors:**
- [CLAUDE.md](CLAUDE.md) - Guidance for Claude Code instances
- [docs/reference/architecture-commands.md](docs/reference/architecture-commands.md) - Reusable patterns & commands
- [ARCHITECTURE-DECISION-MONOREPO.md](ARCHITECTURE-DECISION-MONOREPO.md) - Why monorepo architecture
- [standards/](standards/) - Universal standards (vault structure, templates, docs)
- [PROPOSAL-TEMPLATE-VAULT.md](PROPOSAL-TEMPLATE-VAULT.md) - Template vault proposal
- [PROPOSAL-MCP-INTEGRATION.md](PROPOSAL-MCP-INTEGRATION.md) - MCP server proposal

---

## 📁 Project Structure

```
nexus/
├── README.md                    # You are here
├── QUICK-START.md               # 5-minute start guide
├── .STATUS                      # Daily progress tracking
├── PROJECT-HUB.md               # Strategic roadmap
│
├── docs/                        # 📚 All documentation
│   ├── getting-started/
│   ├── architecture/
│   ├── claude-integration/
│   └── reference/
│
├── standards/                   # ✅ Universal standards
│   ├── vault/
│   ├── documentation/
│   └── workflow/
│
├── vault-template/              # 🎯 THE PRODUCT (Phase P2 - ✅ COMPLETE)
│   ├── README.md                # Setup instructions
│   ├── _master-dashboard.md     # Main control panel
│   ├── _getting-started.md      # Usage guide
│   ├── _vault-guide.md          # Complete reference
│   ├── 00-INBOX/               # Quick capture
│   ├── 10-PROJECTS/            # Active work (research/teaching/packages)
│   ├── 20-AREAS/               # Ongoing domains
│   ├── 30-RESOURCES/           # Templates, literature, code snippets
│   ├── 40-ARCHIVE/             # Completed work
│   ├── 50-DAILY/               # Daily notes
│   ├── 60-TASKS/               # Task management
│   ├── _SYSTEM/                # Configuration & QuickAdd
│   └── .obsidian/              # Obsidian settings
│
├── integrations/                # 🔌 Future integrations
│   └── mcp-server/              # Phase P4
│
├── automation/                  # 🤖 Future automation
│   └── setup/                   # Phase P3
│
└── examples/                    # 📋 Future examples
    └── (Planned for Phase P3)
```

---

## ⚡ Quick Start (For Developers)

**Building the Desktop App?** See [DEVELOPMENT-PLAN.md](DEVELOPMENT-PLAN.md)

**Current Sprint**: Sprint 1 - Hello World ([SPRINT-1.md](SPRINT-1.md))

```bash
# Desktop app is in development
cd nexus-desktop/  # (to be created)
npm install
npm run dev
```

---

## What is Nexus?

Nexus is a complete knowledge management architecture that turns **Obsidian** into your external memory and **Claude** into your cognitive interface. Designed for academic researchers with ADHD-optimized workflows.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  OBSIDIAN   │◄───►│   CLAUDE    │◄───►│    CODE     │
│   (Vault)   │     │   (Brain)   │     │   (Repos)   │
│             │     │             │     │             │
│ • Notes     │     │ • Skills    │     │ • R pkgs    │
│ • Projects  │     │ • Memory    │     │ • Quarto    │
│ • Tasks     │     │ • Tools     │     │ • LaTeX     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                    ┌──────▼──────┐
                    │   OUTPUT    │
                    │             │
                    │ • Papers    │
                    │ • Lectures  │
                    │ • Packages  │
                    └─────────────┘
```

---

## Core Philosophy

### Three Modes, One System

| Mode | Role | Function |
|------|------|----------|
| 🔖 **Librarian** | Knowledge Management | Capture, organize, link, retrieve |
| 🔧 **Builder** | Code Development | Write, test, document, deploy |
| 📚 **Teacher** | Content Creation | Transform research into teaching |

### ADHD-Optimized Design

- ⚡ **Friction-free capture** — Ideas in, worry later
- 📊 **Visual dashboards** — See everything at a glance
- 🔗 **Automatic linking** — Connections surface themselves
- ⏱️ **Time estimates** — Know what you're committing to
- ✅ **Progress tracking** — [3/7] on everything

---

## Quick Start

### 1. Create Vault Structure

```bash
# Clone the Nexus template
git clone https://github.com/data-wise/nexus-vault.git ~/Obsidian/Nexus

# Or create manually
mkdir -p ~/Obsidian/Nexus/{00-INBOX,10-PROJECTS,20-AREAS,30-RESOURCES,40-ARCHIVE,50-DAILY,60-TASKS}
```

### 2. Install Required Plugins

| Plugin | Purpose |
|--------|---------|
| Dataview | Dynamic queries |
| Templater | Smart templates |
| Tasks | Task management |
| QuickAdd | Fast capture |
| Calendar | Daily notes |

### 3. Configure Claude

Add to Claude settings or system prompt:

```markdown
You have access to my Nexus vault. Structure:
- 00-INBOX: Unprocessed captures
- 10-PROJECTS: Active research, teaching, packages
- 20-AREAS: Ongoing domains
- 30-RESOURCES: Literature, templates, snippets
- 60-TASKS: Task management

Proactively search vault. Create links. Surface connections.
```

### 4. Start Using

```
Morning:   Open dashboard → Pick top 3 → Go
During:    Cmd+Shift+N to capture anything
Evening:   Mark done → Move undone → Plan tomorrow
Weekly:    Review progress → Process inbox → Plan ahead
```

---

## Vault Architecture

```
📁 Nexus/
├── 📁 00-INBOX/                    # Quick capture
│   ├── fleeting-notes/             # Raw thoughts
│   └── literature-inbox/           # Papers to process
│
├── 📁 10-PROJECTS/                 # Active work
│   ├── research/                   # Papers in progress
│   ├── teaching/                   # Courses
│   └── packages/                   # Software
│
├── 📁 20-AREAS/                    # Ongoing domains
│   ├── causal-inference/
│   ├── sensitivity-analysis/
│   └── mediation-theory/
│
├── 📁 30-RESOURCES/                # Reference
│   ├── literature/                 # Paper notes
│   ├── templates/                  # Reusable structures
│   └── code-snippets/              # R/Python fragments
│
├── 📁 40-ARCHIVE/                  # Completed
├── 📁 50-DAILY/                    # Daily notes
├── 📁 60-TASKS/                    # Task hub
└── 📄 _dashboard.md                # Command center
```

---

## Workflows

### 📄 Paper → Knowledge

```
Found paper → Create literature note → Link to projects → Add to index
     ↓              ↓                        ↓               ↓
  00-INBOX    30-RESOURCES/lit         10-PROJECTS      _lit-index.md
```

### 🔬 Research → Teaching

```
Research note → Extract core ideas → Generate lecture → Create lab
      ↓                ↓                   ↓              ↓
  20-AREAS      Pedagogical frame    Quarto slides    R script
```

### 💻 Idea → Code

```
Concept note → Algorithm design → Implementation → Documentation
      ↓               ↓                ↓               ↓
  00-INBOX      20-AREAS/theory    ~/repos/pkg/R/   Vault + roxygen
```

---

## Dashboard Preview

```markdown
# 🧠 Nexus Command Center

## 🔥 Today's Focus
- [ ] Finish P_med simulation Section 4
- [ ] Prep STAT 579 Lecture 12
- [ ] Review probmed PR #23

## 📊 Project Status

| Project | Progress | Next Action |
|---------|----------|-------------|
| P_med Paper | ▓▓▓▓▓▓░░░░ 60% | Write results |
| STAT 579 | ▓▓▓▓▓▓▓▓░░ 80% | Grade HW5 |
| RMediation | ▓▓▓▓▓▓▓▓▓░ 90% | CRAN submit |

## 📥 Inbox: 7 items to process
```

---

## Integration Points

### With Mediationverse

| Package | Nexus Connection |
|---------|------------------|
| RMediation | `20-AREAS/mediation-theory/confidence-intervals.md` |
| probmed | `10-PROJECTS/research/P_med-manuscript/` |
| medrobust | `20-AREAS/sensitivity-analysis/` |
| medsim | `30-RESOURCES/code-snippets/R/simulation/` |

### With Claude Skills

| Skill | Nexus Trigger |
|-------|---------------|
| `methods-paper-writer` | "Draft methods section" |
| `simulation-architect` | "Design simulation study" |
| `statistical-pedagogy-framework` | "Create lecture on X" |
| `sensitivity-analyst` | "Add sensitivity analysis" |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Quick capture | `Cmd+Shift+N` |
| Add task | `Cmd+Shift+T` |
| Open dashboard | `Cmd+D` |
| Search vault | `Cmd+O` |
| Today's note | `Cmd+T` |

---

## 🎯 Using the Template Vault

The complete, ready-to-use Obsidian vault is in **`vault-template/`**

### Quick Setup (5 minutes)

1. **Copy the vault**:
   ```bash
   cp -r vault-template ~/Documents/MyNexus
   ```

2. **Open in Obsidian**:
   - Launch Obsidian → "Open folder as vault"
   - Select `~/Documents/MyNexus`
   - Trust and enable community plugins

3. **Install required plugins**:
   - Dataview ✅ (for dashboards)
   - Templater ✅ (for smart templates)
   - Tasks ✅ (for task management)
   - QuickAdd ⭐ (for quick capture)
   - Calendar ⭐ (for daily notes)

4. **Start using**:
   - Open `_master-dashboard.md`
   - Read `_getting-started.md`
   - Set up QuickAdd shortcuts (see `_SYSTEM/QUICKADD-SETUP.md`)

### What's Included

- ✅ **Complete folder structure** (PARA method)
- ✅ **6 production-ready templates** (project, paper-note, daily, lecture, task, weekly-review)
- ✅ **5 interactive dashboards** (master, research, teaching, packages, literature)
- ✅ **Example content** (manuscript, literature note, daily note, tasks)
- ✅ **QuickAdd configuration** (keyboard shortcuts for quick capture)
- ✅ **Comprehensive documentation** (README, getting-started, vault-guide)

### Documentation

| File | Purpose |
|------|---------|
| **`vault-template/README.md`** | Setup instructions & troubleshooting |
| **`vault-template/_getting-started.md`** | ADHD-friendly usage guide |
| **`vault-template/_vault-guide.md`** | Complete reference (all templates, queries, shortcuts) |
| **`vault-template/_SYSTEM/QUICKADD-SETUP.md`** | Quick capture configuration |

---

## Requirements

- **Obsidian** 1.4+
- **Claude** (Web, App, or Code CLI) — optional but recommended
- **Plugins**: Dataview, Templater, Tasks, QuickAdd, Calendar
- **Optional**: Obsidian Git, Zotero Integration

---

## 📚 Documentation

### Getting Started
- **[QUICK-START.md](QUICK-START.md)** - 30-second overview + 2-hour setup
- **[docs/getting-started/quickstart.md](docs/getting-started/quickstart.md)** - Detailed setup guide
- **[docs/architecture/overview.md](docs/architecture/overview.md)** - Complete vault architecture

### For Claude Integration
- **[docs/claude-integration/system-prompt.md](docs/claude-integration/system-prompt.md)** - System prompt for Claude
- **[CLAUDE.md](CLAUDE.md)** - Guidance for Claude Code instances

### Project Management
- **[.STATUS](.STATUS)** - Daily progress tracking (machine-readable)
- **[PROJECT-HUB.md](PROJECT-HUB.md)** - Strategic roadmap and milestones
- **[P2-TASKS.md](P2-TASKS.md)** - Current phase task breakdown

### Architecture & Standards
- **[ARCHITECTURE-DECISION-MONOREPO.md](ARCHITECTURE-DECISION-MONOREPO.md)** - Why monorepo
- **[docs/architecture/monorepo-decision.md](docs/architecture/monorepo-decision.md)** - Summary
- **[docs/reference/architecture-commands.md](docs/reference/architecture-commands.md)** - Reusable patterns
- **[standards/](standards/)** - Universal standards hub
  - [Vault Structure](standards/vault/VAULT-STRUCTURE.md) - PARA organization
  - [Template Standards](standards/vault/TEMPLATE-STANDARDS.md) - YAML & templates
  - [ADHD-Friendly Docs](standards/documentation/ADHD-FRIENDLY-DOCS.md) - Documentation format

### Future Phases
- **[PROPOSAL-TEMPLATE-VAULT.md](PROPOSAL-TEMPLATE-VAULT.md)** - Phase P2: Template vault
- **[PROPOSAL-MCP-INTEGRATION.md](PROPOSAL-MCP-INTEGRATION.md)** - Phase P4: MCP server
- **[integrations/](integrations/)** - Future integrations (MCP server, etc.)
- **[automation/](automation/)** - Future automation scripts
- **[examples/](examples/)** - Future example vaults

---

## 📊 Current Status

**Phase:** Integration Phase 1 - COMPLETE ✅ (v0.9.1)  
**Status:** Production-ready with comprehensive test coverage

### Recent Milestones (Jan 2025)

- ✅ **Integration Phase 1** - Atlas ↔ Nexus integration complete
  - 3 Atlas tools added to statistical-research MCP
  - Context-aware AI (Claude knows what you're working on)
  - 52 Atlas tests (88% pass rate)
  
- ✅ **v0.9.1 Release** - Critical bug fix + test expansion
  - Fixed missing Obsidian implementation files (642 lines)
  - Added 47 Obsidian tests (95% pass rate)
  - **134+ total tests passing** across all tools
  - GitHub Pages documentation deployed

- ✅ **Template Vault** - Production-ready vault structure
  - Complete PARA organization
  - 6 templates, 5 dashboards
  - QuickAdd configuration included

### Tools Available

**statistical-research MCP Server** (v0.9.1):
- 21 tools (10 R + 7 literature + 3 Atlas + 1 quick capture)
- 17 A-grade Claude skills
- 134+ passing tests
- Live docs: https://data-wise.github.io/claude-statistical-research-mcp/

See [.STATUS](.STATUS) for detailed progress or [PROJECT-HUB.md](PROJECT-HUB.md) for strategic overview.

---

## Author

**Stat-Wise** — Professor of Statistics/Biostatistics  
Specializing in causal inference, mediation analysis, and sensitivity analysis

- 📦 [Mediationverse](https://github.com/Data-Wise/mediationverse)
- 📊 [RMediation](https://github.com/Data-Wise/rmediation)

---

## License

MIT License — Use freely, adapt for your workflow.

---

<p align="center">
  <strong>Nexus</strong> — Connect Everything You Know
</p>
