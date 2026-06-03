---
title: Teaching Materials
description: Course management and lecture preparation
---

# Teaching Materials

**Manage courses, lectures, and grading with Nexus**

---

## TL;DR

| Task | Command |
|------|---------|
| Week overview | `"STAT 579 this week"` |
| Prep lecture | `"Prep STAT 579 Week 14"` |
| Grade status | `"Grading queue"` |
| Student question | `"Note for STAT 579: Student asked..."` |

---

## Course Structure

```
10-PROJECTS/teaching/STAT-579/
├── _index.md               # Course dashboard
├── syllabus.qmd            # Main syllabus
├── weeks/
│   ├── week-01/
│   │   ├── lecture.qmd     # Lecture slides/notes
│   │   ├── lab.qmd         # Lab materials
│   │   └── notes.md        # Prep notes
│   ├── week-02/
│   └── ...
├── assignments/
│   ├── hw1/
│   ├── hw2/
│   └── ...
├── exams/
├── materials/              # Shared resources
│   ├── datasets/
│   └── code/
└── students/               # Student Q&A log
```

---

## Course Dashboard

Example `_index.md`:

```markdown
# STAT 579: Applied Causal Inference

## Course Info
| Field | Value |
|-------|-------|
| **Semester** | Spring 2026 |
| **Schedule** | TTh 10:00-11:15 |
| **Location** | DSH 205 |
| **Students** | 18 enrolled |
| **Progress** | Week 14/15 |

## Semester Progress
```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ Week 14/15 (93%)
```

## This Week
- **Topic**: Causal Mediation Analysis
- **Lecture**: [[weeks/week-14/lecture.qmd]]
- **Lab**: [[weeks/week-14/lab.qmd]]
- **Due**: HW6 (Thursday)

## Upcoming
| Date | Item |
|------|------|
| Thu | HW6 due |
| Tue | Week 15: Review |
| Thu | Final exam review |
| Next Tue | Final exam |

## Grading Queue
- [ ] HW5: 3 remaining — Due: Today
- [ ] HW6: Collect Thursday

## Recent Student Questions
- Multiple mediators clarification ([[students/q-2026-05-28.md]])

## Week Schedule
| Wk | Topic | Status |
|----|-------|--------|
| 1 | Intro to Causal Inference | ✅ |
| 2 | Potential Outcomes | ✅ |
| ... | ... | ✅ |
| 14 | Causal Mediation | 🔄 |
| 15 | Review | ⏳ |
```

---

## Lecture Preparation

### Weekly Prep Workflow

```
"Prep STAT 579 Week 14"
```

Claude shows:

```
📚 LECTURE PREP: STAT 579 Week 14

TOPIC: Causal Mediation Analysis

TO PREPARE:
- [ ] Review lecture slides from last year
- [ ] Update examples with new data
- [ ] Prepare R code demos
- [ ] Create practice problems

MATERIALS NEEDED:
- [[VanderWeele-2015]] — Primary reference
- [[mediation-theory]] — Area notes
- Dataset: [[materials/datasets/mediation-example.csv]]

DEPENDENCIES:
- Week 13 (IPTW) complete ✅
- Students have R mediation package

TIME ESTIMATE: 3 hours total
- Slides: 90 min
- Code: 60 min  
- Practice problems: 30 min
```

### Lecture File Template

```markdown
---
title: "Week 14: Causal Mediation Analysis"
subtitle: "STAT 579 - Applied Causal Inference"
date: 2026-05-28
format: revealjs
---

## Learning Objectives

By the end of this lecture, you will be able to:

1. Define natural direct and indirect effects
2. State identification assumptions
3. Implement mediation analysis in R
4. Interpret mediation results

## Outline

1. Motivation (10 min)
2. Definitions (20 min)
3. Identification (25 min)
4. Estimation (20 min)

---

## Motivation

<!-- Content here -->

---

## Wrap-up

### Key Takeaways
1. 
2. 
3. 

### Next Week
- 

### Homework
- HW6 due Thursday
```

---

## Assignment Management

### Assignment Structure

```
assignments/
├── hw1/
│   ├── hw1-prompt.qmd      # Student-facing
│   ├── hw1-solutions.qmd   # Solutions
│   ├── hw1-rubric.md       # Grading rubric
│   └── submissions/        # Student work
│       ├── student1.pdf
│       └── ...
```

### Grading Workflow

```
"Grading queue"
```

Shows:
```
📝 GRADING QUEUE

HIGH PRIORITY
  STAT 579 HW5     3/25 remaining   Due: Today
    └── Estimated time: 30 min

UPCOMING
  STAT 579 HW6     Collect Thu      Grade by: Mon
  STAT 440 Quiz 4  Collect Fri      Grade by: Tue

COMPLETED THIS WEEK
  ✅ STAT 579 HW5  22/25 graded
  ✅ STAT 440 HW3  All done
```

### Grading Session

```
"Start grading STAT 579 HW5"
```

Claude:
1. Opens rubric
2. Shows remaining submissions
3. Tracks progress
4. Estimates time

```
"Mark STAT 579 HW5 done"
```

Updates queue.

---

## Office Hours

### Tracking Questions

```
"Office hours note: Student asked about effect modification in mediation"
```

Creates note in `students/`:

```markdown
# Office Hours - 2026-05-28

## Question
Effect modification in mediation — when interaction term needed?

## Answer
When exposure-mediator interaction affects outcome, 
need E×M term. Show slides 45-48.

## Follow-up
- Add example to Week 14 materials
- Consider for exam review

---
Course: STAT 579
Topic: mediation, effect-modification
```

### Question Patterns

```
"Common STAT 579 questions"
```

Aggregates recurring topics for exam review.

---

## Exam Management

### Exam Prep

```
"Prep STAT 579 final exam"
```

Shows:
- Topics covered (weeks 1-15)
- Question bank by topic
- Past exam questions
- Time allocation

### Exam Structure

```
exams/
├── final/
│   ├── exam-final.qmd
│   ├── exam-final-solutions.qmd
│   ├── exam-final-rubric.md
│   └── exam-final-statistics.md
```

---

## Multi-Course Management

### Teaching Dashboard

```
"Teaching pulse"
```

```
📚 TEACHING DASHBOARD

STAT 579: Applied Causal Inference
  Progress: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ Week 14/15
  This week: Causal Mediation
  Grading: 3 HW5 remaining
  
STAT 440: Intro Statistical Learning  
  Progress: ▓▓▓▓▓▓▓▓▓▓▓▓░░░ Week 12/15
  This week: Random Forests
  Grading: All caught up ✅

UPCOMING DEADLINES
  Today: HW5 grades due
  Thu: HW6 collected
  Next Tue: STAT 579 final

PREP NEEDED
  - STAT 579 Week 15 (review) — 2 hrs
  - STAT 440 Week 13 — 3 hrs
```

---

## Course Calendar Integration

### Semester View

```
"STAT 579 calendar"
```

Shows full semester with:
- Lecture dates
- Assignment due dates
- Exam dates
- Holidays

### Week View

```
"STAT 579 this week"
```

```
📅 STAT 579 - This Week

TUESDAY (Today)
  10:00 Lecture: Causal Mediation Part 1
  └── Room DSH 205

THURSDAY  
  10:00 Lecture: Causal Mediation Part 2
  └── HW6 DUE at start of class

FRIDAY
  14:00 Office Hours
  
TO-DO BEFORE THURSDAY
  - [ ] Finalize lecture slides
  - [ ] Post HW6 solutions
  - [ ] Grade remaining HW5
```

---

## Teaching Commands

| Command | Description |
|---------|-------------|
| `"[course] this week"` | Week overview |
| `"Prep [course] Week [N]"` | Lecture prep |
| `"Grading queue"` | All grading tasks |
| `"Start grading [assignment]"` | Grading session |
| `"Teaching pulse"` | All courses |
| `"Office hours note: [X]"` | Log question |
| `"[course] calendar"` | Semester view |

---

## Integration with Skills

Your `/mnt/skills/user/` skills support teaching:

| Skill | Use For |
|-------|---------|
| `statistical-pedagogy-framework` | Lesson design |
| `causal-inference-research` | Content accuracy |
| `mathematical-foundations` | Theory explanations |

Example:
```
"Using the pedagogy framework, help me explain NDE/NIE to students"
```

---

## Best Practices

### Prep
- ✅ Prep lectures 1 week ahead
- ✅ Review last year's materials first
- ✅ Note student questions for future

### Grading
- ✅ Grade in batches (by problem, not student)
- ✅ Use rubrics consistently
- ✅ Track time to calibrate estimates

### Organization
- ✅ One folder per course per semester
- ✅ Archive at semester end
- ✅ Keep solutions separate from prompts

---

## End of Semester

### Archive Course

```
"Archive STAT 579 Spring 2026"
```

Moves to:
```
40-ARCHIVE/courses/STAT-579-Spring-2026/
```

Preserves all materials for future reference.

### Semester Summary

```
"STAT 579 semester summary"
```

Generates statistics:
- Students enrolled/completed
- Grade distribution
- Common questions
- Materials that worked well
- Improvements for next time
