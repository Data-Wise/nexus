# ⚡ Nexus - Project Control Hub

> **Quick Status:** Strategic refocus complete. Nexus now focuses on Claude + Obsidian knowledge integration via MCP server extension.

**Last Updated:** 2025-01-11
**Current Phase:** Phase 1 - Zotero Integration
**Next Action:** Extend statistical-research MCP server with Zotero tools (4 hours)

---

## 🎯 Quick Reference

| What | Status | Link |
|------|--------|------|
| **Architecture Proposals** | ✅ Complete | PROPOSAL-*.md (4 proposals) |
| **Implementation Plan** | ✅ Complete | IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md |
| **Vault Template** | ✅ Complete | vault-template/ (PARA structure, templates, dashboards) |
| **Core Documentation** | ✅ Complete | README.md, docs/, CLAUDE.md |
| **MCP Integration** | 🟡 In Progress | Extend statistical-research MCP server |
| **Zotero Integration** | ❌ Not Started | Phase 1 (4 hours) |
| **PDF Integration** | ❌ Not Started | Phase 2 (3 hours) |
| **Vault Operations** | ❌ Not Started | Phase 3 (4 hours) |

---

## 📊 Overall Progress

```
Architecture & Planning    ████████████████████ 100% ✅ (2024-12-24)
  ├─ Architecture proposals          ████████████████████ 100% ✅
  ├─ Implementation plan             ████████████████████ 100% ✅
  ├─ Strategic refocus               ████████████████████ 100% ✅
  └─ Repo reorganization             ████████████████████ 100% ✅

MCP Integration (Next)     ██████░░░░░░░░░░░░░░░  25% 🔄 (2025-01-11)
  ├─ Statistical-research base      ████████████████████ 100% ✅
  ├─ Phase 1: Zotero Integration     ░░░░░░░░░░░░░░░░░░░░   0% 📋
  ├─ Phase 2: PDF Extraction         ░░░░░░░░░░░░░░░░░░░░   0% ⚪
  ├─ Phase 3: Vault Operations       ░░░░░░░░░░░░░░░░░░░░   0% ⚪
  ├─ Phase 4: Knowledge Query        ░░░░░░░░░░░░░░░░░░░░   0% ⚪
  └─ Phase 5: Integration & Test    ░░░░░░░░░░░░░░░░░░░░   0% ⚪

Template Vault             ████████████████████ 100% ✅ (2024-12-23)
  ├─ Folder structure (PARA)         ████████████████████ 100% ✅
  ├─ Obsidian templates               ████████████████████ 100% ✅
  ├─ Dashboard files                 ████████████████████ 100% ✅
  └─ Documentation                    ████████████████████ 100% ✅

Distribution                ░░░░░░░░░░░░░░░░░░░░   0% 📋 (Future)
  ├─ GitHub release                 ░░░░░░░░░░░░░░░░░░░░   0% 📋
  ├─ Installation guides            ░░░░░░░░░░░░░░░░░░░░   0% 📋
  └─ Community adoption             ░░░░░░░░░░░░░░░░░░░░   0% 📋
```

**Overall Status:** 🟢 Active Development - Architecture complete, starting MCP implementation (75% overall)

---

## 🚀 Current Phase: MCP Integration (2025-01-11)

### Overview

**Strategic Refocus Complete** (2024-12-24):
- Nexus now focuses on **Claude + Obsidian knowledge integration** via MCP server extension
- Desktop app split to separate **Scribe** repository
- Strategy: **Extend** existing statistical-research MCP server (not build from scratch)
- Target: 2,728 Zotero items + ~1,800 PDFs + Obsidian vault accessible via Claude

### Why This Phase Matters

The MCP integration enables Claude to act as true cognitive interface:
- **Unified knowledge access**: Search across Zotero, PDFs, vault, code in one query
- **Context-aware responses**: Claude can reference actual literature, notes, files
- **Workflow automation**: Literature reviews, manuscript drafting, citation management
- **Research acceleration**: "Ask anything" across all knowledge sources

### Completed Foundation

- ✅ **Architecture Proposals** (4 documents, 200KB total)
  - PROPOSAL-NEXUS-ARCHITECTURE.md (55KB) - Complete system design
  - PROPOSAL-CLAUDE-RESEARCH-BRAIN.md (69KB) - Research-focused integration
  - PROPOSAL-NEXUS-CLI-PLUGIN.md (31KB) - CLI integration patterns
  - PROPOSAL-NEXUS-AILTERM-INTEGRATION.md (18KB) - AI terminal workflow

- ✅ **Implementation Plan**
  - IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md (25KB)
  - 5 phases, 16 hours total, concrete deliverables
  - Builds on existing 17 skills + 9 tools

- ✅ **Template Vault**
  - Complete PARA structure (00-INBOX through 60-TASKS)
  - 10+ Obsidian templates (projects, literature, tasks)
  - 4 dashboard files (master, projects, tasks, daily)
  - Full documentation in vault-template/

- ✅ **Repo Reorganization**
  - Desktop app → Scribe (separate repo)
  - Clean separation of concerns
  - Updated documentation for both repos

### Implementation Plan Summary

**Phase 1: Zotero Integration** (4 hours)
- SQLite queries against ~/Zotero/zotero.sqlite
- Search, cite, annotate commands
- Access to 2,728 library items

**Phase 2: PDF Integration** (3 hours)
- pdftotext extraction from ~1,800 PDFs
- Extract, search, summarize commands
- Full-text search across research + teaching materials

**Phase 3: Vault Operations** (4 hours)
- Read/write/search Obsidian vault
- Link management, note creation
- Full vault access via Claude

**Phase 4: Knowledge Query** (3 hours)
- Unified search across all sources
- Cross-source queries and aggregation
- "Ask anything" capability

**Phase 5: Integration & Testing** (2 hours)
- End-to-end workflows
- Error handling and edge cases
- Documentation and examples

**Total: 16 hours over 4-5 days**

### Next Actions

**Immediate:**
1. [ ] Phase 1: Create lib/zotero.sh with SQLite queries (1 hour)
2. [ ] Phase 1: Implement commands/zotero/* (search, cite, annotate) (2 hours)
3. [ ] Phase 1: Test with 2,728 items (1 hour)
4. [ ] Update .STATUS with progress after each phase

**This Week:**
- [ ] Complete Phase 1-2 (Zotero + PDF)
- [ ] Phase 3-4 (Vault + Knowledge Query)
- [ ] Phase 5 testing and documentation
- [ ] Create usage examples and demos

---

## 🎯 Architecture & Planning (Completed 2024-12-24)

### Strategic Refocus Achievement

**Identified Product Drift**: Original vision had two unclear products:
1. Desktop app (nexus-desktop) - Capture and organize notes
2. Template vault - Obsidian architecture

**Resolution**:
- **Desktop app → Scribe**: Moved to separate repository
- **Nexus → Knowledge integration**: Claude + Obsidian + MCP server
- **Clear purpose**: Extend statistical-research MCP, don't build from scratch

### Architecture Proposals Created

4 comprehensive proposals (200KB total):

1. **PROPOSAL-NEXUS-ARCHITECTURE.md** (55KB)
   - 3 architecture options analyzed
   - Integration patterns with MCP
   - Complete system design
   - Trade-offs and recommendations

2. **PROPOSAL-CLAUDE-RESEARCH-BRAIN.md** (69KB)
   - Research-focused use cases
   - Literature integration workflows
   - Academic writing automation
   - Citation management

3. **PROPOSAL-NEXUS-CLI-PLUGIN.md** (31KB)
   - CLI integration patterns
   - Workflow automation
   - Task execution patterns

4. **PROPOSAL-NEXUS-AILTERM-INTEGRATION.md** (18KB)
   - AI terminal workflow integration
   - Context management
   - Session orchestration

### Infrastructure Inventory

**Existing MCP Servers**: 8 servers
- statistical-research (Bun) - **BASE FOR EXTENSION**
- github, playwright, docling (official/third-party)
- project-refactor, rforge, nexus, obsidian-ops (custom)

**Statistical-Research Plugin**:
- 17 skills (A-grade quality)
- 9 tools (R execution, literature, Zotero)
- Already has literature foundation
- Perfect base to extend

### Implementation Plan

**IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md** (25KB):
- Detailed technical approach
- 5 phases with concrete deliverables
- File structure and code patterns
- Time estimates (16 hours total)
- Testing and validation strategy

---

## 📋 Template Vault (Completed 2024-12-23)

### Achievement

Created complete Obsidian vault template with PARA structure, templates, and dashboards. Ready to copy and use immediately.

### Key Deliverables

**Folder Structure**:
```
vault-template/
├── 00-INBOX/          # Quick capture
├── 10-PROJECTS/       # Active work
├── 20-AREAS/          # Ongoing domains
├── 30-RESOURCES/      # Reference
│   ├── templates/     # 10+ Obsidian templates
│   └── code-snippets/
├── 40-ARCHIVE/        # Completed work
├── 50-DAILY/          # Daily notes
├── 60-TASKS/          # Task management
└── _SYSTEM/           # Vault configuration
```

**Templates** (10+ files):
- Project templates (manuscript, package, course)
- Literature note template
- Task template with metadata
- Daily note template
- Meeting note template

**Dashboards** (4 files):
- _master-dashboard.md - Main control panel
- _projects-dashboard.md - Project overview
- _tasks-dashboard.md - Task list with filters
- _daily-dashboard.md - Today's focus

**Documentation**:
- README.md - Setup instructions
- _vault-guide.md - Complete reference
- Template usage examples

### Success Criteria Met

✅ Users can clone and immediately start using
✅ All templates are copy-paste ready with YAML frontmatter
✅ Dataview queries work out of box (tested)
✅ Minimal configuration needed (install 4 Obsidian plugins)

---

## 📋 Future Phases

### Distribution & Community (Post-MCP Integration)

**Goal:** Share Nexus with research community

**Key Deliverables:**
- GitHub release with installation guide
- Video walkthrough (15-20 minutes)
- Community feedback channels
- Documentation updates based on usage

**Estimated Effort:** 6-8 hours

**Success Criteria:**
- Researchers can install in < 30 minutes
- Documentation is comprehensive
- Community adopts and contributes

---

## ✅ Recent Completions

### Strategic Refocus Session (2024-12-24)

**What Was Accomplished:**
- Identified product drift (two unclear products)
- Analyzed 3 architecture options
- Created 4 comprehensive proposals (200KB total)
- Inventoried existing infrastructure (8 MCP servers, 28 skills)
- Decided to extend statistical-research (not build from scratch)
- Split desktop app to Scribe repository
- Created detailed implementation plan (16 hours, 5 phases)

**Key Insight:** Statistical-research plugin already has literature tools - just needs Zotero/PDF/Vault extensions. Build on existing, don't duplicate effort.

**Impact:** Clear direction, realistic timeline, leverages existing work. Can proceed confidently with implementation.

---

### Template Vault Completion (2024-12-23)

**What Was Accomplished:**
- Complete PARA folder structure
- 10+ Obsidian templates with YAML frontmatter
- 4 dashboard files with Dataview queries
- Comprehensive documentation
- Tested and validated

**Impact:** Users can clone and immediately have a working knowledge management system. Foundation is ready for MCP integration to provide "Claude as brain" layer.

---

## 📝 Design Decisions

### Why Extend Statistical-Research MCP Server?

**Decision:** Build on existing statistical-research plugin, not create new Nexus MCP server

**Rationale:**
- Statistical-research already has 17 skills and 9 tools
- Literature tools exist - just need Zotero/PDF/Vault extensions
- Avoid duplication of effort
- Faster to market (16 hours vs 40+ hours building from scratch)
- Single integration point for Claude

**Trade-offs:**
- ✅ Pro: Leverages existing work
- ✅ Pro: Faster implementation
- ✅ Pro: Single MCP server for research needs
- ✅ Pro: Already tested and deployed
- ⚠️ Con: Statistical-research scope expands
- ⚠️ Con: Requires coordination with that project

---

### Why MCP Server vs Claude Plugin?

**Decision:** Implement as MCP server instead of Claude plugin

**Rationale:**
- MCP is newer protocol with broader support
- Works in Claude Desktop, Claude Code, and browser (via extension)
- Single implementation, multiple Claude interfaces
- More flexible than plugin-specific APIs
- Aligns with emerging standard

**Trade-offs:**
- ✅ Pro: Universal across Claude interfaces
- ✅ Pro: Future-proof
- ✅ Pro: Can run independently
- ⚠️ Con: Newer technology, less community patterns
- ⚠️ Con: Requires MCP server infrastructure

---

### Why Not Build Desktop App?

**Decision:** Move desktop app to separate Scribe repository

**Rationale:**
- Two products with unclear relationship
- Desktop app has different audience (capture focus)
- Nexus should focus on knowledge integration
- Simpler to maintain separate repos
- Clear value propositions

**Trade-offs:**
- ✅ Pro: Clear product separation
- ✅ Pro: Focused roadmaps
- ✅ Pro: Reduced confusion
- ⚠️ Con: Users need to install both
- ⚠️ Con: Integration requires both products

---

## 🎯 Success Metrics

### Phase Completion Metrics

| Phase | Definition of "Done" |
|-------|---------------------|
| Architecture | All proposals written, strategic refocus complete |
| Template Vault | PARA structure, templates, dashboards complete |
| Phase 1 (Zotero) | 2,728 items accessible via Claude commands |
| Phase 2 (PDF) | ~1,800 PDFs searchable and extractable |
| Phase 3 (Vault) | Read/write/search Obsidian vault fully |
| Phase 4 (Query) | Unified "ask anything" across all sources |
| Phase 5 (Test) | End-to-end workflows documented |

### Quality Metrics

| Aspect | Measure | Target |
|--------|---------|--------|
| **Knowledge Access** | Can Claude search all sources? | 100% of Zotero, PDFs, Vault |
| **Response Quality** | Are Claude responses context-aware? | 90% have proper citations |
| **Setup Time** | From repo to working integration | < 30 minutes |
| **Query Speed** | Time to return results | < 5 seconds for most queries |
| **Error Rate** | Failed queries / total queries | < 5% |
| **User Satisfaction** | Would researchers use it? | 80%+ (based on feedback) |

---

## 🚧 Known Issues & Blockers

### Current Blockers

*None at this time - Ready to start Phase 1*

### Technical Debt

1. **Mirror Directory** - mnt/user-data/outputs/nexus/ contains duplicates
   - Impact: Low (extra files, not in repo)
   - Resolution: Clean up or document purpose
   - Status: Not in git, can ignore for now

### Future Considerations

1. **Windows Compatibility** - Zotero paths and shell commands assume macOS/Linux
   - Impact: Medium (limits Windows adoption)
   - Resolution: Add Windows-specific commands in Phase 3
   - Priority: Low (initial target is macOS)

2. **Zotero SQLite Performance** - Full-text search on 2,728 items may be slow
   - Impact: Medium (query latency)
   - Resolution: Add indexing, caching strategies
   - Priority: Medium (optimize in Phase 1 if needed)

3. **PDF Extraction Speed** - ~1,800 PDFs, full-text extraction slow
   - Impact: High (user experience)
   - Resolution: Cache extracted text, lazy extraction
   - Priority: High (address in Phase 2)

---

## 📅 Timeline

| Phase | Start | Target Completion | Status | Actual |
|-------|-------|-------------------|--------|--------|
| Architecture & Planning | 2024-12-20 | 2024-12-24 | ✅ Complete | 2024-12-24 |
| Template Vault | 2024-12-22 | 2024-12-23 | ✅ Complete | 2024-12-23 |
| Strategic Refocus | 2024-12-24 | 2024-12-24 | ✅ Complete | 2024-12-24 |
| Phase 1: Zotero Integration | TBD | TBD | 📋 Planned | 4 hours |
| Phase 2: PDF Integration | TBD | TBD | 📋 Planned | 3 hours |
| Phase 3: Vault Operations | TBD | TBD | 📋 Planned | 4 hours |
| Phase 4: Knowledge Query | TBD | TBD | 📋 Planned | 3 hours |
| Phase 5: Integration & Test | TBD | TBD | 📋 Planned | 2 hours |

**Projected Total**: 16 hours over 4-5 days
**Recommended Start**: 2025-01-12 (immediate next work session)

---

## 🤝 Collaboration Notes

### For Contributors

- See CONTRIBUTING.md (to be created) for guidelines
- Follow standards in standards/ directory
- Use ADHD-friendly formatting (TL;DRs, visual cues, time estimates)
- Test templates with actual Obsidian vault before submitting

### For Users

- Customize freely - this is a template, not a rigid system
- Share your adaptations (PRs welcome)
- Report issues with specific examples
- Suggest improvements based on real usage

---

## 📚 References

**Core Documentation:**
- IMPLEMENTATION-PLAN-EXTEND-STATISTICAL-RESEARCH.md - 16-hour implementation roadmap
- PROPOSAL-NEXUS-ARCHITECTURE.md - Complete system design
- PROPOSAL-CLAUDE-RESEARCH-BRAIN.md - Research focus details
- vault-template/ - Complete Obsidian vault template

**Statistical-Research MCP Server:**
- Location: ~/projects/dev-tools/claude-plugins/local/statistical-research/
- 17 skills (literature, R execution, research workflows)
- 9 tools (run_r, search_papers, cite_paper, etc.)
- Foundation for Nexus extension

**Related Projects:**
- Scribe (Desktop capture app) - ~/projects/dev-tools/scribe/
- MCP Servers Index - ~/projects/dev-tools/_MCP_SERVERS.md
- Mediationverse (R packages) - ~/projects/r-packages/

**External Resources:**
- PARA Method - Tiago Forte's organizational framework
- Obsidian.md - Knowledge base platform
- Claude MCP - Model Context Protocol
- Zotero SQLite Schema - Database structure for queries

---

**Created:** 2024-12-21
**Last Updated:** 2025-01-11
**Maintainer:** DT
**Repository:** ~/projects/dev-tools/nexus/
**Status:** 🟢 Active Development - Ready to start Phase 1
