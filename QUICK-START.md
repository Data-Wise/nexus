# Nexus - Quick Start

> **TL;DR:** Set up an Obsidian + Claude second brain in 2 hours. Template-driven knowledge management optimized for academic researchers with ADHD.

---

## 30-Second Overview

**What you'll get:**
- ✅ Structured Obsidian vault (PARA method)
- ✅ Claude as your cognitive interface
- ✅ ADHD-friendly workflows
- ✅ Pre-built templates and dashboards

**What you need:**
- Obsidian (free)
- Claude account (web/app/CLI)
- 2 hours setup time

---

## What This Does

- **Captures** ideas instantly with zero friction
- **Connects** notes automatically through smart linking
- **Transforms** research into teaching materials
- **Tracks** progress visually with dashboards
- **Integrates** Claude AI as your knowledge interface

**For:** Academic researchers, especially those with ADHD who need structure without rigidity.

---

## 🚀 Common Tasks

| I want to... | Run this | Time |
|--------------|----------|------|
| **Set up vault** | Follow [2-Hour Setup](#2-hour-setup-guide) below | 2 hours |
| **View architecture** | Read [docs/architecture/overview.md](docs/architecture/overview.md) | 15 min |
| **See templates** | Check [standards/vault/TEMPLATE-STANDARDS.md](standards/vault/TEMPLATE-STANDARDS.md) | 10 min |
| **Configure Claude** | Copy [docs/claude-integration/system-prompt.md](docs/claude-integration/system-prompt.md) | 5 min |
| **Understand folders** | See [Where Things Are](#where-things-are) below | 2 min |
| **Get help** | Read [docs/getting-started/quickstart.md](docs/getting-started/quickstart.md) (detailed guide) | 30 min |

---

## 📁 Where Things Are

| Location | Contents | When to Use |
|----------|----------|-------------|
| **00-INBOX/** | Unprocessed captures | Quick capture, process daily |
| **10-PROJECTS/** | Active work (research, teaching, packages) | Current projects only |
| **20-AREAS/** | Ongoing domains (methods, theory) | Reference material, evergreen notes |
| **30-RESOURCES/** | Literature, templates, code snippets | Templates and reference |
| **40-ARCHIVE/** | Completed work | Finished projects |
| **50-DAILY/** | Daily notes | Daily planning and logs |
| **60-TASKS/** | Task management | Task tracking and planning |
| **_SYSTEM/** | Vault configuration | Claude prompts, queries |

---

## ⚡ 2-Hour Setup Guide

### Phase 1: Create Vault (30 min)

**Step 1: Create folder structure**

```bash
# Create vault directory
mkdir -p ~/Obsidian/Nexus
cd ~/Obsidian/Nexus

# Create PARA structure
mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS
mkdir -p 30-RESOURCES/{literature/by-topic,templates,code-snippets/R}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/2025
mkdir -p 60-TASKS
mkdir -p _SYSTEM/{claude-prompts,dataview-queries}
```

**Step 2: Open in Obsidian**

1. Launch Obsidian
2. Click "Open folder as vault"
3. Select `~/Obsidian/Nexus`

✅ **Checkpoint:** You should see the folder structure in Obsidian's file browser.

---

### Phase 2: Install Plugins (20 min)

**Required plugins** (Settings → Community Plugins → Browse):

| Plugin | Purpose | Setup |
|--------|---------|-------|
| **Dataview** | Dynamic dashboards | Enable after install |
| **Templater** | Advanced templates | Set template folder to `30-RESOURCES/templates` |
| **Tasks** | Task management | Enable after install |
| **QuickAdd** | Fast capture | Configure macros (see below) |
| **Calendar** | Daily notes | Enable after install |

**Templater Configuration:**
- Settings → Templater
- Template folder location: `30-RESOURCES/templates`
- ✅ Enable "Trigger Templater on new file creation"

✅ **Checkpoint:** All 5 plugins installed and enabled.

---

### Phase 3: Create Core Templates (30 min)

**Create these 3 essential templates in `30-RESOURCES/templates/`:**

**1. Project Template** (`project.md`)

```markdown
---
type: manuscript
title: "{{title}}"
status: idea
target-journal:
deadline:
priority: 3
created: <% tp.date.now("YYYY-MM-DD") %>
---

# {{title}}

## 📋 Status Checklist
- [ ] Literature review
- [ ] Theory developed
- [ ] Simulations designed
- [ ] Simulations run
- [ ] Application complete
- [ ] Draft written
- [ ] Submitted

## 🎯 Core Contribution
> One sentence

## 📝 Research Log

## ✅ Tasks

## 📎 Files
```

**2. Paper Note Template** (`paper-note.md`)

```markdown
---
type: literature
title: "{{title}}"
authors: []
year:
journal:
doi:
read-status: to-read
created: <% tp.date.now("YYYY-MM-DD") %>
---

# {{title}}

## 🎯 Core Contribution
>

## 🔑 Key Ideas
1.
2.
3.

## 📐 Key Equations
$$

$$

## 🔗 Connections
- Relates to:
- Builds on:
- Applies to my work:

## 📝 Notes

## 🏷️ Tags
```

**3. Daily Note Template** (`daily.md`)

```markdown
---
type: daily
date: <% tp.date.now("YYYY-MM-DD") %>
---

# <% tp.date.now("dddd, MMMM D, YYYY") %>

## 🎯 Top 3 Today
1. [ ]
2. [ ]
3. [ ]

## 📋 Tasks
\`\`\`dataview
TASK
FROM "10-PROJECTS" OR "60-TASKS"
WHERE due = date(today) AND !completed
\`\`\`

## 📝 Notes

## 🌙 End of Day
- Done:
- Blocked:
- Tomorrow:
```

✅ **Checkpoint:** Three template files created in `30-RESOURCES/templates/`

---

### Phase 4: Create Master Dashboard (20 min)

**Create `_master-dashboard.md` in vault root:**

```markdown
---
cssclass: dashboard
---

# 🧠 Nexus Command Center

## 🔥 Today

![[50-DAILY/<% tp.date.now("YYYY/YYYY-MM/YYYY-MM-DD") %>]]

## 📊 Active Projects

### Research
\`\`\`dataview
TABLE status, target-journal, deadline
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
SORT deadline ASC
\`\`\`

### Teaching
\`\`\`dataview
TABLE course, next-lecture
FROM "10-PROJECTS/teaching"
WHERE active = true
\`\`\`

### Packages
\`\`\`dataview
TABLE version, cran-status
FROM "10-PROJECTS/packages"
WHERE type = "package"
\`\`\`

## 📥 Inbox Count
\`\`\`dataview
LIST
FROM "00-INBOX"
LIMIT 5
\`\`\`

## ✅ Recent Completed
\`\`\`dataview
TASK
WHERE completed
SORT completion DESC
LIMIT 5
\`\`\`
```

✅ **Checkpoint:** Dashboard exists and Dataview queries render (may be empty).

---

### Phase 5: Configure QuickAdd Macros (15 min)

**Settings → QuickAdd → Manage Macros**

**Macro 1: Capture Thought**
- Name: "Capture Thought"
- Type: Capture
- File location: `00-INBOX/fleeting-notes/{{DATE:YYYY-MM-DD-HHmm}}.md`
- Template:
```markdown
---
type: fleeting
captured: {{DATE:YYYY-MM-DD HH:mm}}
---

{{VALUE}}
```

**Macro 2: Add Task**
- Name: "Add Task"
- Type: Capture
- File location: `60-TASKS/_task-inbox.md`
- Insert method: Append
- Template: `- [ ] {{VALUE}} #task`

**Set Hotkeys** (Settings → Hotkeys):
- Search "QuickAdd: Capture Thought" → Set to `Cmd+Shift+N`
- Search "QuickAdd: Add Task" → Set to `Cmd+Shift+T`

✅ **Checkpoint:** Try capturing a thought with `Cmd+Shift+N`

---

### Phase 6: Configure Claude (15 min)

**For Claude.ai Web/App:**

Go to Settings → Custom Instructions → Add:

```
You have access to my Nexus vault structure:
- Research projects: 10-PROJECTS/research/
- Teaching: 10-PROJECTS/teaching/
- Literature: 30-RESOURCES/literature/
- Tasks: 60-TASKS/

When I capture ideas, suggest appropriate vault locations.
When I discuss papers, suggest creating literature notes.
When I mention tasks, suggest adding to 60-TASKS/.
Always proactively search vault and create links.
```

**For Claude Code CLI:**

Copy the full system prompt from [docs/claude-integration/system-prompt.md](docs/claude-integration/system-prompt.md) to your Claude Code settings.

✅ **Checkpoint:** Claude understands your vault structure.

---

### Phase 7: Create Your First Project (10 min)

**Example: Research Project**

Create `10-PROJECTS/research/my-first-project/my-first-project.md`:

```markdown
---
type: manuscript
title: "My First Research Project"
status: idea
target-journal: TBD
deadline:
priority: 3
created: 2025-12-21
---

# My First Research Project

## 📋 Status Checklist
- [ ] Literature review
- [ ] Theory developed
- [ ] Draft complete

## 🎯 Core Contribution
> Testing the Nexus system

## 📝 Research Log

### 2025-12-21
- Created project
- Set up vault structure
- Ready to start capturing ideas

## ✅ Tasks
- [ ] Add first literature note
- [ ] Capture research ideas
```

✅ **Checkpoint:** Project appears in dashboard queries.

---

## ✅ Setup Complete!

### You now have:
- ✅ Structured vault with PARA folders
- ✅ 5 essential Obsidian plugins
- ✅ 3 core templates (project, paper, daily)
- ✅ Master dashboard with Dataview queries
- ✅ QuickAdd macros for fast capture
- ✅ Claude configured to understand vault
- ✅ First project created

---

## 🎯 Daily Usage

### Morning Routine (2 min)
1. Open `_master-dashboard.md`
2. Review today's tasks
3. Pick top 3 priorities

### During Day
- **Quick thought:** `Cmd+Shift+N` → type → enter
- **Task:** `Cmd+Shift+T` → type → enter
- **Found paper:** Create note in `30-RESOURCES/literature/`

### End of Day (3 min)
1. Mark completed tasks
2. Move unfinished to tomorrow
3. Quick note on blockers

### Weekly Review (15 min)
1. Review `_master-dashboard`
2. Process `00-INBOX` items
3. Update project status
4. Plan next week

---

## 📚 Current Status

Check project status:
```bash
# View .STATUS file
cat .STATUS

# Or see PROJECT-HUB.md for strategic roadmap
cat PROJECT-HUB.md
```

**Current Phase:** P1 - Standards Implementation (100% complete ✅)
**Next Phase:** P2 - Template Vault Creation

---

## 🆘 Need Help?

**Common Issues:**

| Problem | Solution |
|---------|----------|
| Dataview queries empty | Check file paths, wait for index to build |
| Templates not working | Verify Templater settings, check folder path |
| Hotkeys don't work | Settings → Hotkeys, search and reassign |
| Dashboard not rendering | Enable Dataview plugin, check query syntax |

**Resources:**
- **Detailed Setup:** [docs/getting-started/quickstart.md](docs/getting-started/quickstart.md) - Full 2-hour guide with explanations
- **Architecture:** [docs/architecture/overview.md](docs/architecture/overview.md) - Complete system design
- **Claude Integration:** [docs/claude-integration/system-prompt.md](docs/claude-integration/system-prompt.md) - Full prompt
- **Standards:** Check [standards/](standards/) directory for ADHD-friendly patterns

**Get Stuck?**
1. Read [docs/getting-started/quickstart.md](docs/getting-started/quickstart.md) for detailed explanations
2. Check [docs/architecture/overview.md](docs/architecture/overview.md) for template details
3. Review Obsidian plugin documentation
4. Ask Claude for help (it knows the system!)

---

## 🚀 Next Steps

After running for 1 week:
- [ ] Refine templates based on actual usage
- [ ] Add more literature notes
- [ ] Create your first Quarto lecture from vault notes
- [ ] Set up Git backup (install `obsidian-git` plugin)
- [ ] Customize QuickAdd macros for your workflow
- [ ] Add more areas to 20-AREAS/ for your domains

---

## 💡 Pro Tips

1. **Start Small** - Don't fill everything at once, grow organically
2. **Capture First** - Worry about organization later (that's what 00-INBOX is for)
3. **Link Liberally** - `[[double brackets]]` everywhere
4. **Review Weekly** - Keep dashboards updated, move completed items
5. **Customize Freely** - This is a template, make it yours

---

**Created:** 2025-12-21
**Version:** 1.0
**Estimated Setup Time:** 2 hours
**Difficulty:** Beginner-friendly (no coding required)

---

*Nexus: Connect Everything You Know*
