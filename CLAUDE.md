# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What is Nexus?

Nexus is a **knowledge management architecture template** for academic researchers. It's not a traditional software project but rather comprehensive documentation for setting up an Obsidian vault integrated with Claude AI.

**Purpose**: Turn Obsidian into your external memory and Claude into your cognitive interface, optimized for ADHD-friendly workflows.

---

## Repository Structure

```
nexus/
├── README.md                              # Overview, philosophy, integration points
├── QUICK-START.md                         # 5-minute start guide
├── .STATUS                                # Daily progress tracking
├── PROJECT-HUB.md                         # Strategic roadmap
│
├── docs/                                  # All documentation
│   ├── getting-started/
│   │   ├── quickstart.md                  # Detailed 2-hour setup guide
│   │   └── obsidian-quickstart.md         # Alternative quickstart
│   ├── architecture/
│   │   ├── overview.md                    # Complete vault architecture
│   │   └── obsidian-claude-brain.md       # Detailed architecture
│   ├── claude-integration/
│   │   ├── system-prompt.md               # System prompt for Claude
│   │   └── obsidian-prompt.md             # Alternative prompt
│   └── reference/
│       └── architecture-commands.md       # Reusable command patterns
│
├── standards/                             # Universal standards
│   ├── vault/                             # Vault structure & templates
│   ├── documentation/                     # ADHD-friendly docs
│   └── workflow/                          # Workflow standards
│
├── vault-template/                        # THE PRODUCT (Phase P2 - in progress)
│
├── integrations/                          # Future integrations
│   └── mcp-server/                        # MCP server (Phase P4)
│
├── automation/                            # Future automation
│   └── setup/                             # Setup scripts (Phase P3)
│
├── examples/                              # Future examples (Phase P3)
│
└── assets/                                # Images, icons
    ├── nexus-icon.svg
    └── nexus-logo.svg
```

**Key Files**:
- `README.md` — Start here for overview and philosophy
- `QUICK-START.md` — 5-minute quick start
- `docs/architecture/overview.md` — Complete system design with templates and workflows
- `docs/getting-started/quickstart.md` — Practical setup guide (2 hours to running system)
- `docs/claude-integration/system-prompt.md` — System prompt for Claude integration
- `standards/` — Universal standards for vault structure, templates, and documentation

---

## Core Architecture Concepts

### The Three Modes

Nexus defines three operational modes for Claude:
1. **🔖 Librarian** — Knowledge capture, organization, retrieval
2. **🔧 Builder** — Code development, package maintenance
3. **📚 Teacher** — Lecture creation, pedagogical materials

### Vault Folder Structure (PARA Method)

```
00-INBOX/          → Quick capture (process daily)
10-PROJECTS/       → Active work (research, teaching, packages)
20-AREAS/          → Ongoing domains (causal inference, sensitivity analysis)
30-RESOURCES/      → Reference (literature, templates, code snippets)
40-ARCHIVE/        → Completed work
50-DAILY/          → Daily notes
60-TASKS/          → Task management hub
_SYSTEM/           → Vault configuration
```

### Key Design Principles

1. **ADHD-Optimized**:
   - Friction-free capture
   - Visual dashboards with progress bars
   - Time estimates on all tasks
   - Automatic linking

2. **Template-Driven**:
   - Project templates (research manuscripts, courses, packages)
   - Literature note templates
   - Task templates with metadata

3. **Dataview-Powered**:
   - Dynamic dashboards using Dataview queries
   - Auto-generated task lists
   - Project status tracking

---

## Working with This Repository

### Common Tasks

#### View the Full Architecture
```bash
# Read the complete system design
cat docs/architecture/overview.md
```

#### Review Setup Instructions
```bash
# Quick setup guide
cat docs/getting-started/quickstart.md
```

#### See Claude Integration
```bash
# System prompt for Claude
cat docs/claude-integration/system-prompt.md
```

### Updating Documentation

When modifying Nexus documentation:

1. **Maintain Consistency**: Several files contain duplicate content
2. **Key Files to Update Together**:
   - `README.md` — Overview and philosophy
   - `docs/architecture/overview.md` + `docs/architecture/obsidian-claude-brain.md` — Keep in sync
   - `docs/getting-started/quickstart.md` + `docs/getting-started/obsidian-quickstart.md` — Keep in sync

3. **Structure Preservation**: Maintain the existing visual formatting:
   - ASCII art headers
   - Box-drawing characters for visual hierarchy
   - Emoji indicators for sections
   - Progress bars: `[▓▓▓▓░░░░░░] 40%`

### Adding New Templates

When creating new Obsidian templates for Nexus:

1. Add template markdown to `docs/architecture/overview.md` under appropriate section
2. Include YAML frontmatter example (follow `standards/vault/TEMPLATE-STANDARDS.md`)
3. Show Dataview query examples if relevant
4. Document in the templates reference section
5. Consider adding to `vault-template/30-RESOURCES/templates/` when P2 is complete

### Updating Workflows

When documenting new workflows:

1. Add to `docs/architecture/overview.md` Section 5 (Claude Integration) or Section 6 (Daily Workflow)
2. Create prompt template in `vault-template/_SYSTEM/claude-prompts/` format (when P2 complete)
3. Update `docs/claude-integration/system-prompt.md` if adding new command patterns

---

## Key Templates Defined

The architecture defines several critical templates:

### Project Template
```yaml
type: manuscript | package | course
status: idea | active | review | complete
priority: 1-5
deadline: YYYY-MM-DD
```

### Literature Note Template
```yaml
type: literature
rating: ⭐-⭐⭐⭐⭐⭐
read-status: to-read | reading | read | processed
relevance:
  - project-name: low | medium | high
```

### Task Template
```yaml
type: task
priority: 1-5
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h | half-day | full-day
context: @computer | @read | @write | @code | @review
```

---

## Obsidian Plugin Dependencies

Nexus architecture assumes these Obsidian plugins:

| Plugin | Purpose | Critical? |
|--------|---------|-----------|
| Dataview | Dynamic dashboards | Yes |
| Templater | Advanced templates | Yes |
| Tasks | Task management | Yes |
| QuickAdd | Fast capture | Recommended |
| Calendar | Daily notes | Recommended |
| Obsidian Git | Auto-backup | Optional |
| Excalidraw | Visual thinking (DAGs) | Optional |

---

## Integration Points

### With Claude Skills

The architecture assumes integration with these skills (defined elsewhere):
- `methods-paper-writer` — Draft academic methods sections
- `simulation-architect` — Design simulation studies
- `statistical-pedagogy-framework` — Create lectures
- `sensitivity-analyst` — Add sensitivity analysis

### With R Packages (Mediationverse)

Designed for integration with:
- `RMediation` — Mediation analysis confidence intervals
- `probmed` — P_med effect size
- `medrobust` — Sensitivity analysis
- `medfit` — Model fitting
- `medsim` — Simulation tools

### With Code Repositories

The vault connects to code via:
- File paths: `` `~/repos/package-name/R/function.R` ``
- Project links: `[[packages/package-name]]`
- Code snippets stored in: `30-RESOURCES/code-snippets/`

---

## Testing This Documentation

There's no executable code to test, but you can validate:

1. **Markdown Formatting**: Ensure all markdown renders correctly
2. **YAML Examples**: Verify frontmatter examples are valid YAML
3. **Dataview Queries**: Check that query syntax is current with Dataview plugin
4. **File Paths**: Ensure example paths are consistent throughout docs

---

## Style Guidelines

When editing Nexus documentation:

1. **Visual Hierarchy**:
   - Use box-drawing characters for major sections
   - Emoji indicators: 🔥 (urgent), 📊 (status), ✅ (tasks), 🔗 (links)
   - Tables for comparisons and references

2. **ADHD-Friendly Formatting**:
   - Short paragraphs (2-3 sentences max)
   - Bullet points over prose
   - **Bold keywords** for scanning
   - Clear section breaks with `---`

3. **Code Blocks**:
   - Use appropriate language tags (```markdown, ```yaml, ```javascript, ```bash)
   - Include comments explaining non-obvious elements
   - Show both template and example filled-in

4. **Consistency**:
   - Folder paths always with trailing slash: `10-PROJECTS/`
   - File references with extension: `_dashboard.md`
   - Dates in ISO format: `YYYY-MM-DD`

---

## Documentation Philosophy

Nexus documentation follows these principles:

1. **Show, Don't Tell**: Every concept includes concrete examples
2. **Progressive Disclosure**: Quick start → Architecture → Deep dives
3. **Copy-Paste Ready**: All templates are ready to use as-is
4. **ADHD-Optimized**: Time estimates, visual cues, clear next steps
5. **Interconnected**: Heavy cross-referencing between sections

---

## Common Modifications

### Adding a New Project Type

1. Create template in `docs/architecture/overview.md` under "Project Dashboard System"
2. Add to project type enumeration in `standards/vault/TEMPLATE-STANDARDS.md`
3. Update dashboards to query new type
4. Document workflow in "Workflows" section

### Adding a New Workflow

1. Document in `docs/architecture/overview.md` Section 5 (Claude Integration Architecture)
2. Create prompt template showing automation steps
3. Add to command patterns in `docs/claude-integration/system-prompt.md`
4. Include in quickstart if essential

### Updating for New Obsidian Plugin Features

1. Check affected Dataview queries in `docs/architecture/overview.md`
2. Update plugin configuration sections in `docs/getting-started/quickstart.md`
3. Revise examples to use new features
4. Note breaking changes if any

---

## Target Audience

Documentation is written for:
- **Primary**: Academic researchers (especially statistics/biostatistics)
- **Secondary**: Anyone doing knowledge work with ADHD challenges
- **Technical Level**: Comfortable with Markdown, basic JavaScript for QuickAdd macros
- **Obsidian Experience**: Beginner to intermediate (architecture teaches best practices)

---

## Future Enhancements

When extending Nexus, consider:

1. **MCP Server Integration**: Document how to connect Obsidian vault via MCP
2. **Additional Templates**: Lab templates, grant templates, review templates
3. **Automation Scripts**: Shell scripts for vault initialization
4. **Example Vault**: Pre-populated example vault for testing
5. **Video Walkthrough**: Complement written docs with video setup guide
