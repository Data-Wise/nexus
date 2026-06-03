---
title: Templates
description: Ready-to-use templates for all note types
---

# Templates

**Copy-paste templates for every note type**

---

## Quick Setup

1. Create `30-RESOURCES/templates/` folder
2. Copy templates below as `.md` files
3. Configure Templater plugin to use this folder

---

## Fleeting Note

**File**: `fleeting-note.md`

```markdown
# Fleeting Note - {{date}} {{time}}

{{content}}

---
Created: {{date}} {{time}}
Type: fleeting
Status: inbox
Related: 
Tags: 
```

**Usage**: Quick capture, raw thoughts, process within 48h.

---

## Daily Note

**File**: `daily-note.md`

```markdown
# {{date:dddd, MMMM D, YYYY}}

## ☀️ Morning
- [ ] Morning brief done

## 🎯 Focus
<!-- One thing that matters most today -->


## 📝 Tasks
- [ ] 

## 💭 Captured
<!-- Notes and thoughts throughout the day -->


## 🌙 End of Day
<!-- What got done? What moves to tomorrow? -->


---
Type: daily
```

---

## Literature Note

**File**: `literature-note.md`

```markdown
# {{author}} ({{year}}) - {{title}}

## Citation
<!-- Full APA/Chicago citation -->


## Status
- [ ] Read
- [ ] Extracted
- [ ] Connected to projects

## Abstract
<!-- Copy or summarize abstract -->


## Key Contributions
1. 
2. 
3. 

## Methodology
- **Approach**: 
- **Data**: 
- **Analysis**: 

## Key Results
- 
- 

## Quotes
> "..." (p. X)

> "..." (p. Y)

## Limitations
- 

## Implications for My Work
- How does this relate to [[P_med]]?
- What methods can I use?

## Questions/Follow-ups
- 

---
DOI: 
PDF: [[attachments/{{citekey}}.pdf]]
Bibtex: {{bibtex_key}}
Added: {{date}}
Projects: 
Tags: #literature
```

---

## Project Index

**File**: `project-index.md`

```markdown
# {{project_name}}

## Overview
| Attribute | Value |
|-----------|-------|
| **Type** | Research Paper / Course / Package |
| **Target** | {{journal_or_venue}} |
| **Status** | Planning / Active / Paused |
| **Progress** | ▓▓▓▓░░░░░░ 40% |
| **Deadline** | {{deadline}} |
| **Started** | {{start_date}} |

## Current Focus
<!-- What you're actively working on RIGHT NOW -->


## Sections / Milestones
- [x] Completed section
- [ ] In progress ← CURRENT
- [ ] Upcoming
- [ ] Future

## Active Tasks
```dataview
TASK FROM "10-PROJECTS/{{project_folder}}"
WHERE !completed
SORT due ASC
```

## Blockers
<!-- What's preventing progress? -->
- 

## Recent Notes
```dataview
LIST FROM "10-PROJECTS/{{project_folder}}/notes"
SORT file.mtime DESC
LIMIT 5
```

## Key Files
- [[draft.qmd]]
- [[simulations/]]
- [[figures/]]

## Related
- [[related-area]]
- [[related-paper]]

## Decision Log
<!-- Key decisions and rationale -->
| Date | Decision | Rationale |
|------|----------|-----------|

---
Type: project
Created: {{date}}
Tags: #project/{{type}}
```

---

## Research Paper Project

**File**: `research-paper.md`

```markdown
# {{paper_title}}

## Metadata
| Field | Value |
|-------|-------|
| **Authors** | {{authors}} |
| **Target Journal** | {{journal}} |
| **Status** | Drafting / Submitted / Revision |
| **Progress** | ▓▓▓▓▓░░░░░ 50% |
| **Deadline** | {{deadline}} |

## Abstract Draft
<!-- Working abstract -->


## Sections
| Section | Status | Progress |
|---------|--------|----------|
| Introduction | ✅ Done | 100% |
| Methods | ✅ Done | 100% |
| Results | 🔄 Active | 60% |
| Discussion | ⏳ Pending | 0% |
| Abstract | ⏳ Pending | 0% |

## Key Contributions
1. 
2. 
3. 

## Simulation Study
- [ ] Design complete
- [ ] Code written
- [ ] Results generated
- [ ] Tables/figures created

## Submission Checklist
- [ ] All sections complete
- [ ] References checked
- [ ] Figures publication-ready
- [ ] Supplementary materials
- [ ] Cover letter
- [ ] Co-author approval

## Files
- Draft: [[draft.qmd]]
- Simulations: [[simulations/]]
- Figures: [[figures/]]
- Submission: [[submission/]]

---
Type: project/research
Journal: {{journal}}
Tags: #project/research #paper
```

---

## Course Project

**File**: `course-project.md`

```markdown
# {{course_code}}: {{course_title}}

## Course Info
| Field | Value |
|-------|-------|
| **Semester** | {{semester}} |
| **Schedule** | {{days_times}} |
| **Location** | {{room}} |
| **Students** | {{enrollment}} |
| **Progress** | Week {{current}}/{{total}} |

## Semester Progress
```
Week: ▓▓▓▓▓▓▓▓▓▓▓▓░░░ 80%
      1  2  3  4  5  6  7  8  9  10 11 12 13 14 15
```

## This Week
- **Topic**: {{week_topic}}
- **Lecture**: [[weeks/week-{{n}}/lecture.qmd]]
- **Assignment**: {{assignment}}

## Week Schedule
| Week | Topic | Status |
|------|-------|--------|
| 1 | Introduction | ✅ |
| 2 | Topic A | ✅ |
| 3 | Topic B | 🔄 |
| ... | ... | ⏳ |

## Grading Queue
```dataview
TASK FROM "10-PROJECTS/teaching/{{course}}"
WHERE contains(text, "grade") AND !completed
```

## Office Hours Questions
<!-- Capture questions to address -->
- 

## Course Files
- Syllabus: [[syllabus.qmd]]
- Weeks: [[weeks/]]
- Assignments: [[assignments/]]
- Materials: [[materials/]]

---
Type: project/teaching
Course: {{course_code}}
Tags: #project/teaching #course/{{code}}
```

---

## Meeting Note

**File**: `meeting-note.md`

```markdown
# Meeting: {{meeting_title}}

## Details
| Field | Value |
|-------|-------|
| **Date** | {{date}} |
| **Time** | {{time}} |
| **Attendees** | {{attendees}} |
| **Project** | [[{{project}}]] |

## Agenda
1. 
2. 
3. 

## Notes
<!-- Key discussion points -->


## Decisions
- 

## Action Items
- [ ] @{{person}}: {{task}} — {{due_date}}
- [ ] @me: {{my_task}}

## Follow-up
<!-- What needs to happen next -->


---
Type: meeting
Project: {{project}}
Tags: #meeting
```

---

## Concept Note (Zettelkasten-style)

**File**: `concept-note.md`

```markdown
# {{concept_title}}

## Summary
<!-- One paragraph explaining this concept in your own words -->


## Key Points
1. 
2. 
3. 

## In My Words
<!-- Your understanding, not quotes -->


## Examples
- 

## Applications
- How I use this in [[project]]
- Relevant for [[area]]

## Related Concepts
- Builds on: [[foundation-concept]]
- Leads to: [[advanced-concept]]
- Contrasts with: [[alternative-concept]]

## Sources
- [[Author-Year]] — Key source
- [[Author-Year]] — Additional reading

---
Type: concept
Area: {{area}}
Tags: #concept/{{domain}}
```

---

## Weekly Review

**File**: `weekly-review.md`

```markdown
# Weekly Review: Week of {{start_date}}

## 1. Celebrate ✅
### Completed This Week
- 

### Progress Made
| Project | Before | After | Change |
|---------|--------|-------|--------|
| P_med | 60% | 70% | +10% |

## 2. Clear 📥
### Inbox Status
- Items processed: __
- Items remaining: __

## 3. Review 📊
### Project Health
| Project | Progress | Status | Next Action |
|---------|----------|--------|-------------|
| | | | |

### Blockers
- 

## 4. Plan 🎯
### Next Week Priorities
1. 
2. 
3. 

### Calendar Conflicts
- 

## 5. Maintain 🔧
- [ ] No orphan notes
- [ ] All tagged
- [ ] Tasks dated

## Notes
<!-- Anything else to capture -->


---
Type: review/weekly
Week: {{week_number}}
Tags: #review/weekly
```

---

## Code Snippet

**File**: `code-snippet.md`

```markdown
# {{snippet_name}}

## Purpose
<!-- What does this code do? -->


## Code

\```{{language}}
{{code}}
\```

## Usage

\```{{language}}
{{usage_example}}
\```

## Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `param1` | type | what it does |

## Notes
- 

## Related
- Used in: [[project]]
- Based on: [[source]]

---
Type: snippet
Language: {{language}}
Tags: #code/{{language}}
```

---

## Quick Reference Card

**File**: `refcard-template.md`

```markdown
# {{topic}} Reference Card

## Overview
<!-- 1-2 sentence summary -->


## Quick Reference
| Item | Description |
|------|-------------|
| | |

## Key Commands / Formulas
```
{{key_content}}
```

## Common Patterns
1. **Pattern A**: 
2. **Pattern B**: 
3. **Pattern C**: 

## Gotchas
- ⚠️ Watch out for...

## See Also
- [[related-topic]]

---
Type: refcard
Tags: #reference/{{domain}}
```

---

## Installation

### Templater Setup

1. Install Templater plugin
2. Settings → Template folder: `30-RESOURCES/templates`
3. Enable "Trigger on file creation"

### Using Templates

**Option A**: Templater command
```
Ctrl/Cmd + P → Templater: Create new note from template
```

**Option B**: QuickAdd
Configure QuickAdd to insert templates with hotkeys.

**Option C**: Via Claude
```
"Create literature note for VanderWeele 2015"
```
