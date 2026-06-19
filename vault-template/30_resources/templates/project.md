---
type: manuscript
title: "<% tp.file.title %>"
status: "idea"
target-journal: ""
deadline:
collaborators: []
tags: [research, manuscript]
created: <% tp.date.now("YYYY-MM-DD") %>
priority: 3
progress: 0
---

# <% tp.file.title %>

## 📋 Project Status
- [ ] Literature review complete
- [ ] Theory developed
- [ ] Simulations designed
- [ ] Simulations run
- [ ] Application identified
- [ ] Draft complete
- [ ] Internal review
- [ ] Submitted

## 🎯 Core Contribution
> One sentence: What's new?

## 📐 Key Results
1. **Theorem 1**:
2. **Corollary 1**:

## 🔗 Linked Resources
- Literature: [[]]
- Code: `~/repos/`
- Simulations: [[]]

## 📝 Research Log
```dataview
LIST
FROM "50_daily"
WHERE contains(file.outlinks, this.file.link)
SORT file.name DESC
LIMIT 10
```

## ✅ Tasks
```dataview
TASK
FROM "10_projects/research"
WHERE contains(file.path, this.file.folder)
  AND !completed
```

## 📎 Files
- [ ] manuscript.tex
- [ ] supplement.tex
- [ ] figures/
- [ ] simulations/
- [ ] replication-code/
