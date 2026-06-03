# Template Standards

> **TL;DR:** YAML frontmatter specifications and template format for all Nexus note types. Consistent metadata enables Dataview queries.

**Last Updated:** 2025-12-21
**Version:** 1.0.0

---

## Core Principle

Every template MUST:
1. Use YAML frontmatter for metadata
2. Include minimum required fields
3. Be Dataview-queryable
4. Support Templater syntax
5. Follow naming conventions

---

## Universal Frontmatter Fields

All notes SHOULD include:

```yaml
---
type: [note-type]        # Required: Enables filtering
created: YYYY-MM-DD      # Required: Creation timestamp
tags: []                 # Optional: Categories
---
```

---

## Template Specifications

### 1. Project Template

**File:** `30-RESOURCES/templates/project.md`

**Use Case:** Research projects, teaching courses, software packages

**Frontmatter:**
```yaml
---
type: manuscript | package | course
title: "{{title}}"
status: idea | active | draft | review | complete
priority: 1-5
deadline: YYYY-MM-DD
target: "journal-name | conference | milestone"
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags: [project]
---
```

**Required Fields:**
- `type` - Project category
- `title` - Project name
- `status` - Current state
- `created` - Creation date

**Optional Fields:**
- `priority` - 1 (urgent) to 5 (someday)
- `deadline` - Due date
- `target` - Where/what this is for
- `collaborators` - Array of names
- `funding` - Grant information

**Template Body:**
```markdown
# {{title}}

## 📋 Status Checklist
- [ ] Phase 1
- [ ] Phase 2
- [ ] Phase 3

## 🎯 Core Contribution
> One sentence: what's new?

## 📝 Research Log

### <% tp.date.now("YYYY-MM-DD") %>
- Created project

## ✅ Tasks

## 🔗 Related
- [[Link to related notes]]

## 📎 Files
- Location: `path/to/files`
```

**Dataview Query Example:**
```markdown
```dataview
TABLE status, deadline, priority
FROM "10-PROJECTS"
WHERE type = "manuscript"
SORT deadline ASC
```
```

---

### 2. Literature Note Template

**File:** `30-RESOURCES/templates/paper-note.md`

**Use Case:** Academic paper notes

**Frontmatter:**
```yaml
---
type: literature
title: "{{title}}"
authors: [Author1, Author2]
year: YYYY
journal: "Journal Name"
doi: "10.xxxx/xxxx"
url: "https://..."
read-status: to-read | reading | read | processed
rating: 1-5
relevance:
  project1: low | medium | high
  project2: low | medium | high
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [literature, topic1, topic2]
---
```

**Required Fields:**
- `type` = "literature"
- `title` - Paper title
- `authors` - Array of authors
- `year` - Publication year
- `read-status` - Reading progress

**Optional Fields:**
- `journal` - Publication venue
- `doi` - Digital Object Identifier
- `url` - Link to paper
- `rating` - 1-5 stars (quality assessment)
- `relevance` - Relevance to projects (enables prioritization)

**Template Body:**
```markdown
# {{title}}

## 📋 Quick Reference
- **Authors**: {{authors}}
- **Year**: {{year}}
- **Journal**: {{journal}}
- **DOI**: {{doi}}

## 🎯 Core Contribution
> One sentence summary

## 🔑 Key Ideas
1.
2.
3.

## 📐 Key Equations
$$

$$

## 🔗 Connections
- **Builds on**: [[paper1]], [[paper2]]
- **Extended by**: [[paper3]]
- **Contradicts**: [[paper4]]
- **Applies to my work**: [[project-name]]

## 📝 My Notes

### Strengths
-

### Limitations
-

### Questions
-

## 🏷️ Tags
#topic1 #topic2 #methodology

## 📎 PDF Location
`~/Papers/{{year}}/{{FirstAuthor}}-{{year}}.pdf`
```

**Dataview Query Example:**
```markdown
```dataview
TABLE
  authors as "Authors",
  year as "Year",
  rating as "Rating",
  read-status as "Status"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "mediation")
SORT year DESC
```
```

---

### 3. Daily Note Template

**File:** `30-RESOURCES/templates/daily.md`

**Use Case:** Daily planning and logging

**Frontmatter:**
```yaml
---
type: daily
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [daily]
---
```

**Required Fields:**
- `type` = "daily"
- `date` - ISO 8601 date

**Template Body:**
```markdown
# <% tp.date.now("dddd, MMMM D, YYYY") %>

## 🎯 Top 3 Today
1. [ ]
2. [ ]
3. [ ]

## 📋 Tasks
\`\`\`dataview
TASK
FROM "10-PROJECTS" OR "60-TASKS"
WHERE due = date(this.date) AND !completed
SORT priority ASC
\`\`\`

## 📝 Notes

## 🔗 Links
- [[Related notes]]

## 🌙 End of Day
- **Done**:
- **Blocked**:
- **Tomorrow**:
```

**Dataview Query Example:**
```markdown
```dataview
LIST
FROM "50-DAILY"
WHERE date = date(today)
```
```

---

### 4. Lecture/Teaching Template

**File:** `30-RESOURCES/templates/lecture.md`

**Use Case:** Teaching materials, lectures, course content

**Frontmatter:**
```yaml
---
type: lecture
title: "{{title}}"
course: "COURSE-CODE"
week: N
date: YYYY-MM-DD
topics: [topic1, topic2]
learning-objectives: []
prep-status: planned | drafted | ready | delivered
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [teaching, course-code]
---
```

**Required Fields:**
- `type` = "lecture"
- `title` - Lecture title
- `course` - Course code
- `week` - Week number

**Template Body:**
```markdown
# {{title}}

## 📋 Metadata
- **Course**: {{course}}
- **Week**: {{week}}
- **Date**: {{date}}
- **Duration**: XX minutes

## 🎯 Learning Objectives
1.
2.
3.

## 📚 Topics
- {{topic1}}
- {{topic2}}

## 📝 Outline

### 1. Hook (5 min)
-

### 2. Main Content (30 min)
-

### 3. Activity (15 min)
-

### 4. Wrap-up (5 min)
-

## 💻 Code Examples

\`\`\`r

\`\`\`

## 📊 Slides
- Location: `path/to/slides.qmd`

## 📎 Materials
- [ ] Slides prepared
- [ ] Code examples tested
- [ ] Datasets available
- [ ] Assignment ready

## 🔗 Related
- Previous: [[week-{{week-1}}]]
- Next: [[week-{{week+1}}]]
- Resources: [[topic-notes]]
```

---

### 5. Task Template

**File:** `30-RESOURCES/templates/task.md`

**Use Case:** Standalone task notes (for complex tasks)

**Frontmatter:**
```yaml
---
type: task
title: "{{title}}"
project: "[[project-link]]"
priority: 1-5
energy: high | medium | low
time-estimate: 15m | 30m | 1h | 2h | half-day | full-day
context: @computer | @read | @write | @code | @review
due: YYYY-MM-DD
status: pending | in-progress | blocked | completed
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [task]
---
```

**Required Fields:**
- `type` = "task"
- `title` - Task description
- `status` - Current state

**Optional Fields:**
- `project` - Link to parent project
- `priority` - 1 (urgent) to 5 (someday)
- `energy` - Required energy level
- `time-estimate` - How long it takes
- `context` - Where/how to do it
- `due` - Deadline
- `waiting-for` - Dependency

**Template Body:**
```markdown
# {{title}}

## 📋 Details
- **Project**: {{project}}
- **Priority**: {{priority}}
- **Time**: {{time-estimate}}
- **Context**: {{context}}

## ✅ Subtasks
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## 📝 Notes

## 🚧 Blockers
-

## ✅ Completion
- **Completed**: YYYY-MM-DD
- **Result**: What was achieved
```

---

### 6. Weekly Review Template

**File:** `30-RESOURCES/templates/weekly-review.md`

**Use Case:** Weekly retrospectives

**Frontmatter:**
```yaml
---
type: weekly-review
week: <% tp.date.now("YYYY-[W]ww") %>
year: <% tp.date.now("YYYY") %>
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [review, weekly]
---
```

**Template Body:**
```markdown
# Weekly Review: <% tp.date.now("YYYY-[W]ww") %>

## 🏆 Wins This Week
-
-

## 📊 Project Progress

\`\`\`dataview
TABLE status, progress
FROM "10-PROJECTS"
WHERE type = "manuscript"
\`\`\`

## 🔄 What Didn't Work
-

## 🎯 Next Week Priorities
1.
2.
3.

## 📝 Notes
-

## 📅 Calendar Review
- Key meetings:
- Deadlines:
```

---

## Field Type Specifications

### Enumerated Fields (Must Use Exact Values)

**type:**
```
Valid: manuscript | package | course | literature | daily |
       lecture | task | weekly-review | fleeting | area
```

**status (projects):**
```
Valid: idea | active | draft | review | complete |
       paused | archived | published
```

**read-status (literature):**
```
Valid: to-read | reading | read | processed
```

**priority:**
```
Valid: 1 | 2 | 3 | 4 | 5
Range: 1 (urgent) to 5 (someday)
```

**energy:**
```
Valid: high | medium | low
```

**time-estimate:**
```
Valid: 15m | 30m | 1h | 2h | half-day | full-day
```

---

### Date Fields (ISO 8601)

**Format:** `YYYY-MM-DD`

**Examples:**
```yaml
created: 2025-12-21
deadline: 2025-03-01
due: 2025-12-25
```

**Templater Syntax:**
```yaml
created: <% tp.date.now("YYYY-MM-DD") %>
```

---

### Array Fields

**authors:**
```yaml
authors: [VanderWeele, Robins, Richardson]
```

**tags:**
```yaml
tags: [mediation, sensitivity-analysis, causal-inference]
```

**collaborators:**
```yaml
collaborators: [Alice, Bob, Charlie]
```

---

### Object Fields

**relevance:**
```yaml
relevance:
  P_med: high
  STAT579: medium
  RMediation: low
```

---

## Templater Functions

### Date Functions

```javascript
<% tp.date.now("YYYY-MM-DD") %>           // 2025-12-21
<% tp.date.now("dddd, MMMM D, YYYY") %>   // Saturday, December 21, 2025
<% tp.date.now("YYYY-[W]ww") %>           // 2025-W51
<% tp.date.now("HH:mm") %>                // 14:30
```

### User Input

```javascript
<% tp.system.prompt("Enter title") %>
<% tp.system.suggester(["Option 1", "Option 2"], [1, 2]) %>
```

### File Operations

```javascript
<% tp.file.title %>                       // Current file title
<% tp.file.path() %>                      // File path
<% tp.file.folder() %>                    // Folder path
```

---

## Template Testing Checklist

Before committing a template:

- [ ] YAML frontmatter is valid
- [ ] All required fields present
- [ ] Templater syntax works
- [ ] Dataview queries return results
- [ ] No syntax errors
- [ ] Links are valid
- [ ] Follows naming conventions
- [ ] Tested in actual vault

---

## Common Mistakes

❌ **Invalid YAML**
```yaml
---
title: My Title (unquoted with colon : in text)
---
```
✅ **Quote strings with special characters**
```yaml
---
title: "My Title: With Colon"
---
```

❌ **Inconsistent date formats**
```yaml
created: 12/21/2025
deadline: 2025-03-01
```
✅ **Always ISO 8601**
```yaml
created: 2025-12-21
deadline: 2025-03-01
```

❌ **Invalid type values**
```yaml
type: research-paper
```
✅ **Use defined types**
```yaml
type: literature
```

---

## See Also

- [VAULT-STRUCTURE.md](VAULT-STRUCTURE.md) - Where templates live
- [DATAVIEW-STANDARDS.md](DATAVIEW-STANDARDS.md) - How to query frontmatter
- [../workflow/CAPTURE-WORKFLOWS.md](../workflow/CAPTURE-WORKFLOWS.md) - How to use templates

---

**Created:** 2025-12-21
**Maintainer:** DT
**Reference:** Obsidian Templater documentation, Dataview documentation
