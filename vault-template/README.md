# Nexus Template Vault

> **Your Second Brain, Ready to Use**
> An Obsidian vault template for academic researchers, optimized for ADHD-friendly workflows

---

## 🚀 Quick Start (5 minutes)

### 1. Copy This Vault

```bash
# Copy the entire vault-template directory to your Obsidian vault location
cp -r vault-template ~/Documents/MyNexus

# Or on Windows:
# xcopy vault-template C:\Users\YourName\Documents\MyNexus /E /I
```

### 2. Open in Obsidian

1. Launch Obsidian
2. Click "Open folder as vault"
3. Navigate to your copied vault directory
4. Click "Open"

### 3. Install Required Plugins

Obsidian will show a banner asking to install community plugins. Click **"Trust author and enable plugins"**.

Then manually install these (Settings → Community Plugins → Browse):

| Plugin | Required? | Purpose |
|--------|-----------|---------|
| **Dataview** | ✅ Yes | Powers all dashboards |
| **Templater** | ✅ Yes | Smart templates |
| **Tasks** | ✅ Yes | Task management |
| **QuickAdd** | ⭐ Recommended | Quick capture (Cmd+Shift+N) |
| **Calendar** | ⭐ Recommended | Daily notes navigation |

### 4. Start Using

Open **[[_master-dashboard]]** and start exploring!

---

## 📁 What's Inside

### Folder Structure (PARA Method)

```
00_inbox/          → Quick capture (process daily)
10_projects/       → Active work (research, teaching, packages)
20_areas/          → Ongoing domains (causal inference, etc.)
30_resources/      → Reference materials (literature, templates)
40_archive/        → Completed work
50_daily/          → Daily notes
60_tasks/          → Task management
_system/           → Configuration & setup
```

### Key Files

| File | Purpose |
|------|---------|
| **[[_master-dashboard]]** | Main control panel |
| **[[_getting-started]]** | Detailed usage guide |
| **[[_system/QUICKADD-SETUP]]** | Quick capture setup |
| **[[10_projects/research/_research-dashboard]]** | Research overview |
| **[[30_resources/literature/_literature-index]]** | Papers & references |

---

## 🎯 Core Workflows

### 💭 Capture a Thought

**Keyboard**: `Cmd+Shift+N` (after QuickAdd setup)

Instantly saves idea to inbox without breaking focus.

### ✅ Add a Task

**Keyboard**: `Cmd+Shift+T`

Creates task with priority, time estimate, and context.

### 📄 Add a Paper

**Keyboard**: `Cmd+Shift+P`

Literature note template with citation info and key ideas.

### 📊 Start a Project

**Keyboard**: `Cmd+Shift+R`

Choose: Research project, Lecture, or Package development.

---

## 🔧 Configuration

### Plugin Settings

All plugins are pre-configured. If you need to reconfigure:

| Plugin | Config Location |
|--------|----------------|
| Dataview | `.obsidian/plugins/dataview/data.json` |
| Templater | `.obsidian/plugins/templater-obsidian/data.json` |
| Tasks | `.obsidian/plugins/obsidian-tasks-plugin/data.json` |
| QuickAdd | Import from `_system/quickadd-config.json` |

### Templates

All templates are in: `30_resources/templates/`

- `project.md` - Research projects, manuscripts
- `paper-note.md` - Literature notes
- `daily.md` - Daily note format
- `lecture.md` - Teaching lectures
- `task.md` - Task tracking
- `weekly-review.md` - Weekly reflection

**Customizing**: Edit templates directly. Templater syntax: `<% tp.date.now("YYYY-MM-DD") %>`

### Dashboards

Dashboards use Dataview queries. To modify:

1. Open dashboard file (e.g., `_master-dashboard.md`)
2. Find the ` ```dataview ` block
3. Edit query (see [Dataview docs](https://blacksmithgu.github.io/obsidian-dataview/))
4. Changes appear instantly

---

## 📚 Templates Reference

### Project Template

**Location**: `30_resources/templates/project.md`

**YAML Frontmatter**:
```yaml
type: manuscript
status: "idea | drafting | revision | submitted | published"
target-journal: ""
deadline: YYYY-MM-DD
priority: 1-5
progress: 0-100
```

**Variants**: Works for manuscripts, packages, courses

### Literature Note

**Location**: `30_resources/templates/paper-note.md`

**YAML Frontmatter**:
```yaml
type: literature
authors: []
year: YYYY
rating: ⭐⭐⭐⭐⭐
read-status: "to-read | reading | read | processed"
relevance:
  - research: low | medium | high
  - teaching: low | medium | high
  - packages: low | medium | high
```

### Task Template

**Location**: `30_resources/templates/task.md`

**YAML Frontmatter**:
```yaml
type: task
priority: 1-5
context: "@computer | @read | @write | @code"
energy: "high | medium | low"
time-estimate: "15m | 30m | 1h | 2h | half-day | full-day"
```

---

## 🎨 Customization Guide

### Add Your Own Templates

1. Create new `.md` file in `30_resources/templates/`
2. Add YAML frontmatter with metadata
3. Use Templater syntax: `<% tp.date.now() %>`, `<% tp.file.title %>`
4. Configure QuickAdd to use new template (see [[_system/QUICKADD-SETUP]])

### Modify Dashboards

All dashboards query YAML frontmatter. To add new fields:

1. Add field to template YAML
2. Update dashboard Dataview query to display it
3. Example:
```dataview
TABLE
  status,
  MY-NEW-FIELD as "Display Name"
FROM "10_projects"
WHERE type = "manuscript"
```

### Change Folder Structure

If you want different folders:

1. Rename folders
2. Update paths in:
   - `.obsidian/app.json` → `newFileLocation`
   - `.obsidian/daily-notes.json` → `folder`
   - `.obsidian/plugins/templater-obsidian/data.json` → `folder_templates`
   - All dashboard queries (search for old folder name)

---

## ❓ Troubleshooting

### Dashboards show "No results"

**Cause**: No notes match the query yet.

**Fix**: This is normal for a fresh vault. Create example notes or wait until you have content.

### Templates don't auto-fill dates

**Cause**: Templater plugin not enabled.

**Fix**:
1. Settings → Community Plugins
2. Find "Templater" → Enable
3. Restart Obsidian

### QuickAdd shortcuts don't work

**Cause**: Keyboard shortcuts not configured.

**Fix**: See [[_system/QUICKADD-SETUP#Keyboard Shortcuts]]

### Dataview queries show errors

**Cause**: Dataview plugin not enabled or syntax error.

**Fix**:
1. Enable Dataview plugin
2. Check query syntax (compare to working examples)
3. Ensure YAML frontmatter field names match query

### Daily notes don't create automatically

**Cause**: Daily notes plugin not configured.

**Fix**:
1. Settings → Core Plugins → Enable "Daily notes"
2. Settings → Daily notes → Set:
   - **Folder**: `50_daily`
   - **Format**: `YYYY/YYYY-MM/YYYY-MM-DD`
   - **Template**: `30_resources/templates/daily.md`

---

## 🔗 Learn More

| Resource | Link |
|----------|------|
| **Nexus Website** | [https://data-wise.github.io/nexus/](https://data-wise.github.io/nexus/) |
| **Full Documentation** | [../docs/](../docs/) |
| **Architecture Guide** | [../docs/architecture/overview.md](../docs/architecture/overview.md) |
| **ADHD Workflows** | [[_getting-started#ADHD-Friendly Workflows]] |
| **Claude Integration** | [../docs/claude-integration/](../docs/claude-integration/) |

### 🤖 AI Integration (MCP Server)

Nexus works with the **statistical-research MCP Server** for Claude integration:

| Feature | Status | Documentation |
|---------|--------|---------------|
| **Atlas Tools** | ✅ v0.9.1 | Work context awareness (3 tools) |
| **Quick Capture** | ✅ v0.9.1 | Obsidian vault operations |
| **R Tools** | ✅ v0.9.1 | Statistical analysis (10 tools) |
| **Literature** | ✅ v0.9.1 | arXiv, CrossRef, Zotero (7 tools) |
| **Skills** | ✅ 17 A-grade | Research, writing, methods |

**MCP Server Links:**
- **GitHub**: https://github.com/Data-Wise/claude-statistical-research-mcp
- **Documentation**: https://data-wise.github.io/claude-statistical-research-mcp/
- **Latest Release**: v0.9.1 (134+ tests, 90% pass rate)

---

## 📋 Next Steps

After setup:

1. ✅ Read [[_getting-started|Getting Started Guide]]
2. ✅ Set up [[_system/QUICKADD-SETUP|QuickAdd shortcuts]]
3. ✅ Create your first project (try `Cmd+Shift+R`)
4. ✅ Process the example content (delete or archive when ready)
5. ✅ Review [[_master-dashboard|Master Dashboard]] daily

---

## 💡 Tips for Success

### ADHD-Friendly Practices

1. **Capture first, organize later** - Use QuickAdd to dump thoughts instantly
2. **Process inbox daily** - 5-10 minutes to convert fleeting notes
3. **Visual dashboards** - Open [[_master-dashboard]] as your "home base"
4. **Time estimates** - Every task has a time estimate to reduce decision paralysis
5. **Context tags** - `@computer`, `@read`, `@write` help you batch similar tasks

### Daily Routine

**Morning** (5 min):
- Open [[_master-dashboard]]
- Review [[60_tasks/_today]]
- Pick 3 must-do tasks

**Evening** (5 min):
- Check off completed tasks
- Quick [[50_daily/|daily note]]
- Move unfinished tasks to tomorrow

**Weekly** (30 min):
- Use [[30_resources/templates/weekly-review|weekly review template]]
- Archive completed projects
- Plan next week's priorities

---

**🎉 You're ready to build your second brain!**

*Questions? See [[_vault-guide|Complete Vault Guide]] or check the [main documentation](../README.md).*
