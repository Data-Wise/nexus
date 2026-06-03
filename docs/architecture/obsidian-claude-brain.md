# Obsidian + Claude Second Brain Architecture
## For Stat-Wise: Causal Inference Research & Teaching

**TL;DR:** Complete system design for Obsidian vault structure, task management, project dashboards, and Claude integration using MCP. Optimized for ADHD workflows with automated capture, context retrieval, and frictionless linking.

---

## 1. Vault Architecture Overview

```
📁 Stat-Wise-Brain/
├── 📁 00-INBOX/                    # Quick capture (process daily)
│   ├── fleeting-notes/             # Raw ideas, thoughts
│   ├── literature-inbox/           # Papers to process
│   └── voice-memos/                # Transcribed audio notes
│
├── 📁 10-PROJECTS/                 # Active work (PARA Method)
│   ├── 📁 research/
│   │   ├── P_med-manuscript/       # Psychological Methods paper
│   │   ├── semiparametric-identification/
│   │   └── _research-dashboard.md  # Overview + status
│   ├── 📁 teaching/
│   │   ├── STAT579-2025/           # Current semester
│   │   ├── STAT440-540/
│   │   └── _teaching-dashboard.md
│   └── 📁 packages/
│       ├── mediationverse/         # Meta-package coordination
│       ├── RMediation/
│       ├── probmed/
│       ├── medrobust/
│       ├── medfit/
│       ├── medsim/
│       └── _packages-dashboard.md
│
├── 📁 20-AREAS/                    # Ongoing responsibilities
│   ├── causal-inference-methods/   # Core expertise area
│   ├── sensitivity-analysis/       # E-values, tipping points
│   ├── mediation-theory/           # NDE/NIE, path-specific
│   ├── semiparametric-inference/   # IF, TMLE, DR
│   └── statistical-pedagogy/       # Teaching methods
│
├── 📁 30-RESOURCES/                # Reference materials
│   ├── 📁 literature/
│   │   ├── by-topic/               # Organized notes
│   │   ├── by-author/              # VanderWeele, Robins, etc.
│   │   └── _literature-index.md
│   ├── 📁 templates/
│   │   ├── paper-note.md
│   │   ├── lecture-module.md
│   │   ├── simulation-study.md
│   │   └── R-function-spec.md
│   ├── 📁 code-snippets/
│   │   ├── R/
│   │   └── python/
│   └── 📁 reference-cards/
│       ├── notation-standards.md
│       ├── journal-requirements.md
│       └── assumption-checklist.md
│
├── 📁 40-ARCHIVE/                  # Completed/inactive
│   ├── completed-papers/
│   ├── past-courses/
│   └── old-projects/
│
├── 📁 50-DAILY/                    # Daily notes + logs
│   ├── 2025/
│   │   ├── 2025-12/
│   │   └── ...
│   └── _weekly-reviews/
│
├── 📁 60-TASKS/                    # Task management hub
│   ├── _task-inbox.md              # Uncategorized tasks
│   ├── _today.md                   # Daily focus
│   ├── _this-week.md               # Weekly planning
│   └── _waiting-for.md             # Delegated/blocked
│
└── 📁 _SYSTEM/                     # Vault config
    ├── claude-prompts/             # Reusable prompts
    ├── dataview-queries/           # Dashboard queries
    └── templates/                  # Obsidian templates
```

---

## 2. Project Dashboard System

### Master Dashboard (`_master-dashboard.md`)

```markdown
---
cssclass: dashboard
---

# 🧠 Stat-Wise Command Center

## 🔥 Today's Focus
```dataview
TASK
FROM "60-TASKS/_today"
WHERE !completed
SORT priority DESC
```

## 📊 Active Projects

### Research Papers
```dataview
TABLE 
  status as "Status",
  target-journal as "Journal",
  deadline as "Deadline",
  next-action as "Next"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
SORT deadline ASC
```

### Package Development
```dataview
TABLE
  version as "Version",
  cran-status as "CRAN",
  next-release as "Target"
FROM "10-PROJECTS/packages"
WHERE type = "package"
```

### Teaching
```dataview
TABLE
  course as "Course",
  next-lecture as "Next Lecture",
  prep-status as "Prep"
FROM "10-PROJECTS/teaching"
WHERE active = true
```

## 📈 Weekly Progress
![[_weekly-reviews/2025-W51]]

## 🎯 Quick Actions
- [[P_med-manuscript/_tasks|P_med Tasks]]
- [[STAT579-2025/_prep|Lecture Prep]]
- [[mediationverse/_issues|Package Issues]]
```

### Research Project Template (`10-PROJECTS/research/_template.md`)

```markdown
---
type: manuscript
title: "{{title}}"
status: "idea | drafting | revision | submitted | published"
target-journal: ""
deadline: {{date}}
collaborators: []
tags: [research, manuscript]
created: {{date:YYYY-MM-DD}}
---

# {{title}}

## 📋 Project Status
- [ ] Literature review complete
- [ ] Theory developed
- [ ] Simulations designed
- [ ] Simulations run
- [ ] Application identified
- [ ] Draft complete
- [ ] Internal review
- [ ] Submitted

## 🎯 Core Contribution
> One sentence: What's new?

## 📐 Key Results
1. **Theorem 1**: 
2. **Corollary 1**: 

## 🔗 Linked Resources
- Literature: [[30-RESOURCES/literature/...]]
- Code: `~/repos/{{repo}}/`
- Simulations: [[simulations/...]]

## 📝 Notes
### Research Log
```dataview
LIST
FROM "50-DAILY"
WHERE contains(file.outlinks, this.file.link)
SORT file.name DESC
LIMIT 10
```

## ✅ Tasks
```dataview
TASK
FROM "10-PROJECTS/research/{{folder}}"
WHERE !completed
```

## 📎 Files
- [ ] manuscript.tex
- [ ] supplement.tex
- [ ] figures/
- [ ] simulations/
- [ ] replication-code/
```

---

## 3. Task Management System

### Task Capture Workflow

```markdown
# Task Properties (YAML frontmatter)
---
type: task
project: "[[P_med-manuscript]]"
priority: 1-5  # 1=urgent, 5=someday
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h | half-day | full-day
context: @computer | @read | @write | @code | @review
due: YYYY-MM-DD
waiting-for: ""
tags: [task]
---
```

### Daily Task View (`60-TASKS/_today.md`)

```markdown
# Today: {{date:dddd, MMMM D, YYYY}}

## 🎯 Top 3 Priorities
1. [ ] 
2. [ ] 
3. [ ] 

## 📋 All Tasks Due Today
```dataview
TASK
FROM "10-PROJECTS" OR "20-AREAS"
WHERE due = date(today) AND !completed
SORT priority ASC
```

## ⚡ Quick Wins (< 15 min)
```dataview
TASK
WHERE time-estimate = "15m" AND !completed
LIMIT 5
```

## 🧠 Deep Work Blocks
| Time | Task | Project |
|------|------|---------|
| 9-11 AM | | |
| 2-4 PM | | |

## 📥 Inbox to Process
```dataview
LIST
FROM "00-INBOX/fleeting-notes"
SORT file.ctime DESC
LIMIT 10
```

## 📝 End of Day
- What got done:
- What blocked me:
- Tomorrow's top priority:
```

### Weekly Review Template (`50-DAILY/_weekly-reviews/_template.md`)

```markdown
---
type: weekly-review
week: {{date:YYYY-[W]ww}}
---

# Weekly Review: {{date:YYYY-[W]ww}}

## 🏆 Wins
- 

## 📊 Project Progress

### Research
| Project | Progress | Blockers |
|---------|----------|----------|
| P_med | | |
| Semiparametric | | |

### Teaching
| Course | Lectures Delivered | Prep Status |
|--------|-------------------|-------------|
| STAT 579 | | |

### Packages
| Package | Commits | Issues Closed |
|---------|---------|---------------|
| RMediation | | |
| probmed | | |

## 🔄 What Didn't Work
- 

## 🎯 Next Week's Priorities
1. 
2. 
3. 

## 📅 Calendar Review
- Key meetings:
- Deadlines:
- Travel:
```

---

## 4. Literature Management System

### Paper Note Template (`30-RESOURCES/templates/paper-note.md`)

```markdown
---
type: literature
title: "{{title}}"
authors: []
year: {{year}}
journal: ""
doi: ""
tags: [literature]
rating: ⭐⭐⭐⭐⭐
read-status: "to-read | reading | read | processed"
relevance:
  - P_med: low | medium | high
  - teaching: low | medium | high
  - packages: low | medium | high
---

# {{title}}

## 📋 Quick Reference
- **Authors**: {{authors}}
- **Year**: {{year}}
- **Journal**: {{journal}}
- **DOI**: {{doi}}

## 🎯 Core Contribution
> One sentence summary

## 🔑 Key Ideas
1. 
2. 
3. 

## 📐 Notation & Setup
- $Y$: 
- $A$: 
- $M$: 

## 💡 Key Results
### Theorem/Proposition
> 

### Key Equation
$$

$$

## 🔗 Connections
- **Builds on**: [[...]]
- **Extended by**: [[...]]
- **Contradicts**: [[...]]
- **Applies to my work**: [[...]]

## 📝 My Notes
### Strengths
- 

### Limitations
- 

### Questions
- 

## 🏷️ Tags
#mediation #sensitivity-analysis #semiparametric

## 📎 PDF Location
`~/Zotero/storage/...`
```

### Literature Index (`30-RESOURCES/literature/_literature-index.md`)

```markdown
# Literature Index

## By Topic

### Causal Mediation
```dataview
TABLE 
  year as "Year",
  authors as "Authors",
  rating as "Rating"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "mediation")
SORT year DESC
```

### Sensitivity Analysis
```dataview
TABLE 
  year as "Year",
  authors as "Authors"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "sensitivity-analysis")
SORT year DESC
```

### Semiparametric Theory
```dataview
TABLE 
  year as "Year",
  authors as "Authors"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "semiparametric")
SORT year DESC
```

## By Author

### VanderWeele
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE contains(authors, "VanderWeele")
SORT year DESC
```

### Robins
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE contains(authors, "Robins")
SORT year DESC
```

## Recently Added
```dataview
TABLE 
  title as "Title",
  read-status as "Status"
FROM "30-RESOURCES/literature"
SORT file.ctime DESC
LIMIT 20
```

## To Read Queue
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE read-status = "to-read"
SORT relevance.P_med DESC
```
```

---

## 5. Claude Integration Architecture

### MCP Server Configuration

```json
{
  "mcpServers": {
    "obsidian-vault": {
      "command": "node",
      "args": ["/path/to/obsidian-mcp-server/index.js"],
      "env": {
        "VAULT_PATH": "/Users/stat-wise/Obsidian/Stat-Wise-Brain",
        "ALLOWED_OPERATIONS": "read,write,search,create"
      }
    },
    "r-terminal": {
      "command": "node", 
      "args": ["/path/to/r-mcp-server/index.js"],
      "env": {
        "R_HOME": "/Library/Frameworks/R.framework/Resources"
      }
    },
    "git-repos": {
      "command": "node",
      "args": ["/path/to/git-mcp-server/index.js"],
      "env": {
        "REPOS_PATH": "/Users/stat-wise/repos"
      }
    }
  }
}
```

### Claude System Prompt for Vault Access

```markdown
# OBSIDIAN VAULT BRAIN CONTEXT

You have access to my Obsidian vault at ~/Obsidian/Stat-Wise-Brain/
Use MCP tools to read, search, and write files.

## Vault Structure (Quick Reference)
- 00-INBOX: Unprocessed captures
- 10-PROJECTS: Active work (research, teaching, packages)
- 20-AREAS: Ongoing domains (causal inference, mediation)
- 30-RESOURCES: Literature, templates, snippets
- 40-ARCHIVE: Completed work
- 50-DAILY: Daily notes
- 60-TASKS: Task management

## Active Projects (Current Priority)
1. P_med manuscript → Psychological Methods
2. STAT 579 lecture prep → Week 16
3. RMediation v2.0 → CRAN submission

## Key Linking Conventions
- Research notes: [[10-PROJECTS/research/...]]
- Literature: [[30-RESOURCES/literature/...]]
- Code refs: `~/repos/package-name/R/function.R`

## When I Say...
- "Capture this" → Create note in 00-INBOX/fleeting-notes/
- "Add to P_med" → Update 10-PROJECTS/research/P_med-manuscript/
- "Link paper" → Create literature note in 30-RESOURCES/
- "Show my tasks" → Query 60-TASKS/
- "Update dashboard" → Refresh relevant _dashboard.md file

## ADHD Optimizations
- Always show progress: [3/7 complete]
- Time estimates for every task
- Break large tasks into subtasks
- Create links immediately (don't defer)
- Surface related notes proactively
```

### Workflow Automation Scripts

#### 1. Paper Capture (`_SYSTEM/claude-prompts/capture-paper.md`)

```markdown
# Paper Capture Prompt

When I share a paper (PDF, URL, or citation):

1. **Extract metadata**:
   - Title, authors, year, journal, DOI
   
2. **Create literature note**:
   - Location: 30-RESOURCES/literature/by-topic/{topic}/
   - Filename: {FirstAuthor}{Year}-{short-title}.md
   - Use template: 30-RESOURCES/templates/paper-note.md

3. **Auto-link to projects**:
   - Check relevance to: P_med, STAT579, mediationverse
   - Add bidirectional links

4. **Update indexes**:
   - Add to _literature-index.md
   - Tag appropriately

5. **Create task if needed**:
   - "Read and summarize [[paper]]" → 60-TASKS/_task-inbox.md
```

#### 2. Research → Teaching Bridge (`_SYSTEM/claude-prompts/research-to-teaching.md`)

```markdown
# Research to Teaching Conversion

When I say "Create lecture on {topic}":

1. **Search vault for existing materials**:
   - 30-RESOURCES/literature/ (relevant papers)
   - 20-AREAS/{topic}/ (area notes)
   - 10-PROJECTS/packages/ (code examples)

2. **Check my R packages for examples**:
   - RMediation: CI methods
   - probmed: P_med computation
   - medrobust: sensitivity analysis

3. **Generate Quarto lecture**:
   - Follow statistical-pedagogy-framework skill
   - Use STAT 579 template
   - Include:
     - Hook + motivation (Section 1)
     - Numerical example (Section 2)
     - Math formalization (Section 3)
     - R code examples (Section 5-6)
     - Practice problems (Section 7)

4. **Create files**:
   - 10-PROJECTS/teaching/STAT579-2025/lectures/{n}-{topic}.qmd
   - 10-PROJECTS/teaching/STAT579-2025/labs/{n}-lab.R

5. **Update dashboard**:
   - Mark lecture as "prepared" in _teaching-dashboard.md
```

#### 3. Code → Documentation Bridge (`_SYSTEM/claude-prompts/code-to-docs.md`)

```markdown
# Code to Documentation

When I implement a new function:

1. **Read the implementation**:
   - ~/repos/{package}/R/{function}.R

2. **Create vault documentation**:
   - 20-AREAS/causal-inference-methods/{function-concept}.md
   - Link to: mathematical theory, related literature

3. **Update package docs**:
   - Ensure roxygen2 is complete
   - Add to vignette if user-facing
   - Update pkgdown site

4. **Cross-reference**:
   - Link function to relevant papers in vault
   - Add code snippet to 30-RESOURCES/code-snippets/R/
```

---

## 6. Daily Workflow Integration

### Morning Routine (5 min)

```markdown
# Morning Startup Prompt

Claude, run my morning routine:

1. Show today's calendar events
2. List top 3 tasks from _today.md
3. Check for any deadlines this week
4. Show inbox count (00-INBOX items to process)
5. Suggest one quick win (<15 min)
```

### End of Day (5 min)

```markdown
# End of Day Prompt

Claude, run my shutdown routine:

1. Mark completed tasks in today's note
2. Capture any loose thoughts to 00-INBOX
3. Move incomplete tasks to tomorrow
4. Create tomorrow's _today.md
5. Show progress on active projects
```

### Weekly Review (30 min)

```markdown
# Weekly Review Prompt

Claude, generate my weekly review:

1. Create new weekly review note from template
2. Aggregate completed tasks from daily notes
3. Calculate project progress percentages
4. Identify blocked items
5. Suggest priorities for next week
6. Archive processed inbox items
```

---

## 7. Obsidian Plugin Stack

### Essential Plugins

| Plugin | Purpose | ADHD Benefit |
|--------|---------|--------------|
| **Dataview** | Dynamic queries, dashboards | Live task views |
| **Templater** | Advanced templates | Consistent capture |
| **Calendar** | Visual daily notes | Navigate time easily |
| **Tasks** | Task management | Due dates, recurrence |
| **Obsidian Git** | Auto-backup | Peace of mind |
| **QuickAdd** | Fast capture | Reduce friction |
| **Periodic Notes** | Daily/weekly notes | Routine support |
| **Kanban** | Visual project boards | See progress |
| **Excalidraw** | Visual thinking | DAG drawing |
| **Zotero Integration** | Literature management | Auto-import papers |

### QuickAdd Macros

```javascript
// Capture Fleeting Note
module.exports = async (params) => {
  const { quickAddApi } = params;
  const content = await quickAddApi.inputPrompt("Quick thought:");
  const date = moment().format("YYYY-MM-DD-HHmm");
  const path = `00-INBOX/fleeting-notes/${date}.md`;
  
  await app.vault.create(path, `---
type: fleeting
captured: ${moment().format()}
processed: false
---

${content}

---
*Captured via QuickAdd*
`);
};
```

```javascript
// Capture Task
module.exports = async (params) => {
  const { quickAddApi } = params;
  const task = await quickAddApi.inputPrompt("Task:");
  const project = await quickAddApi.suggester(
    ["P_med", "STAT579", "RMediation", "probmed", "Other"],
    ["P_med-manuscript", "STAT579-2025", "RMediation", "probmed", "inbox"]
  );
  
  // Append to appropriate file
  const targetFile = project === "inbox" 
    ? "60-TASKS/_task-inbox.md"
    : `10-PROJECTS/research/${project}/_tasks.md`;
    
  await app.vault.append(targetFile, `\n- [ ] ${task}`);
};
```

---

## 8. Connection Map: Vault ↔ Repos ↔ Output

```
┌─────────────────────────────────────────────────────────────────┐
│                     OBSIDIAN VAULT (Brain)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Literature │  │   Projects  │  │    Tasks    │             │
│  │   Notes     │──│   (P_med,   │──│   (Daily,   │             │
│  │             │  │   STAT579)  │  │   Weekly)   │             │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘             │
│         │                │                                      │
└─────────┼────────────────┼──────────────────────────────────────┘
          │                │
          ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CLAUDE (Brain Interface)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Skills    │  │  MCP Tools  │  │  Past Chats │             │
│  │  (17 skills)│  │  (FS, Bash, │  │  (Memory)   │             │
│  │             │  │   Notes)    │  │             │             │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘             │
│         │                │                                      │
└─────────┼────────────────┼──────────────────────────────────────┘
          │                │
          ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CODE REPOS (Builder)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │RMediation│  │ probmed  │  │medrobust │  │  medsim  │        │
│  │   R/     │  │   R/     │  │   R/     │  │   R/     │        │
│  │  tests/  │  │  tests/  │  │  tests/  │  │  tests/  │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │             │             │             │               │
└───────┼─────────────┼─────────────┼─────────────┼───────────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT (Deliverables)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Manuscripts │  │   Lectures   │  │   Packages   │          │
│  │  (LaTeX/PDF) │  │   (Quarto)   │  │   (CRAN)     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1) ⏱️ 4 hours

- [ ] Create vault folder structure
- [ ] Install essential plugins (Dataview, Templater, Tasks)
- [ ] Create core templates (paper, project, task)
- [ ] Set up Git backup
- [ ] Create master dashboard

### Phase 2: Migration (Week 2) ⏱️ 6 hours

- [ ] Import existing literature notes
- [ ] Create project folders for active work
- [ ] Set up QuickAdd capture macros
- [ ] Configure daily/weekly note templates
- [ ] Link existing research notes

### Phase 3: Claude Integration (Week 3) ⏱️ 4 hours

- [ ] Configure MCP servers (if available)
- [ ] Create Claude prompts for common workflows
- [ ] Test vault read/write via Claude
- [ ] Set up automation scripts
- [ ] Create custom skill for vault navigation

### Phase 4: Optimization (Week 4+) ⏱️ Ongoing

- [ ] Refine dashboards based on usage
- [ ] Add missing templates as needed
- [ ] Tune Dataview queries
- [ ] Build additional QuickAdd macros
- [ ] Document personal conventions

---

## 10. Quick Reference Card

### Keyboard Shortcuts (Recommended)

| Action | Shortcut |
|--------|----------|
| Quick capture | `Cmd+Shift+N` |
| Open today | `Cmd+T` |
| Search vault | `Cmd+O` |
| Create task | `Cmd+Shift+T` |
| Open dashboard | `Cmd+D` |
| Run QuickAdd | `Cmd+Shift+A` |

### Frontmatter Cheatsheet

```yaml
# Project
type: manuscript | package | course
status: idea | active | review | complete
priority: 1-5
deadline: YYYY-MM-DD

# Literature
type: literature
rating: ⭐-⭐⭐⭐⭐⭐
read-status: to-read | reading | read

# Task
type: task
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h
context: @computer | @read | @write
```

### Tag Taxonomy

```
#research     #teaching    #packages
#mediation    #sensitivity #semiparametric
#STAT579      #STAT440     
#RMediation   #probmed     #medrobust
#idea         #blocked     #waiting
```

---

*Architecture designed for ADHD-optimized workflows with Claude as the cognitive interface.*
