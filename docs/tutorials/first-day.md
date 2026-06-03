---
title: First Day Setup
description: Complete Nexus setup from zero to productive
---

# First Day Setup

**⏱️ Time: 45 min | 📊 Progress: 6 phases**

---

## TL;DR

| Phase | Time | Goal |
|-------|------|------|
| 1. Install | 10 min | Obsidian + plugins |
| 2. Structure | 5 min | Create folders |
| 3. Connect | 10 min | Claude MCP |
| 4. Configure | 10 min | Settings + prompt |
| 5. Populate | 5 min | First content |
| 6. Test | 5 min | Verify everything |

---

## Phase 1: Install [10 min]

### 1.1 Install Obsidian

1. Download from [obsidian.md](https://obsidian.md/)
2. Install and open
3. Create new vault: `Nexus`
4. Location: `~/Obsidian/Nexus`

### 1.2 Install Core Plugins

Open Settings (⌘,) → Community Plugins → Turn off Safe Mode

Search and install:

| Plugin | Required | Purpose |
|--------|----------|---------|
| **Dataview** | ✅ | Dynamic queries |
| **Templater** | ✅ | Smart templates |
| **Tasks** | ✅ | Task management |
| **Calendar** | ✅ | Daily notes |
| **QuickAdd** | Recommended | Fast capture |

### 1.3 Install Nexus Plugin

```bash
# Create plugin folder
mkdir -p ~/Obsidian/Nexus/.obsidian/plugins/nexus

# Download from releases
# https://github.com/Data-Wise/nexus/releases
# Files: main.js, manifest.json, styles.css
```

Enable in Settings → Community Plugins → Nexus

---

## Phase 2: Structure [5 min]

### 2.1 Create Folders

```bash
cd ~/Obsidian/Nexus

# PARA-inspired structure
mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS/{causal-inference,mediation-theory,sensitivity-analysis}
mkdir -p 30-RESOURCES/{literature,templates,code-snippets}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/2026
mkdir -p 60-TASKS
```

### 2.2 Verify Structure

In Obsidian, you should see:

```
📁 Nexus
├── 📁 00-INBOX
├── 📁 10-PROJECTS
├── 📁 20-AREAS
├── 📁 30-RESOURCES
├── 📁 40-ARCHIVE
├── 📁 50-DAILY
└── 📁 60-TASKS
```

---

## Phase 3: Connect Claude [10 min]

### 3.1 Install Claude Desktop

Download from [claude.ai/download](https://claude.ai/download)

### 3.2 Configure MCP

Edit config file:

```bash
# Open config
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add Nexus server:

```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": [
        "/Users/YOUR_USERNAME/Obsidian/Nexus/.obsidian/plugins/nexus/connector.js"
      ],
      "env": {
        "VAULT_PATH": "/Users/YOUR_USERNAME/Obsidian/Nexus"
      }
    }
  }
}
```

⚠️ **Replace `YOUR_USERNAME` with your actual username!**

### 3.3 Restart Claude

Quit Claude Desktop completely (⌘Q), then reopen.

### 3.4 Test Connection

In Claude, type:

```
"List my Nexus folders"
```

**Expected**: Claude shows your folder structure.

---

## Phase 4: Configure [10 min]

### 4.1 Plugin Settings

#### Dataview
- Settings → Dataview
- Enable JavaScript Queries: ON
- Enable Inline Queries: ON

#### Templater
- Settings → Templater
- Template folder: `30-RESOURCES/templates`

#### Calendar
- Settings → Calendar
- Enable daily notes: ON
- Daily note folder: `50-DAILY/2026`

#### Tasks
- Settings → Tasks
- Global filter: (leave empty for now)

### 4.2 System Prompt

In Claude Desktop → Settings → Custom Instructions:

```markdown
# NEXUS SYSTEM

You are operating with Nexus, my Obsidian knowledge vault.

## VAULT STRUCTURE
- 00-INBOX: Quick capture
- 10-PROJECTS: Active work (research, teaching, packages)
- 20-AREAS: Domains (causal-inference, mediation, sensitivity)
- 30-RESOURCES: Literature, templates, snippets
- 40-ARCHIVE: Completed
- 50-DAILY: Daily notes
- 60-TASKS: Task management

## RESPONSE FORMAT (ADHD-optimized)
- TL;DR first if response >200 words
- Time estimates [X min]
- Progress tracking [X/Y]
- Bold keywords for scanning
- Tables over prose

## MY CONTEXT
- Professor: Statistics/Biostatistics
- Research: Causal mediation analysis
- Teaching: STAT 579, STAT 440/540
- Packages: mediationverse ecosystem

## COMMANDS
- "Morning brief" → Daily overview
- "Capture: [X]" → Create inbox note
- "Task: [X]" → Create task
- "Show [project] status" → Dashboard
```

---

## Phase 5: Populate [5 min]

### 5.1 Create First Daily Note

In Obsidian, create `50-DAILY/2026/2026-06-03.md`:

```markdown
# Tuesday, June 3, 2026

## Morning
- 

## Tasks
- [ ] Complete Nexus setup
- [ ] Test all commands

## Notes
- 

## End of Day
- 
```

### 5.2 Create First Project

Create `10-PROJECTS/research/P_med/_index.md`:

```markdown
# P_med: Product of Mediated Effects

## Overview
- **Type**: Research Paper
- **Target**: Psychological Methods
- **Status**: Drafting
- **Progress**: ▓▓▓▓▓▓░░░░ 60%

## Sections
- [x] Introduction
- [x] Methods
- [ ] Results ← CURRENT
- [ ] Discussion
- [ ] Abstract

## Tasks
- [ ] Add sensitivity analysis table
- [ ] Write results paragraph 3

## Notes
- 

## Files
- [[P_med-draft.qmd]]
```

### 5.3 Create First Capture

In Claude:

```
"Capture: Test note - Nexus is now set up!"
```

Check that it appears in `00-INBOX/fleeting-notes/`.

---

## Phase 6: Test [5 min]

### Test Each Command

| Command | Expected |
|---------|----------|
| `"Morning brief"` | Shows overview |
| `"Capture: Test"` | Creates note |
| `"Show P_med status"` | Shows dashboard |
| `"Task: Test task"` | Creates task |
| `"What should I work on?"` | Suggests task |

### Verify Integration

1. Create note in Obsidian → Can Claude see it?
2. Claude creates note → Does it appear in Obsidian?
3. Edit note in Obsidian → Does Claude see changes?

---

## ✅ Setup Complete!

### What You Now Have

- [x] Obsidian vault with PARA structure
- [x] Essential plugins installed
- [x] Claude connected via MCP
- [x] ADHD-optimized system prompt
- [x] First project created
- [x] All commands working

### Next Steps

| Priority | Action |
|----------|--------|
| Today | Run `"Morning brief"` tomorrow |
| This week | Add your current projects |
| This week | Set up literature workflow |
| Ongoing | Process inbox daily |

### Quick Reference

```
"Morning brief"           → Start day
"Capture: [X]"           → Quick note
"Task: [X]"              → Add task
"Show [project] status"  → Dashboard
"What should I work on?" → Suggestion
"End of day"             → Wrap up
```

---

## Troubleshooting

??? question "Claude can't see vault"
    1. Check paths in MCP config are absolute
    2. Restart Claude Desktop
    3. Verify `connector.js` exists

??? question "Commands not working"
    1. Check Nexus plugin is enabled
    2. Verify system prompt is set
    3. Try: "What tools do you have?"

??? question "Notes not syncing"
    1. Check vault path in config
    2. Obsidian → Reload app
    3. Claude → Restart

---

## What's Next?

- [Weekly Review Tutorial](weekly-review.md) — Set up weekly habits
- [Task Management](../workflows/task-management.md) — Deep dive
- [Literature Pipeline](../workflows/literature-pipeline.md) — Add papers
