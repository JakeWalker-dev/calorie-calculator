function addItem(name = '', weight = '', calories = '') {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
  
    itemDiv.innerHTML = `
      <input type="text" placeholder="Snax name" value="${name}" required>
      <input type="number" placeholder="Grams" value="${weight}" min="0" required>
      <input type="number" placeholder="Calz per 100g" value="${calories}" min="0" required>
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()">❌</button>
    `;
  
    document.getElementById('items').appendChild(itemDiv);
  }
  
  document.getElementById('calcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const items = document.querySelectorAll('#items .item');
    let totalCalories = 0;
    let totalWeight = 0;
  
    items.forEach(item => {
      const inputs = item.querySelectorAll('input');
      const weight = parseFloat(inputs[1].value);
      const calPer100g = parseFloat(inputs[2].value);
  
      if (!isNaN(weight) && !isNaN(calPer100g)) {
        totalCalories += (weight * calPer100g) / 100;
        totalWeight += weight;
      }
    });
  
    const portionSize = parseFloat(document.getElementById('portionSize').value);
    let message = `⚡ Total Calz: ${totalCalories.toFixed(2)} kcal`;
  
    if (!isNaN(portionSize) && portionSize > 0 && totalWeight > 0) {
      const portionCalories = (totalCalories * portionSize) / totalWeight;
      message += `<br>🍕 Ur ${portionSize}g Zlice: ${portionCalories.toFixed(2)} kcal`;
    }
  
    document.getElementById('total').innerHTML = message;
  });
  
  // Initialize with one item
  addItem();
  