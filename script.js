document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fuelType').addEventListener('change', toggleFields);
    toggleFields(); // Set the initial state correctly based on the default fuel selection.
});

function toggleFields() {
    const fuelType = document.getElementById('fuelType').value;
    const ICEFields = document.getElementById('ICEFields');
    const EVFields = document.getElementById('EVFields');
    
    ICEFields.style.display = fuelType === 'electric' ? 'none' : 'block';
    EVFields.style.display = fuelType === 'electric' ? 'block' : 'none';
}

function calculateCost() {
    const fuelType = document.getElementById('fuelType').value;
    const journeyDistance = Number(document.getElementById('journeyDistance').value);
    const parkingCosts = Number(document.getElementById('parkingCosts').value);
    const travelFrequency = Number(document.getElementById('travelFrequency').value);
    let fuelOrChargingCost = 0;
    let weeklyCost, monthlyCost;

    if (fuelType === 'electric') {
        const batteryCapacity = Number(document.getElementById('batteryCapacity').value);
        const range = Number(document.getElementById('range').value);
        const efficiency = range / batteryCapacity; // km per kWh
        const chargingCostPerKWh = 4.5; // ₹ per kWh
        fuelOrChargingCost = (journeyDistance / efficiency) * chargingCostPerKWh;
    } else {
        const mileage = Number(document.getElementById('mileage').value);
        let fuelCost;
        if (fuelType === 'diesel') {
            fuelCost = 87.5; // ₹ per liter
        } else if (fuelType === 'petrol') {
            fuelCost = 95; // ₹ per liter
        } else if (fuelType === 'cng') {
            fuelCost = 76.5; // ₹ per kg
        }
        fuelOrChargingCost = (journeyDistance / mileage) * fuelCost;
    }

    weeklyCost = fuelOrChargingCost * travelFrequency;
    monthlyCost = weeklyCost * 4;  // Assuming 4 weeks in a month

    const costPlus50 = weeklyCost * 1.5 * 4;
    const costPlus75 = weeklyCost * 1.75 * 4;
    const costPlus100 = weeklyCost * 2 * 4;
    const costPlus150 = weeklyCost * 2.5 * 4;
    const costPlus200 = weeklyCost * 3 * 4;

    document.getElementById('fuelCost').innerText = `Fuel/Charging Cost: ₹${fuelOrChargingCost.toFixed(2)}`;
    document.getElementById('totalCost').innerText = `Total Commuting Cost (Current): ₹${weeklyCost.toFixed(2)}`;
    document.getElementById('monthlyCostCurrent').innerText = `Monthly Commuting Cost (Current): ₹${monthlyCost.toFixed(2)}`;
    document.getElementById('costPlus50').innerText = `+50%: ₹${costPlus50.toFixed(2)}`;
    document.getElementById('monthlyCostPlus50').innerText = `Monthly +50%: ₹${(costPlus50 - monthlyCost).toFixed(2)}`;
    document.getElementById('costPlus75').innerText = `+75%: ₹${costPlus75.toFixed(2)}`;
    document.getElementById('monthlyCostPlus75').innerText = `Monthly +75%: ₹${(costPlus75 - monthlyCost).toFixed(2)}`;
    document.getElementById('costPlus100').innerText = `+100%: ₹${costPlus100.toFixed(2)}`;
    document.getElementById('monthlyCostPlus100').innerText = `Monthly +100%: ₹${(costPlus100 - monthlyCost).toFixed(2)}`;
    document.getElementById('costPlus150').innerText = `+150%: ₹${costPlus150.toFixed(2)}`;
    document.getElementById('monthlyCostPlus150').innerText = `Monthly +150%: ₹${(costPlus150 - monthlyCost).toFixed(2)}`;
    document.getElementById('costPlus200').innerText = `+200%: ₹${costPlus200.toFixed(2)}`;
    document.getElementById('monthlyCostPlus200').innerText = `Monthly +200%: ₹${(costPlus200 - monthlyCost).toFixed(2)}`;
}
