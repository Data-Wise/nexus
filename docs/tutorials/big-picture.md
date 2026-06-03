---
title: The Big Picture
description: Understanding how Nexus transforms your academic workflow
---

# The Big Picture

**⏱️ Read: 10 min | 🎯 Understand the "why" before the "how"**

---

## TL;DR

Nexus solves three problems academics face daily:

| Problem | How Nexus Solves It |
|---------|---------------------|
| **Scattered information** | One vault, semantically linked |
| **Lost context** | Claude remembers your projects |
| **Decision paralysis** | One task at a time, energy-matched |

---

## The Academic Knowledge Problem

### Before Nexus

```
📧 Email: Paper reviews, collaborator threads
📁 Desktop: Random PDFs, half-finished drafts  
📝 Notes app: Scattered thoughts
📊 Spreadsheet: Grading, tracking
🧠 Your head: "What was I working on?"
```

**Result**: 
- Spend 30 min finding that paper note
- Forget the insight from last week's reading
- Start each day asking "where did I leave off?"
- Ideas die in isolation, never connected

### After Nexus

```
📁 One Vault: Everything lives here
🔗 Linked: Ideas connect automatically
🤖 Claude: Remembers context, suggests connections
📊 Dashboards: See all projects at once
```

**Result**:
- `"Find my notes on sensitivity analysis"` → instant results
- `"What did I read about mediation bounds?"` → connected notes
- `"Morning brief"` → exactly where you left off

---

## The Three Modes

Nexus operates in three complementary modes:

### 🔍 Librarian Mode

**What it does**: Capture, organize, retrieve knowledge

**When you use it**:
```
"Capture: Bootstrap might work better for P_med CIs"
"Find notes about VanderWeele sensitivity"  
"What papers have I read about identification?"
"Link this to my mediation-theory area"
```

**The philosophy**: Your brain is for *having* ideas, not *holding* them. Capture everything, let Nexus organize and retrieve.

### 🔨 Builder Mode

**What it does**: Track projects, manage tasks, monitor progress

**When you use it**:
```
"Show P_med status"
"Task: Write simulation code for Section 4"
"What's blocking my pathmed paper?"
"Update medfit to 95% complete"
```

**The philosophy**: Projects are living things. They need dashboards, not just to-do lists. See the forest *and* the trees.

### 📚 Teacher Mode

**What it does**: Course management, lecture prep, student tracking

**When you use it**:
```
"Prep STAT 579 Week 14"
"Grading queue"
"Office hours note: Student asked about NDE interpretation"
"STAT 579 this week"
```

**The philosophy**: Teaching is a project with repeating patterns. Systematize what's systematizable, save energy for actual teaching.

---

## The PARA System

Nexus uses a modified PARA system (Projects, Areas, Resources, Archive):

```
📁 Nexus Vault
│
├── 00-INBOX/              ← Everything enters here
│   ├── fleeting-notes/    ← Raw captures
│   └── literature-inbox/  ← Papers to process
│
├── 10-PROJECTS/           ← Active work (has deadline)
│   ├── research/          ← Papers, analyses
│   │   ├── P_med/
│   │   └── pathmed/
│   ├── teaching/          ← Courses
│   │   └── STAT-579/
│   └── packages/          ← R packages
│       └── medfit/
│
├── 20-AREAS/              ← Ongoing domains (no deadline)
│   ├── causal-inference/
│   ├── mediation-theory/
│   └── sensitivity-analysis/
│
├── 30-RESOURCES/          ← Reference materials
│   ├── literature/        ← Paper notes
│   ├── templates/         ← Note templates
│   └── code-snippets/     ← Reusable code
│
├── 40-ARCHIVE/            ← Completed/inactive
│
├── 50-DAILY/              ← Daily notes
│   └── 2026/
│
└── 60-TASKS/              ← Task management
```

### Why This Structure?

| Folder | Question It Answers |
|--------|---------------------|
| `00-INBOX` | "What just came in?" |
| `10-PROJECTS` | "What am I actively working on?" |
| `20-AREAS` | "What domains do I maintain?" |
| `30-RESOURCES` | "What can I reference?" |
| `40-ARCHIVE` | "What's done but searchable?" |
| `50-DAILY` | "What happened when?" |
| `60-TASKS` | "What needs doing?" |

---

## The Daily Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR DAY WITH NEXUS                      │
└─────────────────────────────────────────────────────────────┘

MORNING (2 min)
     │
     ▼
┌─────────────┐
│ "Morning    │ ──→ See calendar, top tasks, project status
│  brief"     │     Pick ONE thing to start
└─────────────┘
     │
     ▼
DURING THE DAY
     │
     ├──→ "Capture: [thought]"      ──→ Quick note, no friction
     │
     ├──→ "Task: [thing]"           ──→ Add to queue
     │
     ├──→ "What should I do?"       ──→ Get suggestion
     │
     ├──→ "I'm stuck on [X]"        ──→ Break it down
     │
     ├──→ "Show [project] status"   ──→ Check progress
     │
     ▼
END OF DAY (3 min)
     │
     ▼
┌─────────────┐
│ "End of     │ ──→ Review completions
│  day"       │     Move incomplete to tomorrow
└─────────────┘     Clear mind for evening
     │
     ▼
WEEKLY (15 min)
     │
     ▼
┌─────────────┐
│ "Weekly     │ ──→ Celebrate, Clear inbox, Review projects
│  review"    │     Plan next week, Maintenance
└─────────────┘
```

---

## Why Claude + Obsidian?

### Obsidian Provides

- **Local-first storage**: Your data on your machine
- **Markdown files**: Future-proof, portable
- **Linking**: `[[wiki-links]]` connect ideas
- **Plugins**: Extensible ecosystem
- **Search**: Fast full-text search

### Claude Provides

- **Natural language**: Talk, don't click
- **Context awareness**: Understands your projects
- **Semantic search**: Find by meaning, not just keywords
- **Suggestions**: Proactive connections
- **ADHD support**: Energy matching, one-task focus

### Together

```
You say: "What did I learn from the VanderWeele paper 
          that applies to my P_med sensitivity section?"

Claude:
1. Searches your literature notes
2. Finds VanderWeele-2015.md
3. Checks P_med project context
4. Identifies relevant bounds methodology
5. Suggests how to apply it
6. Offers to draft text
```

Neither tool alone does this. Together, they're your external brain.

---

## The Connection Philosophy

### Traditional Note-Taking

```
Folder A/
├── Note 1
├── Note 2
└── Note 3

Folder B/
├── Note 4
└── Note 5

(Notes exist in isolation)
```

### Nexus Approach

```
Note 1 ←──────→ Note 4
   ↑              ↓
   └───→ Note 2 ←─┘
            ↓
         Note 3 ←──→ Note 5

(Notes form a knowledge graph)
```

**Every note can link to any other note**. Over time, your vault becomes a web of connected ideas, not a filing cabinet of isolated documents.

---

## The Academic Lifecycle

Nexus supports the full research lifecycle:

```
┌─────────────────────────────────────────────────────────────┐
│                    RESEARCH LIFECYCLE                        │
└─────────────────────────────────────────────────────────────┘

    IDEA                                                  
      ↓                                                   
┌─────────────┐     ┌─────────────┐     ┌─────────────┐  
│   INBOX     │ ──→ │   PROJECT   │ ──→ │   ARCHIVE   │  
│   Capture   │     │   Develop   │     │   Publish   │  
└─────────────┘     └─────────────┘     └─────────────┘  
      ↑                    │                    │         
      │                    ▼                    │         
      │             ┌─────────────┐             │         
      └──────────── │   AREAS     │ ←───────────┘         
                    │   Enrich    │                       
                    └─────────────┘                       

Ideas enter inbox → Develop in projects → Complete to archive
                         ↓
              Areas get richer over time
              (Your expertise accumulates)
```

---

## Success Metrics

How do you know Nexus is working?

| Metric | Before | After |
|--------|--------|-------|
| Time to find a note | 5-30 min | Seconds |
| Morning startup | "What was I doing?" | 2 min brief |
| Inbox backlog | 100+ items | <20 items |
| Lost ideas | Many | Nearly zero |
| Project visibility | Scattered | Dashboard view |
| End of day | Anxious | Wrapped up |

---

## Getting Started Philosophy

### Don't

- ❌ Try to migrate all existing notes at once
- ❌ Create complex folder hierarchies
- ❌ Perfect your system before using it
- ❌ Read all documentation before starting

### Do

- ✅ Start with an empty vault
- ✅ Use just capture + morning brief for a week
- ✅ Add projects as you work on them
- ✅ Let the system grow organically

**The best system is the one you actually use.**

---

## Next Steps

| Your Goal | Start Here |
|-----------|-----------|
| Just get it working | [Quick Start](../quick-start.md) |
| Full initial setup | [First Day Setup](first-day.md) |
| Daily workflow | [Task Management](../workflows/task-management.md) |
| Research focus | [Research Projects](../academic/research-projects.md) |
| Understand ADHD features | [ADHD Guide](../adhd-guide.md) |
