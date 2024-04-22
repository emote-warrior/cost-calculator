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

    weeklyCost = (fuelOrChargingCost + parkingCosts) * travelFrequency;
    monthlyCost = weeklyCost * 4;  // Assuming 4 weeks in a month

    const costPlus50 = weeklyCost * 1.5;
    const costPlus75 = weeklyCost * 1.75;
    const costPlus100 = weeklyCost * 2;
    const costPlus150 = weeklyCost * 2.5;
    const costPlus200 = weeklyCost * 3;

    document.getElementById('fuelCost').innerText = `Fuel/Charging Cost: ₹${fuelOrChargingCost.toFixed(2)}`;
    document.getElementById('totalCost').innerText = `Total Commuting Cost (Current): ₹${weeklyCost.toFixed(2)}`;
    document.getElementById('monthlyCostCurrent').innerText = `Monthly Commuting Cost (Current): ₹${monthlyCost.toFixed(2)}`;
    document.getElementById('costPlus50').innerText = `Daily +50%: ₹${costPlus50.toFixed(2)}`;
    document.getElementById('monthlyCostPlus50').innerText = `Monthly +50%: ₹${(monthlyCost * 1.5).toFixed(2)}`;
    document.getElementById('costPlus75').innerText = `Daily +75%: ₹${costPlus75.toFixed(2)}`;
    document.getElementById('monthlyCostPlus75').innerText = `Monthly +75%: ₹${(monthlyCost * 1.75).toFixed(2)}`;
    document.getElementById('costPlus100').innerText = `Daily +100%: ₹${costPlus100.toFixed(2)}`;
    document.getElementById('monthlyCostPlus100').innerText = `Monthly +100%: ₹${(monthlyCost * 2).toFixed(2)}`;
    document.getElementById('costPlus150').innerText = `Daily +150%: ₹${costPlus150.toFixed(2)}`;
    document.getElementById('monthlyCostPlus150').innerText = `Monthly +150%: ₹${(monthlyCost * 2.5).toFixed(2)}`;
    document.getElementById('costPlus200').innerText = `Daily +200%: ₹${costPlus200.toFixed(2)}`;
    document.getElementById('monthlyCostPlus200').innerText = `Monthly +200%: ₹${(monthlyCost * 3).toFixed(2)}`;
}
