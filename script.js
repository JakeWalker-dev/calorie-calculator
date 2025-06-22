function addRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" name="food"></td>
    <td><input type="number" name="weight" value="0" required></td>
    <td><input type="number" name="calories" value="0" required></td>
    <td><input type="number" name="protein" value="0" required></td>
    <td><input type="number" name="fat" value="0" required></td>
    <td><input type="number" name="carbs" value="0" required></td>
    <td><button type="button" onclick="removeRow(this)">X</button></td>
  `;
  document.getElementById('food-body').appendChild(row);
}

function removeRow(button) {
  button.closest('tr').remove();
}

document.getElementById('food-form').addEventListener('submit', function(e) {
  e.preventDefault();

  let totalCalories = 0, totalProtein = 0, totalFat = 0, totalCarbs = 0, totalWeight = 0;
  const rows = document.querySelectorAll('#food-body tr');
  const ingredients = [];

  rows.forEach(row => {
    const food = row.querySelector('[name="food"]').value;
    const weight = parseFloat(row.querySelector('[name="weight"]').value);
    const calPer100 = parseFloat(row.querySelector('[name="calories"]').value);
    const proPer100 = parseFloat(row.querySelector('[name="protein"]').value);
    const fatPer100 = parseFloat(row.querySelector('[name="fat"]').value);
    const carbPer100 = parseFloat(row.querySelector('[name="carbs"]').value);

    const cals = weight * calPer100 / 100;
    const prot = weight * proPer100 / 100;
    const fat = weight * fatPer100 / 100;
    const carbs = weight * carbPer100 / 100;

    ingredients.push({ food, weight, cals, prot, fat, carbs });

    totalCalories += cals;
    totalProtein += prot;
    totalFat += fat;
    totalCarbs += carbs;
    totalWeight += weight;
  });

  const portionSize = parseFloat(document.getElementById('portionSize').value);

  if (isNaN(portionSize) || portionSize <= 0 || totalWeight === 0) {
    document.getElementById('results').innerHTML = `<p>Please enter a valid portion size and ensure ingredient weights are greater than 0.</p>`;
    return;
  }

  const portionCalories = totalCalories * portionSize / totalWeight;
  const portionProtein = totalProtein * portionSize / totalWeight;
  const portionFat = totalFat * portionSize / totalWeight;
  const portionCarbs = totalCarbs * portionSize / totalWeight;

  let ingredientDetails = '<h3>Ingredients per Portion:</h3><ul>';
  ingredients.forEach(ing => {
    const portionWeight = ing.weight * portionSize / totalWeight;
    const portionCals = ing.cals * portionSize / totalWeight;
    const portionProt = ing.prot * portionSize / totalWeight;
    const portionFat = ing.fat * portionSize / totalWeight;
    const portionCarbs = ing.carbs * portionSize / totalWeight;
    ingredientDetails += `<li>${ing.food || 'Unnamed food'}: ${portionWeight.toFixed(2)} g - ${portionCals.toFixed(2)} kcal, ${portionProt.toFixed(2)}g protein, ${portionFat.toFixed(2)}g fat, ${portionCarbs.toFixed(2)}g carbs</li>`;
  });
  ingredientDetails += '</ul>';

  document.getElementById('results').innerHTML = `
    <h2>Total Nutritional Info</h2>
    <p><strong>Total Calories:</strong> ${totalCalories.toFixed(2)}</p>
    <p><strong>Total Protein:</strong> ${totalProtein.toFixed(2)} g</p>
    <p><strong>Total Fat:</strong> ${totalFat.toFixed(2)} g</p>
    <p><strong>Total Carbohydrates:</strong> ${totalCarbs.toFixed(2)} g</p>
    <h2>Per Portion (${portionSize}g)</h2>
    <p><strong>Calories:</strong> ${portionCalories.toFixed(2)}</p>
    <p><strong>Protein:</strong> ${portionProtein.toFixed(2)} g</p>
    <p><strong>Fat:</strong> ${portionFat.toFixed(2)} g</p>
    <p><strong>Carbohydrates:</strong> ${portionCarbs.toFixed(2)} g</p>
    ${ingredientDetails}
  `;
});
