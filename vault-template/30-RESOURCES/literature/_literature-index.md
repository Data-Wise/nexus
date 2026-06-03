---
cssclass: dashboard
tags: [dashboard, literature]
---

# 📚 Literature Index

> Research papers and theoretical references

---

## 📥 To Read

```dataview
TABLE
  authors as "Authors",
  year as "Year",
  journal as "Journal"
FROM "30-RESOURCES/literature"
WHERE type = "literature"
  AND read-status = "to-read"
SORT year DESC
```

---

## 📖 Currently Reading

```dataview
TABLE
  authors as "Authors",
  year as "Year",
  progress as "Progress"
FROM "30-RESOURCES/literature"
WHERE type = "literature"
  AND read-status = "reading"
SORT file.ctime DESC
```

---

## ⭐ Highly Rated Papers

```dataview
TABLE
  authors as "Authors",
  year as "Year",
  journal as "Journal",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE type = "literature"
  AND rating >= "⭐⭐⭐⭐"
SORT rating DESC, year DESC
```

---

## 📂 By Topic

### Causal Mediation
```dataview
TABLE
  year as "Year",
  authors as "Authors",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "#mediation")
SORT year DESC
```

### Sensitivity Analysis
```dataview
TABLE
  year as "Year",
  authors as "Authors",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "#sensitivity-analysis")
SORT year DESC
```

### Semiparametric Theory
```dataview
TABLE
  year as "Year",
  authors as "Authors",
  rating as "⭐"
FROM "30-RESOURCES/literature"
WHERE contains(tags, "#semiparametric")
SORT year DESC
```

---

## 👤 By Author

### VanderWeele
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE contains(authors, "VanderWeele")
SORT year DESC
```

### Robins
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE contains(authors, "Robins")
SORT year DESC
```

### Tchetgen Tchetgen
```dataview
LIST
FROM "30-RESOURCES/literature"
WHERE contains(authors, "Tchetgen")
SORT year DESC
```

---

## 📊 Reading Stats

**Total Papers**: `$= dv.pages('"30-RESOURCES/literature"').where(p => p.type == "literature").length`

**By Status**:
- To Read: `$= dv.pages('"30-RESOURCES/literature"').where(p => p["read-status"] == "to-read").length`
- Reading: `$= dv.pages('"30-RESOURCES/literature"').where(p => p["read-status"] == "reading").length`
- Completed: `$= dv.pages('"30-RESOURCES/literature"').where(p => p["read-status"] == "read").length`

---

## 🔗 Quick Links
- [[_master-dashboard|← Back to Command Center]]
- [[10-PROJECTS/research/_research-dashboard|Research Dashboard]]
- [[00-INBOX/literature-inbox|Literature Inbox]]

---

*Last updated: `$= dv.date("now")`*
