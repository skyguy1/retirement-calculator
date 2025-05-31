# Simplified Retirement Income Estimator

A web-based calculator to estimate sustainable retirement income based on current net worth and asset allocation, including simplified tax estimations.

## Features:
- Estimates sustainable annual and monthly after-tax income from your current net worth.
- Inputs:
    - Current Age
    - Current Net Worth
    - State of Residence (for simplified state tax estimation)
    - Withdrawal Strategy (Aggressive 4% or Conservative 3%)
- Uses pre-defined assumptions for:
    - Inflation rate (used for context, results are in today's dollars)
- Provides a breakdown of:
    - Pre-tax annual withdrawal
    - Estimated federal taxes (simplified, single filer, using long-term capital gains rates)
    - Estimated state taxes (highly simplified, varies by state)
    - After-tax annual and monthly income (in today's dollars)

## How to Use:
1. Open `index.html` in a web browser.
2. Fill in your current age, net worth, select your state, and choose your withdrawal strategy.
3. Click the "Calculate" button.
4. View the estimated income results.

## Important Notes:
- **Simplifications:** This calculator uses many simplifications, especially for tax calculations and investment return projections. It is for illustrative purposes only and not financial advice.
- **Tax Assumptions:** Federal taxes are based on a single filer status, apply a standard deduction, and then use illustrative long-term capital gains tax rates. State taxes are highly generalized. This is a simplification; actual tax liability can vary significantly, especially if there's a mix of ordinary income and capital gains.
- **Withdrawal Rate:** The user selects between an aggressive (4%) or conservative (3%) withdrawal rate. These are common rules of thumb for sustainability over a typical retirement period (e.g., 30 years).

## Future Enhancements (Potential):
- More detailed and accurate federal and state tax calculations (e.g., filing status, more brackets, common deductions).
- Dynamic withdrawal rates based on age or market conditions.
- Options for users to adjust underlying assumptions (inflation).
- Potentially re-introduce asset allocation for more dynamic return/risk assessment if desired.
- Monte Carlo simulations for probabilistic outcomes.
- Charts and visualizations.
