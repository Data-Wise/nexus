---
type: weekly-review
week: <% tp.date.now("YYYY-[W]WW") %>
date: <% tp.date.now("YYYY-MM-DD") %>
tags: [review, weekly]
---

# Weekly Review: Week <% tp.date.now("WW, YYYY") %>

**Period**: <% tp.date.now("MMMM DD", -6) %> - <% tp.date.now("MMMM DD, YYYY") %>

---

## 🎉 Wins This Week

### Research
| Project | Accomplishment | Progress |
|---------|----------------|----------|
| | | |

### Teaching
| Course | Accomplishment | Prep Status |
|--------|----------------|-------------|
| | | |

### Packages
| Package | Commits | Issues Closed |
|---------|---------|---------------|
| | | |

---

## 📊 Metrics

**Completed Tasks**:
```dataview
TASK
FROM "60-TASKS" OR "10-PROJECTS"
WHERE completed
  AND date(completion) >= date("<% tp.date.now("YYYY-MM-DD", -6) %>")
  AND date(completion) <= date("<% tp.date.now("YYYY-MM-DD") %>")
```

**Daily Notes Created**:
```dataview
LIST
FROM "50-DAILY"
WHERE file.ctime >= date("<% tp.date.now("YYYY-MM-DD", -6) %>")
SORT file.name DESC
```

---

## 🔄 What Didn't Work
-
-

## 💡 Learnings
-
-

## 🎯 Next Week's Priorities

### Top 3 Goals
1.
2.
3.

### Research
- [ ]
- [ ]

### Teaching
- [ ]
- [ ]

### Packages
- [ ]
- [ ]

---

## 📅 Calendar Review
- **Key meetings**:
- **Deadlines**:
- **Travel**:

---

## 🧹 Inbox Status
- **00-INBOX items**:
- **Action needed**:

---

← [[<% tp.date.now("YYYY-[W]WW", -7) %>]] | [[<% tp.date.now("YYYY-[W]WW", 7) %>]] →
