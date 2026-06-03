---
title: Project Dashboards
description: Track research, teaching, and package development
---

# Project Dashboards

**⏱️ Read: 8 min | 🎯 High-level project tracking**

---

## TL;DR

```
"Show P_med status"      → Full project dashboard
"Project pulse"          → All projects summary
"Update P_med to 70%"    → Progress update
```

---

## Project Dashboard

### The Command

```
"Show P_med status"
```

### What You Get

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PROJECT DASHBOARD: P_med
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 OVERVIEW
  Type:     Research Paper
  Target:   Psychological Methods
  Status:   Drafting
  Progress: ▓▓▓▓▓▓▓░░░ 70%

⏰ TIMELINE
  Started:  2025-09-15
  Deadline: 2026-06-15 (12 days)
  Velocity: ~5%/week

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 SECTIONS
  ✅ Introduction     ▓▓▓▓▓▓▓▓▓▓ 100%
  ✅ Methods          ▓▓▓▓▓▓▓▓▓▓ 100%
  🔄 Results          ▓▓▓▓▓▓▓░░░ 70%  ← CURRENT
  ⏳ Discussion       ▓▓░░░░░░░░ 20%
  ⏳ Abstract         ░░░░░░░░░░ 0%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 ACTIVE TASKS
  • [Today] Add sensitivity analysis table
  • [Tomorrow] Write results paragraph 3
  • [This week] Complete simulation Section 4.2

🚧 BLOCKERS
  • Waiting for compute cluster results

📎 KEY FILES
  • [[P_med-draft.qmd]]
  • [[P_med-simulations.R]]
  • [[P_med-figures/]]

🔗 RELATED
  • [[sensitivity-analyst]] skill
  • [[VanderWeele-2015]] methodology
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Project Pulse (All Projects)

### The Command

```
"Project pulse"
```

### Summary View

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PROJECT PULSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RESEARCH
  P_med           ▓▓▓▓▓▓▓░░░ 70%  ⚡ 12 days
  pathmed         ▓▓▓▓▓░░░░░ 50%  
  collider-R2     ▓▓▓░░░░░░░ 30%  ⏸️ Paused

TEACHING
  STAT-579        ▓▓▓▓▓▓▓▓▓░ 93%  Week 14/15
  STAT-440        ▓▓▓▓▓▓▓▓░░ 80%  ✓ On track

PACKAGES
  medfit          ▓▓▓▓▓▓▓▓▓░ 97%  🚀 Release ready
  probmed         ▓▓▓▓▓░░░░░ 55%  
  medsim          ▓▓▓░░░░░░░ 30%  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ = Deadline soon  ⏸️ = Paused  🚀 = Ready
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Project Types

### Research Projects

```
Location: 10-PROJECTS/research/[name]/
```

**Structure:**
```
P_med/
├── _index.md           # Dashboard
├── draft.qmd           # Main manuscript
├── simulations/        # R code
├── figures/            # Generated plots
├── notes/              # Working notes
└── submissions/        # Journal submissions
```

**Tracked Metrics:**
- Section completion %
- Word count
- Simulation status
- Submission history

### Teaching Projects

```
Location: 10-PROJECTS/teaching/[course]/
```

**Structure:**
```
STAT-579/
├── _index.md           # Course dashboard
├── syllabus.qmd
├── weeks/
│   ├── week-01/
│   ├── week-02/
│   └── ...
├── assignments/
└── materials/
```

**Tracked Metrics:**
- Weeks completed
- Assignments graded
- Student questions pending

### Package Projects

```
Location: 10-PROJECTS/packages/[name]/
```

**Tracked Metrics:**
- Test coverage
- Documentation %
- Open issues
- CRAN status

---

## Creating Projects

### Quick Create

```
"Create project: collider-bias-paper for Biostatistics"
```

Claude creates:
- Folder structure
- Dashboard `_index.md`
- Initial tasks
- Links to related notes

### From Template

```
"Create research project from template: P_med-style"
```

---

## Updating Progress

### Percentage Update

```
"Update P_med to 75%"
```

### Section Completion

```
"Mark P_med results as done"
```

### Add Milestone

```
"P_med milestone: Submitted to Psych Methods"
```

### Log Blockers

```
"P_med blocked by: waiting for cluster results"
```

---

## Project Views

### By Status

```
"Show active projects"
"Show paused projects"
"Show completed projects"
```

### By Type

```
"Show research projects"
"Show teaching projects"
"Show package projects"
```

### By Deadline

```
"Projects due this month"
"What's the next deadline?"
```

---

## Project Notes

### Quick Note to Project

```
"Note for P_med: Consider adding bootstrap CI"
```

Adds timestamped entry to project notes.

### Meeting Notes

```
"Meeting note for P_med: Discussed with advisor..."
```

### Decision Log

```
"P_med decision: Using Approach B for sensitivity analysis because..."
```

---

## Archiving Projects

When a project completes:

```
"Archive P_med as completed"
```

Claude:
1. Moves to `40-ARCHIVE/`
2. Updates status to completed
3. Generates summary
4. Preserves all links

---

## Dashboard Customization

### Project Index Template

```markdown
# {{project_name}}

## Overview
- **Type**: {{type}}
- **Target**: {{target_venue}}
- **Status**: {{status}}
- **Progress**: {{progress_bar}}

## Timeline
- Started: {{start_date}}
- Deadline: {{deadline}}

## Sections
{{section_checklist}}

## Active Tasks
{{tasks_query}}

## Notes
{{recent_notes}}

## Files
{{file_links}}
```

---

## Commands Reference

| Command | Action |
|---------|--------|
| `"Show [project] status"` | Full dashboard |
| `"Project pulse"` | All projects summary |
| `"Create project: [name]"` | New project |
| `"Update [project] to X%"` | Progress update |
| `"[project] blocked by: [X]"` | Log blocker |
| `"Archive [project]"` | Complete & archive |
| `"Note for [project]: [X]"` | Add note |

---

## Next Steps

- [Literature Pipeline](literature-pipeline.md) — Connect papers to projects
- [Research Projects](../academic/research-projects.md) — Deep dive
