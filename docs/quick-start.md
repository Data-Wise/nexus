---
title: Quick Start
description: Get Nexus running in 10 minutes
---

# Quick Start

**⏱️ Time: 10 min | Get from zero to working Nexus**

---

## TL;DR — 3 Steps

```bash
# 1. Install Nexus plugin in Obsidian
#    Settings → Community Plugins → Browse → Search "Nexus" → Install → Enable

# 2. Connect Claude Desktop
#    Nexus Settings → Get Started → MCP Integration → Follow wizard

# 3. Test it
#    In Claude: "Show my vault folders"
```

---

## Step 1: Install Nexus Plugin [3 min]

### In Obsidian:

1. **⌘,** to open Settings
2. **Community Plugins** → Turn off Safe Mode
3. **Browse** → Search **"Nexus"**
4. **Install** → **Enable**

That's it! ✅

!!! tip "Can't find Nexus?"
    Search for "Claudesidian" — it's the same plugin (older name).

---

## Step 2: Connect Claude Desktop [5 min]

### Use the Built-in Wizard

1. **Obsidian Settings → Nexus**
2. Click **Get Started** tab
3. Click **MCP Integration**
4. Follow the wizard — it generates everything for you!

### What the Wizard Does

- Creates `connector.js` in your plugin folder
- Shows you exactly what to paste into Claude's config
- Gives you the correct paths for your system

### Apply to Claude Desktop

The wizard shows config like:

```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": ["/path/to/your/vault/.obsidian/plugins/nexus/connector.js"],
      "env": {
        "VAULT_PATH": "/path/to/your/vault"
      }
    }
  }
}
```

1. Copy the config
2. Open: `~/Library/Application Support/Claude/claude_desktop_config.json`
3. Paste
4. Restart Claude Desktop (⌘Q, reopen)

---

## Step 3: Test It [2 min]

In Claude Desktop:

```
"Show my vault folders"
```

**Expected**: Claude lists your Obsidian folders.

### Quick Test Commands

| Command | What Happens |
|---------|--------------|
| `"Capture: Test note"` | Creates note in vault |
| `"Search for test"` | Finds the note |
| `"Show vault stats"` | Shows note counts |

---

## You're Done! 🎉

### What You Can Do Now

| Say This | Claude Does |
|----------|-------------|
| `"Morning brief"` | Daily overview |
| `"Capture: [idea]"` | Quick note |
| `"Task: [thing]"` | Add task |
| `"Find [topic]"` | Search notes |
| `"Create project: [name]"` | New project |

---

## Examples for Researchers

### Capture a thought

```
"Capture: Consider using bootstrap for P_med confidence intervals"
```

### Add a paper

```
"Add paper: VanderWeele 2015 sensitivity analysis mediation"
```

### Check project status

```
"Show P_med status"
```

### Morning startup

```
"Morning brief"
```

---

## Optional: Create Folder Structure

If you want the full PARA structure:

```bash
cd ~/Obsidian/YourVault

mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS/{causal-inference,mediation-theory}
mkdir -p 30-RESOURCES/{literature,templates}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/2026
mkdir -p 60-TASKS
```

Or just ask Claude:

```
"Create the PARA folder structure in my vault"
```

---

## Next Steps

| Want To... | Go To... |
|------------|----------|
| Full setup tutorial | [First Day Setup](tutorials/first-day.md) |
| Daily workflow | [Task Management](workflows/task-management.md) |
| Research workflows | [Research Projects](academic/research-projects.md) |
| All commands | [Commands Reference](reference/commands.md) |

---

## Troubleshooting

??? question "Claude says 'no tools available'"
    1. Restart Claude Desktop completely (⌘Q)
    2. Check connector.js exists in plugin folder
    3. Verify absolute paths in config (no `~`)

??? question "Plugin not in Community Plugins"
    Search for "Claudesidian" instead of "Nexus"

??? question "Need more help?"
    See [Full First Day Setup](tutorials/first-day.md) for detailed steps
