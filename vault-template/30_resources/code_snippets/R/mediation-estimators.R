# Mediation Analysis Code Snippets
# Common estimators for natural direct and indirect effects

# ============================================================================
# 1. Product of Coefficients Method
# ============================================================================

#' Product Method for Mediation
#'
#' @param data data.frame with columns Y, A, M, C
#' @param outcome_family "gaussian" or "binomial"
#' @param mediator_family "gaussian" or "binomial"
#' @return list with NDE, NIE estimates
product_method <- function(data, outcome_family = "gaussian",
                           mediator_family = "gaussian") {

  # Outcome model: E[Y | A, M, C]
  if (outcome_family == "gaussian") {
    fit_Y <- lm(Y ~ A + M + C, data = data)
    theta <- coef(fit_Y)["A"]
    beta <- coef(fit_Y)["M"]
  } else {
    fit_Y <- glm(Y ~ A + M + C, data = data, family = binomial(link = "logit"))
    theta <- coef(fit_Y)["A"]
    beta <- coef(fit_Y)["M"]
  }

  # Mediator model: E[M | A, C]
  if (mediator_family == "gaussian") {
    fit_M <- lm(M ~ A + C, data = data)
    alpha <- coef(fit_M)["A"]
  } else {
    fit_M <- glm(M ~ A + C, data = data, family = binomial(link = "logit"))
    alpha <- coef(fit_M)["A"]
  }

  # Natural Indirect Effect (mediated effect)
  NIE <- alpha * beta

  # Natural Direct Effect
  NDE <- theta

  # Total Effect
  TE <- theta + alpha * beta

  list(NDE = NDE, NIE = NIE, TE = TE,
       proportion_mediated = NIE / TE)
}


# ============================================================================
# 2. G-formula / Regression-based Estimator
# ============================================================================

#' G-Formula for Natural Effects
#'
#' @param data data.frame
#' @param outcome_family "gaussian" or "binomial"
#' @param mediator_family "gaussian" or "binomial"
g_formula <- function(data, outcome_family = "gaussian",
                     mediator_family = "gaussian") {

  n <- nrow(data)

  # Fit outcome model
  if (outcome_family == "gaussian") {
    fit_Y <- lm(Y ~ A * M + C, data = data)
  } else {
    fit_Y <- glm(Y ~ A * M + C, data = data, family = binomial(link = "logit"))
  }

  # Fit mediator model
  if (mediator_family == "gaussian") {
    fit_M <- lm(M ~ A + C, data = data)
  } else {
    fit_M <- glm(M ~ A + C, data = data, family = binomial(link = "logit"))
  }

  # Create counterfactual datasets
  data1 <- data0 <- data
  data1$A <- 1
  data0$A <- 0

  # Predict M under each treatment
  M1 <- predict(fit_M, newdata = data1, type = "response")
  M0 <- predict(fit_M, newdata = data0, type = "response")

  # E[Y_{1,M_1}]
  data_11 <- data1
  data_11$M <- M1
  Y_11 <- mean(predict(fit_Y, newdata = data_11, type = "response"))

  # E[Y_{1,M_0}]
  data_10 <- data1
  data_10$M <- M0
  Y_10 <- mean(predict(fit_Y, newdata = data_10, type = "response"))

  # E[Y_{0,M_0}]
  data_00 <- data0
  data_00$M <- M0
  Y_00 <- mean(predict(fit_Y, newdata = data_00, type = "response"))

  # Natural effects
  NDE <- Y_10 - Y_00
  NIE <- Y_11 - Y_10
  TE <- Y_11 - Y_00

  list(NDE = NDE, NIE = NIE, TE = TE,
       proportion_mediated = NIE / TE)
}


# ============================================================================
# 3. Inverse Probability Weighting (IPW)
# ============================================================================

#' IPW Estimator for Mediation
#'
#' @param data data.frame with Y, A, M, C
ipw_mediation <- function(data) {

  # Propensity score: P(A = 1 | C)
  ps_model <- glm(A ~ C, data = data, family = binomial())
  data$ps <- predict(ps_model, type = "response")

  # Mediator density ratio: P(M | A, C) / P(M | A*, C)
  # For continuous M, use density estimation
  # For binary M, use logistic regression

  # Simplified for binary mediator:
  med_model <- glm(M ~ A * C, data = data, family = binomial())

  # IPW weights
  data$w_A <- ifelse(data$A == 1, 1/data$ps, 1/(1 - data$ps))

  # Predict M probabilities
  data1 <- data0 <- data
  data1$A <- 1
  data0$A <- 0

  p_M1 <- predict(med_model, newdata = data1, type = "response")
  p_M0 <- predict(med_model, newdata = data0, type = "response")

  # Mediator density ratio for M = m under A = 1 vs A = 0
  p_M_current <- predict(med_model, newdata = data, type = "response")
  data$w_M <- ifelse(data$M == 1, p_M0 / p_M_current,
                     (1 - p_M0) / (1 - p_M_current))

  # Weighted outcomes
  # NDE: compare Y under A=1 vs A=0, holding M distribution at A=0
  NDE <- weighted.mean(data$Y[data$A == 1] * data$w_M[data$A == 1],
                       data$w_A[data$A == 1]) -
         mean(data$Y[data$A == 0])

  # NIE: compare Y under M distribution at A=1 vs A=0, holding A=1
  NIE <- mean(data$Y[data$A == 1]) -
         weighted.mean(data$Y[data$A == 1] * data$w_M[data$A == 1],
                       data$w_A[data$A == 1])

  list(NDE = NDE, NIE = NIE, TE = NDE + NIE)
}


# ============================================================================
# 4. Bootstrap Confidence Intervals
# ============================================================================

#' Bootstrap CIs for Mediation Effects
#'
#' @param data data.frame
#' @param estimator function to compute effects
#' @param B number of bootstrap samples
bootstrap_mediation <- function(data, estimator = product_method, B = 1000) {

  n <- nrow(data)
  boot_results <- matrix(NA, nrow = B, ncol = 3)

  for (b in 1:B) {
    # Resample with replacement
    boot_idx <- sample(1:n, n, replace = TRUE)
    boot_data <- data[boot_idx, ]

    # Compute estimates
    est <- estimator(boot_data)
    boot_results[b, ] <- c(est$NDE, est$NIE, est$TE)
  }

  # 95% percentile CI
  ci_NDE <- quantile(boot_results[, 1], c(0.025, 0.975))
  ci_NIE <- quantile(boot_results[, 2], c(0.025, 0.975))
  ci_TE <- quantile(boot_results[, 3], c(0.025, 0.975))

  list(
    ci_NDE = ci_NDE,
    ci_NIE = ci_NIE,
    ci_TE = ci_TE,
    boot_dist = boot_results
  )
}


# ============================================================================
# Usage Examples
# ============================================================================

if (FALSE) {
  # Simulate data
  set.seed(123)
  n <- 1000
  data <- data.frame(
    C = rnorm(n),
    A = rbinom(n, 1, 0.5),
    M = NA,
    Y = NA
  )

  data$M <- rbinom(n, 1, plogis(0.5 * data$A + 0.3 * data$C))
  data$Y <- rnorm(n, mean = 0.3 * data$A + 0.4 * data$M + 0.2 * data$C, sd = 1)

  # Product method
  est_product <- product_method(data)
  print(est_product)

  # G-formula
  est_gformula <- g_formula(data)
  print(est_gformula)

  # Bootstrap CIs
  ci <- bootstrap_mediation(data, estimator = product_method, B = 500)
  print(ci$ci_NIE)
}
