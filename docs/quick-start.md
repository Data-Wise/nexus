---
title: Quick Start
description: Get Nexus running in 15 minutes
---

# Quick Start

**⏱️ Time: 15 min | 📊 Steps: 5**

---

## TL;DR

```bash
# 1. Create vault structure
mkdir -p ~/Obsidian/Nexus/{00-INBOX,10-PROJECTS,20-AREAS,30-RESOURCES,40-ARCHIVE,50-DAILY,60-TASKS}

# 2. Install Nexus plugin in Obsidian

# 3. Configure Claude Desktop MCP

# 4. Start using: "Morning brief"
```

---

## Step 1: Prerequisites [2 min]

### Required

- [x] [Obsidian](https://obsidian.md/) installed
- [x] [Claude Desktop](https://claude.ai/download) installed

### Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| **Dataview** | Dynamic queries |
| **Templater** | Smart templates |
| **Tasks** | Task management |
| **Calendar** | Daily notes |

---

## Step 2: Create Vault [3 min]

```bash
# Create vault with PARA-style structure
mkdir -p ~/Obsidian/Nexus
cd ~/Obsidian/Nexus

# Core folders
mkdir -p 00-INBOX/{fleeting-notes,literature-inbox}
mkdir -p 10-PROJECTS/{research,teaching,packages}
mkdir -p 20-AREAS/{causal-inference,mediation-theory}
mkdir -p 30-RESOURCES/{literature,templates,code-snippets}
mkdir -p 40-ARCHIVE
mkdir -p 50-DAILY/$(date +%Y)
mkdir -p 60-TASKS
```

Open in Obsidian: **Open folder as vault** → `~/Obsidian/Nexus`

---

## Step 3: Install Plugin [3 min]

### Option A: GitHub Release

1. Download from [Releases](https://github.com/Data-Wise/nexus/releases):
   - `main.js`
   - `manifest.json`
   - `styles.css`

2. Create plugin folder:
```bash
mkdir -p ~/Obsidian/Nexus/.obsidian/plugins/nexus
```

3. Move files to folder

4. Enable in Obsidian → Settings → Community Plugins → **Nexus**

---

## Step 4: Configure Claude [5 min]

### MCP Configuration

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nexus": {
      "command": "node",
      "args": [
        "/Users/YOUR_USERNAME/.obsidian/plugins/nexus/connector.js"
      ],
      "env": {
        "VAULT_PATH": "/Users/YOUR_USERNAME/Obsidian/Nexus"
      }
    }
  }
}
```

!!! warning "Replace YOUR_USERNAME"
    Update paths with your actual macOS username.

### Restart Claude Desktop

Quit and reopen to load the MCP server.

---

## Step 5: Verify [2 min]

### Test Connection

In Claude Desktop:

```
"List my vault folders"
```

**Expected**: Claude shows your folder structure.

### First Commands

| Try This | Result |
|----------|--------|
| `"Morning brief"` | Today's overview |
| `"Capture: Test note"` | Creates inbox note |
| `"Show my projects"` | Lists active projects |

---

## ✅ Done!

**Next steps:**

- [ ] [Set up daily workflow](workflows/task-management.md)
- [ ] [Configure system prompt](guide/system-prompt.md)
- [ ] [Add first project](tutorials/first-day.md)

---

## Troubleshooting

??? question "Claude can't access vault"
    - Check `VAULT_PATH` is absolute (starts with `/`)
    - Restart Claude Desktop
    - Verify plugin files exist

??? question "Plugin not loading"
    - Check all 3 files in plugin folder
    - Enable in Obsidian settings
    - Restart Obsidian

??? question "MCP not connecting"
    - Check JSON syntax (no trailing commas)
    - Verify node.js is installed
    - Check Claude Desktop logs
