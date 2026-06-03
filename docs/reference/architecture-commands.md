# Architecture Command Reference - Nexus

**Purpose:** Quick reference for architectural patterns and commands used in Nexus knowledge management system
**Created:** 2025-12-21
**Use:** Copy-paste when setting up vaults, creating templates, or implementing similar systems

---

## Table of Contents

1. [Quick Command Patterns](#quick-command-patterns)
2. [Vault Setup Commands](#vault-setup-commands)
3. [Template Creation Patterns](#template-creation-patterns)
4. [Documentation Standards](#documentation-standards)
5. [Obsidian Plugin Configuration](#obsidian-plugin-configuration)

---

## Quick Command Patterns

### 1. Complete Vault Setup Sprint

**Command Pattern:**
```bash
# Create vault structure → Configure plugins → Add templates → Create dashboards

# Step 1: Create folder structure
mkdir -p ~/Obsidian/Nexus/{00-INBOX/{fleeting-notes,literature-inbox},10-PROJECTS/{research,teaching,packages},20-AREAS,30-RESOURCES/{literature/by-topic,templates,code-snippets/R},40-ARCHIVE,50-DAILY/2025,60-TASKS,_SYSTEM/{claude-prompts,dataview-queries}}

# Step 2: Create core templates
claude: "Create the 3 core templates (project, paper-note, daily) in 30-RESOURCES/templates/"

# Step 3: Create master dashboard
claude: "Create _master-dashboard.md with Dataview queries for projects, tasks, and inbox"

# Step 4: Configure Claude integration
claude: "Copy claude-system-prompt.md to Claude settings"

# Step 5: Create first project
claude: "Create an example research project in 10-PROJECTS/research/"
```

**Result:** Working vault in 2 hours, ready to capture first note

---

### 2. Standards Implementation Sprint

**Command Pattern:**
```bash
# Implement project management standards from scratch

# Step 1: Create project management files
claude: "Create .STATUS and PROJECT-HUB.md following zsh-configuration standards"

# Step 2: Create quick start documentation
claude: "Create QUICK-START.md with 30-second overview + 2-hour setup guide"

# Step 3: Create implementation proposals
claude: "Create proposals for next phases: template vault (P2) and MCP integration (P3)"

# Step 4: Update main README
claude: "Add Quick Links table and reorganize documentation section in README.md"
```

**Result:** Complete project management infrastructure, phase roadmap, clear next steps

---

## Vault Setup Commands

### Command: Initialize Vault Structure

**Use Case:** Starting fresh Obsidian vault for Nexus

**One-Command Setup:**
```bash
# Create complete folder structure
mkdir -p ~/Obsidian/Nexus/{00-INBOX/{fleeting-notes,literature-inbox},10-PROJECTS/{research,teaching,packages},20-AREAS,30-RESOURCES/{literature/by-topic,templates,code-snippets/{R,python}},40-ARCHIVE,50-DAILY/$(date +%Y),60-TASKS,_SYSTEM/{claude-prompts,dataview-queries}}

# Navigate to vault
cd ~/Obsidian/Nexus
```

**Detailed Setup (with validation):**
```bash
# Create root directory
mkdir -p ~/Obsidian/Nexus
cd ~/Obsidian/Nexus

# Create PARA structure
mkdir -p 00-INBOX/fleeting-notes
mkdir -p 00-INBOX/literature-inbox
mkdir -p 10-PROJECTS/research
mkdir -p 10-PROJECTS/teaching
mkdir -p 10-PROJECTS/packages
mkdir -p 20-AREAS
mkdir -p 30-RESOURCES/literature/by-topic
mkdir -p 30-RESOURCES/templates
mkdir -p 30-RESOURCES/code-snippets/R
mkdir -p 30-RESOURCES/code-snippets/python
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/$(date +%Y)
mkdir -p 60-TASKS
mkdir -p _SYSTEM/claude-prompts
mkdir -p _SYSTEM/dataview-queries

# Verify structure
tree -L 2
```

**Result:** Complete PARA folder structure ready for Obsidian

---

### Command: Create Essential Templates

**Use Case:** Setting up core templates for vault

**Template Creation:**
```markdown
# In 30-RESOURCES/templates/

1. project.md        - Research projects, courses, packages
2. paper-note.md     - Literature notes
3. daily.md          - Daily notes
4. lecture.md        - Teaching materials
5. task.md           - Task items
6. weekly-review.md  - Weekly review structure
```

**Automated Creation:**
```bash
# Copy from Nexus repository
cp ~/projects/dev-tools/nexus/templates/*.md ~/Obsidian/Nexus/30-RESOURCES/templates/

# Or create via Claude
claude: "Create all 6 core templates in 30-RESOURCES/templates/ using the specifications from architecture.md"
```

**Result:** 6 working templates ready to use with Templater

---

### Command: Create Master Dashboard

**Use Case:** Central command center for vault

**Prompt:**
```
Create _master-dashboard.md in vault root with:

1. Today section (embedded daily note)
2. Active projects query (3 categories: research, teaching, packages)
3. Inbox count
4. Recent completed tasks
5. Quick links to key areas

Use Dataview queries that:
- Filter by frontmatter type
- Sort by deadline or priority
- Limit results to most relevant
```

**Example Output:**
```markdown
---
cssclass: dashboard
---

# 🧠 Nexus Command Center

## 🔥 Today
![[50-DAILY/{{date:YYYY/YYYY-MM/YYYY-MM-DD}}]]

## 📊 Active Projects

### Research
```dataview
TABLE status, target-journal, deadline
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
SORT deadline ASC
```

[... additional sections ...]
```

**Result:** Working dashboard that updates automatically via Dataview

---

## Template Creation Patterns

### Pattern: YAML Frontmatter Template

**Standard Format:**
```yaml
---
type: [manuscript|package|course|literature|daily|task]
title: "{{title}}"
status: [idea|active|draft|review|complete]
priority: 1-5
created: {{date:YYYY-MM-DD}}
---
```

**Project Template:**
```yaml
---
type: manuscript
title: "{{title}}"
status: idea
target-journal:
deadline:
priority: 3
created: <% tp.date.now("YYYY-MM-DD") %>
---
```

**Literature Template:**
```yaml
---
type: literature
title: "{{title}}"
authors: []
year:
journal:
doi:
read-status: to-read
rating: ⭐⭐⭐⭐⭐
created: <% tp.date.now("YYYY-MM-DD") %>
---
```

**Daily Template:**
```yaml
---
type: daily
date: <% tp.date.now("YYYY-MM-DD") %>
---
```

**Result:** Consistent frontmatter enables Dataview queries

---

### Pattern: Dataview Query Templates

**Active Projects Query:**
```markdown
```dataview
TABLE status, target-journal, deadline
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
SORT deadline ASC
```
```

**Task Query (Due Today):**
```markdown
```dataview
TASK
FROM "10-PROJECTS" OR "60-TASKS"
WHERE due = date(today) AND !completed
SORT priority ASC
```
```

**Recent Notes Query:**
```markdown
```dataview
LIST
FROM "30-RESOURCES/literature"
SORT file.ctime DESC
LIMIT 10
```
```

**Paper by Topic Query:**
```markdown
```dataview
TABLE
  authors as "Authors",
  year as "Year",
  rating as "Rating"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "mediation")
SORT year DESC
```
```

**Result:** Dynamic views that update automatically

---

## Documentation Standards

### TL;DR Format

**Standard Pattern:**
```markdown
> **TL;DR:**
> - **What**: [Concise description of the thing]
> - **Why**: [Motivation or problem it solves]
> - **How**: [Key approach or method]
> - **Status**: [Current state ✅/⚠️/🔄/📋]
```

**Example:**
```markdown
> **TL;DR:**
> - **What**: Template-driven knowledge vault for academic researchers
> - **Why**: Reduce friction in capturing and connecting ideas
> - **How**: PARA structure + Dataview queries + Claude AI interface
> - **Status**: ✅ Phase P1 complete, P2 (template vault) next
```

---

### Progress Bar Format

**Visual Progress Indicators:**
```
Full:     ████████████████████ 100%
75%:      ███████████████░░░░░  75%
50%:      ██████████░░░░░░░░░░  50%
25%:      █████░░░░░░░░░░░░░░░  25%
Empty:    ░░░░░░░░░░░░░░░░░░░░   0%
```

**With Status Emojis:**
```
Phase P0: Foundation  ████████████████████ 100% ✅
Phase P1: Standards   ████████████████████ 100% ✅
Phase P2: Template    ░░░░░░░░░░░░░░░░░░░░   0% 📋
```

**Hierarchical Progress:**
```
Phase P1: Standards   ████████████████████ 100% ✅
  ├─ CLAUDE.md        ████████████████████ 100% ✅
  ├─ .STATUS          ████████████████████ 100% ✅
  ├─ PROJECT-HUB      ████████████████████ 100% ✅
  └─ QUICK-START      ████████████████████ 100% ✅
```

---

### Status Indicators

**Emoji Standards:**
```
✅ Complete
🔄 In Progress
📋 Planned
⏳ Waiting/Blocked
⚠️ Attention Needed
❌ Blocked/Failed
⭐ Recommended
```

**Priority Colors:**
```
🟢 Green: Easy, quick wins
🟡 Yellow: Medium effort
🔴 Red: High effort or complex
```

**Time Estimates:**
```
⏱️ 15m    - Quick task
⏱️ 30m    - Short task
⏱️ 1h     - Medium task
⏱️ 2h     - Long task
⏱️ half-day - Extended session
⏱️ full-day - Full day commitment
```

---

## Obsidian Plugin Configuration

### Required Plugins Setup

**Installation Order:**
```
1. Dataview       - Dynamic queries (CRITICAL)
2. Templater      - Advanced templates (CRITICAL)
3. Tasks          - Task management
4. QuickAdd       - Fast capture
5. Calendar       - Daily notes navigation
```

**Configuration Steps:**

**1. Templater:**
```
Settings → Templater
✓ Template folder location: 30-RESOURCES/templates
✓ Trigger Templater on new file creation: ON
✓ Automatic jump to cursor: ON
```

**2. Dataview:**
```
Settings → Dataview
✓ Enable JavaScript Queries: ON (optional)
✓ Enable Inline Queries: ON
✓ Enable Inline JavaScript Queries: OFF (safer)
```

**3. Tasks:**
```
Settings → Tasks
Global filter: #task (optional)
✓ Auto-suggest task editing: ON
```

**4. QuickAdd:**
```
Settings → QuickAdd → Manage Macros

Macro 1: Capture Thought
  Type: Capture
  File location: 00-INBOX/fleeting-notes/{{DATE:YYYY-MM-DD-HHmm}}.md
  Template: [thought template]

Macro 2: Add Task
  Type: Capture
  File location: 60-TASKS/_task-inbox.md
  Insert: Append
  Template: - [ ] {{VALUE}} #task
```

**5. Calendar:**
```
Settings → Calendar
✓ Show week number: ON
Daily notes folder: 50-DAILY
Daily notes format: YYYY-MM-DD
```

---

### QuickAdd Macro Templates

**Capture Thought Macro:**
```markdown
---
type: fleeting
captured: {{DATE:YYYY-MM-DD HH:mm}}
processed: false
---

{{VALUE}}

---
*Captured via QuickAdd*
```

**Add Task Macro:**
```
- [ ] {{VALUE}} #task
```

**New Paper Macro:**
```markdown
---
type: literature
title: "{{VALUE}}"
authors: []
year:
journal:
doi:
read-status: to-read
created: {{DATE:YYYY-MM-DD}}
---

# {{VALUE}}

## 🎯 Core Contribution
>

## 🔑 Key Ideas
1.
2.
3.

## 🔗 Connections
- Relates to:
- Builds on:
```

---

## Reusable Prompt Templates

### Template: Vault Setup Sprint

**Copy-paste for new vault:**

```
Set up a complete Nexus vault following the architecture:

## Phase 1: Structure (30 min)
1. Create folder structure (PARA: 00-INBOX through 60-TASKS)
2. Verify all folders created correctly
3. Create .gitkeep files for empty folders

## Phase 2: Templates (30 min)
1. Create project.md template
2. Create paper-note.md template
3. Create daily.md template
4. Test each template with Templater

## Phase 3: Dashboards (30 min)
1. Create _master-dashboard.md with Dataview queries
2. Create section dashboards (research, teaching, packages)
3. Create _literature-index.md

## Phase 4: Configuration (30 min)
1. Configure QuickAdd macros (Capture Thought, Add Task)
2. Set up hotkeys (Cmd+Shift+N, Cmd+Shift+T)
3. Configure Templater template folder
4. Test capture workflows

## Requirements:
- All templates use Templater syntax
- All Dataview queries tested and working
- QuickAdd macros create files in correct locations
- Hotkeys configured and tested
```

---

### Template: Create Proposal Document

**Copy-paste when planning features:**

```
Create a comprehensive proposal for [FEATURE]:

## Structure:
1. **TL;DR** (3-5 bullets)
   - What it is
   - Key benefits
   - Estimated effort
   - Priority

2. **Current State** (What exists now, what's missing)

3. **Proposed Solution**
   - Complete design
   - Implementation approach
   - File structure
   - Example code/templates

4. **Implementation Plan**
   - Break into phases (each 1-2 hours max)
   - Each phase has:
     - Tasks checklist
     - Deliverables
     - Validation steps
     - Time estimate

5. **Benefits** (For users, for maintainers, for Claude)

6. **Technical Considerations**
   - Architecture decisions
   - Trade-offs
   - Compatibility issues

7. **Success Criteria** (Must have, Should have, Nice to have)

8. **Risks & Mitigations**

9. **Timeline** (Table with dependencies)

## Requirements:
- ADHD-friendly (time estimates, visual cues)
- Copy-paste ready examples
- Clear decision points
- Practical focus (avoid over-engineering)
```

---

### Template: Documentation Update Sprint

**Copy-paste when improving docs:**

```
Enhance documentation with ADHD-friendly patterns:

## Updates Needed:
1. Add TL;DR sections to all major documents
   - Format: > **TL;DR:** [bullets]
   - 3-5 bullets, <50 words total
   - Focus on "what" and "why"

2. Add Quick Links tables at document tops
   - Include read time estimates
   - Link to related documents
   - Categorize by purpose

3. Add visual hierarchy
   - Progress bars for phases
   - Status emojis (✅🔄📋⚠️)
   - Priority colors (🟢🟡🔴)
   - Time estimates (⏱️)

4. Add "Where Things Are" sections
   - Table format
   - Location + Purpose
   - When to use each location

5. Create quick reference cards
   - 1-page format
   - Common tasks table
   - Troubleshooting section

## Standards:
- Follow zsh-configuration documentation patterns
- ADHD-friendly (scannable, visual, actionable)
- Include time estimates on all tasks
- Celebrate wins and progress
```

---

## Key Principles for Nexus

1. **PARA Organization**
   - Projects: Active work with deadlines
   - Areas: Ongoing responsibilities
   - Resources: Reference material
   - Archives: Inactive content

2. **Template-Driven**
   - Every note type has a template
   - Consistent frontmatter structure
   - Dataview-compatible from day one

3. **ADHD-Optimized**
   - Friction-free capture (QuickAdd macros)
   - Visual progress indicators
   - Time estimates everywhere
   - Clear next actions

4. **Claude Integration**
   - System prompt defines vault structure
   - MCP server for direct access (future)
   - Proactive linking and search
   - Automatic context awareness

5. **Progressive Enhancement**
   - Start simple (P0: Documentation)
   - Add structure (P1: Standards)
   - Build tools (P2: Template Vault)
   - Enhance capabilities (P3+: Examples, MCP)

---

## Quick Reference: Common Tasks

| Task | Command | Time |
|------|---------|------|
| **Create vault** | `mkdir -p ~/Obsidian/Nexus/{...}` | 2 min |
| **Add template** | Create in `30-RESOURCES/templates/` | 5 min |
| **Create dashboard** | Add Dataview queries to `.md` file | 10 min |
| **Configure QuickAdd** | Settings → QuickAdd → Add Macro | 5 min |
| **Link notes** | Use `[[wikilink]]` syntax | 5 sec |
| **Create project** | Use project template | 2 min |
| **Capture thought** | `Cmd+Shift+N` → type → enter | 10 sec |
| **Add task** | `Cmd+Shift+T` → type → enter | 10 sec |
| **Review dashboard** | Open `_master-dashboard.md` | 30 sec |

---

**Last Updated:** 2025-12-21
**Maintainer:** DT
**See Also:**
- [QUICK-START.md](QUICK-START.md) - User setup guide
- [architecture.md](architecture.md) - Complete system architecture
- [PROJECT-HUB.md](PROJECT-HUB.md) - Strategic roadmap
- [PROPOSAL-TEMPLATE-VAULT.md](PROPOSAL-TEMPLATE-VAULT.md) - Implementation plan
