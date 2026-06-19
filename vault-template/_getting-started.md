---
cssclass: documentation
tags: [guide, getting-started]
---

# Getting Started with Nexus

> **TL;DR**: This vault is your external memory. Capture everything, organize later, let Dataview dashboards surface what matters.

---

## 🎯 Core Philosophy

### What is Nexus?

Nexus turns:
- **Obsidian** → Your external memory system
- **Claude** → Your cognitive interface
- **PARA structure** → Your organizational framework

### The ADHD-Friendly Approach

1. **Friction-free capture** - `Cmd+Shift+N` to dump thoughts instantly
2. **Visual dashboards** - See all projects at a glance
3. **Time estimates** - Every task shows how long it takes
4. **Context tagging** - Batch similar work (`@computer`, `@read`, `@code`)
5. **Automatic linking** - Dataview queries connect related notes

---

## 📁 Understanding Folders

### PARA Method Overview

**PARA** = Projects, Areas, Resources, Archives

| Folder | What Goes Here | Process |
|--------|---------------|---------|
| **00_inbox** | Random thoughts, paper PDFs | **Daily** - Sort into other folders |
| **10_projects** | Active work with deadlines | **Weekly** - Review progress |
| **20_areas** | Ongoing responsibilities | **Monthly** - Reflect on direction |
| **30_resources** | Reference materials | **As needed** - Add when useful |
| **40_archive** | Completed/inactive | **Quarterly** - Move finished work |
| **50_daily** | Daily notes | **Daily** - Journal & log |
| **60_tasks** | Task management | **Daily** - Pick today's focus |
| **_system** | Configuration | **Rarely** - Only when customizing |

---

## 🚦 Folder Deep Dive

### 00_inbox: Quick Capture

**Purpose**: Collect everything without friction

**Subfolders**:
- `fleeting_notes/` - Raw thoughts (use `Cmd+Shift+N`)
- `literature_inbox/` - PDFs to process
- `voice_memos/` - Audio transcriptions

**Daily workflow**:
1. Capture all day without organizing
2. End of day: Spend 5-10 min processing
3. Convert valuable thoughts to permanent notes
4. Delete or archive the rest
5. Goal: Keep inbox at zero

---

### 10_projects: Active Work

**Purpose**: Time-bound efforts with clear outcomes

**Subfolders**:
- `research/` - Manuscripts, studies
- `teaching/` - Course materials, lectures
- `packages/` - R package development

**What makes a project?**
- Has a deadline or target completion date
- Requires multiple sessions
- Has a clear "done" state

**Not a project?** → Move to 20_areas

**Examples**:
- ✅ "Write mediation manuscript" (project)
- ❌ "Stay current on causal inference" (area)

**Dashboards**:
- [[10_projects/research/_research-dashboard|Research Dashboard]]
- [[10_projects/teaching/_teaching-dashboard|Teaching Dashboard]]
- [[10_projects/packages/_packages-dashboard|Packages Dashboard]]

---

### 20_areas: Ongoing Domains

**Purpose**: Responsibilities without deadlines

**Example areas**:
- `causal-inference-methods/`
- `sensitivity-analysis/`
- `mediation-theory/`
- `statistical-pedagogy/`

**Projects vs. Areas**:
- **Project**: "Develop sensitivity analysis R package" (deadline, clear end)
- **Area**: "Sensitivity analysis expertise" (ongoing, no end date)

**Usage**: Notes in areas support multiple projects

---

### 30_resources: Reference Library

**Purpose**: Reusable knowledge

**Subfolders**:
- `literature/` - Paper notes (use `Cmd+Shift+P`)
  - `by-topic/` - Organized by research area
  - `by-author/` - Organized by first author
- `templates/` - Note templates
- `code_snippets/` - Reusable R/Python code
- `reference_cards/` - Quick references

**Literature Workflow**:
1. Get new paper → Save PDF to `00_inbox/literature_inbox/`
2. Create note: `Cmd+Shift+P` → Filename: "AuthorYYYY-short-title"
3. Fill in: authors, year, journal, key ideas
4. Tag with topics: `#mediation`, `#sensitivity-analysis`
5. Set relevance: research (high), teaching (medium), packages (low)
6. Dataview queries automatically show on relevant dashboards

---

### 40_archive: Completed Work

**When to archive**:
- Published manuscripts
- Past semester courses
- Released packages (stable versions)

**Don't delete!** Archiving preserves context for future reference.

---

### 50_daily: Daily Notes

**Purpose**: Daily log and journal

**Structure**: `YYYY/YYYY-MM/YYYY-MM-DD.md`

**Template includes**:
- 🎯 Today's focus (3 priorities)
- 📝 Notes (research, teaching, packages)
- ✅ Completed tasks (auto-query from metadata)
- 💭 Reflections

**Why daily notes?**
- Searching "When did I figure out that proof?" → Check daily notes
- Automatic breadcrumb trail of your work
- Links from daily notes appear in project "Research Log" sections

---

### 60_tasks: Task Management

**Files**:
- `_today.md` - Today's focus (open every morning)
- `_this-week.md` - Weekly planning
- `_waiting-for.md` - Blocked/delegated tasks
- Individual task files (created via `Cmd+Shift+T`)

**Task metadata**:
```yaml
priority: 1-5    # 1 = critical, 5 = someday/maybe
context: @computer | @read | @write | @code
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h | half-day
```

**ADHD benefit**: See exactly what you can do right now based on:
- Time available ("I have 30 minutes")
- Energy level ("I'm tired → pick 'low energy' tasks")
- Context ("I'm reading papers → pick '@read' tasks")

---

## 🎨 Using Templates

### Available Templates

| Template | Shortcut | Location | Use For |
|----------|----------|----------|---------|
| **Project** | `Cmd+Shift+R` | `10_projects/` | Manuscripts, courses, packages |
| **Paper Note** | `Cmd+Shift+P` | `30_resources/literature/` | Literature |
| **Daily Note** | Auto-created | `50_daily/` | Daily journal |
| **Lecture** | `Cmd+Shift+R` → Lecture | `10_projects/teaching/` | Teaching |
| **Task** | `Cmd+Shift+T` | `60_tasks/` | To-dos |
| **Weekly Review** | Manual | `50_daily/_weekly-reviews/` | Reflection |

### Template Syntax

Templates use **Templater** plugin syntax:

| Code | Output |
|------|--------|
| `<% tp.date.now("YYYY-MM-DD") %>` | 2025-12-23 |
| `<% tp.date.now("dddd") %>` | Monday |
| `<% tp.file.title %>` | Current file name |
| `<% tp.date.now("YYYY-MM-DD", 7) %>` | Date 7 days from now |

**Auto-fill**: When you create a note using a template, these placeholders auto-populate.

---

## 📊 Using Dashboards

### Master Dashboard

**Open**: [[_master-dashboard]]

**Shows**:
- Today's focus tasks
- Active projects (all types)
- Inbox count
- Recent literature
- Recently completed tasks

**Use as**: Your "home base" - open this first every morning

### Specialized Dashboards

Each project type has its own dashboard:

1. **Research** - [[10_projects/research/_research-dashboard]]
   - Manuscripts by status (idea, drafting, review, submitted)
   - Research tasks
   - Related literature

2. **Teaching** - [[10_projects/teaching/_teaching-dashboard]]
   - Courses & lectures to prep
   - Teaching tasks
   - Teaching-relevant papers

3. **Packages** - [[10_projects/packages/_packages-dashboard]]
   - Package status & version
   - GitHub issues
   - Package-related literature

4. **Literature** - [[30_resources/literature/_literature-index]]
   - Papers by topic
   - Papers by author
   - Reading queue

---

## 🔗 Linking Strategy

### Why Links Matter

Obsidian's power comes from connections:
- See all notes mentioning a concept
- Navigate between related ideas
- Automatically build knowledge graph

### How to Link

**While Writing**:
```markdown
I'm working on [[P_med-manuscript]] which builds on [[VanderWeele2015-mediation]].
```

**In Task Templates**:
```yaml
project: [[10_projects/research/sensitivity-bounds]]
related: [[30_resources/literature/Ding2016-sensitivity]]
```

**In Dashboards**: Links auto-populate from queries

### Link Types

| Link Type | Example | When to Use |
|-----------|---------|-------------|
| **Project link** | `[[P_med-manuscript]]` | Connect daily notes to projects |
| **Literature link** | `[[VanderWeele2015]]` | Cite papers in projects |
| **Resource link** | `[[20_areas/mediation-theory]]` | Connect to knowledge base |
| **Task link** | `[[60_tasks/fix-bug-42]]` | Reference specific tasks |

---

## ⚡ Quick Capture Workflows

### Thought Capture (`Cmd+Shift+N`)

**Scenario**: Mid-coding, random idea pops up

**Old way**:
1. Open note app
2. Create new note
3. Type thought
4. Save
5. Return to code (wait, what was I doing?)

**Nexus way**:
1. `Cmd+Shift+N`
2. Type thought
3. ✅ Done (stays in code)

**Example**:
```
Press: Cmd+Shift+N
Type: "Check if bootstrap works with clustered data"
Result: Appended to today's fleeting notes, tagged #fleeting
```

### Task Capture (`Cmd+Shift+T`)

**Scenario**: Realize you need to do something

**Creates**:
- New file in `60_tasks/`
- Pre-filled template
- Opens in new pane (don't lose context)

**Example**:
```
Press: Cmd+Shift+T
Type: "Review JASA submission checklist"
Opens: Template with priority, time, context fields ready
```

### Paper Capture (`Cmd+Shift+P`)

**Scenario**: Starting to read a new paper

**Creates**:
- Literature note in `30_resources/literature/`
- YAML frontmatter for metadata
- Sections for key ideas, equations, connections

**Naming convention**: `FirstAuthorYYYY-short-title`

**Example**:
```
Press: Cmd+Shift+P
Type: "Robins1992-identifiability"
Opens: Paper note template ready to fill
```

---

## 🗓️ Daily Workflows

### Morning Routine (5 min)

1. **Open [[_master-dashboard]]**
   - See all active projects
   - Check inbox count

2. **Review [[60_tasks/_today]]**
   - See today's planned tasks
   - Pick 3 must-dos

3. **Open daily note** (`Cmd+P` → type "today")
   - Add to "Today's Focus" section
   - Note any deadlines

### Throughout the Day

- **Random thought?** → `Cmd+Shift+N` (fleeting note)
- **New task?** → `Cmd+Shift+T` (task note)
- **Reading paper?** → `Cmd+Shift+P` (literature note)
- **Working on project?** → Link from daily note: `Working on [[project-name]]`

### Evening Routine (5 min)

1. **Check off completed tasks**
   - In project files
   - In `60_tasks/_today`

2. **Quick daily note entry**
   - What did I accomplish?
   - What blocked me?
   - What's tomorrow's priority?

3. **Process inbox (if needed)**
   - Convert fleeting notes to permanent notes
   - Move papers to literature folder

---

## 📅 Weekly Workflows

### Friday Review (30 min)

Use template: [[30_resources/templates/weekly-review]]

1. **Reflect on wins**
   - What projects advanced?
   - What papers did I read?
   - What did I ship?

2. **Review metrics**
   - Tasks completed
   - Daily notes created
   - Projects progressed

3. **Plan next week**
   - Top 3 priorities
   - Critical deadlines
   - Time blocks

4. **Inbox zero**
   - Process all fleeting notes
   - Archive or convert

---

## 🎯 ADHD-Friendly Features

### 1. Friction-Free Capture

**Problem**: Forgetting ideas before you write them down

**Solution**: `Cmd+Shift+N` - 2 seconds from thought to captured

### 2. Visual Progress

**Problem**: "How much have I done?" feels overwhelming

**Solution**: Dashboards show progress bars, completed counts, metrics

### 3. Time Estimates

**Problem**: Decision paralysis ("which task should I do?")

**Solution**: Every task has time estimate - pick based on available time

### 4. Context Tags

**Problem**: Context switching kills productivity

**Solution**: Batch tasks by context:
- `@computer` - All computer tasks
- `@read` - All reading tasks
- `@code` - All coding tasks

### 5. Energy Levels

**Problem**: Trying to do hard tasks when brain is tired

**Solution**: Tag tasks by energy (high/medium/low), pick appropriately

### 6. Automatic Connections

**Problem**: Forgetting how ideas relate

**Solution**: Dataview queries auto-show related notes on dashboards

---

## 🔧 Customizing Your Vault

### Modify Templates

1. Open template file (e.g., `30_resources/templates/project.md`)
2. Edit YAML frontmatter or content
3. Save
4. New notes using template will have changes

### Add Dashboard Sections

1. Open dashboard file
2. Add new Dataview query block:
````markdown
```dataview
TABLE field1, field2
FROM "folder"
WHERE condition
SORT field ASC
```
````
3. Save - updates instantly

### Change Keyboard Shortcuts

Settings → Hotkeys → Search for command → Click to rebind

**Recommended shortcuts**:
- `Cmd+Shift+N` - Capture thought
- `Cmd+Shift+T` - Add task
- `Cmd+Shift+P` - New paper
- `Cmd+Shift+D` - Create daily note
- `Cmd+Shift+O` - Open master dashboard

---

## 🆘 Common Questions

### "Where should this note go?"

**Decision tree**:
1. Is it a random thought? → `00_inbox/` (process later)
2. Is it a to-do? → `60_tasks/`
3. Is it about a paper? → `30_resources/literature/`
4. Is it project work? → `10_projects/{type}/`
5. Is it reference material? → `30_resources/`

### "How do I link notes?"

Type `[[` and start typing note name. Obsidian auto-suggests.

### "What if I don't use templates?"

Templates are optional but save time. You can create blank notes and add metadata manually.

### "Can I use Notion/Roam instead?"

Nexus is designed for Obsidian specifically (Dataview, local files, Markdown). Principles transfer but implementation won't.

### "How long until I see benefits?"

- **Day 1**: Quick capture feels good
- **Week 1**: Dashboards become helpful
- **Month 1**: Knowledge graph gets useful
- **Month 3**: Second brain is indispensable

---

## 📚 Next Steps

1. ✅ Set up [[_system/QUICKADD-SETUP|QuickAdd shortcuts]]
2. ✅ Create your first project (`Cmd+Shift+R`)
3. ✅ Capture a thought (`Cmd+Shift+N`)
4. ✅ Add a paper you're reading (`Cmd+Shift+P`)
5. ✅ End of day: Process inbox
6. ✅ End of week: Weekly review
7. ✅ Read [[_vault-guide|Complete Vault Guide]] for advanced features

---

**🧠 Welcome to your second brain!**

*Questions? See [[_vault-guide]] or check the [main documentation](../README.md).*
