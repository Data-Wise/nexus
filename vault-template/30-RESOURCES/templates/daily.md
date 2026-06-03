---
type: daily-note
date: <% tp.date.now("YYYY-MM-DD") %>
day: <% tp.date.now("dddd") %>
week: <% tp.date.now("YYYY-[W]WW") %>
tags: [daily]
---

# <% tp.date.now("dddd, MMMM DD, YYYY") %>

## 🎯 Today's Focus
- [ ]
- [ ]
- [ ]

## 📝 Notes

### Research


### Teaching


### Packages


## ✅ Completed Today
```dataview
TASK
FROM "60-TASKS" OR "10-PROJECTS"
WHERE completed
  AND date(completion) = date("<% tp.date.now("YYYY-MM-DD") %>")
```

## 🔗 Quick Links
- [[_master-dashboard|Dashboard]]
- [[60-TASKS/_today|Today's Tasks]]
- [[10-PROJECTS/research/_research-dashboard|Research]]

## 💭 Reflections


---

← [[<% tp.date.now("YYYY-MM-DD", -1) %>]] | [[<% tp.date.now("YYYY-MM-DD", 1) %>]] →
