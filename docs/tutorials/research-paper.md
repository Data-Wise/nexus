---
title: Research Paper Tutorial
description: Managing a paper from idea to publication
---

# Research Paper Tutorial

**⏱️ Time: 20 min to learn | Track a paper through its lifecycle**

---

## Overview: Paper Lifecycle in Nexus

```
IDEA ─→ PROJECT ─→ DRAFTING ─→ SUBMISSION ─→ REVISION ─→ PUBLICATION
  │         │          │           │            │            │
Inbox   Create      Track       Submit      Respond      Archive
        Dashboard   Sections    Log Status  Track Rev    Celebrate
```

---

## Phase 1: Capture the Idea

### The Moment of Inspiration

You're reading a paper or in a seminar and an idea hits:

```
"Capture: Product of three coefficients in sequential mediation - 
could derive closed-form CI using Meeker distribution theory"
```

Claude creates in `00-INBOX/fleeting-notes/`:

```markdown
# Fleeting Note - 2025-09-15 14:23

Product of three coefficients in sequential mediation - 
could derive closed-form CI using Meeker distribution theory

---
Created: 2025-09-15 14:23
Type: fleeting
Status: inbox
Tags: #idea #mediation #methodology
```

### Let It Simmer

Ideas stay in inbox. You might add more:

```
"Capture: For the P_med idea - check what RMediation already does"
"Capture: P_med - Psychological Methods would be good target"
```

---

## Phase 2: Create the Project

### When You Commit

A week later, you decide to pursue this:

```
"Create research project: P_med for Psychological Methods"
```

Claude creates `10-PROJECTS/research/P_med/` with:

```
P_med/
├── _index.md           # Dashboard
├── draft.qmd           # Manuscript
├── simulations/
├── figures/
├── notes/
│   └── initial-ideas.md  (moved from inbox)
└── submission/
```

### The Dashboard (`_index.md`)

```markdown
# P_med: Product of Mediated Effects

## Overview
| Field | Value |
|-------|-------|
| **Type** | Methodological Paper |
| **Target** | Psychological Methods |
| **Status** | Planning |
| **Progress** | ▓░░░░░░░░░ 10% |
| **Started** | 2025-09-22 |
| **Deadline** | 2026-06-15 |

## Key Contribution
Novel closed-form confidence interval for product of 
three coefficients in sequential mediation using 
Meeker's distribution of products theory.

## Sections
- [ ] Introduction
- [ ] Methods
- [ ] Simulation Study
- [ ] Application
- [ ] Discussion

## Current Focus
Define the estimand and identification assumptions.

## Related
- [[mediation-theory]]
- [[RMediation-package]]
- [[VanderWeele-2015]]
```

---

## Phase 3: Active Development

### Check Status

```
"Show P_med status"
```

```
📊 PROJECT: P_med

Progress: ▓▓▓▓░░░░░░ 40%
Status: Methods section
Deadline: June 15 (45 days)

Sections:
  ✅ Introduction      100%
  🔄 Methods           60%  ← CURRENT
  ⏳ Simulation        0%
  ⏳ Application       0%
  ⏳ Discussion        0%

This week:
  • Complete identification proof
  • Draft Theorem 1 statement

Blockers: None
```

### Update Progress

```
"Mark P_med methods as done"
```

```
"Update P_med to 50%"
```

### Capture Working Notes

```
"Note for P_med: The three-way decomposition requires 
sequential ignorability at each stage"
```

Adds timestamped entry to `P_med/notes/`.

### Log Decisions

```
"P_med decision: Using Meeker 1981 approach instead of 
Monte Carlo because closed-form is the contribution"
```

Creates decision log entry with rationale.

---

## Phase 4: Simulation Study

### Track Simulation Status

```
"P_med simulation status"
```

```
🧪 SIMULATION: P_med

Scenarios Designed: 12
  • Sample sizes: 200, 500, 1000
  • Effect sizes: small, medium, large, zero
  • Completed: 8/12

Currently Running:
  • Scenario 9 (n=1000, large effect) — 45% done
  
Estimated completion: Tomorrow 2pm

Results available: scenarios/results/S1-S8.rds
```

### Log Simulation Progress

```
"P_med: Scenario 9 complete, coverage looks good at 94.7%"
```

---

## Phase 5: Pre-Submission

### Submission Checklist

```
"P_med submission checklist"
```

```
📋 SUBMISSION CHECKLIST: P_med → Psychological Methods

MANUSCRIPT
  ✅ Title page with all authors
  ✅ Abstract ≤250 words (current: 238)
  ✅ Keywords: 4 provided
  ⬜ Word count noted (limit: 8000)
  ✅ References APA 7th format

FIGURES
  ✅ Figure 1: DAG (300 dpi, TIFF)
  ✅ Figure 2: Coverage results
  ⬜ Figure captions separate file

TABLES
  ✅ Table 1: Simulation design
  ✅ Table 2: Coverage results
  ⬜ Tables in separate file

SUPPLEMENTARY
  ⬜ Technical appendix (proofs)
  ⬜ R code availability statement
  ⬜ Data availability statement

SUBMISSION PORTAL
  ⬜ Cover letter
  ⬜ Suggest 3 reviewers
  ⬜ Conflict of interest statement

Completion: 65% ready
```

### Writing the Cover Letter

```
"Help me draft cover letter for P_med to Psych Methods"
```

Claude drafts based on your project context.

---

## Phase 6: Submission

### Log Submission

```
"P_med submitted to Psychological Methods"
```

```
✓ Logged: P_med submitted to Psychological Methods
  Date: 2026-06-10
  Manuscript #: Pending
  Status changed: Drafting → Submitted
  
  Reminder set: Check status in 6 weeks (July 22)
```

### Track Review

```
"P_med: Received major revision decision"
```

```
✓ Logged: P_med - Major Revision
  Decision date: 2026-08-15
  Due date: 2026-11-15 (90 days)
  Status changed: Submitted → Revision
  
  Next step: Create revision response document
```

---

## Phase 7: Revision

### Revision Tracking

```
"Show P_med revision status"
```

```
📝 REVISION: P_med (R1)

Decision: Major Revision
Received: 2026-08-15
Due: 2026-11-15 (62 days remaining)

Editor Comments:
  • Strengthen simulation study ← TODO
  
Reviewer 1 (5 comments):
  ✅ [R1.1] Add sensitivity analysis — Done
  ✅ [R1.2] Clarify assumptions — Done
  🔄 [R1.3] Expand discussion — In progress
  ⬜ [R1.4] Additional simulations
  ⬜ [R1.5] Minor edits

Reviewer 2 (3 comments):
  ✅ [R2.1] Notation clarification
  ⬜ [R2.2] Real data example
  ⬜ [R2.3] Compare to bootstrap

Progress: ▓▓▓▓▓░░░░░ 50%
Response document: [[submission/response-r1.md]]
```

### Log Progress on Comments

```
"P_med: Addressed R1.3 - expanded discussion per reviewer request"
```

---

## Phase 8: Acceptance & Publication

### Log Acceptance

```
"P_med accepted at Psychological Methods!"
```

```
🎉 ACCEPTED: P_med

Journal: Psychological Methods
Accepted: 2026-12-01
Timeline: ~4 weeks to proofs, ~2 months to publication

Status changed: Revision → Accepted

TODO:
  - Watch for proofs
  - Prepare post-publication tweets
  - Update CV

Celebrating your accomplishment! 🎊
```

### Archive

```
"Archive P_med as published"
```

Moves to `40-ARCHIVE/research/P_med-2027/` with full history preserved.

---

## Command Reference: Research Papers

| Phase | Command | Action |
|-------|---------|--------|
| **Idea** | `"Capture: [idea]"` | Quick capture |
| **Create** | `"Create research project: [name]"` | Full project |
| **Status** | `"Show [paper] status"` | Dashboard |
| **Update** | `"Update [paper] to X%"` | Progress |
| **Note** | `"Note for [paper]: [X]"` | Working note |
| **Decision** | `"[paper] decision: [X]"` | Log decision |
| **Simulation** | `"[paper] simulation status"` | Sim tracking |
| **Submit** | `"[paper] submitted to [journal]"` | Log submission |
| **Revision** | `"[paper] revision status"` | Track R&R |
| **Accept** | `"[paper] accepted"` | Celebrate! |
| **Archive** | `"Archive [paper]"` | Complete |

---

## Example Timeline

| Date | Action | Command |
|------|--------|---------|
| Sep 15 | Idea captured | `"Capture: P_med idea..."` |
| Sep 22 | Project created | `"Create research project: P_med"` |
| Oct-Mar | Active development | `"Show P_med status"` |
| Apr | Simulations | `"P_med simulation status"` |
| May | Writing | `"Note for P_med: ..."` |
| Jun 10 | Submitted | `"P_med submitted to..."` |
| Aug 15 | Revision | `"P_med: Major revision"` |
| Nov 10 | Resubmitted | `"P_med revision submitted"` |
| Dec 1 | Accepted | `"P_med accepted!"` |
| Feb | Published | `"Archive P_med as published"` |

---

## Integration with Your Skills

Nexus connects to your `/mnt/skills/user/` skills:

| Skill | When to Use |
|-------|-------------|
| `causal-inference-research` | Methodology framework |
| `methods-paper-writer` | JASA/Biometrika structure |
| `simulation-architect` | Design simulation studies |
| `proof-architect` | Mathematical proofs |
| `sensitivity-analyst` | Sensitivity analysis |

Example:
```
"Using methods-paper-writer, help me structure the P_med methods section"
```

---

## Next Steps

- [Teaching Materials](../academic/teaching-materials.md) — Course management
- [Literature Pipeline](../workflows/literature-pipeline.md) — Paper integration
- [Project Dashboards](../workflows/project-dashboards.md) — General tracking
