---
title: Knowledge Management
description: Capture, organize, and retrieve knowledge with Claude
---

# Knowledge Management

**⏱️ Read: 8 min | 🎯 Core workflow for daily use**

---

## TL;DR

| Action | Command | Result |
|--------|---------|--------|
| Capture thought | `"Capture: [idea]"` | Note in `00-INBOX/` |
| Find notes | `"Find notes about [topic]"` | Semantic search |
| Link notes | `"Link this to [project]"` | Auto-backlink |
| Process inbox | `"Process my inbox"` | Triage + organize |

---

## The Capture Workflow

### 1. Capture Everything (Friction = 0)

When a thought hits you:

```
"Capture: need to check sensitivity bounds for P_med simulation"
```

Claude creates:

```markdown
# Fleeting Note - 2026-06-02 20:35

need to check sensitivity bounds for P_med simulation

---
Created: 2026-06-02 20:35
Type: fleeting
Status: inbox
```

**No decisions. No categorization. Just capture.**

### 2. Capture Variations

| You Say | Claude Does |
|---------|-------------|
| `"Capture: [thought]"` | Fleeting note in inbox |
| `"Idea for P_med: [thought]"` | Note linked to project |
| `"Task: [description]"` | Task in `60-TASKS/` |
| `"Meeting note: [content]"` | Timestamped meeting note |
| `"Quote: [text] from [source]"` | Literature excerpt |

---

## The Retrieval Workflow

### Semantic Search

```
"Find notes about sensitivity analysis"
```

Claude searches across:
- Note titles and content
- Tags and metadata
- Linked references
- Project associations

Returns ranked results with context snippets.

### Query Patterns

| Query Type | Example |
|------------|---------|
| Topic search | `"Find notes about mediation"` |
| Project search | `"Show P_med related notes"` |
| Date search | `"Notes from last week"` |
| Tag search | `"Notes tagged #methodology"` |
| Author search | `"Notes citing VanderWeele"` |

---

## The Organization Workflow

### Daily Inbox Processing (5 min)

```
"Process my inbox"
```

Claude shows each item and asks:
1. **Delete** — Not needed
2. **Quick note** — Stays as-is with tags
3. **Project note** — Move to `10-PROJECTS/`
4. **Reference** — Move to `30-RESOURCES/`
5. **Task** — Convert to task

### Auto-Linking

When you create or edit notes, Claude:
- Detects related concepts
- Suggests backlinks
- Updates project indices
- Maintains connection graph

```
"Link this note to my sensitivity analysis work"
```

---

## Note Types

### Fleeting Notes
Quick captures, unprocessed thoughts.
```
Location: 00-INBOX/fleeting-notes/
Lifecycle: Process within 24-48 hours
```

### Literature Notes
Paper summaries, key contributions.
```
Location: 30-RESOURCES/literature/
Template: Author, Year, Key Points, Quotes
```

### Permanent Notes
Refined ideas in your own words.
```
Location: 20-AREAS/[topic]/
Format: Atomic, linked, evergreen
```

### Project Notes
Active work documentation.
```
Location: 10-PROJECTS/[project]/
Contains: Plans, drafts, meeting notes
```

---

## Linking Strategy

### Manual Links
```markdown
This relates to [[sensitivity-analysis]] and builds on [[VanderWeele-2015]].
```

### Claude-Assisted Links
```
"What should this note link to?"
```

Claude analyzes content and suggests:
- Related concepts in your vault
- Relevant literature notes
- Active project connections

### Link Types

| Link | Meaning |
|------|---------|
| `[[note]]` | Standard wiki link |
| `[[note#section]]` | Section link |
| `[[note\|alias]]` | Aliased link |
| `#tag` | Tag reference |

---

## Templates

### Quick Capture Template
```markdown
# {{title}}

{{content}}

---
Created: {{date}}
Type: fleeting
Related: 
Tags: 
```

### Literature Note Template
```markdown
# {{author}} ({{year}}) - {{title}}

## Key Contributions
- 

## Methodology
- 

## Quotes
> "..." (p. X)

## Implications for My Work
- 

---
DOI: 
PDF: [[attachments/{{citekey}}.pdf]]
Related: 
Tags: #literature
```

---

## Best Practices

### Capture
- ✅ Capture immediately when thought occurs
- ✅ Use voice capture when typing is slow
- ✅ Include enough context to understand later
- ❌ Don't organize while capturing
- ❌ Don't perfect the wording

### Organize
- ✅ Process inbox daily (or every 2 days max)
- ✅ Use consistent naming conventions
- ✅ Link liberally
- ❌ Don't over-categorize
- ❌ Don't create empty folder structures

### Retrieve
- ✅ Search before creating new notes
- ✅ Use semantic queries, not just keywords
- ✅ Follow links to discover connections
- ❌ Don't rely on folder browsing alone

---

## Commands Reference

| Command | Action |
|---------|--------|
| `"Capture: [X]"` | Create fleeting note |
| `"Find [topic]"` | Semantic search |
| `"Link to [project]"` | Add backlink |
| `"Process inbox"` | Triage inbox items |
| `"Show unlinked notes"` | Find orphans |
| `"Daily note"` | Open/create today's note |
| `"What links here?"` | Show backlinks |

---

## Next Steps

- [Task Management](task-management.md) — Integrate with daily workflow
- [Literature Pipeline](literature-pipeline.md) — Paper capture system
- [Templates Reference](../reference/templates.md) — All templates
