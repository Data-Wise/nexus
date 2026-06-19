---
cssclass: dashboard
tags: [dashboard, packages]
---

# 📦 Packages Dashboard

> R package development and maintenance

---

## 🔥 Active Development

```dataview
TABLE
  status as "Status",
  version as "Version",
  cran-status as "CRAN",
  next-release as "Next Release"
FROM "10_projects/packages"
WHERE type = "package"
  AND status = "active"
SORT priority ASC
```

---

## 🧪 Testing & CI

```dataview
TABLE
  tests-passing as "Tests",
  coverage as "Coverage",
  r-cmd-check as "R CMD Check"
FROM "10_projects/packages"
WHERE type = "package"
  AND status = "active"
```

---

## 📝 Issues & TODOs

### High Priority Issues
```dataview
TASK
FROM "10_projects/packages"
WHERE !completed
  AND priority <= 2
SORT priority ASC
```

### Feature Requests
```dataview
TASK
FROM "10_projects/packages"
WHERE !completed
  AND contains(tags, "feature")
SORT priority ASC
```

---

## 📚 Package Documentation

```dataview
LIST
FROM "10_projects/packages"
WHERE type = "package"
  AND contains(file.name, "README")
```

---

## 🔗 Mediationverse Ecosystem

**Meta-package coordination**: [[10_projects/packages/mediationverse]]

### Component Packages
```dataview
TABLE
  status as "Status",
  version as "Version"
FROM "10_projects/packages"
WHERE contains(tags, "mediationverse")
  AND type = "package"
SORT file.name ASC
```

---

## 📖 Package-Related Literature

```dataview
TABLE
  title as "Title",
  authors as "Authors",
  relevance.packages as "Relevance"
FROM "30_resources/literature"
WHERE relevance.packages = "high"
  OR relevance.packages = "medium"
SORT year DESC
LIMIT 10
```

---

## 🎯 Development Tasks

### This Week
```dataview
TASK
FROM "10_projects/packages"
WHERE !completed
  AND (due <= date(today) + dur(7 days))
SORT due ASC
```

---

## 🔗 Quick Links
- [[_master-dashboard|← Back to Command Center]]
- [[10_projects/teaching/_teaching-dashboard|← Teaching Dashboard]]
- [[10_projects/research/_research-dashboard|Research Dashboard]]

---

*Last updated: `$= dv.date("now")`*
