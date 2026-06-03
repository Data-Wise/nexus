# Template Vault Implementation - Proposal

**Date:** 2025-12-21
**Status:** 📋 Proposal
**Priority:** P2 (Next Phase)
**Estimated Effort:** 6-8 hours
**Phase:** P2 - Template Vault Creation

---

## TL;DR

Create a pre-populated, ready-to-clone Obsidian vault with all folder structure, templates, configurations, and initial notes in place. Users can clone and start using immediately without manual setup.

**Key improvements over current state:**
- 🗂️ Pre-built folder structure (no mkdir needed)
- 📝 All templates ready to use
- ⚙️ Obsidian settings pre-configured
- 📊 Working dashboards with sample content
- 🚀 Zero-to-productive in 15 minutes

---

## Current State

### What We Have Now
- ✅ Comprehensive documentation (README, architecture, quickstart)
- ✅ Template definitions in markdown docs
- ✅ Claude integration guide
- ✅ Project management files (.STATUS, PROJECT-HUB.md)

### What's Missing
- ❌ No actual Obsidian vault to clone
- ❌ Templates exist only in docs, not as .md files
- ❌ No Obsidian configuration (.obsidian/ directory)
- ❌ No QuickAdd macro files
- ❌ No sample content to demonstrate features
- ❌ Manual setup required (2 hours)

---

## Proposed Solution

### Create Distributable Vault Structure

**Architecture Decision:** Keep vault-template within nexus repo (monorepo approach)

See [ARCHITECTURE-DECISION-MONOREPO.md](ARCHITECTURE-DECISION-MONOREPO.md) for rationale.

```
nexus/vault-template/                 # Template vault subdirectory
├── .obsidian/                        # Obsidian configuration
│   ├── app.json                      # App settings
│   ├── appearance.json               # Theme settings
│   ├── community-plugins.json        # Enabled plugins
│   ├── plugins/                      # Plugin configurations
│   │   ├── dataview/
│   │   ├── templater/
│   │   ├── quickadd/
│   │   └── obsidian-tasks-plugin/
│   └── templates.json                # Template settings
│
├── 00-INBOX/                         # Ready to use
│   ├── fleeting-notes/
│   │   └── .gitkeep
│   ├── literature-inbox/
│   │   └── .gitkeep
│   └── _inbox-guide.md               # Quick reference
│
├── 10-PROJECTS/                      # With example project
│   ├── research/
│   │   ├── _example-research-project/
│   │   │   └── example-project.md
│   │   └── _research-guide.md
│   ├── teaching/
│   │   ├── _example-course/
│   │   │   └── example-course.md
│   │   └── _teaching-guide.md
│   └── packages/
│       └── _packages-guide.md
│
├── 20-AREAS/                         # Example areas
│   ├── causal-inference-methods/
│   │   └── _area-template.md
│   ├── sensitivity-analysis/
│   │   └── _area-template.md
│   └── _areas-guide.md
│
├── 30-RESOURCES/                     # Templates + examples
│   ├── literature/
│   │   ├── by-topic/
│   │   │   └── _example-paper.md     # Sample literature note
│   │   ├── by-author/
│   │   └── _literature-index.md
│   ├── templates/                    # ⭐ Actual template files
│   │   ├── project.md
│   │   ├── paper-note.md
│   │   ├── daily.md
│   │   ├── lecture.md
│   │   └── task.md
│   ├── code-snippets/
│   │   ├── R/
│   │   │   └── _example-snippet.R
│   │   └── python/
│   └── reference-cards/
│       └── notation-standards.md
│
├── 40-ARCHIVE/
│   └── _archive-guide.md
│
├── 50-DAILY/                         # Daily note structure
│   ├── 2025/
│   │   └── 2025-12/
│   │       └── 2025-12-21.md         # Example daily note
│   └── _weekly-reviews/
│       └── _weekly-review-template.md
│
├── 60-TASKS/                         # Task hub
│   ├── _task-inbox.md                # Ready to use
│   ├── _today.md                     # Today's tasks
│   ├── _this-week.md                 # Weekly planning
│   └── _waiting-for.md               # Blocked tasks
│
├── _SYSTEM/                          # Configuration
│   ├── claude-prompts/
│   │   ├── capture-paper.md
│   │   ├── research-to-teaching.md
│   │   └── code-to-docs.md
│   └── dataview-queries/
│       ├── active-projects.md
│       └── recent-notes.md
│
├── _master-dashboard.md              # Working dashboard
├── _getting-started.md               # First steps guide
├── README.md                         # Vault-specific README
└── .gitignore                        # Exclude workspace files
```

---

## Implementation Plan

### Phase 1: Folder Structure & Configuration (2 hours)

**Tasks:**
1. [ ] Create complete folder structure with .gitkeep files
2. [ ] Configure .obsidian/ directory with optimal settings
3. [ ] Set up plugin configurations (Dataview, Templater, Tasks, QuickAdd)
4. [ ] Create .gitignore for Obsidian workspace files

**Deliverables:**
- Complete folder tree
- Obsidian opens vault without errors
- All plugins configured (but need manual install)

**Validation:**
```bash
# Clone and test
git clone https://github.com/data-wise/nexus-vault ~/test-vault
cd ~/test-vault
# Open in Obsidian → Should see structure
```

---

### Phase 2: Create Template Files (2 hours)

**Tasks:**
1. [ ] Convert template definitions from docs to actual .md files
2. [ ] Create project template (manuscript, course, package variants)
3. [ ] Create paper-note template
4. [ ] Create daily-note template
5. [ ] Create lecture template
6. [ ] Create task template
7. [ ] Test Templater integration

**Templates to Create:**

| Template | Location | Purpose |
|----------|----------|---------|
| `project.md` | 30-RESOURCES/templates/ | Research projects |
| `paper-note.md` | 30-RESOURCES/templates/ | Literature notes |
| `daily.md` | 30-RESOURCES/templates/ | Daily notes |
| `lecture.md` | 30-RESOURCES/templates/ | Teaching lectures |
| `task.md` | 30-RESOURCES/templates/ | Task items |
| `weekly-review.md` | 30-RESOURCES/templates/ | Weekly reviews |

**Deliverables:**
- 6 working template files
- Templates use Templater syntax
- All YAML frontmatter correct

**Validation:**
- Create new note using each template
- Verify variables populate correctly
- Check Dataview queries recognize frontmatter

---

### Phase 3: Dashboard & Queries (1.5 hours)

**Tasks:**
1. [ ] Create _master-dashboard.md with all queries
2. [ ] Create section-specific dashboards
3. [ ] Test Dataview queries with sample content
4. [ ] Create query reference file

**Dashboards to Create:**

| Dashboard | Location | Purpose |
|-----------|----------|---------|
| `_master-dashboard.md` | Root | Central command center |
| `_research-dashboard.md` | 10-PROJECTS/research/ | Research projects |
| `_teaching-dashboard.md` | 10-PROJECTS/teaching/ | Teaching courses |
| `_packages-dashboard.md` | 10-PROJECTS/packages/ | Package development |
| `_literature-index.md` | 30-RESOURCES/literature/ | Paper catalog |

**Deliverables:**
- Working dashboards with Dataview queries
- Queries return results (even if empty)
- All links functional

**Validation:**
- Open each dashboard
- Verify queries execute without errors
- Add sample content and check updates

---

### Phase 4: Sample Content (1.5 hours)

**Tasks:**
1. [ ] Create example research project
2. [ ] Create example literature note
3. [ ] Create example daily note
4. [ ] Create example task items
5. [ ] Populate dashboards with examples

**Sample Content:**

| Content | Purpose |
|---------|---------|
| Example research project | Show project structure |
| Example paper note (VanderWeele 2015) | Demonstrate literature note |
| Example daily note | Show daily workflow |
| Example tasks | Demonstrate task management |
| Example area note | Show area organization |

**Deliverables:**
- 5-7 example notes
- All cross-linked appropriately
- Dashboards show example data

**Validation:**
- Navigate links between examples
- Verify Dataview queries pick up examples
- Confirm realistic appearance

---

### Phase 5: QuickAdd Configuration (1 hour)

**Tasks:**
1. [ ] Create QuickAdd macro configurations
2. [ ] Export configurations as JSON
3. [ ] Document import process
4. [ ] Test capture workflows

**Macros to Configure:**

| Macro | Trigger | Purpose |
|-------|---------|---------|
| Capture Thought | Cmd+Shift+N | Quick capture to inbox |
| Add Task | Cmd+Shift+T | Add task to inbox |
| New Paper | Cmd+Shift+P | Create literature note |
| New Project | - | Create project from template |

**Deliverables:**
- QuickAdd configuration files
- Import instructions in README
- Test workflow verification

**Validation:**
- Import configurations
- Test each macro
- Verify file creation locations

---

## File Structure Standards

### Naming Conventions

**Prefix patterns:**
- `_master-*` - Main dashboard/index files
- `_*-guide.md` - Quick reference guides
- `_*-template.md` - Empty templates
- `_*-index.md` - Catalog/list files
- `_example-*` - Sample content

**File naming:**
- Lowercase with hyphens: `my-research-project.md`
- Date format: `YYYY-MM-DD.md`
- Author-year for papers: `VanderWeele2015-mediation.md`

### YAML Frontmatter Standards

**Project:**
```yaml
type: manuscript | package | course
title: "Project Title"
status: idea | active | draft | review | complete
priority: 1-5
deadline: YYYY-MM-DD
created: YYYY-MM-DD
```

**Literature:**
```yaml
type: literature
title: "Paper Title"
authors: [Author1, Author2]
year: YYYY
journal: "Journal Name"
doi: "10.xxxx/xxxx"
read-status: to-read | reading | read | processed
rating: 1-5
```

**Daily:**
```yaml
type: daily
date: YYYY-MM-DD
```

---

## Documentation Updates

### Files to Create

1. **vault-template/README.md** - Vault-specific readme
   - Installation instructions
   - Plugin setup guide
   - Quick start workflow
   - Troubleshooting

2. **vault-template/_getting-started.md** - First-time user guide
   - What each folder is for
   - How to use templates
   - How to capture ideas
   - How to review progress

3. **vault-template/_vault-guide.md** - Complete reference
   - All folder purposes
   - All template descriptions
   - All dashboard explanations
   - Keyboard shortcuts

### Files to Update

1. **README.md** - Add section on using vault-template/
2. **docs/getting-started/quickstart.md** - Reference local vault-template/
3. **QUICK-START.md** - Update with monorepo structure

---

## Benefits

### For New Users
- ⚡ **15-minute setup** vs 2-hour manual setup
- 🎯 **See it working** immediately with examples
- 📚 **Learn by example** from sample content
- ✅ **No configuration errors** - everything pre-set

### For Maintainers
- 🔧 **Single source of truth** - vault is the documentation
- 🧪 **Testable** - can validate templates work
- 🔄 **Version controlled** - track changes to structure
- 📦 **Distributable** - easy to share and fork

### For Claude
- 🧠 **Direct access** - can read actual vault structure
- 🔗 **Real examples** - understands through concrete instances
- ✍️ **Can modify** - update templates and content
- 🎓 **Better learning** - sees realistic usage patterns

---

## Technical Considerations

### Git Repository Structure

**Decision: Monorepo (Option B)** ✅

See [ARCHITECTURE-DECISION-MONOREPO.md](ARCHITECTURE-DECISION-MONOREPO.md) for complete rationale.

**Chosen Structure:**
```
nexus/
├── docs/                # Documentation
├── vault-template/      # Template vault (THIS PROPOSAL)
├── standards/           # Universal standards ✅ Complete
├── scripts/             # Setup scripts (future)
└── examples/            # Example content (future)
```

**Why Monorepo:**
- ✅ Single source of truth
- ✅ Atomic updates (change docs + vault together)
- ✅ Follows dev-tools patterns (zsh-configuration)
- ✅ ADHD-friendly (one place for everything)
- ✅ Cross-reference easy
- ✅ Version-controlled together

**Benefits Over Separate Repo:**
- No version sync issues
- One clone gets everything
- Coordinated releases
- Simpler CI/CD
```

### Obsidian Version Compatibility

**Target:** Obsidian 1.4.0+

**Plugin Versions:**
- Dataview: v0.5.x
- Templater: v1.16.x
- Tasks: v4.x
- QuickAdd: v0.18.x
- Calendar: v1.5.x

**Note:** Document minimum versions in README

### Cross-Platform Testing

**Test on:**
- macOS (primary)
- Windows (important)
- Linux (nice to have)

**Platform-specific issues:**
- File paths (/ vs \)
- Line endings (LF vs CRLF)
- Hidden files visibility

---

## Success Criteria

### Must Have
- ✅ Complete folder structure
- ✅ All 6 core templates functional
- ✅ Master dashboard renders correctly
- ✅ Example content demonstrates features
- ✅ Can clone and open in Obsidian without errors

### Should Have
- ✅ QuickAdd macros configured
- ✅ All dashboards working
- ✅ Sample notes for each template type
- ✅ README with setup instructions

### Nice to Have
- ✅ Multiple example projects (research + teaching + package)
- ✅ Video walkthrough of vault
- ✅ Advanced QuickAdd macros
- ✅ Custom CSS for styling

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Plugin versions change | High | Document versions, test regularly |
| Obsidian settings conflict | Medium | Minimal settings, document conflicts |
| Users don't install plugins | High | Clear instructions, required list |
| Example content too specific | Low | Generic academic examples |
| .obsidian/ too opinionated | Medium | Document customization options |

---

## Timeline

| Task | Duration | Depends On |
|------|----------|------------|
| Folder structure | 2 hours | - |
| Template files | 2 hours | Folder structure |
| Dashboards | 1.5 hours | Templates |
| Sample content | 1.5 hours | Templates, Dashboards |
| QuickAdd setup | 1 hour | Folder structure |
| Documentation | 1 hour | Everything |
| Testing | 1 hour | Everything |

**Total:** 6-8 hours over 1-2 days

---

## Next Steps

After approval of this proposal:

1. [ ] Create new repository: `nexus-vault`
2. [ ] Implement Phase 1 (structure)
3. [ ] Test in fresh Obsidian instance
4. [ ] Implement Phase 2 (templates)
5. [ ] Implement Phase 3 (dashboards)
6. [ ] Implement Phase 4 (examples)
7. [ ] Implement Phase 5 (QuickAdd)
8. [ ] Write vault README
9. [ ] Cross-platform testing
10. [ ] Update main nexus docs to reference vault

---

## References

**Similar Projects:**
- Obsidian Starter Templates - Example template vaults
- PARA Starter Vault - Tiago Forte's implementation
- Obsidian Garden - Community template

**Standards:**
- zsh-configuration standards for ADHD-friendly docs
- PROJECT-STRUCTURE.md for file organization
- QUICK-START-TEMPLATE.md for user onboarding

---

**Proposal Author:** DT (via Claude Code)
**Date:** 2025-12-21
**Status:** Awaiting Approval
**Next Review:** After P1 completion
