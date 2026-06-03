---
title: Commands Reference
description: Complete list of all Nexus commands
---

# Commands Reference

**Quick lookup for all Nexus commands**

---

## Command Syntax

All commands are natural language. Variations work:

```
"Morning brief" = "morning brief" = "Start my day" = "What's today look like?"
```

---

## Daily Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `"Morning brief"` | `"Start my day"` | Daily overview with tasks, calendar, projects |
| `"What should I work on?"` | `"Next task"` | Energy-aware task suggestion |
| `"End of day"` | `"Wrap up"` | Daily summary and tomorrow prep |
| `"I'm stuck on [X]"` | `"Help with [X]"` | Get unstuck assistance |
| `"I'm overwhelmed"` | `"Too much"` | Reset and find one small step |

---

## Capture Commands

| Command | Output Location | Description |
|---------|-----------------|-------------|
| `"Capture: [X]"` | `00-INBOX/fleeting-notes/` | Quick thought capture |
| `"Note: [X]"` | `00-INBOX/fleeting-notes/` | Same as capture |
| `"Idea for [project]: [X]"` | `10-PROJECTS/[project]/notes/` | Project-linked note |
| `"Task: [X]"` | `60-TASKS/` | Create task |
| `"Meeting note: [X]"` | `00-INBOX/` | Timestamped meeting note |
| `"Quote: [X] from [Y]"` | `30-RESOURCES/literature/` | Literature excerpt |

---

## Task Commands

| Command | Description |
|---------|-------------|
| `"Task: [X]"` | Create basic task |
| `"Task: [X] for [date]"` | Task with due date |
| `"Task: [X], high priority"` | Priority task |
| `"Task: [X], [time] estimate"` | Task with time |
| `"Show my tasks"` | All tasks |
| `"Tasks for today"` | Today's tasks |
| `"Tasks for [project]"` | Project tasks |
| `"Mark [X] done"` | Complete task |
| `"What's overdue?"` | Overdue tasks |

### Task Syntax Examples

```
"Task: Review Smith paper for Friday, 45 min, high priority"
"Task: Grade HW5, for tomorrow, 2 hours"
"Task: Check simulation results, for P_med"
```

---

## Project Commands

| Command | Description |
|---------|-------------|
| `"Show [project] status"` | Full project dashboard |
| `"Project pulse"` | All projects summary |
| `"Create project: [name]"` | New project |
| `"Update [project] to [X]%"` | Update progress |
| `"[project] blocked by: [X]"` | Log blocker |
| `"Note for [project]: [X]"` | Add project note |
| `"Archive [project]"` | Complete and archive |
| `"Show active projects"` | Filter by status |
| `"Projects due this week"` | Deadline filter |

---

## Search Commands

| Command | Description |
|---------|-------------|
| `"Find [topic]"` | Semantic search |
| `"Find notes about [X]"` | Topic search |
| `"Search for [X]"` | Keyword search |
| `"Notes from [date range]"` | Date filter |
| `"Notes tagged [tag]"` | Tag filter |
| `"What links here?"` | Backlinks |
| `"Show unlinked notes"` | Orphan finder |

---

## Literature Commands

| Command | Description |
|---------|-------------|
| `"Add paper: [citation]"` | Create literature note |
| `"Add from DOI: [doi]"` | Auto-fetch paper |
| `"Show reading list"` | View queue |
| `"Reading note: [X]"` | Note while reading |
| `"Finished reading [paper]"` | Complete reading |
| `"Extract from [paper]"` | Guided extraction |
| `"Link [paper] to [project]"` | Connect paper |
| `"Papers about [topic]"` | Search literature |
| `"Literature for [project]"` | Project papers |

---

## Knowledge Commands

| Command | Description |
|---------|-------------|
| `"Link to [X]"` | Create backlink |
| `"What relates to [X]?"` | Find connections |
| `"Process inbox"` | Triage inbox items |
| `"Daily note"` | Open today's note |
| `"Create template: [name]"` | New template |
| `"Show templates"` | List templates |

---

## Review Commands

| Command | Description |
|---------|-------------|
| `"Weekly review"` | Full weekly review |
| `"Quick weekly review"` | 5-minute version |
| `"Show completions this week"` | What got done |
| `"Maintenance check"` | Vault health |
| `"Quarterly review"` | Deep review |

---

## Navigation Commands

| Command | Description |
|---------|-------------|
| `"Open [note name]"` | Open specific note |
| `"Go to [project]"` | Open project index |
| `"Show [folder]"` | List folder contents |
| `"Recent notes"` | Recently modified |
| `"Random note"` | Serendipity |

---

## Energy Commands

| Command | Description |
|---------|-------------|
| `"I'm low energy"` | Get low-effort tasks |
| `"High energy mode"` | Get challenging tasks |
| `"Quick wins"` | Sub-15-minute tasks |
| `"Deep work"` | 60+ minute tasks |

---

## Context Commands

| Command | Description |
|---------|-------------|
| `"Switching to [X]"` | Change context |
| `"Save context"` | Snapshot current state |
| `"Resume [project]"` | Load project context |
| `"What was I working on?"` | Recall last session |

---

## Special Commands

| Command | Description |
|---------|-------------|
| `"Help"` | Show command overview |
| `"What can you do?"` | Capabilities summary |
| `"Vault stats"` | Note counts, links, etc. |
| `"System status"` | Check Nexus health |

---

## Command Modifiers

Add to any command:

| Modifier | Effect |
|----------|--------|
| `"...briefly"` | Shorter response |
| `"...in detail"` | Expanded response |
| `"...as table"` | Table format |
| `"...as list"` | List format |

### Examples

```
"Show P_med status briefly"
"Project pulse in detail"
"Tasks for today as table"
```

---

## Creating Custom Commands

In your system prompt, define shortcuts:

```markdown
## Custom Commands
- "pub" → Show publication pipeline status
- "sim" → Show simulation status across projects
- "grade" → Show grading tasks
```

---

## Printable Quick Reference

```
╔════════════════════════════════════════════════════════╗
║                 NEXUS QUICK COMMANDS                    ║
╠════════════════════════════════════════════════════════╣
║ DAILY                                                   ║
║   Morning brief      │ Start day                        ║
║   End of day         │ Wrap up                          ║
║   What should I do?  │ Get suggestion                   ║
╠════════════════════════════════════════════════════════╣
║ CAPTURE                                                 ║
║   Capture: [X]       │ Quick note                       ║
║   Task: [X]          │ Add task                         ║
║   Note for [P]: [X]  │ Project note                     ║
╠════════════════════════════════════════════════════════╣
║ PROJECTS                                                ║
║   Show [P] status    │ Dashboard                        ║
║   Project pulse      │ Overview                         ║
║   Update [P] to X%   │ Progress                         ║
╠════════════════════════════════════════════════════════╣
║ SEARCH                                                  ║
║   Find [X]           │ Search vault                     ║
║   Process inbox      │ Triage                           ║
║   Weekly review      │ Maintenance                      ║
╚════════════════════════════════════════════════════════╝
```
