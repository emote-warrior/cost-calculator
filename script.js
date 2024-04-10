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
    let fuelOrChargingCost = 0;

    if (fuelType === 'electric') {
        const batteryCapacity = Number(document.getElementById('batteryCapacity').value);
        const range = Number(document.getElementById('range').value);
        const efficiency = range / batteryCapacity; // km per kWh
        const chargingCostPerKWh = 4.5; // ₹ per kWh
        fuelOrChargingCost = (journeyDistance / efficiency) * chargingCostPerKWh;
    } else {
        const mileage = Number(document.getElementById('mileage').value);
        const fuelCost = fuelType === 'diesel' ? 87.5 : 95; // ₹ per liter
        fuelOrChargingCost = (journeyDistance / mileage) * fuelCost;
    }

    const totalCost = fuelOrChargingCost + parkingCosts;
    const costPlus50 = totalCost * 1.5;
    const costPlus75 = totalCost * 1.75;
    const costPlus100 = totalCost * 2;
    const costPlus150 = totalCost * 2.5;

    document.getElementById('fuelCost').innerText = `Fuel/Charging Cost: ₹${fuelOrChargingCost.toFixed(2)}`;
    document.getElementById('totalCost').innerText = `Total Commuting Cost: ₹${totalCost.toFixed(2)}`;
    document.getElementById('costPlus50').innerText = `+50%: ₹${costPlus50.toFixed(2)}`;
    document.getElementById('costPlus75').innerText = `+75%: ₹${costPlus75.toFixed(2)}`;
    document.getElementById('costPlus100').innerText = `+100%: ₹${costPlus100.toFixed(2)}`;
    document.getElementById('costPlus150').innerText = `+150%: ₹${costPlus150.toFixed(2)}`;
}
