// Average sun hours per day by city
const sunHours = {
  istanbul: 4.5,
  ankara: 5.0,
  izmir: 5.5,
  antalya: 6.0,
  adana: 5.8,
  konya: 5.3
};

// Average electricity price in Turkey (TL per kWh)
const pricePerKwh = 3.8;

// Average solar panel output: 200W per m²
// Average installation cost: 8000 TL per m²
const wattsPerM2 = 200;
const installCostPerM2 = 8000;

// CO2 offset: 0.5 kg per kWh in Turkey
const co2PerKwh = 0.5;

function calculate() {
  const city = document.getElementById('city').value;
  const bill = parseFloat(document.getElementById('bill').value);
  const roof = parseFloat(document.getElementById('roof').value);

  // Basic validation
  if (!bill || !roof || bill <= 0 || roof <= 0) {
    alert('Please fill in all fields with valid numbers.');
    return;
  }

  // Calculations
  const dailySunHours = sunHours[city];
  const systemKw = (roof * wattsPerM2) / 1000;
  const monthlyOutput = systemKw * dailySunHours * 30;
  const monthlySaving = Math.min(monthlyOutput * pricePerKwh, bill);
  const annualCo2 = monthlyOutput * 12 * co2PerKwh;
  const installCost = roof * installCostPerM2;
  const paybackYears = (installCost / (monthlySaving * 12)).toFixed(1);

  // Display results
  document.getElementById('energy-output').textContent = monthlyOutput.toFixed(0) + ' kWh';
  document.getElementById('monthly-saving').textContent = monthlySaving.toFixed(0) + ' TL';
  document.getElementById('co2').textContent = annualCo2.toFixed(0) + ' kg';
  document.getElementById('payback').textContent = paybackYears + ' years';

  // Tip based on payback period
  let tip = '';
  if (paybackYears <= 6) {
    tip = '✅ Excellent investment! Your system pays for itself quickly and saves significant money long-term.';
  } else if (paybackYears <= 10) {
    tip = '👍 Good investment. Solar panels typically last 25+ years, so you\'ll enjoy many years of free energy.';
  } else {
    tip = '💡 Consider starting with a smaller system to reduce upfront costs, or check for government incentives in Turkey (YEKDEM program).';
  }

  document.getElementById('tip').textContent = tip;
  document.getElementById('results').style.display = 'block';
}
