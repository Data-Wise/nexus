# ADHD-Friendly Documentation Standards

> **TL;DR:** Visual hierarchy, time estimates, TL;DR sections, progress indicators. Make docs scannable in 30 seconds, understandable in 5 minutes.

**Last Updated:** 2025-12-21
**Version:** 1.0.0

---

## Core Principles

1. **Scannable** - Visual hierarchy with headings, tables, bullets
2. **Time-bounded** - Every section has time estimate
3. **Progressive** - Summary first, details second
4. **Visual** - Progress bars, emojis, color coding
5. **Actionable** - Clear next steps always provided

---

## Required Elements

Every documentation file MUST have:

1. **TL;DR at top** (< 50 words, 3-5 bullets)
2. **Time estimates** on all tasks
3. **Visual progress indicators** for multi-step processes
4. **Clear next actions** at the end
5. **Quick reference table** (if applicable)

---

## TL;DR Format

### Standard Pattern

```markdown
> **TL;DR:**
> - **What**: [One sentence describing the thing]
> - **Why**: [One sentence explaining motivation]
> - **How**: [One sentence showing approach]
> - **Status**: [Current state with emoji ✅/⚠️/🔄/📋]
```

### Examples

**Good TL;DR:**
```markdown
> **TL;DR:**
> - **What**: Template-driven Obsidian vault for academic research
> - **Why**: Reduce friction in capturing and connecting ideas
> - **How**: PARA structure + Dataview + Claude integration
> - **Status**: ✅ P1 complete, P2 (template vault) next
```

**Too Verbose:**
```markdown
> **TL;DR:**
> - This document describes a comprehensive knowledge management system
>   that uses Obsidian as the vault technology and integrates with Claude
>   AI to provide cognitive augmentation through various workflows...
```

**Rules:**
- < 50 words total
- Action-oriented verbs
- Concrete outcomes
- Status always included

---

## Visual Hierarchy

### Heading Structure

```markdown
# Document Title (H1)

> TL;DR section here

## Major Section (H2)

### Subsection (H3)

#### Detail Level (H4)
```

**Rules:**
- H1: Document title only (one per file)
- H2: Major sections
- H3: Subsections
- H4: Rare (use bold instead if possible)
- Never skip levels (H1 → H3)

---

### Emojis for Visual Scanning

**Section Markers:**
```
🎯 Goals/Objectives
📋 Checklists/Requirements
✅ Completed Items
🔄 In Progress
📋 Planned/Future
⚠️ Warnings/Attention
💡 Tips/Insights
🚫 Don't Do This
📊 Data/Metrics
🔗 Related Links
📝 Notes
🎉 Wins/Successes
```

**Status Indicators:**
```
✅ Complete
🔄 In Progress
📋 Planned
⏳ Waiting/Blocked
⚠️ Attention Needed
❌ Blocked/Failed
⭐ Recommended
```

**Priority/Energy:**
```
🟢 Green = Easy/Quick wins
🟡 Yellow = Medium effort
🔴 Red = High effort/Complex
⚡ High energy required
🧠 Deep focus needed
```

**Time Estimates:**
```
⏱️ 15m   - Quick task
⏱️ 30m   - Short task
⏱️ 1h    - Medium task
⏱️ 2h    - Long task
⏱️ 4h    - Half day
⏱️ 8h    - Full day
```

---

## Progress Indicators

### Progress Bars

**Full bar (20 characters):**
```
████████████████████ 100%
```

**Partial bars:**
```
█████████████████░░░  85%
███████████████░░░░░  75%
██████████░░░░░░░░░░  50%
█████░░░░░░░░░░░░░░░  25%
░░░░░░░░░░░░░░░░░░░░   0%
```

**With status emojis:**
```
Phase P0: Foundation  ████████████████████ 100% ✅
Phase P1: Standards   ████████████████████ 100% ✅
Phase P2: Template    ██████████░░░░░░░░░░  50% 🔄
Phase P3: Examples    ░░░░░░░░░░░░░░░░░░░░   0% 📋
```

**Hierarchical progress:**
```
Phase P1: Standards   ████████████████████ 100% ✅
  ├─ CLAUDE.md        ████████████████████ 100% ✅
  ├─ .STATUS          ████████████████████ 100% ✅
  ├─ PROJECT-HUB      ████████████████████ 100% ✅
  └─ Proposals        ██████████░░░░░░░░░░  50% 🔄
```

---

### Checklists

**Format:**
```markdown
- [ ] Uncompleted task
- [x] Completed task
- [!] Blocked/important task
```

**With time estimates:**
```markdown
- [ ] Task 1 ⏱️ 15m
- [ ] Task 2 ⏱️ 1h
- [x] Task 3 ⏱️ 30m ✅
```

**With priority:**
```markdown
- [ ] 🔴 High priority task
- [ ] 🟡 Medium priority task
- [ ] 🟢 Low priority task
```

---

## Tables for Quick Reference

### Standard Table Format

```markdown
| Task | Command | Time |
|------|---------|------|
| Create vault | `mkdir -p ~/Obsidian/Nexus` | 2 min |
| Install plugins | Settings → Community Plugins | 10 min |
| Create template | Use template.md | 5 min |
```

**Rules:**
- Headers bolded in first row
- Left-align text columns
- Right-align numbers
- Include units (min, hours, %)

### Comparison Tables

```markdown
| Feature | Option A | Option B |
|---------|----------|----------|
| **Time** | 1 week | 4 weeks |
| **Effort** | Low | High |
| **Result** | Basic | Complete |
| **When to use** | Quick start | Full setup |
```

---

## Time Estimates

### Always Include Time

**For tasks:**
```markdown
## Task: Create Templates ⏱️ 30 min

1. Create project template ⏱️ 10 min
2. Create paper template ⏱️ 10 min
3. Create daily template ⏱️ 10 min
```

**For sections:**
```markdown
## Phase 1: Setup ⏱️ 2 hours

### Step 1: Folder Structure ⏱️ 30 min
[instructions]

### Step 2: Install Plugins ⏱️ 20 min
[instructions]
```

**For documents:**
```markdown
# Documentation Title

**Read Time:** 5 minutes
**Setup Time:** 2 hours
**Total Time:** 2 hours 5 minutes
```

---

## Section Structure

### Standard Section Template

```markdown
## Section Title ⏱️ [time]

> **TL;DR:** [Quick summary]

### What This Does
[Brief explanation]

### Why It Matters
[Motivation/benefits]

### How to Do It

**Prerequisites:**
- [ ] Item 1
- [ ] Item 2

**Steps:**
1. Step 1 ⏱️ [time]
   - Detail
2. Step 2 ⏱️ [time]
   - Detail

**Result:** [What you'll have when done]

### Common Issues

| Problem | Solution |
|---------|----------|
| Issue 1 | Fix 1 |
| Issue 2 | Fix 2 |
```

---

## Progressive Disclosure

### Layers of Detail

**Level 1: Scannable (30 seconds)**
- Title
- TL;DR
- Quick reference table
- Next actions

**Level 2: Overview (5 minutes)**
- Section headers
- Key bullet points
- Visual diagrams
- Time estimates

**Level 3: Deep Dive (15+ minutes)**
- Full explanations
- Code examples
- Edge cases
- Troubleshooting

### Collapsible Sections (If Supported)

```markdown
<details>
<summary>Advanced Options (Click to expand)</summary>

[Detailed content here]

</details>
```

---

## Code Examples

### Format Code Blocks

```markdown
\`\`\`bash
# Always include comments explaining what's happening
mkdir -p ~/Obsidian/Nexus

# Show expected output when helpful
# Output: Directory created
\`\`\`
```

**Rules:**
- Always specify language
- Include comments explaining non-obvious parts
- Show expected output when helpful
- Test code before committing

---

## Decision Trees

### Visual Decision Making

```markdown
## Which Template to Use?

Is this active work with a deadline?
  ↓ YES → Use project template
  ↓ NO  → Continue

Is this a paper you're reading?
  ↓ YES → Use literature template
  ↓ NO  → Continue

Is this a daily log?
  ↓ YES → Use daily template
  ↓ NO  → Use fleeting note
```

**Alternative table format:**

| If... | Then use... |
|-------|-------------|
| Active work with deadline | Project template |
| Paper to read | Literature template |
| Daily planning | Daily template |
| Quick thought | Fleeting note |

---

## Next Actions

### Always End With Clear Steps

```markdown
## Next Steps

**Immediate (Choose One):**

A) Option A 🟢 [15 min] ⭐ RECOMMENDED
   - Why: [reason]
   - Result: [outcome]

B) Option B 🟡 [1 hour]
   - Why: [reason]
   - Result: [outcome]

**Medium-Term (This Week):**
- [ ] Task 1
- [ ] Task 2

**Long-Term (Future):**
- [ ] Strategic item 1
- [ ] Strategic item 2
```

---

## Examples vs Anti-Examples

### Show Both Good and Bad

```markdown
❌ **Don't do this:**
\`\`\`
mkdir My Vault With Spaces
\`\`\`

✅ **Do this instead:**
\`\`\`bash
mkdir -p ~/Obsidian/Nexus
\`\`\`
```

**Why this works:**
- Visual distinction (✅ vs ❌)
- Shows what to avoid
- Shows correct approach
- Explains why

---

## Wins and Motivation

### Celebrate Progress

```markdown
## 🎉 What You Accomplished

- ✅ Created complete vault structure
- ✅ Installed 5 essential plugins
- ✅ Set up 3 core templates
- ✅ Created first project
- 📊 Ready to capture first note!
```

**Use frequently:**
- After completing phases
- At end of tutorials
- In progress updates
- In weekly reviews

---

## Common Patterns

### Quick Start Pattern

```markdown
# Title

> **TL;DR:** [What, Why, How, Status]

## 30-Second Overview
[3-5 bullets]

## Quick Start ⏱️ [time]

\`\`\`bash
[One command to get started]
\`\`\`

## Common Tasks

| I want to... | Run this | Time |
|--------------|----------|------|
| [Task] | [Command] | [Time] |

## Where Things Are

| Location | Contents |
|----------|----------|
| [Path] | [Purpose] |
```

### Tutorial Pattern

```markdown
# How to [Task]

> **TL;DR:** [Summary]

**Time:** [Total time]
**Difficulty:** Easy/Medium/Hard

## Prerequisites
- [ ] Item 1
- [ ] Item 2

## Steps

### Step 1: [Action] ⏱️ [time]
[Instructions]

**Result:** [What you'll have]

### Step 2: [Action] ⏱️ [time]
[Instructions]

**Result:** [What you'll have]

## Troubleshooting

| Problem | Solution |
|---------|----------|

## Next Steps
[Clear actions]
```

### Reference Pattern

```markdown
# [Topic] Reference

> **TL;DR:** [Summary]

## Quick Reference Table

| Item | Value | Notes |
|------|-------|-------|

## Detailed Sections

### Topic 1
[Details]

### Topic 2
[Details]

## See Also
- [[Related doc 1]]
- [[Related doc 2]]
```

---

## Validation Checklist

Before publishing documentation:

- [ ] Has TL;DR at top (< 50 words)
- [ ] Includes time estimates
- [ ] Uses visual hierarchy (emojis, headings)
- [ ] Has progress indicators (if multi-step)
- [ ] Includes quick reference table (if applicable)
- [ ] Ends with clear next actions
- [ ] Code examples tested
- [ ] Links verified
- [ ] Scannable in 30 seconds
- [ ] Understandable in 5 minutes

---

## See Also

- [../vault/VAULT-STRUCTURE.md](../vault/VAULT-STRUCTURE.md) - Example of ADHD-friendly structure
- [../vault/TEMPLATE-STANDARDS.md](../vault/TEMPLATE-STANDARDS.md) - Template documentation
- [../../QUICK-START.md](../../QUICK-START.md) - Implementation example

---

**Created:** 2025-12-21
**Maintainer:** DT
**Based on:** zsh-configuration ADHD-friendly documentation standards
