# Vault Structure Standards

> **TL;DR:** PARA-based folder structure for Nexus vaults. Projects (active), Areas (ongoing), Resources (reference), Archives (done).

**Last Updated:** 2025-12-21
**Version:** 1.0.0

---

## Universal Vault Structure

Every Nexus vault MUST use this structure:

```
Nexus/                           # Vault root
├── 00_inbox/                    # 📥 Quick capture (process daily)
│   ├── fleeting_notes/          # Raw thoughts, ideas
│   └── literature_inbox/        # Papers to process
│
├── 10_projects/                 # 🎯 Active work (PARA: Projects)
│   ├── research/                # Research papers, manuscripts
│   ├── teaching/                # Courses, lectures
│   └── packages/                # Software development
│
├── 20_areas/                    # 🔄 Ongoing domains (PARA: Areas)
│   ├── causal-inference/        # Domain expertise
│   ├── sensitivity-analysis/    # Methodological areas
│   └── [domain-name]/           # User-defined areas
│
├── 30_resources/                # 📚 Reference (PARA: Resources)
│   ├── literature/              # Paper notes
│   │   ├── by-topic/            # Organized by subject
│   │   └── by-author/           # Organized by researcher
│   ├── templates/               # Note templates
│   ├── code_snippets/           # Reusable code
│   │   ├── R/
│   │   └── python/
│   └── reference_cards/         # Quick references
│
├── 40_archive/                  # 📦 Completed (PARA: Archive)
│   ├── completed-papers/        # Published manuscripts
│   ├── past-courses/            # Previous semesters
│   └── old-projects/            # Inactive work
│
├── 50_daily/                    # 📅 Daily notes
│   ├── YYYY/                    # Year folders
│   │   └── YYYY-MM/             # Month subfolders
│   └── _weekly-reviews/         # Weekly retrospectives
│
├── 60_tasks/                    # ✅ Task management
│   ├── _task-inbox.md           # Uncategorized tasks
│   ├── _today.md                # Today's focus
│   ├── _this-week.md            # Weekly planning
│   └── _waiting-for.md          # Blocked/delegated
│
├── _system/                     # ⚙️ Configuration
│   ├── claude_prompts/          # Reusable prompts
│   └── dataview_queries/        # Saved queries
│
└── _master-dashboard.md         # 🧠 Command center
```

---

## Folder Purposes

### 00_inbox (Capture Layer)

**Purpose:** Friction-free capture of raw thoughts and materials

**When to Use:**
- Quick ideas (fleeting_notes/)
- Papers to read later (literature_inbox/)
- Anything you're not sure where to file yet

**Review Frequency:** Daily (process to other folders)

**File Lifetime:** Temporary (< 7 days ideal)

---

### 10_projects (Active Work)

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

**File Lifetime:** Until project complete, then → 40_archive

---

### 20_areas (Ongoing Domains)

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

### 30_resources (Reference Materials)

**Purpose:** Supporting materials, templates, and references

**Subfolders:**

**literature/**
- Paper notes organized by topic or author
- Literature indexes and reading lists

**templates/**
- Note templates for Templater/QuickAdd
- Project templates
- Document scaffolds

**code_snippets/**
- Reusable code fragments
- Analysis templates
- Function libraries

**reference_cards/**
- Quick reference sheets
- Notation standards
- Checklists

**File Lifetime:** Permanent (reference material)

---

### 40_archive (Completed Work)

**Purpose:** Completed projects no longer actively worked on

**When to Archive:**
- Project completed and delivered
- Course semester ended
- Package released and stable
- Paper published

**Organization:** Mirror structure of 10_projects

**File Lifetime:** Permanent (historical record)

---

### 50_daily (Daily Notes)

**Purpose:** Day-by-day logs and planning

**Structure:**
```
50_daily/
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

### 60_tasks (Task Management)

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

### _system (Configuration)

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
📋 30_resources/literature/_literature-index.md
📋 10_projects/research/_research-dashboard.md
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
10_projects/research/my-project/
├── my-project.md              # Main project note
├── ideas.md                   # Brainstorming
├── notes/                     # Research notes
├── drafts/                    # Writing drafts
└── _tasks.md                  # Project tasks
```

### Teaching Course Structure

```
10_projects/teaching/STAT579-2025/
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
10_projects/packages/RMediation/
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
  ↓ YES → 10_projects/
  ↓ NO  → Continue

Is this an ongoing responsibility?
  ↓ YES → 20_areas/
  ↓ NO  → Continue

Is this reference material?
  ↓ YES → 30_resources/
  ↓ NO  → Continue

Is this a completed project?
  ↓ YES → 40_archive/
  ↓ NO  → 00_inbox/ (decide later)
```

---

## Quick Reference Commands

### Create Complete Structure

```bash
# One command
mkdir -p ~/Obsidian/Nexus/{00_inbox/{fleeting_notes,literature_inbox},10_projects/{research,teaching,packages},20_areas,30_resources/{literature/{by-topic,by-author},templates,code_snippets/{R,python},reference_cards},40_archive,50_daily/$(date +%Y),60_tasks,_system/{claude_prompts,dataview_queries}}
```

### Create Project

```bash
# Research project
mkdir -p ~/Obsidian/Nexus/10_projects/research/my-project/{notes,drafts}

# Teaching course
mkdir -p ~/Obsidian/Nexus/10_projects/teaching/COURSE-YEAR/{lectures,assignments,syllabus}

# Package
mkdir -p ~/Obsidian/Nexus/10_projects/packages/package-name
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
1. Move current work to 10_projects/
2. Leave everything else alone

**Week 3: Organize by importance**
1. Move frequently accessed notes to appropriate folders
2. Leave rarely accessed notes in place

**Week 4: Archive old content**
1. Move completed work to 40_archive/
2. Delete truly obsolete content

**Ongoing:**
- Process 00_inbox/ daily
- Archive completed projects
- Refine organization as needed

---

## Anti-Patterns (Don't Do This)

❌ **Too many nested levels**
```
10_projects/research/topic/subtopic/sub-subtopic/note.md
```
✅ **Keep it flat** (3 levels max)
```
10_projects/research/topic/note.md
```

❌ **Duplicating PARA at every level**
```
10_projects/research/projects/areas/resources/
```
✅ **PARA at vault root only**
```
10_projects/research/my-project/
```

❌ **Spaces and capitals in folder names**
```
10_projects/Research Papers/My Great Idea/
```
✅ **Hyphens and lowercase**
```
10_projects/research/my-great-idea/
```

❌ **Keeping everything in INBOX**
```
00_inbox/note1.md
00_inbox/note2.md
... (hundreds of files)
```
✅ **Process inbox regularly**
```
00_inbox/  (< 10 files at any time)
```

---

## Validation Checklist

Use this to verify vault structure:

- [ ] All 7 main folders exist (00_inbox through _system)
- [ ] Each main folder has correct subfolders
- [ ] No spaces in folder or file names
- [ ] No nested PARA structures
- [ ] 00_inbox has < 20 unprocessed items
- [ ] _master-dashboard.md exists and renders
- [ ] Templates exist in 30_resources/templates/
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
