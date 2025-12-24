---
type: manuscript
title: "Semiparametric Inference for Mediation Effects"
status: "drafting"
target-journal: "Journal of the American Statistical Association"
deadline: 2026-03-15
collaborators:
  - "Dr. Jane Smith"
  - "Dr. John Doe"
tags: [research, manuscript, mediation, semiparametric]
created: 2025-12-01
priority: 2
progress: 65
---

# Semiparametric Inference for Mediation Effects

## 📋 Project Status
- [x] Literature review complete
- [x] Theory developed
- [x] Simulations designed
- [ ] Simulations run (in progress)
- [ ] Application identified
- [ ] Draft complete
- [ ] Internal review
- [ ] Submitted

## 🎯 Core Contribution
> Develop doubly robust estimators for natural direct and indirect effects that achieve semiparametric efficiency under minimal assumptions

## 📐 Key Results
1. **Theorem 1**: Influence function derivation for $\psi_{NDE}$ under the nonparametric model
2. **Theorem 2**: Double robustness property requires only one of two models to be correctly specified
3. **Corollary 1**: $\sqrt{n}$-consistency and asymptotic normality under regularity conditions

## 🔗 Linked Resources
- Literature: [[30-RESOURCES/literature/VanderWeele2015-mediation|VanderWeele 2015]]
- Code: `~/repos/mediation-dr/`
- Simulations: [[simulations/dr-mediation/]]

## 📝 Research Log
```dataview
LIST
FROM "50-DAILY"
WHERE contains(file.outlinks, this.file.link)
SORT file.name DESC
LIMIT 10
```

## ✅ Tasks
```dataview
TASK
FROM "10-PROJECTS/research"
WHERE contains(file.path, this.file.folder)
  AND !completed
```

## 📎 Files
- [x] manuscript.tex
- [x] supplement.tex
- [ ] figures/ (3/5 complete)
- [ ] simulations/ (running)
- [ ] replication-code/

## 📝 Notes

### Current Focus
Working on simulation study comparing performance of:
1. Parametric g-formula
2. IPW estimator
3. AIPW (our proposed method)
4. TMLE

### Next Steps
1. Complete simulation scenarios 4-6
2. Add real data application (JOBS II study)
3. Draft introduction section
4. Create figure comparing bias-variance tradeoff
