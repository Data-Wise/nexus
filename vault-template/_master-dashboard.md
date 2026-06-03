---
cssclass: dashboard
tags: [dashboard]
---

# 🧠 Nexus Command Center

> Your second brain's control panel

---

## 🔥 Today's Focus

```dataview
TASK
FROM "60-TASKS/_today"
WHERE !completed
```

---

## 📊 Active Projects

### Research
```dataview
TABLE
  status as "Status",
  progress as "Progress",
  deadline as "Deadline"
FROM "10-PROJECTS/research"
WHERE type = "manuscript"
  AND status != "published"
  AND status != "archived"
SORT priority ASC, deadline ASC
```

### Teaching
```dataview
TABLE
  status as "Status",
  week as "Week"
FROM "10-PROJECTS/teaching"
WHERE type = "lecture"
  AND status = "planning"
SORT week ASC
```

### Packages
```dataview
TABLE
  status as "Status",
  progress as "Progress"
FROM "10-PROJECTS/packages"
WHERE type = "package"
  AND status = "active"
```

---

## 📥 Inbox

**Needs Processing**:
```dataview
LIST
FROM "00-INBOX"
WHERE file.name != "_inbox-dashboard"
SORT file.ctime DESC
LIMIT 10
```

**Count**: `$= dv.pages('"00-INBOX"').length` items

---

## 📚 Recent Literature

```dataview
TABLE
  authors as "Authors",
  year as "Year",
  read-status as "Status",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE type = "literature"
SORT file.ctime DESC
LIMIT 5
```

---

## ✅ Recently Completed

```dataview
TASK
FROM "60-TASKS" OR "10-PROJECTS"
WHERE completed
  AND date(completion) >= date(today) - dur(7 days)
SORT completion DESC
LIMIT 10
```

---

## 🔗 Quick Navigation

| Section | Link |
|---------|------|
| Research | [[10-PROJECTS/research/_research-dashboard\|Research Dashboard]] |
| Teaching | [[10-PROJECTS/teaching/_teaching-dashboard\|Teaching Dashboard]] |
| Packages | [[10-PROJECTS/packages/_packages-dashboard\|Packages Dashboard]] |
| Literature | [[30-RESOURCES/literature/_literature-index\|Literature Index]] |
| Tasks | [[60-TASKS/_today\|Today's Tasks]] |
| Daily | [[50-DAILY/|Daily Notes]] |

---

## 📈 Weekly Progress

**This Week**:
```dataview
LIST
FROM "50-DAILY/_weekly-reviews"
SORT file.name DESC
LIMIT 1
```

---

*Last updated: `$= dv.date("now")`*
