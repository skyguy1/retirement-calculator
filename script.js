document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateRetirement);
});

const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
];

function populateStates() {
    const selectElement = document.getElementById('stateOfResidence');
    US_STATES.forEach(state => {
        const option = document.createElement('option');
        option.value = state.toLowerCase().replace(/\s+/g, '-'); // e.g., new-york
        option.textContent = state;
        selectElement.appendChild(option);
    });
}

const ESTIMATED_INFLATION_RATE = 0.025; // 2.5%
// SUSTAINABLE_WITHDRAWAL_RATE will be set based on user selection
const RETIREMENT_DURATION_YEARS = 30; // For context, not directly used in this simplified calculation yet

// Simplified Federal Long-Term Capital Gains Tax Brackets (Single Filer - Illustrative, e.g., 2023)
// These are for illustrative purposes and should be updated for the current tax year.
const FEDERAL_LTCG_TAX_BRACKETS_SINGLE = [
    { limit: 44625, rate: 0.00 },  // 0% up to $44,625 taxable income
    { limit: 492300, rate: 0.15 }, // 15% up to $492,300 taxable income
    { limit: Infinity, rate: 0.20 } // 20% above $492,300 taxable income
];
const FEDERAL_STANDARD_DEDUCTION_SINGLE = 13850; // Example for 2023. Applying this before LTCG for simplification.

// Highly Simplified State Tax Logic (Illustrative - needs real data)
// This is a placeholder and would need to be replaced with actual state tax rates/brackets.
const SIMPLIFIED_STATE_TAX_RATES = {
    'alabama': 0.045,
    'alaska': 0,
    'arizona': 0.025,
    'arkansas': 0.045,
    'california': 0.08,    // Previously set
    'colorado': 0.044,
    'connecticut': 0.055,
    'delaware': 0.05,
    'florida': 0,          // Previously set
    'georgia': 0.054,
    'hawaii': 0.07,
    'idaho': 0.05,
    'illinois': 0.0495,
    'indiana': 0.0315,
    'iowa': 0.039,
    'kansas': 0.05,
    'kentucky': 0.045,
    'louisiana': 0.04,
    'maine': 0.06,
    'maryland': 0.055,
    'massachusetts': 0.05,
    'michigan': 0.0425,
    'minnesota': 0.07,
    'mississippi': 0.04,
    'missouri': 0.045,
    'montana': 0.055,
    'nebraska': 0.05,
    'nevada': 0,           // Corrected
    'new-hampshire': 0,
    'new-jersey': 0.07,
    'new-mexico': 0.05,
    'new-york': 0.065,     // Previously set
    'north-carolina': 0.045,
    'north-dakota': 0.02,
    'ohio': 0.035,
    'oklahoma': 0.045,
    'oregon': 0.08,
    'pennsylvania': 0.0307,
    'rhode-island': 0.05,
    'south-carolina': 0.06,
    'south-dakota': 0,
    'tennessee': 0,
    'texas': 0,            // Previously set
    'utah': 0.0465,
    'vermont': 0.07,
    'virginia': 0.05,
    'washington': 0,
    'west-virginia': 0.05,
    'wisconsin': 0.06,
    'wyoming': 0,
    'default': 0.04        // Retained as fallback
};

function calculateFederalTax(income) {
    let taxableIncome = Math.max(0, income - FEDERAL_STANDARD_DEDUCTION_SINGLE);
    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;

    for (const bracket of FEDERAL_LTCG_TAX_BRACKETS_SINGLE) {
        if (taxableIncome > previousLimit) {
            const incomeInBracket = Math.min(remainingIncome, bracket.limit - previousLimit);
            tax += incomeInBracket * bracket.rate;
            remainingIncome -= incomeInBracket;
            if (remainingIncome <= 0) break;
        }
        previousLimit = bracket.limit;
    }
    return tax;
}

function calculateStateTax(income, state) {
    const rate = SIMPLIFIED_STATE_TAX_RATES[state] !== undefined ? SIMPLIFIED_STATE_TAX_RATES[state] : SIMPLIFIED_STATE_TAX_RATES['default'];
    // This is overly simple. Real state taxes have brackets, deductions, etc.
    // Some states have no income tax.
    return income * rate; 
}

function calculateRetirement() {
    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = '';

    // Get input values
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const netWorth = parseFloat(document.getElementById('netWorth').value);
    const selectedState = document.getElementById('stateOfResidence').value;
    const withdrawalStrategy = parseFloat(document.getElementById('withdrawalStrategy').value);

    // --- Input Validation ---
    let errors = [];
    if (isNaN(currentAge) || currentAge <= 0) errors.push("Current Age must be a positive number.");
    if (isNaN(netWorth) || netWorth < 0) errors.push("Net Worth cannot be negative.");
    if (!selectedState) errors.push("Please select a State of Residence.");
    if (isNaN(withdrawalStrategy) || (withdrawalStrategy !== 0.03 && withdrawalStrategy !== 0.04)) errors.push("Please select a valid withdrawal strategy.");

    if (errors.length > 0) {
        errorMessagesDiv.innerHTML = errors.join('<br>');
        // Clear results if there are errors
        document.getElementById('annualWithdrawalPreTax').textContent = '$0';
        document.getElementById('federalTaxes').textContent = '$0';
        document.getElementById('stateTaxes').textContent = '$0';
        document.getElementById('annualWithdrawalAfterTax').textContent = '$0';
        document.getElementById('monthlyIncomeAfterTax').textContent = '$0';
        return;
    }

    // --- Calculations ---
    // For this simplified version, we assume the user is at/near retirement.
    // The "Sustainable Annual Withdrawal (Pre-Tax, Today's Dollars)" is a direct % of current net worth.
    // We are not projecting growth of net worth further, but what can be drawn from it now.

    // The asset allocation affects the *sustainability* of the withdrawal rate over many years,
    // but for this simplified calculation, we'll directly use the selected withdrawalStrategy on the total net worth.
    // A more complex model would simulate portfolio growth and depletion.
    const annualWithdrawalPreTax = netWorth * withdrawalStrategy;

    // Tax Calculations (Simplified)
    // Note: This assumes all withdrawal is ordinary income. Real scenarios are more complex (capital gains, qualified dividends, etc.)
    const federalTaxes = calculateFederalTax(annualWithdrawalPreTax);
    const stateTaxes = calculateStateTax(annualWithdrawalPreTax, selectedState);
    const totalTaxes = federalTaxes + stateTaxes;
    const annualWithdrawalAfterTax = Math.max(0, annualWithdrawalPreTax - totalTaxes);
    const monthlyIncomeAfterTax = annualWithdrawalAfterTax / 12;

    // --- Display Results ---
    document.getElementById('annualWithdrawalPreTax').textContent = `$${annualWithdrawalPreTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('federalTaxes').textContent = `$${federalTaxes.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('stateTaxes').textContent = `$${stateTaxes.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('annualWithdrawalAfterTax').textContent = `$${annualWithdrawalAfterTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('monthlyIncomeAfterTax').textContent = `$${monthlyIncomeAfterTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

