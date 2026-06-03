---
type: literature
title: "Explanation in Causal Inference: Methods for Mediation and Interaction"
authors:
  - "Tyler J. VanderWeele"
year: 2015
journal: "Oxford University Press"
doi: ""
tags: [literature, mediation, causal-inference, interaction]
rating: ⭐⭐⭐⭐⭐
read-status: "read"
relevance:
  - research: high
  - teaching: high
  - packages: medium
created: 2025-11-15
---

# Explanation in Causal Inference: Methods for Mediation and Interaction

## 📋 Quick Reference
- **Authors**: Tyler J. VanderWeele
- **Year**: 2015
- **Journal**: Oxford University Press (Book)
- **DOI**: 10.1093/ije/dyw277

## 🎯 Core Contribution
> Comprehensive treatment of causal mediation analysis using the counterfactual framework, including methods for continuous/binary mediators, multiple mediators, and sensitivity analysis

## 🔑 Key Ideas
1. Natural direct and indirect effects defined using nested counterfactuals
2. Four-way decomposition for effect heterogeneity
3. Sensitivity analysis for unmeasured confounding
4. Extension to multiple mediators and time-varying exposures

## 📐 Notation & Setup
- $Y$: Outcome
- $A$: Treatment/Exposure
- $M$: Mediator
- $C$: Measured confounders
- $Y_a$: Potential outcome under treatment $a$
- $M_a$: Potential mediator value under treatment $a$
- $Y_{a,m}$: Potential outcome under treatment $a$ and mediator value $m$

## 💡 Key Results

### Main Theorem/Proposition
> Under sequential ignorability assumptions:
> 1. $(Y_{a,m}, M_a) \perp A | C$
> 2. $Y_{a,m} \perp M | A, C$
>
> The natural direct and indirect effects are identified

### Key Equations

**Natural Direct Effect (NDE)**:
$$
NDE = E[Y_{1,M_0}] - E[Y_{0,M_0}]
$$

**Natural Indirect Effect (NIE)**:
$$
NIE = E[Y_{1,M_1}] - E[Y_{1,M_0}]
$$

**Identification Formula**:
$$
E[Y_{a,M_{a^*}}] = \sum_c \sum_m E[Y|A=a, M=m, C=c] \cdot P(M=m|A=a^*, C=c) \cdot P(C=c)
$$

## 🔗 Connections
- **Builds on**: [[Robins-Greenland1992|Robins & Greenland 1992]], [[Pearl2001|Pearl 2001]]
- **Extended by**: [[Tchetgen2012-semiparametric|Tchetgen Tchetgen 2012]]
- **Applies to my work**: Directly informs my current manuscript on semiparametric inference

## 📝 My Notes

### Strengths
- Most comprehensive treatment of mediation analysis available
- Clear exposition of counterfactual framework
- Practical guidance on sensitivity analysis
- Extensive real data examples

### Limitations
- Parametric identification formulas may be inefficient
- Sequential ignorability assumption often strong
- Limited treatment of semiparametric/nonparametric methods

### Questions
- Can sensitivity parameters be estimated from data rather than specified?
- How to extend to continuous time-varying mediators?
- What about mediation in survival analysis settings?

## 🏷️ Tags
#mediation #causal-inference #counterfactuals #sensitivity-analysis #book

## 📎 PDF Location
`~/Zotero/storage/ABCD1234/VanderWeele-2015-Explanation.pdf`
