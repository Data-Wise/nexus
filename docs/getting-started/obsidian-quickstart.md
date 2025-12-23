# Quick Start: Obsidian + Claude Brain Setup
## Get Running in 2 Hours

---

## TL;DR

1. **Install Obsidian** → Create vault
2. **Copy folder structure** → 7 main folders
3. **Install 5 plugins** → Dataview, Templater, Tasks, QuickAdd, Calendar
4. **Create 3 templates** → Project, Paper, Task
5. **Add Claude prompt** → Copy system prompt to settings
6. **Start using it** → Capture something now

---

## Phase 1: Vault Creation [30 min]

### Step 1: Create Vault

```bash
mkdir -p ~/Obsidian/Stat-Wise-Brain
cd ~/Obsidian/Stat-Wise-Brain

# Create folder structure
mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS/{causal-inference-methods,sensitivity-analysis,mediation-theory}
mkdir -p 30-RESOURCES/{literature/by-topic,templates,code-snippets/R}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/2025
mkdir -p 60-TASKS
mkdir -p _SYSTEM/{claude-prompts,dataview-queries}
```

### Step 2: Open in Obsidian

1. Open Obsidian
2. "Open folder as vault"
3. Select `~/Obsidian/Stat-Wise-Brain`

---

## Phase 2: Plugin Setup [20 min]

### Install These Plugins

Settings → Community Plugins → Browse

| Plugin | What It Does |
|--------|--------------|
| **Dataview** | Dynamic queries for dashboards |
| **Templater** | Advanced templates |
| **Tasks** | Task management |
| **QuickAdd** | Fast capture |
| **Calendar** | Visual daily notes |

### Configure Templater

Settings → Templater:
- Template folder: `30-RESOURCES/templates`
- Enable "Trigger on file creation"

### Configure Tasks

Settings → Tasks:
- Global filter: `#task` (optional)

---

## Phase 3: Core Templates [30 min]

### Template 1: Project (`30-RESOURCES/templates/project.md`)

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

### Template 2: Paper Note (`30-RESOURCES/templates/paper-note.md`)

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

### Template 3: Daily Note (`30-RESOURCES/templates/daily.md`)

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
```dataview
TASK
FROM "10-PROJECTS" OR "60-TASKS"
WHERE due = date(today) AND !completed
```

## 📝 Notes

## 🌙 End of Day
- Done:
- Blocked:
- Tomorrow:
```

---

## Phase 4: Master Dashboard [20 min]

Create `_master-dashboard.md` in vault root:

```markdown
---
cssclass: dashboard
---

# 🧠 Command Center

## 🔥 Today
![[50-DAILY/<% tp.date.now("YYYY/YYYY-MM/YYYY-MM-DD") %>]]

## 📊 Active Projects

### Research
```dataview
TABLE status, target-journal, deadline
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
SORT deadline ASC
```

### Teaching
```dataview
TABLE course, next-lecture
FROM "10-PROJECTS/teaching"
WHERE active = true
```

### Packages
```dataview
TABLE version, cran-status
FROM "10-PROJECTS/packages"
WHERE type = "package"
```

## 📥 Inbox Count
```dataview
LIST
FROM "00-INBOX"
LIMIT 5
```

## ✅ Recent Completed
```dataview
TASK
WHERE completed
SORT completion DESC
LIMIT 5
```
```

---

## Phase 5: Create Your First Projects [15 min]

### P_med Manuscript

Create: `10-PROJECTS/research/P_med-manuscript/P_med.md`

```markdown
---
type: manuscript
title: "Probability of Mediated Effect (P_med)"
status: drafting
target-journal: Psychological Methods
deadline: 2025-03-01
priority: 1
---

# P_med Manuscript

## 📋 Status
- [x] Literature review
- [x] Theory (P_med definition)
- [ ] MBCO inference procedure
- [ ] Simulation study
- [ ] Empirical application
- [ ] Draft complete

## 🎯 Core Contribution
Scale-free effect size for mediation, robust to small total effects

## 🔗 Links
- Package: [[probmed]]
- Related: [[Tofighi2020-RMediation]]
```

### STAT 579 Course

Create: `10-PROJECTS/teaching/STAT579-2025/STAT579.md`

```markdown
---
type: course
title: "STAT 579: Applied Causal Inference"
semester: Spring 2025
active: true
---

# STAT 579

## 📅 Lecture Schedule
| Week | Topic | Status |
|------|-------|--------|
| 1 | Causal Inference Foundations | ✅ |
| 2 | DAGs | ✅ |
| 3 | Propensity Scores | 🔄 |
| ... | ... | |

## 📁 Materials
- Lectures: `lectures/`
- Labs: `labs/`
- Problem Sets: `assignments/`
```

---

## Phase 6: QuickAdd Macros [10 min]

Settings → QuickAdd → Manage Macros

### Macro 1: Capture Thought

- Name: "Capture Thought"
- Template: 
```markdown
---
type: fleeting
captured: {{DATE:YYYY-MM-DD HH:mm}}
---

{{VALUE}}
```
- Output: `00-INBOX/fleeting-notes/{{DATE:YYYY-MM-DD-HHmm}}.md`

### Macro 2: Add Task

- Name: "Add Task"
- Template: `- [ ] {{VALUE}} #task`
- Output: Append to `60-TASKS/_task-inbox.md`

### Hotkeys

- `Cmd+Shift+N`: Capture Thought
- `Cmd+Shift+T`: Add Task

---

## Phase 7: Claude Integration [5 min]

### For Claude.ai Web/App

Add to your **User Preferences** in Claude settings:

```
Always reference my Obsidian vault structure when discussing my work:
- Research projects: 10-PROJECTS/research/
- Teaching: 10-PROJECTS/teaching/STAT579-2025/
- Literature: 30-RESOURCES/literature/
- Active packages: mediationverse (RMediation, probmed, medrobust)

When I capture ideas, suggest appropriate vault locations.
When I discuss papers, suggest creating literature notes.
When I mention tasks, suggest adding to 60-TASKS/.
```

### For Claude Code CLI

Copy the system prompt from `claude-obsidian-system-prompt.md` to your Claude Code configuration.

---

## Daily Usage Cheatsheet

### Morning (2 min)
1. Open `_master-dashboard.md`
2. Review today's tasks
3. Pick top 3 priorities

### During Day
- **Quick thought**: `Cmd+Shift+N` → type → enter
- **Task**: `Cmd+Shift+T` → type → enter
- **Found paper**: Create note in `30-RESOURCES/literature/`

### End of Day (3 min)
1. Mark completed tasks
2. Move unfinished to tomorrow
3. Quick note on blockers

### Weekly (15 min)
1. Review `_master-dashboard`
2. Process `00-INBOX` items
3. Update project status
4. Plan next week

---

## Your First 5 Actions Right Now

1. **Create the vault** with folder structure
2. **Install plugins** (Dataview, Templater, Tasks, QuickAdd, Calendar)
3. **Create P_med project** note
4. **Capture one thought** using QuickAdd
5. **Add one task** to inbox

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Dataview queries empty | Wait for index, check file paths |
| Templates not working | Check Templater settings, folder path |
| Hotkeys don't work | Settings → Hotkeys, search and set |
| Daily note not created | Calendar → click on date |

---

## Next Steps

After running for 1 week:
- [ ] Refine templates based on actual usage
- [ ] Add more literature notes
- [ ] Create first Quarto lecture from vault
- [ ] Set up Git backup (`obsidian-git` plugin)

---

*Start simple. Build as you use it. The system grows with you.*
