---
title: Task Management
description: Daily focus, priorities, and progress tracking
---

# Task Management

**⏱️ Read: 10 min | 🎯 Your daily productivity system**

---

## TL;DR

| Time | Command | Duration |
|------|---------|----------|
| Morning | `"Morning brief"` | 2 min |
| During day | `"What should I work on?"` | 30 sec |
| When stuck | `"I'm stuck on [X]"` | 5 min |
| End of day | `"End of day"` | 3 min |

---

## Morning Startup (2 min)

### The Command

```
"Morning brief"
```

### What You Get

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌅 NEXUS MORNING BRIEF
   Tuesday, June 3, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 TODAY'S CALENDAR
  • 10:00 — STAT 579 Lecture (Rm 205)
  • 14:00 — Research meeting with grad students
  • 16:00 — Office hours

🎯 TOP 3 (pick ONE to start)
  1. [45 min] P_med: Write results section
  2. [30 min] Grade HW5 (8 remaining)
  3. [15 min] Process inbox (12 items)

📊 PROJECT PULSE
  • P_med        ▓▓▓▓▓▓░░░░ 60%  ⚡ Results due Fri
  • STAT 579     ▓▓▓▓▓▓▓▓░░ 80%  ✓ On track
  • medfit       ▓▓▓▓░░░░░░ 40%  

📥 INBOX: 12 items (oldest: 3 days)

💡 QUICK WIN: Reply to Dr. Chen's email [5 min]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### The Rule

**Pick ONE thing. Start it. Everything else waits.**

---

## During the Day

### Getting Unstuck

When you don't know what to do:

```
"What should I work on?"
```

Claude considers:
- Current energy level (if you've mentioned it)
- Time until next meeting
- Deadline proximity
- What you've been avoiding
- Project priorities

Returns **ONE** recommendation with time estimate.

### Energy-Based Selection

```
"I'm low energy right now"
```

| Energy | Suggested Tasks |
|--------|-----------------|
| 🔴 Low | Process inbox, file notes, read papers, admin |
| 🟡 Medium | Write drafts, review code, planning, email |
| 🟢 High | Deep writing, new code, complex analysis |

### Context Switching

When changing tasks:

```
"Switching to grading now"
```

Claude:
- Notes current task state
- Captures any loose thoughts
- Loads grading context
- Shows relevant info

---

## When You're Stuck

### The Command

```
"I'm stuck on the P_med results section"
```

### Claude's Response

1. **Asks what's blocking you**
   - "What specifically is hard about this?"
   
2. **Breaks it down**
   - "Let's split this into smaller pieces..."
   
3. **Suggests tiny first step**
   - "Can you just write the first sentence of the first paragraph?"
   
4. **Offers to help**
   - "Want me to draft an outline based on your methods section?"

### The Principle

**The smallest step is still a step.**

5 minutes of work > 0 minutes of paralysis.

---

## End of Day (3 min)

### The Command

```
"End of day"
```

### What Happens

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌙 END OF DAY SUMMARY
   Tuesday, June 3, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ COMPLETED TODAY
  • P_med results section (first draft)
  • Graded 5 of 8 HW5 submissions
  • Replied to Dr. Chen
  • Processed 8 inbox items

📝 CAPTURED
  • 3 fleeting notes saved
  • 1 literature note added

➡️ MOVED TO TOMORROW
  • Grade remaining 3 HW5
  • P_med: Add sensitivity table

📊 PROJECT PROGRESS
  • P_med        ▓▓▓▓▓▓▓░░░ 70%  (+10% today)

🎯 TOMORROW'S FOCUS
  • Finish HW5 grading before 10am lecture
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Task Syntax

### Creating Tasks

```
"Task: Review Smith et al. paper for Thursday"
```

Creates in `60-TASKS/`:

```markdown
- [ ] Review Smith et al. paper #task
  📅 Due: Thursday
  🏷️ Project: literature-review
  ⏱️ Estimate: 45 min
```

### Task Properties

| Property | Syntax | Example |
|----------|--------|---------|
| Due date | `for [date]` | `for Friday` |
| Priority | `high/medium/low` | `high priority` |
| Project | `for [project]` | `for P_med` |
| Estimate | `[X] min/hours` | `30 min` |
| Recurrence | `every [freq]` | `every Monday` |

### Quick Task Entry

```
"Task: Grade HW5, high priority, for tomorrow, 2 hours"
```

---

## Task Views

### Today's Tasks

```
"Show my tasks for today"
```

### By Project

```
"Show P_med tasks"
```

### Overdue

```
"What's overdue?"
```

### This Week

```
"Tasks for this week"
```

---

## Progress Tracking

### Visual Progress

Every project shows:

```
**Progress**: ▓▓▓▓▓▓░░░░ 60%
**Tasks**: [6/10 complete]
**Time spent**: ~12 hours
**Deadline**: Friday (3 days)
```

### Progress Updates

```
"Mark P_med results as done"
```

```
"Update P_med to 70%"
```

### Momentum Indicators

| Symbol | Meaning |
|--------|---------|
| ⚡ | Deadline approaching |
| 🔥 | Overdue |
| ✓ | On track |
| ⏸️ | Paused/blocked |

---

## Weekly Review (15 min)

### The Command

```
"Weekly review"
```

### What You Do

1. **Review completed** — What got done?
2. **Review incomplete** — What's still open?
3. **Process inbox** — Clear the backlog
4. **Update projects** — Adjust progress/status
5. **Plan next week** — Set top priorities

### Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 WEEKLY REVIEW
   Week of June 1, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ COMPLETED THIS WEEK (12 tasks)
  • P_med results section
  • STAT 579 Week 14 materials
  • [...]

⏳ CARRIED OVER (3 tasks)
  • medfit documentation
  • [...]

📊 PROJECT HEALTH
  • P_med        ▓▓▓▓▓▓▓░░░ 70%  ✓ Good progress
  • STAT 579     ▓▓▓▓▓▓▓▓▓░ 90%  ✓ Almost done
  • medfit       ▓▓▓▓░░░░░░ 40%  ⚠️ Needs attention

🎯 NEXT WEEK PRIORITIES
  1. Submit P_med draft
  2. Finish STAT 579 Week 15
  3. medfit: Complete vignette
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ADHD-Specific Features

### Time Blindness Helpers

- Every task has time estimate
- "X days until deadline" warnings
- Calendar integration shows blocks

### Decision Fatigue Reducers

- **ONE** task recommendation at a time
- Pre-prioritized suggestions
- No choice paralysis

### Dopamine Hits

- Visual progress bars
- Completion celebrations
- Streak tracking

### Overwhelm Recovery

```
"I'm overwhelmed"
```

Claude:
1. Acknowledges (no guilt)
2. Clears the slate mentally
3. Picks ONE tiny thing
4. Walks through it with you

---

## Commands Reference

| Command | Action |
|---------|--------|
| `"Morning brief"` | Daily startup |
| `"What should I work on?"` | Task suggestion |
| `"Task: [X]"` | Create task |
| `"I'm stuck on [X]"` | Get unstuck |
| `"End of day"` | Daily wrap-up |
| `"Weekly review"` | Weekly planning |
| `"Show tasks for [project]"` | Filter tasks |
| `"Mark [X] done"` | Complete task |

---

## Next Steps

- [Project Dashboards](project-dashboards.md) — Track larger work
- [ADHD Guide](../adhd-guide.md) — More optimization tips
