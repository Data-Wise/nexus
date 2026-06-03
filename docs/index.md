---
title: Nexus - Obsidian + Claude Second Brain
description: Knowledge management for academic researchers
hide:
  - navigation
  - toc
---

<style>
.md-typeset h1 { display: none; }
.hero { text-align: center; padding: 3rem 1rem; }
.hero img { max-width: 180px; margin-bottom: 1rem; }
.hero h1 { font-size: 2.5rem; margin: 0.5rem 0; border: none; }
.hero p { font-size: 1.2rem; color: var(--md-default-fg-color--light); }
.badges { margin: 1.5rem 0; }
.badges img { margin: 0 0.25rem; }
</style>

<div class="hero" markdown>

# 🧠 Nexus

# Connect Everything You Know

**Obsidian + Claude Second Brain for Academic Researchers**

<div class="badges">

[![Documentation](https://img.shields.io/badge/docs-online-brightgreen.svg)](https://data-wise.github.io/nexus/)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Data-Wise/nexus/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/Data-Wise/nexus/blob/main/LICENSE)

</div>

[Quick Start](quick-start.md){ .md-button .md-button--primary }
[ADHD Guide](adhd-guide.md){ .md-button }

</div>

---

## TL;DR

Nexus turns your **Obsidian vault** into an intelligent knowledge system with **Claude as the cognitive interface**.

| Feature | Description |
|---------|-------------|
| **Knowledge Management** | Semantic search, automatic linking, literature pipeline |
| **Task Management** | Daily focus, project tracking, deadline awareness |
| **Project Dashboards** | Research papers, teaching materials, R packages |
| **Claude Integration** | Natural language queries, proactive suggestions |
| **ADHD Optimized** | Visual anchors, progress tracking, time estimates |

---

## Architecture

```mermaid
graph TB
    subgraph Obsidian["📁 Obsidian Vault"]
        INBOX[00-INBOX]
        PROJECTS[10-PROJECTS]
        AREAS[20-AREAS]
        RESOURCES[30-RESOURCES]
    end
    
    subgraph Claude["🧠 Claude Nexus"]
        LIB[Librarian Mode]
        BUILD[Builder Mode]
        TEACH[Teacher Mode]
    end
    
    subgraph Output["📤 Deliverables"]
        PAPERS[Research Papers]
        LECTURES[Quarto Lectures]
        PACKAGES[R Packages]
    end
    
    Obsidian --> Claude --> Output
```

---

## Three Modes

<div class="grid cards" markdown>

-   :material-bookshelf:{ .lg .middle } **Librarian**

    ---

    Knowledge capture, organization, and retrieval

    [:octicons-arrow-right-24: Knowledge workflows](workflows/knowledge-management.md)

-   :material-hammer-wrench:{ .lg .middle } **Builder**

    ---

    Code development and package maintenance

    [:octicons-arrow-right-24: R packages](academic/r-packages.md)

-   :material-school:{ .lg .middle } **Teacher**

    ---

    Lecture creation and course materials

    [:octicons-arrow-right-24: Teaching](academic/teaching-materials.md)

</div>

---

## Quick Commands

| Say This | Claude Does |
|----------|-------------|
| `"Morning brief"` | Today's calendar + top 3 tasks + project pulse |
| `"Capture this: [thought]"` | Creates note in inbox |
| `"Show P_med status"` | Project dashboard with progress |
| `"What should I work on?"` | Suggests task based on energy + deadlines |
| `"Create lecture on [topic]"` | Generates Quarto slides |

---

## For Academic Researchers

Nexus is designed for **statistics/biostatistics researchers**:

- 📊 **Research Projects** — Track manuscripts, simulations, reviews
- 🎓 **Teaching Materials** — Generate Quarto lectures, R labs
- 📦 **R Packages** — Manage mediationverse ecosystem
- 📚 **Literature** — Capture papers, extract contributions

---

## ADHD Optimizations

Every response includes:

- ✅ **TL;DR first** (if >200 words)
- ✅ **Time estimates** `[15 min]`
- ✅ **Progress tracking** `[3/7 complete]`
- ✅ **Bold keywords** for scanning
- ✅ **Visual anchors** (tables, bullets)

[:octicons-arrow-right-24: Full ADHD Guide](adhd-guide.md)

---

## Documentation

| Section | Description |
|---------|-------------|
| [Guide](guide/index.md) | Installation & configuration |
| [Workflows](workflows/index.md) | Knowledge, tasks, projects |
| [Reference](reference/index.md) | Commands, templates, queries |
| [Academic](academic/index.md) | Research, teaching, packages |
| [Tutorials](tutorials/index.md) | Step-by-step guides |

---

<div style="text-align: center; padding: 2rem; color: var(--md-default-fg-color--light);" markdown>

**Nexus** — Where research, teaching, and code converge.

*Built by Stat-Wise for academic researchers who think in connections.*

</div>
