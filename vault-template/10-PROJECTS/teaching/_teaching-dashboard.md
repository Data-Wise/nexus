---
cssclass: dashboard
tags: [dashboard, teaching]
---

# 🎓 Teaching Dashboard

> Course materials and lecture preparation

---

## 📅 Current Courses

```dataview
TABLE
  week as "Week",
  topic as "Current Topic",
  status as "Status"
FROM "10-PROJECTS/teaching"
WHERE type = "course"
  AND status = "active"
SORT week ASC
```

---

## 📝 Lectures to Prepare

```dataview
TABLE
  course as "Course",
  week as "Week",
  topic as "Topic",
  date as "Date",
  status as "Status"
FROM "10-PROJECTS/teaching"
WHERE type = "lecture"
  AND status = "planning"
SORT date ASC
LIMIT 10
```

---

## ✅ Prep Checklist

### This Week's Lectures
```dataview
TASK
FROM "10-PROJECTS/teaching"
WHERE !completed
  AND contains(file.path, "teaching")
  AND (due <= date(today) + dur(7 days))
SORT due ASC
```

---

## 📚 Course Materials

### By Course

#### STAT 579: Causal Inference
```dataview
LIST
FROM "10-PROJECTS/teaching"
WHERE type = "lecture"
  AND contains(course, "579")
SORT week ASC
```

#### STAT 440: Regression Analysis
```dataview
LIST
FROM "10-PROJECTS/teaching"
WHERE type = "lecture"
  AND contains(course, "440")
SORT week ASC
```

---

## 📖 Teaching-Related Literature

```dataview
TABLE
  title as "Title",
  authors as "Authors",
  relevance.teaching as "Relevance"
FROM "30-RESOURCES/literature"
WHERE relevance.teaching = "high"
  OR relevance.teaching = "medium"
SORT file.ctime DESC
LIMIT 10
```

---

## 🎯 Teaching Tasks

### High Priority
```dataview
TASK
FROM "10-PROJECTS/teaching"
WHERE !completed
  AND priority <= 2
SORT priority ASC
```

---

## 🔗 Quick Links
- [[_master-dashboard|← Back to Command Center]]
- [[10-PROJECTS/research/_research-dashboard|Research Dashboard]]
- [[10-PROJECTS/packages/_packages-dashboard|Packages Dashboard →]]

---

*Last updated: `$= dv.date("now")`*
