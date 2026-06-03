# Statistical Notation Standards

> Quick reference for consistent notation across projects

---

## Causal Inference Notation

### Variables

| Symbol | Meaning | Notes |
|--------|---------|-------|
| $Y$ | Outcome variable | |
| $A$ | Treatment/Exposure | Binary (0,1) or continuous |
| $M$ | Mediator | |
| $C$ | Measured confounders | Vector |
| $U$ | Unmeasured confounders | |
| $X$ | Covariates (general) | |
| $Z$ | Instrumental variable | |

### Counterfactuals

| Notation | Meaning |
|----------|---------|
| $Y_a$ | Potential outcome under treatment $a$ |
| $M_a$ | Potential mediator under treatment $a$ |
| $Y_{a,m}$ | Potential outcome under treatment $a$ and mediator value $m$ |
| $Y_{a,M_{a^*}}$ | Outcome under treatment $a$ with mediator as if treatment were $a^*$ |

### Causal Effects

| Symbol | Name | Formula |
|--------|------|---------|
| $\text{ATE}$ | Average Treatment Effect | $E[Y_1] - E[Y_0]$ |
| $\text{NDE}$ | Natural Direct Effect | $E[Y_{1,M_0}] - E[Y_{0,M_0}]$ |
| $\text{NIE}$ | Natural Indirect Effect | $E[Y_{1,M_1}] - E[Y_{1,M_0}]$ |
| $\text{CDE}(m)$ | Controlled Direct Effect | $E[Y_{1,m}] - E[Y_{0,m}]$ |
| $P_\text{med}$ | Proportion mediated | $\text{NIE} / \text{ATE}$ |

---

## Semiparametric Notation

### Influence Functions

| Symbol | Meaning |
|--------|---------|
| $\psi$ | Parameter of interest |
| $\psi(P)$ | Functional (mapping from distribution $P$ to parameter) |
| $\phi(O; P, \psi)$ | Influence function for observation $O$ |
| $IF(O; \psi)$ | Shorthand for influence function |

### Nuisance Parameters

| Symbol | Meaning |
|--------|---------|
| $\eta$ | Nuisance parameter (general) |
| $\pi(a|c)$ | Propensity score $P(A=a|C=c)$ |
| $\mu(a,c)$ | Outcome regression $E[Y|A=a,C=c]$ |
| $m(a,c)$ | Mediator density/regression |

---

## Estimation Notation

### Estimators

| Symbol | Meaning |
|--------|---------|
| $\hat{\psi}_n$ | Estimator of $\psi$ (sample size $n$) |
| $\psi_0$ | True parameter value |
| $\mathbb{P}_n$ | Empirical measure (average over $n$ observations) |
| $\mathbb{G}_n$ | Empirical process $\sqrt{n}(\mathbb{P}_n - P)$ |

### Common Functions

| Symbol | Meaning |
|--------|---------|
| $\text{expit}(x)$ | $1/(1 + e^{-x})$ (inverse logit) |
| $\text{logit}(p)$ | $\log(p/(1-p))$ |
| $I(\cdot)$ | Indicator function |
| $\mathbb{I}_{\{A\}}$ | Indicator that event $A$ is true |

---

## Graph/DAG Notation

| Symbol | Meaning |
|--------|---------|
| $X \to Y$ | Direct edge from $X$ to $Y$ |
| $X \perp Y | Z$ | $X$ independent of $Y$ given $Z$ |
| $\text{pa}(X)$ | Parents of $X$ in DAG |
| $\text{ch}(X)$ | Children of $X$ in DAG |
| $\text{an}(X)$ | Ancestors of $X$ in DAG |

---

## Probability Notation

| Symbol | Meaning |
|--------|---------|
| $P(Y=y)$ | Probability that $Y$ equals $y$ |
| $P(Y=y|X=x)$ | Conditional probability |
| $E[Y]$ | Expectation of $Y$ |
| $E[Y|X=x]$ | Conditional expectation |
| $\text{Var}(Y)$ | Variance of $Y$ |
| $\text{Cov}(X,Y)$ | Covariance of $X$ and $Y$ |

---

## Consistency Rules

### Use Consistently

1. **Potential outcomes**: Always subscript (e.g., $Y_a$ not $Y(a)$)
2. **Counterfactuals**: Subscripts for static, parentheses for interventions: $Y_a$ vs. $Y(a;t)$
3. **Expectations**: $E[\cdot]$ not $\mathbb{E}[\cdot]$ (unless emphasizing measure theory)
4. **Probabilities**: $P(\cdot)$ not $\Pr(\cdot)$

### Avoid

- Mixing notation styles within a paper
- Overloading symbols (e.g., $C$ for both confounders and constants)
- Non-standard subscripts (use standard causal inference conventions)

---

## Journal-Specific Preferences

### JASA / Biometrics
- Prefers $E[\cdot]$ over $\mathbb{E}[\cdot]$
- Use $\text{Var}(\cdot)$ not $V(\cdot)$

### Epidemiology
- Often uses $RR$ (risk ratio), $RD$ (risk difference)
- May prefer $\Pr(\cdot)$ over $P(\cdot)$

---

**Related**: [[20-AREAS/notation-conventions/]]
