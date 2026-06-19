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
FROM "60_tasks" OR "10_projects"
WHERE completed
  AND date(completion) = date("<% tp.date.now("YYYY-MM-DD") %>")
```

## 🔗 Quick Links
- [[_master-dashboard|Dashboard]]
- [[60_tasks/_today|Today's Tasks]]
- [[10_projects/research/_research-dashboard|Research]]

## 💭 Reflections


---

← [[<% tp.date.now("YYYY-MM-DD", -1) %>]] | [[<% tp.date.now("YYYY-MM-DD", 1) %>]] →
