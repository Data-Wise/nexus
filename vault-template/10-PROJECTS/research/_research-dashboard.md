---
cssclass: dashboard
tags: [dashboard, research]
---

# 📊 Research Dashboard

> Active manuscripts and research projects

---

## 🔥 Active Manuscripts

```dataview
TABLE
  status as "Status",
  progress as "Progress",
  target-journal as "Journal",
  deadline as "Deadline",
  collaborators as "Team"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
  AND (status = "drafting" OR status = "revision")
SORT priority ASC, deadline ASC
```

---

## 💡 Ideas & Planning

```dataview
TABLE
  created as "Created",
  priority as "Priority"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
  AND status = "idea"
SORT priority ASC, created DESC
```

---

## 📝 Under Review

```dataview
TABLE
  target-journal as "Journal",
  deadline as "Submitted"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
  AND status = "submitted"
SORT deadline DESC
```

---

## ✅ Published

```dataview
TABLE
  year as "Year",
  journal as "Journal",
  doi as "DOI"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
  AND status = "published"
SORT year DESC
```

---

## 🎯 Research Tasks

### High Priority
```dataview
TASK
FROM "10-PROJECTS/research"
WHERE !completed
  AND priority <= 2
SORT priority ASC
```

### This Week
```dataview
TASK
FROM "10-PROJECTS/research"
WHERE !completed
  AND (due <= date(today) + dur(7 days))
SORT due ASC
```

---

## 📚 Related Literature

```dataview
TABLE
  authors as "Authors",
  year as "Year",
  relevance.research as "Relevance"
FROM "30-RESOURCES/literature"
WHERE relevance.research = "high"
  OR relevance.research = "medium"
SORT year DESC
LIMIT 10
```

---

## 🔗 Quick Links
- [[_master-dashboard|← Back to Command Center]]
- [[10-PROJECTS/teaching/_teaching-dashboard|Teaching Dashboard →]]
- [[30-RESOURCES/literature/_literature-index|Literature Index]]

---

*Last updated: `$= dv.date("now")`*
