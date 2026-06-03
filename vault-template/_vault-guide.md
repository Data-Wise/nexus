---
cssclass: documentation
tags: [guide, reference, complete]
---

# Complete Vault Reference Guide

> **Comprehensive documentation** for every folder, template, and workflow in Nexus

---

## 📖 Table of Contents

1. [Folder Structure](#folder-structure)
2. [Template Reference](#template-reference)
3. [Dashboard Reference](#dashboard-reference)
4. [Dataview Query Examples](#dataview-query-examples)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [Metadata Fields](#metadata-fields)
7. [Advanced Workflows](#advanced-workflows)
8. [Troubleshooting](#troubleshooting)

---

## 📁 Folder Structure

### Complete Directory Tree

```
vault-template/
├── _master-dashboard.md          Main control panel
├── _getting-started.md            Usage guide
├── _vault-guide.md                This file
├── README.md                      Setup instructions
│
├── 00-INBOX/                      Quick capture
│   ├── fleeting-notes/            Raw thoughts
│   ├── literature-inbox/          PDFs to process
│   └── voice-memos/               Audio transcriptions
│
├── 10-PROJECTS/                   Active work
│   ├── research/                  Manuscripts, studies
│   │   └── _research-dashboard.md Research overview
│   ├── teaching/                  Courses, lectures
│   │   └── _teaching-dashboard.md Teaching overview
│   └── packages/                  R package development
│       └── _packages-dashboard.md  Package overview
│
├── 20-AREAS/                      Ongoing domains
│   ├── causal-inference-methods/  Core expertise
│   ├── sensitivity-analysis/      E-values, tipping points
│   ├── mediation-theory/          NDE/NIE theory
│   └── statistical-pedagogy/      Teaching methods
│
├── 30-RESOURCES/                  Reference library
│   ├── literature/                Paper notes
│   │   ├── by-topic/              Organized by area
│   │   ├── by-author/             Organized by author
│   │   └── _literature-index.md   Literature dashboard
│   ├── templates/                 Note templates
│   │   ├── project.md             Project template
│   │   ├── paper-note.md          Literature template
│   │   ├── daily.md               Daily note template
│   │   ├── lecture.md             Teaching template
│   │   ├── task.md                Task template
│   │   └── weekly-review.md       Weekly review template
│   ├── code-snippets/             Reusable code
│   │   ├── R/                     R functions
│   │   └── python/                Python scripts
│   └── reference-cards/           Quick references
│
├── 40-ARCHIVE/                    Completed/inactive
│   ├── completed-papers/          Published manuscripts
│   ├── past-courses/              Old semesters
│   └── old-projects/              Inactive projects
│
├── 50-DAILY/                      Daily notes
│   └── YYYY/YYYY-MM/YYYY-MM-DD.md Daily journal
│
├── 60-TASKS/                      Task management
│   ├── _today.md                  Today's focus
│   ├── _this-week.md              Weekly planning
│   ├── _waiting-for.md            Blocked tasks
│   └── _example-tasks.md          Example tasks
│
└── _SYSTEM/                       Configuration
    ├── claude-prompts/            Reusable prompts
    ├── dataview-queries/          Query library
    ├── templates/                 System templates
    ├── quickadd-config.json       QuickAdd settings
    └── QUICKADD-SETUP.md          Setup guide
```

---

## 📝 Template Reference

### 1. Project Template

**File**: `30-RESOURCES/templates/project.md`
**Shortcut**: `Cmd+Shift+R` → Research Project
**Location**: `10-PROJECTS/research/`

**YAML Frontmatter**:
```yaml
type: manuscript          # or: package, course
title: "Project Name"
status: "idea"            # idea | drafting | revision | submitted | published
target-journal: ""        # e.g., "JASA", "Biometrics"
deadline: YYYY-MM-DD
collaborators: []         # List of co-authors
tags: [research, manuscript]
created: YYYY-MM-DD
priority: 3               # 1 (highest) to 5 (lowest)
progress: 0               # 0-100
```

**Sections**:
- Project Status (checklist)
- Core Contribution (one sentence)
- Key Results (theorems, findings)
- Linked Resources (literature, code, simulations)
- Research Log (auto-query daily notes)
- Tasks (auto-query project tasks)
- Files (checklist)

**Use for**: Manuscripts, R packages, course development

---

### 2. Paper Note Template

**File**: `30-RESOURCES/templates/paper-note.md`
**Shortcut**: `Cmd+Shift+P`
**Location**: `30-RESOURCES/literature/`

**YAML Frontmatter**:
```yaml
type: literature
title: "Full Paper Title"
authors: ["Author One", "Author Two"]
year: YYYY
journal: ""               # Full journal name
doi: ""
tags: [literature]
rating: ⭐⭐⭐           # 1-6 stars
read-status: "to-read"    # to-read | reading | read | processed
relevance:
  - research: medium      # low | medium | high
  - teaching: low
  - packages: low
created: YYYY-MM-DD
```

**Sections**:
- Quick Reference (authors, year, journal, DOI)
- Core Contribution (one sentence)
- Key Ideas (numbered list)
- Notation & Setup (mathematical notation)
- Key Results (theorems, equations)
- Connections (builds on, extended by, applies to)
- My Notes (strengths, limitations, questions)
- Tags
- PDF Location

**Use for**: Research papers, books, methodological references

---

### 3. Daily Note Template

**File**: `30-RESOURCES/templates/daily.md`
**Shortcut**: Auto-created (Cmd+P → "today")
**Location**: `50-DAILY/YYYY/YYYY-MM/`

**YAML Frontmatter**:
```yaml
type: daily-note
date: YYYY-MM-DD
day: Monday               # Auto-filled day of week
week: YYYY-WXX           # ISO week number
tags: [daily]
```

**Sections**:
- Today's Focus (3 priority tasks)
- Notes (research, teaching, packages)
- Completed Today (auto-query)
- Quick Links (dashboards)
- Reflections
- Navigation (← prev | next →)

**Use for**: Daily journaling, logging work, linking to projects

---

### 4. Lecture Template

**File**: `30-RESOURCES/templates/lecture.md`
**Shortcut**: `Cmd+Shift+R` → Lecture
**Location**: `10-PROJECTS/teaching/`

**YAML Frontmatter**:
```yaml
type: lecture
course: ""                # e.g., "STAT 579"
week: X
topic: "Lecture Topic"
date: YYYY-MM-DD
duration: 75              # minutes
tags: [teaching, lecture]
status: "planning"        # planning | ready | delivered
prep-time: 0              # hours spent preparing
```

**Sections**:
- Lecture Info
- Learning Objectives (numbered)
- Prerequisites
- Outline (timed sections: Part 1, Part 2, etc.)
- Key Concepts (definitions)
- Key Equations
- R Code Examples
- Prep Checklist
- Materials (files/paths)
- Related (prev/next lectures, readings)

**Use for**: Course lectures, workshops, seminars

---

### 5. Task Template

**File**: `30-RESOURCES/templates/task.md`
**Shortcut**: `Cmd+Shift+T`
**Location**: `60-TASKS/`

**YAML Frontmatter**:
```yaml
type: task
title: "Task Description"
status: "pending"         # pending | in-progress | completed | blocked
priority: 3               # 1 (critical) to 5 (someday)
project: ""               # Link to project
context: "@computer"      # @computer | @read | @write | @code | @review
energy: "medium"          # high | medium | low
time-estimate: "30m"      # 15m | 30m | 1h | 2h | half-day | full-day
tags: [task]
created: YYYY-MM-DD
due:                      # Optional deadline
```

**Sections**:
- Task Details (metadata summary)
- Outcome (what "done" looks like)
- Subtasks (checklist)
- Related (project, notes, dependencies)
- Blockers
- Notes
- Resources

**Use for**: Any actionable item requiring tracking

---

### 6. Weekly Review Template

**File**: `30-RESOURCES/templates/weekly-review.md`
**Shortcut**: Manual creation
**Location**: `50-DAILY/_weekly-reviews/`

**YAML Frontmatter**:
```yaml
type: weekly-review
week: YYYY-WXX
date: YYYY-MM-DD          # Friday of the week
tags: [review, weekly]
```

**Sections**:
- Wins This Week (tables for research, teaching, packages)
- Metrics (completed tasks, daily notes created)
- What Didn't Work
- Learnings
- Next Week's Priorities (top 3 + detailed)
- Calendar Review
- Inbox Status

**Use for**: Weekly reflection, planning, tracking metrics

---

## 📊 Dashboard Reference

### Master Dashboard

**File**: `_master-dashboard.md`

**Sections**:
1. **Today's Focus** - Tasks from `60-TASKS/_today`
2. **Active Projects** - Research, teaching, packages (by status)
3. **Inbox** - Items needing processing + count
4. **Recent Literature** - Last 5 papers added
5. **Recently Completed** - Tasks completed in last 7 days
6. **Quick Navigation** - Links to all specialized dashboards
7. **Weekly Progress** - Link to latest weekly review

**When to use**: Every morning as your "home base"

---

### Research Dashboard

**File**: `10-PROJECTS/research/_research-dashboard.md`

**Sections**:
1. **Active Manuscripts** - Drafting & revision status
2. **Ideas & Planning** - Projects in "idea" stage
3. **Under Review** - Submitted manuscripts
4. **Published** - Completed work
5. **Research Tasks** - High priority & due this week
6. **Related Literature** - Papers marked as high/medium relevance for research

**When to use**: Planning research priorities, tracking manuscripts

---

### Teaching Dashboard

**File**: `10-PROJECTS/teaching/_teaching-dashboard.md`

**Sections**:
1. **Current Courses** - Active courses by week
2. **Lectures to Prepare** - Upcoming lectures (status: planning)
3. **Prep Checklist** - This week's lecture tasks
4. **Course Materials** - Lectures by course
5. **Teaching-Related Literature** - Papers relevant to teaching
6. **Teaching Tasks** - High priority tasks

**When to use**: Weekly lecture prep, course planning

---

### Packages Dashboard

**File**: `10-PROJECTS/packages/_packages-dashboard.md`

**Sections**:
1. **Active Development** - Packages in development
2. **Testing & CI** - Test status, coverage
3. **Issues & TODOs** - High priority issues, feature requests
4. **Package Documentation** - README links
5. **Mediationverse Ecosystem** - Meta-package coordination
6. **Package-Related Literature** - Methodological papers
7. **Development Tasks** - This week's package work

**When to use**: Sprint planning, issue triage, release prep

---

### Literature Index

**File**: `30-RESOURCES/literature/_literature-index.md`

**Sections**:
1. **To Read** - Papers in queue
2. **Currently Reading** - Active reading list
3. **Highly Rated Papers** - 4+ star papers
4. **By Topic** - Causal mediation, sensitivity analysis, semiparametric theory
5. **By Author** - VanderWeele, Robins, Tchetgen Tchetgen
6. **Reading Stats** - Total papers, by status counts

**When to use**: Finding papers on a topic, tracking reading progress

---

## 🔍 Dataview Query Examples

### Basic Queries

**List all files in folder**:
```dataview
LIST
FROM "10-PROJECTS/research"
```

**Table with specific fields**:
```dataview
TABLE
  status,
  progress,
  deadline
FROM "10-PROJECTS"
WHERE type = "manuscript"
```

**Filter by condition**:
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE rating >= "⭐⭐⭐⭐"
SORT year DESC
```

---

### Advanced Queries

**Tasks due this week**:
```dataview
TASK
FROM "60-TASKS" OR "10-PROJECTS"
WHERE !completed
  AND (due <= date(today) + dur(7 days))
SORT due ASC
```

**Completed tasks today**:
```dataview
TASK
FROM "60-TASKS" OR "10-PROJECTS"
WHERE completed
  AND date(completion) = date(today)
```

**Papers by topic**:
```dataview
TABLE
  authors as "Authors",
  year as "Year",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "#mediation")
SORT year DESC
```

**Project research log** (daily notes mentioning project):
```dataview
LIST
FROM "50-DAILY"
WHERE contains(file.outlinks, this.file.link)
SORT file.name DESC
LIMIT 10
```

---

### Inline Queries

**Count items**:
```
Total papers: `$= dv.pages('"30-RESOURCES/literature"').length`
```

**Filter and count**:
```
To read: `$= dv.pages('"30-RESOURCES/literature"').where(p => p["read-status"] == "to-read").length`
```

**Current date**:
```
Last updated: `$= dv.date("now")`
```

---

## ⌨️ Keyboard Shortcuts

### QuickAdd Shortcuts (Recommended)

Set these in: Settings → Hotkeys → Search "QuickAdd"

| Shortcut | Command | Creates |
|----------|---------|---------|
| `Cmd+Shift+N` | 💭 Capture Thought | Fleeting note in inbox |
| `Cmd+Shift+T` | ✅ Add Task | Task in 60-TASKS/ |
| `Cmd+Shift+P` | 📄 New Paper Note | Literature note |
| `Cmd+Shift+R` | 📊 New Project | Project (multi-choice) |

### Obsidian Core Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+P` | Command palette (type to search) |
| `Cmd+O` | Quick switcher (open note) |
| `Cmd+Shift+F` | Search in all files |
| `Cmd+E` | Toggle edit/preview mode |
| `Cmd+[` | Navigate back |
| `Cmd+]` | Navigate forward |
| `Cmd+Click` | Open link in new pane |
| `Opt+Click` | Open link in new tab (horizontal split) |

### Daily Notes

| Shortcut | Action |
|----------|--------|
| `Cmd+D` | Open today's daily note (if configured) |
| `Cmd+P` → "today" | Search for today's note |

### Custom Shortcuts (Configure These)

Recommended additions in Settings → Hotkeys:

| Shortcut | Command | Purpose |
|----------|---------|---------|
| `Cmd+Shift+D` | Open daily note | Quick access to today |
| `Cmd+Shift+O` | Open master dashboard | Home base |
| `Cmd+Shift+L` | Open literature index | Find papers |

---

## 🏷️ Metadata Fields Reference

### Project Fields

```yaml
type: manuscript | package | course
title: "Project Title"
status: idea | drafting | revision | submitted | published | archived
target-journal: ""          # Journal name
deadline: YYYY-MM-DD
collaborators: []           # List of names
priority: 1-5
progress: 0-100
created: YYYY-MM-DD
tags: [research, manuscript]
```

### Literature Fields

```yaml
type: literature
title: "Paper Title"
authors: []
year: YYYY
journal: ""
doi: ""
rating: ⭐-⭐⭐⭐⭐⭐         # 1-6 stars
read-status: to-read | reading | read | processed
relevance:
  - research: low | medium | high
  - teaching: low | medium | high
  - packages: low | medium | high
created: YYYY-MM-DD
tags: [literature, topic1, topic2]
```

### Task Fields

```yaml
type: task
title: "Task Description"
status: pending | in-progress | completed | blocked
priority: 1-5
project: ""                 # Link to project
context: @computer | @read | @write | @code | @review
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h | half-day | full-day
created: YYYY-MM-DD
due: YYYY-MM-DD
tags: [task, project-specific]
```

### Lecture Fields

```yaml
type: lecture
course: ""                  # STAT 579, etc.
week: X
topic: ""
date: YYYY-MM-DD
duration: 75                # minutes
status: planning | ready | delivered
prep-time: 0                # hours
tags: [teaching, lecture, course-name]
```

---

## 🚀 Advanced Workflows

### Weekly Review Workflow

**Time**: 30 minutes (Fridays)

1. **Create weekly review note**:
   - Copy template: `30-RESOURCES/templates/weekly-review.md`
   - Save to: `50-DAILY/_weekly-reviews/YYYY-WXX.md`

2. **Review wins** (10 min):
   - Open each dashboard
   - Note completed tasks
   - Record progress on projects
   - Count papers read

3. **Reflect** (10 min):
   - What worked well?
   - What didn't work?
   - What did I learn?
   - What surprised me?

4. **Plan next week** (10 min):
   - Pick top 3 priorities
   - Identify critical deadlines
   - Schedule time blocks
   - Review calendar

5. **Inbox zero**:
   - Process all fleeting notes
   - Archive or convert to permanent notes
   - Clear `00-INBOX/` folder

---

### Literature Processing Workflow

**Time**: 20 minutes per paper

1. **Capture PDF**:
   - Download to `00-INBOX/literature-inbox/`

2. **Create note**: `Cmd+Shift+P`
   - Filename: `FirstAuthorYYYY-short-title`
   - Fill in metadata (authors, year, journal)

3. **Quick read** (10 min):
   - Read abstract, intro, conclusion
   - Skim methods
   - Rate paper (⭐-⭐⭐⭐⭐⭐)

4. **Extract key ideas** (5 min):
   - 1-3 sentence core contribution
   - 3-5 key ideas
   - Main theorem/result
   - Key equations

5. **Make connections** (5 min):
   - What does this build on? (cite papers)
   - What projects does this relate to? (link projects)
   - Set relevance scores (research/teaching/packages)

6. **Tag appropriately**:
   - `#mediation`, `#sensitivity-analysis`, etc.

7. **Move PDF**:
   - From `00-INBOX/literature-inbox/`
   - To Zotero/organized folder
   - Note path in literature note

**Result**: Paper indexed, searchable, connected to projects

---

### Project Launch Workflow

**Time**: 15 minutes

1. **Create project note**: `Cmd+Shift+R`
   - Choose type (research/teaching/package)
   - Name descriptively

2. **Fill metadata**:
   - Set status, priority, deadline
   - Add collaborators
   - Set target journal/venue

3. **Define outcome**:
   - Write "Core Contribution" (one sentence: what's new?)
   - List key results (theorems, findings)

4. **Set up resources**:
   - Link related literature
   - Note code repository path
   - Link to relevant areas (e.g., `[[20-AREAS/mediation-theory]]`)

5. **Create initial tasks**:
   - Break project into 3-5 major tasks
   - Create task files (`Cmd+Shift+T`)
   - Link tasks to project

6. **Add to daily note**:
   - Today's note: "Started [[new-project]]"
   - Creates breadcrumb trail

**Result**: Project tracked, tasks defined, dashboards updated automatically

---

### Task Prioritization Workflow

**Time**: 10 minutes (mornings)

1. **Open [[_master-dashboard]]**:
   - See all active projects
   - See today's planned tasks

2. **Apply filters**:
   - **Time available**: "I have 2 hours" → filter `time-estimate <= 2h`
   - **Energy level**: "I'm tired" → filter `energy = low`
   - **Context**: "I'm reading papers" → filter `context = @read`

3. **Pick 3 must-dos**:
   - 1 high-priority (priority 1-2)
   - 1 medium-priority (priority 3)
   - 1 low-hanging fruit (15-30 min, low energy)

4. **Update [[60-TASKS/_today]]**:
   - Move selected tasks to "Must Do Today"
   - Estimate total time
   - Schedule time blocks

5. **Link from daily note**:
   - Open today's daily note
   - Add to "Today's Focus"
   - Creates automatic log

**Result**: Clear priorities, realistic workload, energy-appropriate tasks

---

## 🔧 Troubleshooting

### Dashboard Shows No Results

**Symptoms**: Dataview query returns empty

**Causes**:
1. No notes match criteria yet (fresh vault)
2. YAML frontmatter field names don't match query
3. Dataview plugin not enabled

**Fixes**:
1. **Create example content**: Use templates to create notes
2. **Check field names**:
   - Query uses: `WHERE status = "active"`
   - YAML must have: `status: active`
   - Case-sensitive!
3. **Enable Dataview**: Settings → Community Plugins → Dataview → Enable

---

### Templates Don't Auto-Fill

**Symptoms**: `<% tp.date.now() %>` appears as literal text

**Cause**: Templater plugin not enabled

**Fix**:
1. Settings → Community Plugins → Templater → Enable
2. Settings → Templater → Template folder path: `30-RESOURCES/templates`
3. Restart Obsidian

---

### QuickAdd Shortcuts Don't Work

**Symptoms**: `Cmd+Shift+N` does nothing

**Causes**:
1. Keyboard shortcuts not configured
2. QuickAdd plugin not enabled
3. QuickAdd configuration not imported

**Fixes**:
1. **Configure shortcuts**: Settings → Hotkeys → Search "QuickAdd" → Set shortcuts
2. **Enable plugin**: Settings → Community Plugins → QuickAdd → Enable
3. **Import config**:
   - Settings → QuickAdd → Scroll to bottom
   - Copy `_SYSTEM/quickadd-config.json` contents
   - Paste into import box → Import

---

### Links Don't Work

**Symptoms**: Clicking `[[note-name]]` doesn't open note

**Causes**:
1. Note doesn't exist
2. Note name doesn't match (case-sensitive)
3. Typo in link

**Fixes**:
1. **Check if note exists**: `Cmd+O` → search for note
2. **Check exact filename**: Click link → "Create note" means it doesn't exist
3. **Use autocomplete**: Type `[[` and let Obsidian suggest

---

### Dataview Shows Syntax Error

**Symptoms**: "Dataview: Query failed to parse"

**Causes**:
1. Missing closing triple-backtick
2. Typo in query syntax
3. Invalid field name

**Fixes**:
1. **Check code block**:
   ````markdown
   ```dataview
   TABLE field1
   FROM "folder"
   ```  ← Must have closing backticks
   ````
2. **Validate syntax**: Compare to working examples in dashboards
3. **Check field names**: Must match YAML frontmatter exactly

---

### Daily Notes Don't Auto-Create

**Symptoms**: `Cmd+D` doesn't create today's note

**Cause**: Daily notes plugin not configured

**Fix**:
1. Settings → Core Plugins → Enable "Daily notes"
2. Settings → Daily notes:
   - **Folder**: `50-DAILY`
   - **Date format**: `YYYY/YYYY-MM/YYYY-MM-DD`
   - **Template**: `30-RESOURCES/templates/daily.md`
3. Now `Cmd+D` (or click calendar) creates note

---

## 📚 Additional Resources

### Plugin Documentation

- **Dataview**: https://blacksmithgu.github.io/obsidian-dataview/
- **Templater**: https://silentvoid13.github.io/Templater/
- **Tasks**: https://schemar.github.io/obsidian-tasks/
- **QuickAdd**: https://github.com/chhoumann/quickadd

### Obsidian Help

- **Official Docs**: https://help.obsidian.md/
- **Forum**: https://forum.obsidian.md/
- **Discord**: https://discord.gg/obsidianmd

### Nexus Documentation

- **Main README**: [[README]]
- **Getting Started**: [[_getting-started]]
- **QuickAdd Setup**: [[_SYSTEM/QUICKADD-SETUP]]
- **Parent Documentation**: `../docs/`

---

**🎓 You now have the complete vault reference!**

*Bookmark this page for quick lookups. Cmd+P → "vault guide" to return anytime.*
