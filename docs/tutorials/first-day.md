---
title: First Day Setup
description: Complete Nexus setup from zero to productive
---

# First Day Setup

**⏱️ Time: 30 min | 📊 Progress: 5 phases**

---

## TL;DR

| Phase | Time | What You Do |
|-------|------|-------------|
| 1. Install Obsidian | 5 min | Download app, create vault |
| 2. Install Nexus Plugin | 3 min | **One-click from Community Plugins** |
| 3. Connect Claude | 5 min | Use built-in MCP wizard |
| 4. Create Structure | 5 min | PARA folders |
| 5. Test & Go | 5 min | Verify everything works |

---

## Phase 1: Install Obsidian [5 min]

### Download & Setup

1. **Download** from [obsidian.md](https://obsidian.md/)
2. **Install** and open
3. **Create new vault** named `Nexus`
4. **Location**: `~/Obsidian/Nexus` (recommended)

---

## Phase 2: Install Nexus Plugin [3 min]

### ✨ Easy Way: Community Plugins (Recommended)

1. Open **Settings** (⌘,)
2. Go to **Community Plugins**
3. Click **Turn off Safe Mode** (if prompted)
4. Click **Browse**
5. Search for **"Nexus"** (by ProfSynapse)
6. Click **Install** → **Enable**

**Done!** The plugin is now installed.

### Alternative: Manual Install

If you prefer manual installation:

1. Go to [GitHub Releases](https://github.com/ProfSynapse/nexus/releases)
2. Download: `main.js`, `manifest.json`, `styles.css`
3. Create folder: `~/Obsidian/Nexus/.obsidian/plugins/nexus/`
4. Put files there
5. Enable in Settings → Community Plugins

---

## Phase 3: Connect Claude Desktop [5 min]

### Use the Built-in Wizard

1. In Obsidian, go to **Settings → Nexus**
2. Click **Get Started** tab
3. Click **MCP Integration**
4. The wizard will:
   - Generate `connector.js` for your vault
   - Show you the exact config to add to Claude Desktop
   - Guide you through each step

### What the Wizard Generates

The wizard creates config like this for Claude Desktop:

```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": ["/Users/YOUR_NAME/Obsidian/Nexus/.obsidian/plugins/nexus/connector.js"],
      "env": {
        "VAULT_PATH": "/Users/YOUR_NAME/Obsidian/Nexus"
      }
    }
  }
}
```

### Apply the Config

1. **Copy** the config from the wizard
2. **Open** Claude Desktop config:
   ```bash
   open ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
3. **Paste** the nexus server config
4. **Restart** Claude Desktop (⌘Q, then reopen)

### Verify Connection

In Claude Desktop, ask:

```
"List my Nexus folders"
```

If Claude shows your vault structure, you're connected! 🎉

---

## Phase 4: Create Folder Structure [5 min]

### Quick Setup with Terminal

```bash
cd ~/Obsidian/Nexus

# Create PARA-inspired structure
mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS/{causal-inference,mediation-theory}
mkdir -p 30-RESOURCES/{literature,templates,code-snippets}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/2026
mkdir -p 60-TASKS
```

### Or Create Manually in Obsidian

Right-click in the file explorer and create:

```
📁 00-INBOX/
📁 10-PROJECTS/
📁 20-AREAS/
📁 30-RESOURCES/
📁 40-ARCHIVE/
📁 50-DAILY/
📁 60-TASKS/
```

---

## Phase 5: Test Everything [5 min]

### Quick Tests

Try each command in Claude:

| Command | Expected Result |
|---------|-----------------|
| `"Morning brief"` | Shows overview (may be empty) |
| `"Capture: Test note - setup complete!"` | Creates note in inbox |
| `"Show my folders"` | Lists your vault structure |
| `"Create daily note"` | Creates today's note |

### Create Your First Project

In Claude:

```
"Create a project dashboard for P_med in my research folder"
```

Claude will create `10-PROJECTS/research/P_med/_index.md` with a starter template.

---

## ✅ Setup Complete!

### What You Now Have

- [x] Obsidian vault with PARA structure
- [x] Nexus plugin installed (one-click!)
- [x] Claude Desktop connected via MCP
- [x] Basic commands working

### Your Daily Workflow Starts Now

| Time | Do This |
|------|---------|
| Morning | `"Morning brief"` |
| During day | `"Capture: [thought]"` |
| End of day | `"End of day"` |
| Weekly | `"Weekly review"` |

---

## Real Examples

### Example 1: Capture a Research Idea

You're reading a paper and have a thought:

```
"Capture: VanderWeele's bounds could be extended to three-way decomposition"
```

Claude creates in `00-INBOX/fleeting-notes/`:
```markdown
# Fleeting Note - 2026-06-03 09:15

VanderWeele's bounds could be extended to three-way decomposition

---
Created: 2026-06-03 09:15
Type: fleeting
Status: inbox
```

### Example 2: Check Project Status

Working on your P_med paper:

```
"Show P_med status"
```

Claude shows:
```
📊 PROJECT: P_med

Progress: ▓▓▓▓▓▓▓░░░ 70%
Status: Drafting
Deadline: June 15 (12 days)

Active tasks:
- [ ] Add sensitivity table
- [ ] Write results paragraph 3

Recent notes: 2 this week
```

### Example 3: Morning Startup

Start your day:

```
"Morning brief"
```

Claude shows:
```
🌅 MORNING BRIEF - Tuesday, June 3

📅 TODAY
• 10:00 — STAT 579 Lecture
• 14:00 — Research meeting

🎯 TOP 3 (pick ONE)
1. [45 min] P_med results section
2. [30 min] Grade HW5
3. [15 min] Process inbox

📊 PROJECT PULSE
• P_med ▓▓▓▓▓▓▓░░░ 70%
• STAT-579 ▓▓▓▓▓▓▓▓▓░ 93%

📥 INBOX: 5 items
```

### Example 4: Add a Paper to Your Queue

Found a relevant paper:

```
"Add paper: Imai 2010 identification for causal mediation"
```

Claude creates in `30-RESOURCES/literature/`:
```markdown
# Imai (2010) - Identification for Causal Mediation

## Status
- [ ] Read
- [ ] Extracted
- [ ] Connected

## Key Contributions
(To fill after reading)

---
Added: 2026-06-03
Tags: #literature #mediation #identification
```

---

## Troubleshooting

??? question "Plugin not showing in Community Plugins?"
    Search for "Nexus" by ProfSynapse. If not found, try "Claudesidian" (older name).

??? question "Claude can't connect to vault?"
    1. Check `connector.js` exists in plugin folder
    2. Verify paths are absolute (not `~`)
    3. Restart Claude Desktop completely (⌘Q)

??? question "Commands not working?"
    1. Ensure Nexus plugin is enabled
    2. Try: "What Nexus tools do you have?"
    3. Check Nexus settings in Obsidian

---

## Next Steps

- [Weekly Review](weekly-review.md) — Establish maintenance habits
- [Commands Reference](../reference/commands.md) — All available commands
- [Research Projects](../academic/research-projects.md) — Academic workflows
