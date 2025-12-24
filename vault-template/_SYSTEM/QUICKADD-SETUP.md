# QuickAdd Setup Guide

> ADHD-friendly quick capture for frictionless note-taking

---

## What is QuickAdd?

QuickAdd is an Obsidian plugin that enables lightning-fast note creation via keyboard shortcuts and command palette. Instead of manually navigating folders and copying templates, you can capture thoughts, tasks, and papers in 2-3 keystrokes.

---

## Installation

### 1. Install the Plugin

1. Open Obsidian Settings
2. Navigate to: **Community Plugins**
3. Click **Browse** and search for "QuickAdd"
4. Click **Install**, then **Enable**

### 2. Import Configuration

1. In Settings → **QuickAdd**, scroll to bottom
2. Find **"Import Entire QuickAdd Settings"** section
3. Copy the contents of `_SYSTEM/quickadd-config.json`
4. Paste into the import text box
5. Click **Import**

✅ All quick capture macros are now configured!

---

## Keyboard Shortcuts (Recommended)

Set these up in Settings → **Hotkeys** → Search for "QuickAdd":

| Shortcut | Command | Action |
|----------|---------|--------|
| `Cmd+Shift+N` | 💭 Capture Thought | Quick thought to inbox |
| `Cmd+Shift+T` | ✅ Add Task | Create new task |
| `Cmd+Shift+P` | 📄 New Paper Note | Add literature note |
| `Cmd+Shift+R` | 📊 New Project | Create project (multi-choice) |

**Tip**: These shortcuts mirror common macOS conventions (N=New, T=Task, P=Paper, R=Research)

---

## Quick Capture Workflows

### 💭 Capture Thought (`Cmd+Shift+N`)

**Use when**: Random idea pops into your head mid-work

**What it does**:
1. Opens input prompt
2. Type your thought
3. Automatically appends to `00-INBOX/fleeting-notes/YYYY-MM-DD-fleeting.md`
4. Tags with `#fleeting`
5. Keeps you in your current file (no context switching!)

**Example**:
```
Press: Cmd+Shift+N
Type: "Check if mediation assumptions hold under time-varying confounding"
Result: Added to today's fleeting notes
```

---

### ✅ Add Task (`Cmd+Shift+T`)

**Use when**: You realize you need to do something

**What it does**:
1. Opens input prompt for task name
2. Creates new file in `60-TASKS/` using task template
3. Opens in new pane with full template ready to fill out
4. Auto-populates creation date and metadata

**Example**:
```
Press: Cmd+Shift+T
Type: "Fix RMediation bug #42"
Result: New task file opens with template, ready to set priority/time/etc.
```

---

### 📄 New Paper Note (`Cmd+Shift+P`)

**Use when**: Starting to read a new paper

**What it does**:
1. Prompts for paper name (e.g., "VanderWeele2015-mediation")
2. Creates file in `30-RESOURCES/literature/`
3. Uses paper-note template with YAML frontmatter
4. Opens in edit mode

**Example**:
```
Press: Cmd+Shift+P
Type: "Robins1992-identifiability"
Result: Literature note created, ready to fill in authors/year/key ideas
```

---

### 📊 New Project (`Cmd+Shift+R`)

**Use when**: Starting a new manuscript or lecture series

**What it does**:
1. Shows multi-choice menu:
   - Research Project → `10-PROJECTS/research/`
   - Lecture → `10-PROJECTS/teaching/` (choose course)
2. Uses appropriate template (project.md or lecture.md)
3. Opens in edit mode

**Example**:
```
Press: Cmd+Shift+R
Choose: "Research Project"
Type: "sensitivity-bounds-manuscript"
Result: New project created with checklist and metadata
```

---

## Customization

### Add New Quick Captures

1. Settings → **QuickAdd**
2. Click **Manage Choices**
3. Add new choice (Capture, Template, or Multi)
4. Configure:
   - **Name**: Display name in command palette
   - **Type**: Capture (inline) vs Template (new file)
   - **Template Path**: Which template to use
   - **Folder**: Where to create file
   - **Format**: How to insert text (for Capture type)

### Modify Existing Shortcuts

1. Find the choice in **Manage Choices**
2. Click ⚙️ gear icon
3. Adjust settings:
   - Change folder path
   - Modify template
   - Update file naming format
   - Toggle "Open in new pane"

---

## Troubleshooting

### "Template not found" error

**Fix**:
1. Check that template exists in `30-RESOURCES/templates/`
2. In QuickAdd settings, verify template path is correct
3. Ensure template path uses `/` not `\` (even on Windows)

### Keyboard shortcut not working

**Fix**:
1. Settings → **Hotkeys**
2. Search for "QuickAdd"
3. Ensure no conflicts with other plugins
4. Try different key combination if conflict exists

### Capture appends to wrong section

**Fix**:
1. Open QuickAdd settings
2. Find the Capture choice → ⚙️ gear icon
3. Check **Insert After** settings:
   - Header name must match exactly
   - Case-sensitive
   - Set "Create if not found" = TRUE

### Files created in wrong folder

**Fix**:
1. QuickAdd settings → Find the choice → ⚙️
2. Check **Folder** settings:
   - Path should be relative to vault root
   - Don't include leading `/`
   - Use `/` between folders

---

## Tips for ADHD-Friendly Workflows

### 🎯 Capture First, Organize Later

Don't try to perfectly categorize thoughts as they arrive:
1. Use `Cmd+Shift+N` to dump idea to inbox
2. Process inbox daily (review fleeting notes → convert to permanent notes)
3. This keeps you in flow state while working

### ⚡ 2-Second Rule

If creating a note takes > 2 seconds, you'll forget the thought. QuickAdd shortcuts make capture instant.

### 🧹 Daily Inbox Review

Add to your daily routine:
1. Open `00-INBOX/fleeting-notes/`
2. Convert valuable thoughts to permanent notes
3. Delete/archive the rest
4. Keep inbox at zero

### 🔗 Link While You Capture

When using QuickAdd, type `[[` to start linking immediately:
```
Thought: "Check mediation assumptions for [[P_med-manuscript]]"
```
This creates connections as you capture, no manual linking needed later.

---

## Advanced: Custom Macros

QuickAdd supports JavaScript macros for complex workflows. See:
- QuickAdd documentation: https://github.com/chhoumann/quickadd
- Vault: `_SYSTEM/quickadd-macros/` (for future custom macros)

---

## Related

- [[_getting-started|Getting Started Guide]]
- [[_vault-guide|Complete Vault Guide]]
- [[30-RESOURCES/templates/|All Templates]]

---

*Need help? Check the [QuickAdd GitHub](https://github.com/chhoumann/quickadd) or ask in the Obsidian forum.*
