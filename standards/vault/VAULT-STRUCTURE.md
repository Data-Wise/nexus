# Vault Structure Standards

> **TL;DR:** PARA-based folder structure for Nexus vaults. Projects (active), Areas (ongoing), Resources (reference), Archives (done).

**Last Updated:** 2025-12-21
**Version:** 1.0.0

---

## Universal Vault Structure

Every Nexus vault MUST use this structure:

```
Nexus/                           # Vault root
├── 00-INBOX/                    # 📥 Quick capture (process daily)
│   ├── fleeting-notes/          # Raw thoughts, ideas
│   └── literature-inbox/        # Papers to process
│
├── 10-PROJECTS/                 # 🎯 Active work (PARA: Projects)
│   ├── research/                # Research papers, manuscripts
│   ├── teaching/                # Courses, lectures
│   └── packages/                # Software development
│
├── 20-AREAS/                    # 🔄 Ongoing domains (PARA: Areas)
│   ├── causal-inference/        # Domain expertise
│   ├── sensitivity-analysis/    # Methodological areas
│   └── [domain-name]/           # User-defined areas
│
├── 30-RESOURCES/                # 📚 Reference (PARA: Resources)
│   ├── literature/              # Paper notes
│   │   ├── by-topic/            # Organized by subject
│   │   └── by-author/           # Organized by researcher
│   ├── templates/               # Note templates
│   ├── code-snippets/           # Reusable code
│   │   ├── R/
│   │   └── python/
│   └── reference-cards/         # Quick references
│
├── 40-ARCHIVE/                  # 📦 Completed (PARA: Archive)
│   ├── completed-papers/        # Published manuscripts
│   ├── past-courses/            # Previous semesters
│   └── old-projects/            # Inactive work
│
├── 50-DAILY/                    # 📅 Daily notes
│   ├── YYYY/                    # Year folders
│   │   └── YYYY-MM/             # Month subfolders
│   └── _weekly-reviews/         # Weekly retrospectives
│
├── 60-TASKS/                    # ✅ Task management
│   ├── _task-inbox.md           # Uncategorized tasks
│   ├── _today.md                # Today's focus
│   ├── _this-week.md            # Weekly planning
│   └── _waiting-for.md          # Blocked/delegated
│
├── _SYSTEM/                     # ⚙️ Configuration
│   ├── claude-prompts/          # Reusable prompts
│   └── dataview-queries/        # Saved queries
│
└── _master-dashboard.md         # 🧠 Command center
```

---

## Folder Purposes

### 00-INBOX (Capture Layer)

**Purpose:** Friction-free capture of raw thoughts and materials

**When to Use:**
- Quick ideas (fleeting-notes/)
- Papers to read later (literature-inbox/)
- Anything you're not sure where to file yet

**Review Frequency:** Daily (process to other folders)

**File Lifetime:** Temporary (< 7 days ideal)

---

### 10-PROJECTS (Active Work)

**Purpose:** Active projects with deadlines and deliverables

**Criteria for Projects:**
- Has a specific goal
- Has a deadline (even if flexible)
- Will be "done" at some point
- Requires active work

**Examples:**
- `research/P_med-manuscript/` - Paper in progress
- `teaching/STAT579-2025/` - Current course
- `packages/RMediation/` - Active development

**File Lifetime:** Until project complete, then → 40-ARCHIVE

---

### 20-AREAS (Ongoing Domains)

**Purpose:** Long-term responsibilities and expertise domains

**Criteria for Areas:**
- Ongoing (no end date)
- Maintenance required
- Standards to uphold
- Expertise to develop

**Examples:**
- `causal-inference-methods/` - Core expertise
- `sensitivity-analysis/` - Methodological focus
- `statistical-pedagogy/` - Teaching methods

**File Lifetime:** Permanent (evergreen notes)

---

### 30-RESOURCES (Reference Materials)

**Purpose:** Supporting materials, templates, and references

**Subfolders:**

**literature/**
- Paper notes organized by topic or author
- Literature indexes and reading lists

**templates/**
- Note templates for Templater/QuickAdd
- Project templates
- Document scaffolds

**code-snippets/**
- Reusable code fragments
- Analysis templates
- Function libraries

**reference-cards/**
- Quick reference sheets
- Notation standards
- Checklists

**File Lifetime:** Permanent (reference material)

---

### 40-ARCHIVE (Completed Work)

**Purpose:** Completed projects no longer actively worked on

**When to Archive:**
- Project completed and delivered
- Course semester ended
- Package released and stable
- Paper published

**Organization:** Mirror structure of 10-PROJECTS

**File Lifetime:** Permanent (historical record)

---

### 50-DAILY (Daily Notes)

**Purpose:** Day-by-day logs and planning

**Structure:**
```
50-DAILY/
├── 2025/
│   ├── 2025-12/
│   │   ├── 2025-12-20.md
│   │   ├── 2025-12-21.md
│   │   └── ...
│   └── 2025-11/
└── _weekly-reviews/
    ├── 2025-W51.md
    └── ...
```

**Naming:** `YYYY-MM-DD.md` (ISO 8601)

**File Lifetime:** Permanent (journal/log)

---

### 60-TASKS (Task Management)

**Purpose:** Centralized task tracking across all projects

**Core Files:**

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `_task-inbox.md` | Uncategorized tasks | As captured |
| `_today.md` | Today's focus (top 3) | Daily |
| `_this-week.md` | Weekly planning | Weekly |
| `_waiting-for.md` | Blocked/delegated | As needed |

**Integration:** Tasks can also live in project folders

**File Lifetime:** Tasks deleted when complete or outdated

---

### _SYSTEM (Configuration)

**Purpose:** Vault configuration and reusable assets

**Contents:**
- Claude prompts for common workflows
- Saved Dataview queries
- Custom CSS (if needed)
- Plugin configurations (exported)

**File Lifetime:** Permanent (configuration)

---

## Required Files

Every vault MUST have:

```
✅ _master-dashboard.md          # Central command center
✅ README.md                      # Vault-specific guide
✅ .gitignore                     # If using Git
```

Optional but recommended:

```
📋 _getting-started.md            # First-time user guide
📋 _vault-guide.md                # Complete reference
📋 30-RESOURCES/literature/_literature-index.md
📋 10-PROJECTS/research/_research-dashboard.md
```

---

## Naming Conventions

### Folders

**Pattern:** `lowercase-with-hyphens`

**Examples:**
- ✅ `causal-inference-methods/`
- ✅ `P_med-manuscript/`
- ❌ `Causal Inference Methods/` (spaces, capitals)
- ❌ `causal_inference/` (underscores)

**Special Prefixes:**
- `_` prefix = meta/index files (e.g., `_dashboard.md`, `_index.md`)
- `00-`, `10-` etc = PARA category markers

---

### Files

**Pattern:** `lowercase-with-hyphens.md`

**Examples:**
- ✅ `my-research-project.md`
- ✅ `VanderWeele2015-mediation.md` (papers: Author+Year)
- ✅ `2025-12-21.md` (daily notes: ISO date)
- ❌ `My Research Project.md` (spaces, capitals)

**Date Format:** Always `YYYY-MM-DD` (ISO 8601)

---

## File Organization Within Folders

### Research Project Structure

```
10-PROJECTS/research/my-project/
├── my-project.md              # Main project note
├── ideas.md                   # Brainstorming
├── notes/                     # Research notes
├── drafts/                    # Writing drafts
└── _tasks.md                  # Project tasks
```

### Teaching Course Structure

```
10-PROJECTS/teaching/STAT579-2025/
├── STAT579-2025.md            # Course overview
├── syllabus/
├── lectures/
│   ├── week-01.md
│   ├── week-02.md
│   └── ...
├── assignments/
└── _grading.md                # Grade tracking
```

### Package Development Structure

```
10-PROJECTS/packages/RMediation/
├── RMediation.md              # Package notes
├── development-log.md         # Progress log
├── roadmap.md                 # Future plans
└── _issues.md                 # Issue tracking
```

---

## PARA Method Decision Tree

**When filing a note, ask:**

```
Is this active work with a deadline?
  ↓ YES → 10-PROJECTS/
  ↓ NO  → Continue

Is this an ongoing responsibility?
  ↓ YES → 20-AREAS/
  ↓ NO  → Continue

Is this reference material?
  ↓ YES → 30-RESOURCES/
  ↓ NO  → Continue

Is this a completed project?
  ↓ YES → 40-ARCHIVE/
  ↓ NO  → 00-INBOX/ (decide later)
```

---

## Quick Reference Commands

### Create Complete Structure

```bash
# One command
mkdir -p ~/Obsidian/Nexus/{00-INBOX/{fleeting-notes,literature-inbox},10-PROJECTS/{research,teaching,packages},20-AREAS,30-RESOURCES/{literature/{by-topic,by-author},templates,code-snippets/{R,python},reference-cards},40-ARCHIVE,50-DAILY/$(date +%Y),60-TASKS,_SYSTEM/{claude-prompts,dataview-queries}}
```

### Create Project

```bash
# Research project
mkdir -p ~/Obsidian/Nexus/10-PROJECTS/research/my-project/{notes,drafts}

# Teaching course
mkdir -p ~/Obsidian/Nexus/10-PROJECTS/teaching/COURSE-YEAR/{lectures,assignments,syllabus}

# Package
mkdir -p ~/Obsidian/Nexus/10-PROJECTS/packages/package-name
```

---

## Migration Guide

### Moving from Flat Structure

If you have an unorganized vault:

**Week 1: Set up structure**
1. Create PARA folders
2. Don't move anything yet
3. Start using new structure for new notes

**Week 2: Migrate active projects**
1. Move current work to 10-PROJECTS/
2. Leave everything else alone

**Week 3: Organize by importance**
1. Move frequently accessed notes to appropriate folders
2. Leave rarely accessed notes in place

**Week 4: Archive old content**
1. Move completed work to 40-ARCHIVE/
2. Delete truly obsolete content

**Ongoing:**
- Process 00-INBOX/ daily
- Archive completed projects
- Refine organization as needed

---

## Anti-Patterns (Don't Do This)

❌ **Too many nested levels**
```
10-PROJECTS/research/topic/subtopic/sub-subtopic/note.md
```
✅ **Keep it flat** (3 levels max)
```
10-PROJECTS/research/topic/note.md
```

❌ **Duplicating PARA at every level**
```
10-PROJECTS/research/projects/areas/resources/
```
✅ **PARA at vault root only**
```
10-PROJECTS/research/my-project/
```

❌ **Spaces and capitals in folder names**
```
10-PROJECTS/Research Papers/My Great Idea/
```
✅ **Hyphens and lowercase**
```
10-PROJECTS/research/my-great-idea/
```

❌ **Keeping everything in INBOX**
```
00-INBOX/note1.md
00-INBOX/note2.md
... (hundreds of files)
```
✅ **Process inbox regularly**
```
00-INBOX/  (< 10 files at any time)
```

---

## Validation Checklist

Use this to verify vault structure:

- [ ] All 7 main folders exist (00-INBOX through _SYSTEM)
- [ ] Each main folder has correct subfolders
- [ ] No spaces in folder or file names
- [ ] No nested PARA structures
- [ ] 00-INBOX has < 20 unprocessed items
- [ ] _master-dashboard.md exists and renders
- [ ] Templates exist in 30-RESOURCES/templates/
- [ ] Daily notes use YYYY-MM-DD format

---

## See Also

- [TEMPLATE-STANDARDS.md](TEMPLATE-STANDARDS.md) - Template format specifications
- [DATAVIEW-STANDARDS.md](DATAVIEW-STANDARDS.md) - Query patterns
- [NAMING-CONVENTIONS.md](NAMING-CONVENTIONS.md) - Detailed naming rules
- [../workflow/CAPTURE-WORKFLOWS.md](../workflow/CAPTURE-WORKFLOWS.md) - How to use INBOX

---

**Created:** 2025-12-21
**Maintainer:** DT
**Based on:** Tiago Forte's PARA method + Obsidian best practices
