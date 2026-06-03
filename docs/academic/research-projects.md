---
title: Research Projects
description: Managing papers, simulations, and publications
---

# Research Projects

**Workflow for papers from idea to publication**

---

## TL;DR

| Phase | Commands | Folder |
|-------|----------|--------|
| Ideation | `"Capture: idea..."` | `00-INBOX/` |
| Planning | `"Create research project: [X]"` | `10-PROJECTS/research/` |
| Writing | `"Show [paper] status"` | Dashboard view |
| Submission | `"[paper] submitted to [journal]"` | Status update |
| Published | `"Archive [paper] as published"` | `40-ARCHIVE/` |

---

## Research Project Structure

```
10-PROJECTS/research/P_med/
├── _index.md           # Dashboard
├── draft.qmd           # Main Quarto manuscript
├── simulations/
│   ├── sim-design.R    # Simulation setup
│   ├── run-sims.R      # Execution script
│   └── results/        # Output data
├── figures/
│   ├── fig1-dag.png
│   └── fig2-results.png
├── tables/
├── notes/
│   ├── meeting-2026-05-15.md
│   └── ideas.md
└── submission/
    ├── cover-letter.md
    └── response-to-reviewers.md
```

---

## Paper Dashboard

Example `_index.md`:

```markdown
# P_med: Product of Mediated Effects

## Overview
| Field | Value |
|-------|-------|
| **Type** | Methodological Paper |
| **Target** | Psychological Methods |
| **Status** | Drafting |
| **Progress** | ▓▓▓▓▓▓▓░░░ 70% |
| **Deadline** | 2026-06-15 |

## Key Contribution
Novel estimand P_med for sequential mediation with 
closed-form CI via product distribution theory.

## Sections
| Section | Status | Words |
|---------|--------|-------|
| Introduction | ✅ Done | 1,200 |
| Methods | ✅ Done | 2,800 |
| Simulation | 🔄 Active | 1,500 |
| Application | ⏳ Pending | — |
| Discussion | ⏳ Pending | — |

## Simulation Status
- [x] Design scenarios
- [x] Write simulation code
- [x] Run n=1000 reps
- [ ] Run n=10000 reps ← CURRENT
- [ ] Generate figures
- [ ] Write results narrative

## Active Tasks
- [ ] Add sensitivity table — Due: Tomorrow
- [ ] Results paragraph 3 — Due: This week

## Key Files
- Draft: [[draft.qmd]]
- Main sim: [[simulations/run-sims.R]]
- Literature: [[VanderWeele-2015]], [[MacKinnon-2008]]

## Timeline
| Date | Milestone |
|------|-----------|
| 2025-09 | Started project |
| 2025-11 | Methods complete |
| 2026-03 | Simulations designed |
| 2026-06 | Target submission |
```

---

## Simulation Management

### Simulation Status Tracking

```markdown
## Simulation Study

### Scenarios
| ID | n | Reps | Effect | Status |
|----|---|------|--------|--------|
| S1 | 200 | 10k | small | ✅ Done |
| S2 | 200 | 10k | medium | ✅ Done |
| S3 | 500 | 10k | small | 🔄 Running |
| S4 | 500 | 10k | medium | ⏳ Queued |

### Compute Resources
- Local: 8 cores, ~2h per scenario
- Cluster: 64 cores, ~15min per scenario

### Results
- Raw: `simulations/results/raw/`
- Processed: `simulations/results/processed/`
```

### Linking to Simulation Skill

Reference your simulation architect skill:

```
"How should I design the P_med simulation study?"
```

Claude uses `/mnt/skills/user/simulation-architect/` for guidance.

---

## Literature Integration

### Connecting Papers to Projects

```
"Link VanderWeele-2015 to P_med"
```

Creates bidirectional links:
- Paper note shows "Used in: P_med"
- Project shows paper in references

### Literature Review Query

```dataview
TABLE 
  key-contribution as "Contribution",
  methodology as "Method"
FROM "30-RESOURCES/literature"
WHERE contains(projects, "P_med")
SORT file.name
```

---

## Writing Workflow

### With Quarto

Your paper lives in `draft.qmd`:

```yaml
---
title: "P_med: A Novel Estimand for Sequential Mediation"
author:
  - name: Davood Tofighi
    affiliation: University of New Mexico
format:
  pdf:
    template: psych-methods
bibliography: references.bib
---
```

### Writing Sessions

```
"Resume writing P_med results section"
```

Claude:
1. Loads project context
2. Shows last stopping point
3. Offers to draft next paragraph
4. Links to relevant literature notes

### Version Control

```
"P_med milestone: Results section first draft"
```

Logs checkpoint with timestamp.

---

## Submission Workflow

### Pre-Submission Checklist

```
"P_med submission checklist"
```

Shows:
```
## Submission Checklist: P_med → Psychological Methods

### Manuscript
- [x] Title page with all authors
- [x] Abstract ≤250 words
- [x] Keywords (3-5)
- [ ] Word count noted
- [x] References APA 7th

### Figures
- [x] Fig 1: DAG (300 dpi)
- [x] Fig 2: Results (300 dpi)
- [ ] Figure captions separate file

### Tables
- [x] Table 1: Simulation design
- [ ] Table 2: Results

### Supplementary
- [ ] Technical appendix
- [ ] Code availability statement
- [ ] Data availability statement

### Submission
- [ ] Cover letter
- [ ] Potential reviewers (3)
- [ ] Conflicts of interest
```

### Logging Submission

```
"P_med submitted to Psychological Methods"
```

Updates status, logs date, moves to "Submitted" state.

---

## Revision Workflow

### Tracking Revisions

```
"P_med revision: Major revision received"
```

Creates revision tracking:

```markdown
## Revision 1 - Major

### Editor Comments
- 

### Reviewer 1
| Comment | Response | Status |
|---------|----------|--------|
| Add sensitivity analysis | Added Section 4.3 | ✅ |
| Clarify assumptions | Revised p. 7 | ✅ |

### Reviewer 2
| Comment | Response | Status |
|---------|----------|--------|
| | | |

### Response Document
[[submission/response-r1.md]]
```

---

## Multi-Paper Management

### Paper Pipeline View

```
"Show my publication pipeline"
```

```
📚 PUBLICATION PIPELINE

DRAFTING
  P_med           ▓▓▓▓▓▓▓░░░ 70%  → Psych Methods
  pathmed         ▓▓▓▓▓░░░░░ 50%  → J Causal Inf

SUBMITTED
  collider-R2     Submitted 2026-05-01 → Biostatistics
    └── Under review (32 days)

IN REVISION
  sensitivity-boot  R&R received 2026-04-15 → JASA
    └── Due: 2026-06-15 (12 days)

ACCEPTED
  multiply-robust   Accepted 2026-03-20 → Biometrika
    └── Proofs expected soon

PUBLISHED (2026)
  mediationverse    Published 2026-02-01 → JSS
```

---

## Research Commands

| Command | Description |
|---------|-------------|
| `"Create research project: [X]"` | New paper project |
| `"Show [paper] status"` | Paper dashboard |
| `"[paper] simulation status"` | Sim progress |
| `"[paper] submitted to [X]"` | Log submission |
| `"[paper] revision: [type]"` | Start revision |
| `"Publication pipeline"` | All papers overview |
| `"Writing session: [paper]"` | Start writing |

---

## Integration with Skills

Your `/mnt/skills/user/` skills connect to research:

| Skill | Use For |
|-------|---------|
| `causal-inference-research` | Methodology framework |
| `methods-paper-writer` | JASA/Biometrika style |
| `simulation-architect` | Simulation design |
| `sensitivity-analyst` | Sensitivity analysis |
| `proof-architect` | Mathematical proofs |

Example:
```
"Using the methods-paper-writer skill, help me structure the P_med methods section"
```

---

## Best Practices

### Capture Ideas
- ✅ Capture paper ideas immediately in inbox
- ✅ Include the "why this matters"
- ✅ Note potential target journal

### Project Setup
- ✅ Create project when actively starting
- ✅ Define key contribution upfront
- ✅ Set realistic milestones

### During Writing
- ✅ Update progress after each session
- ✅ Link to literature as you cite
- ✅ Log decisions and rationale

### Submission
- ✅ Use checklist before submitting
- ✅ Log all submissions with dates
- ✅ Track revision deadlines

---

## Next Steps

- [Literature Pipeline](../workflows/literature-pipeline.md) — Connect papers
- [Simulation Architect Skill](/mnt/skills/user/simulation-architect/) — Design sims
