---
title: Vault Structure
description: Folder organization and file conventions
---

# Vault Structure

**PARA-inspired organization optimized for academic workflows**

---

## Overview

```
📁 Nexus/
├── 📁 00-INBOX/          → Capture first, organize later
├── 📁 10-PROJECTS/       → Active work with deadlines
├── 📁 20-AREAS/          → Ongoing domains (no deadline)
├── 📁 30-RESOURCES/      → Reference materials
├── 📁 40-ARCHIVE/        → Completed/inactive
├── 📁 50-DAILY/          → Daily notes
└── 📁 60-TASKS/          → Task management
```

---

## 00-INBOX

**Purpose**: Zero-friction capture. Anything goes here first.

```
00-INBOX/
├── fleeting-notes/       # Quick thoughts, ideas
└── literature-inbox/     # Papers to process
```

### Rules
- ✅ Capture immediately, don't organize
- ✅ Process within 24-48 hours
- ❌ Never leave items > 1 week
- ❌ Don't create subfolders

### File Naming
```
YYYY-MM-DD-HHMMSS.md    # Timestamped
quick-thought.md         # Descriptive
```

---

## 10-PROJECTS

**Purpose**: Active work with deadlines or defined endpoints.

```
10-PROJECTS/
├── research/
│   ├── P_med/
│   │   ├── _index.md           # Dashboard
│   │   ├── draft.qmd           # Main manuscript
│   │   ├── simulations/
│   │   ├── figures/
│   │   └── notes/
│   ├── pathmed/
│   └── collider-bias/
├── teaching/
│   ├── STAT-579/
│   │   ├── _index.md
│   │   ├── syllabus.qmd
│   │   └── weeks/
│   └── STAT-440/
└── packages/
    ├── medfit/
    ├── probmed/
    └── medsim/
```

### Project Types

| Type | Location | Content |
|------|----------|---------|
| Research | `research/[name]/` | Papers, analyses |
| Teaching | `teaching/[course]/` | Course materials |
| Package | `packages/[name]/` | R/software |
| Other | `[name]/` | Miscellaneous |

### Project Structure

Every project has:

```
[project]/
├── _index.md           # Required: Dashboard
├── notes/              # Working notes
└── [type-specific]/    # Varies by type
```

### _index.md Template

```markdown
# {{Project Name}}

## Overview
- **Type**: Research Paper | Course | Package
- **Status**: Planning | Active | Paused | Completed
- **Progress**: ▓▓▓▓░░░░░░ 40%
- **Target**: {{Journal/Venue}}
- **Deadline**: {{Date}}

## Current Focus
{{What you're working on now}}

## Sections/Milestones
- [x] Completed item
- [ ] Current item ← CURRENT
- [ ] Upcoming item

## Tasks
{{Embedded task query}}

## Notes
{{Recent notes}}

## Files
- [[key-file-1]]
- [[key-file-2]]

## Related
- [[related-area]]
- [[related-paper]]
```

---

## 20-AREAS

**Purpose**: Ongoing domains with no deadline. Your expertise areas.

```
20-AREAS/
├── causal-inference/
│   ├── _index.md
│   ├── potential-outcomes.md
│   ├── dags.md
│   └── identification.md
├── mediation-theory/
│   ├── _index.md
│   ├── nde-nie.md
│   ├── sensitivity.md
│   └── multiple-mediators.md
├── sensitivity-analysis/
├── multiply-robust/
└── pedagogy/
```

### Area Structure

```
[area]/
├── _index.md           # Overview + links
├── concept-1.md        # Atomic concepts
├── concept-2.md
└── sub-area/           # Optional nesting
```

### Difference: Project vs Area

| Aspect | Project | Area |
|--------|---------|------|
| Deadline | Yes | No |
| Completion | Defined endpoint | Never complete |
| Tracking | Progress % | N/A |
| Example | P_med paper | Causal inference |

---

## 30-RESOURCES

**Purpose**: Reference materials. Things you consume, not create.

```
30-RESOURCES/
├── literature/
│   ├── VanderWeele-2015.md
│   ├── Pearl-2012.md
│   └── [author-year].md
├── templates/
│   ├── fleeting-note.md
│   ├── literature-note.md
│   ├── project-index.md
│   └── daily-note.md
└── code-snippets/
    ├── R/
    │   ├── bootstrap-ci.R
    │   └── simulation-template.R
    └── python/
```

### Literature Notes

File naming: `Author-Year.md` or `Author-Year-keyword.md`

```markdown
# VanderWeele (2015) - Explanation in Causal Inference

## Citation
VanderWeele, T. J. (2015). Explanation in Causal Inference...

## Key Contributions
- 

## Methodology
- 

## Quotes
> "..." (p. X)

## My Applications
- [[P_med]] — Used for sensitivity framework

---
DOI: 
PDF: [[attachments/VanderWeele-2015.pdf]]
Tags: #literature #mediation #sensitivity
```

---

## 40-ARCHIVE

**Purpose**: Completed or inactive items. Searchable but out of sight.

```
40-ARCHIVE/
├── projects/
│   └── old-project/
├── courses/
│   └── STAT-579-2025/
└── papers/
```

### When to Archive

- ✅ Project completed and published
- ✅ Course semester ended
- ✅ No longer relevant
- ❌ "Might need later" → Keep active

---

## 50-DAILY

**Purpose**: Daily notes for journaling, task tracking, and capture.

```
50-DAILY/
├── 2026/
│   ├── 2026-01-01.md
│   ├── 2026-01-02.md
│   └── ...
└── templates/
    └── daily-template.md
```

### Daily Note Template

```markdown
# {{date}}

## Morning
- [ ] Morning brief completed

## Tasks
- [ ] 

## Notes


## Captured
- 

## End of Day
- 
```

### Naming Convention

`YYYY-MM-DD.md` — Required for Calendar plugin.

---

## 60-TASKS

**Purpose**: Task management and tracking.

```
60-TASKS/
├── active.md           # Current tasks
├── someday.md          # Future/maybe
└── waiting.md          # Blocked/delegated
```

### Task Format

Uses Obsidian Tasks plugin syntax:

```markdown
- [ ] Task description #tag
  📅 Due: 2026-06-15
  🏷️ Project: P_med
  ⏱️ 30 min
```

---

## Special Files

### attachments/

Store PDFs and images:

```
attachments/
├── papers/
│   └── VanderWeele-2015.pdf
└── images/
```

### _index.md

Every folder can have `_index.md`:
- Provides folder overview
- Links to key content
- Used by dashboards

---

## Naming Conventions

### Notes

| Type | Convention | Example |
|------|------------|---------|
| Fleeting | Timestamp | `2026-06-03-1430.md` |
| Permanent | Descriptive | `sensitivity-bounds.md` |
| Literature | Author-Year | `VanderWeele-2015.md` |
| Daily | Date | `2026-06-03.md` |

### Folders

- Lowercase with hyphens: `causal-inference`
- Numbered prefixes for order: `00-INBOX`
- Underscores for special: `_index.md`

### Tags

- Hierarchical: `#research/mediation`
- Type tags: `#literature`, `#task`, `#meeting`
- Status tags: `#todo`, `#in-progress`, `#done`

---

## Quick Reference

```
╔══════════════════════════════════════════════════════╗
║              NEXUS VAULT STRUCTURE                   ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  00-INBOX/       Capture everything here first       ║
║     └── fleeting-notes/                              ║
║     └── literature-inbox/                            ║
║                                                      ║
║  10-PROJECTS/    Active work with deadlines          ║
║     └── research/   Papers, analyses                 ║
║     └── teaching/   Courses                          ║
║     └── packages/   Software                         ║
║                                                      ║
║  20-AREAS/       Ongoing domains (no deadline)       ║
║     └── causal-inference/                            ║
║     └── mediation-theory/                            ║
║                                                      ║
║  30-RESOURCES/   Reference materials                 ║
║     └── literature/   Papers                         ║
║     └── templates/    Note templates                 ║
║     └── code-snippets/                               ║
║                                                      ║
║  40-ARCHIVE/     Completed/inactive                  ║
║                                                      ║
║  50-DAILY/       Daily notes (YYYY-MM-DD.md)         ║
║                                                      ║
║  60-TASKS/       Task management                     ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```
