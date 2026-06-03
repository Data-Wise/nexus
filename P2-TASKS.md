# Phase P2: Template Vault Creation - Task Breakdown

**Status:** 📋 Ready to Start
**Estimated Time:** 6-8 hours
**Location:** `vault-template/` subdirectory
**Reference:** [PROPOSAL-TEMPLATE-VAULT.md](PROPOSAL-TEMPLATE-VAULT.md)

---

## Progress Overview

```
Phase 1: Folder Structure     ░░░░░░░░░░░░░░░░░░░░   0% [0/4]
Phase 2: Template Files        ░░░░░░░░░░░░░░░░░░░░   0% [0/7]
Phase 3: Dashboards & Queries  ░░░░░░░░░░░░░░░░░░░░   0% [0/4]
Phase 4: Sample Content        ░░░░░░░░░░░░░░░░░░░░   0% [0/5]
Phase 5: QuickAdd Config       ░░░░░░░░░░░░░░░░░░░░   0% [0/4]

Overall Progress:              ░░░░░░░░░░░░░░░░░░░░   0% [0/24]
```

---

## Phase 1: Folder Structure & Configuration ⏱️ 2 hours

### Tasks

- [ ] **1.1 Create complete folder structure** ⏱️ 30 min
  - Create all PARA folders (00-INBOX through _SYSTEM)
  - Add .gitkeep files to empty folders
  - Follow standards/vault/VAULT-STRUCTURE.md

- [ ] **1.2 Configure .obsidian/ directory** ⏱️ 45 min
  - Create .obsidian/app.json (app settings)
  - Create .obsidian/appearance.json (theme settings)
  - Create .obsidian/community-plugins.json (plugin list)
  - Set up workspace defaults

- [ ] **1.3 Set up plugin configurations** ⏱️ 30 min
  - Configure Dataview settings
  - Configure Templater settings
  - Configure Tasks plugin
  - Configure QuickAdd plugin

- [ ] **1.4 Create .gitignore** ⏱️ 15 min
  - Exclude .obsidian/workspace*.json
  - Exclude .obsidian/cache/
  - Include plugin configs

### Deliverables
- ✅ Complete folder tree exists
- ✅ Obsidian opens vault without errors
- ✅ All plugins configured (manual install still needed by user)

### Validation
```bash
# Check structure
ls -la vault-template/

# Expected folders:
# 00-INBOX/, 10-PROJECTS/, 20-AREAS/, 30-RESOURCES/,
# 40-ARCHIVE/, 50-DAILY/, 60-TASKS/, _SYSTEM/
```

---

## Phase 2: Template Files ⏱️ 2 hours

### Tasks

- [ ] **2.1 Create project template** ⏱️ 20 min
  - File: `vault-template/30-RESOURCES/templates/project.md`
  - YAML frontmatter from TEMPLATE-STANDARDS.md
  - Templater syntax for auto-fill
  - Variants: manuscript, package, course

- [ ] **2.2 Create paper-note template** ⏱️ 20 min
  - File: `vault-template/30-RESOURCES/templates/paper-note.md`
  - Literature note YAML frontmatter
  - BibTeX/Zotero integration placeholders
  - Citation format standards

- [ ] **2.3 Create daily-note template** ⏱️ 15 min
  - File: `vault-template/30-RESOURCES/templates/daily.md`
  - Daily note YAML frontmatter
  - Dataview task queries
  - Daily planning sections

- [ ] **2.4 Create lecture template** ⏱️ 20 min
  - File: `vault-template/30-RESOURCES/templates/lecture.md`
  - Teaching lecture YAML frontmatter
  - Learning objectives section
  - Outline structure

- [ ] **2.5 Create task template** ⏱️ 15 min
  - File: `vault-template/30-RESOURCES/templates/task.md`
  - Task YAML frontmatter
  - Subtasks checklist
  - Blocker tracking

- [ ] **2.6 Create weekly-review template** ⏱️ 15 min
  - File: `vault-template/30-RESOURCES/templates/weekly-review.md`
  - Weekly review YAML frontmatter
  - Wins/learnings sections
  - Next week planning

- [ ] **2.7 Test Templater integration** ⏱️ 15 min
  - Verify all <% %> syntax is valid
  - Test date functions
  - Test user input prompts

### Deliverables
- ✅ 6 working template files created
- ✅ Templates use correct Templater syntax
- ✅ All YAML frontmatter validates

### Validation
```bash
# Check templates exist
ls -la vault-template/30-RESOURCES/templates/

# Expected files:
# project.md, paper-note.md, daily.md, lecture.md, task.md, weekly-review.md
```

---

## Phase 3: Dashboards & Queries ⏱️ 1.5 hours

### Tasks

- [ ] **3.1 Create master dashboard** ⏱️ 30 min
  - File: `vault-template/_master-dashboard.md`
  - Today's focus section
  - Active projects query
  - Inbox count
  - Recent notes

- [ ] **3.2 Create section-specific dashboards** ⏱️ 30 min
  - `vault-template/10-PROJECTS/research/_research-dashboard.md`
  - `vault-template/10-PROJECTS/teaching/_teaching-dashboard.md`
  - `vault-template/10-PROJECTS/packages/_packages-dashboard.md`

- [ ] **3.3 Create literature index** ⏱️ 20 min
  - File: `vault-template/30-RESOURCES/literature/_literature-index.md`
  - Papers by topic query
  - Papers by year query
  - Reading status filters

- [ ] **3.4 Test Dataview queries** ⏱️ 10 min
  - Verify all queries execute without errors
  - Check query performance
  - Validate filter logic

### Deliverables
- ✅ Working dashboards with Dataview queries
- ✅ Queries return results (or empty gracefully)
- ✅ All dashboard links functional

### Validation
- Open each dashboard in Obsidian
- Verify no Dataview syntax errors
- Add sample content and check updates appear

---

## Phase 4: Sample Content ⏱️ 1.5 hours

### Tasks

- [ ] **4.1 Create example research project** ⏱️ 20 min
  - File: `vault-template/10-PROJECTS/research/_example-P_med-manuscript.md`
  - Realistic frontmatter (status: draft, progress: 60%)
  - Sample sections (intro, methods, results outline)
  - Demonstrates project template usage

- [ ] **4.2 Create example literature note** ⏱️ 20 min
  - File: `vault-template/30-RESOURCES/literature/VanderWeele2015-mediation.md`
  - Realistic paper metadata
  - Key ideas and equations
  - Connections to projects

- [ ] **4.3 Create example daily note** ⏱️ 15 min
  - File: `vault-template/50-DAILY/2025/2025-12/2025-12-21.md`
  - Today's tasks
  - Notes from the day
  - Links to projects

- [ ] **4.4 Create example task items** ⏱️ 15 min
  - File: `vault-template/60-TASKS/_example-tasks.md`
  - Mix of pending/in-progress/completed
  - Different priorities and contexts
  - Demonstrates task tracking

- [ ] **4.5 Verify dashboard displays** ⏱️ 20 min
  - Open master dashboard → shows example content
  - Research dashboard → shows example project
  - Literature index → shows example paper
  - Task views → show example tasks

### Deliverables
- ✅ 5-7 example notes created
- ✅ All cross-linked appropriately
- ✅ Dashboards show realistic data

### Validation
- Navigate links between examples
- Verify Dataview queries pick up examples
- Confirm vault looks "lived-in" not empty

---

## Phase 5: QuickAdd Configuration ⏱️ 1 hour

### Tasks

- [ ] **5.1 Create QuickAdd macro configs** ⏱️ 20 min
  - Capture Thought (Cmd+Shift+N)
  - Add Task (Cmd+Shift+T)
  - New Paper (Cmd+Shift+P)
  - New Project

- [ ] **5.2 Export configurations as JSON** ⏱️ 15 min
  - Export QuickAdd settings
  - Save to vault-template/_SYSTEM/quickadd-config.json
  - Document import process

- [ ] **5.3 Create import instructions** ⏱️ 15 min
  - File: `vault-template/_SYSTEM/QUICKADD-SETUP.md`
  - Step-by-step import guide
  - Keyboard shortcut setup
  - Troubleshooting common issues

- [ ] **5.4 Test capture workflows** ⏱️ 10 min
  - Test each macro
  - Verify file creation locations
  - Check template selection works

### Deliverables
- ✅ QuickAdd configuration files
- ✅ Import instructions in README
- ✅ Tested workflow verification

### Validation
- Import configurations in fresh vault
- Test each macro creates files correctly
- Verify templates are applied

---

## Documentation Updates

### Files to Create

- [ ] **vault-template/README.md** ⏱️ 30 min
  - Installation instructions
  - Plugin setup guide (which plugins to install manually)
  - Quick start workflow
  - Troubleshooting section

- [ ] **vault-template/_getting-started.md** ⏱️ 20 min
  - What each folder is for
  - How to use templates
  - How to capture ideas quickly
  - How to review progress

- [ ] **vault-template/_vault-guide.md** ⏱️ 30 min
  - Complete reference for all folders
  - All template descriptions
  - All dashboard explanations
  - Keyboard shortcuts reference

### Files to Update

- [ ] **README.md** ⏱️ 10 min
  - Add "Using the Template Vault" section
  - Link to vault-template/README.md
  - Quick copy instructions

- [ ] **QUICK-START.md** ⏱️ 10 min
  - Update setup instructions
  - Reference vault-template/ location
  - Monorepo structure notes

---

## Success Criteria

**Phase P2 Complete When:**
- ✅ All 24 tasks checked off
- ✅ vault-template/ directory exists and is complete
- ✅ User can copy vault-template/ to ~/Obsidian/MyVault
- ✅ Opening vault in Obsidian shows no errors
- ✅ Dashboards render with example content
- ✅ Templates create notes correctly
- ✅ Documentation explains how to use everything

---

## Time Tracking

| Phase | Estimated | Actual | Status |
|-------|-----------|--------|--------|
| Phase 1: Structure | 2h | — | 📋 Pending |
| Phase 2: Templates | 2h | — | 📋 Pending |
| Phase 3: Dashboards | 1.5h | — | 📋 Pending |
| Phase 4: Samples | 1.5h | — | 📋 Pending |
| Phase 5: QuickAdd | 1h | — | 📋 Pending |
| Documentation | 1.5h | — | 📋 Pending |
| **Total** | **6-8h** | **—** | **📋 Pending** |

---

## Next Steps After P2

1. **Test complete workflow** - Use vault for 1 week
2. **Gather feedback** - What's missing? What's confusing?
3. **Iterate on templates** - Refine based on usage
4. **Phase P3: Scripts** - Automation for setup
5. **Phase P4: MCP Server** - Direct Claude access

---

**Created:** 2025-12-21
**Reference:** PROPOSAL-TEMPLATE-VAULT.md
**Location:** vault-template/ (monorepo subdirectory)
**Status:** Ready to begin implementation
