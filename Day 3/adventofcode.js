const fs = require('fs');

function calculateSum(corruptedMemory) {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

  const matches = [...corruptedMemory.matchAll(pattern)];

  let enabled = true; 
  let totalSum = 0;

  matches.forEach(match => {
    const instruction = match[0]; 
    if (instruction === "do()") {
      enabled = true; 
    } else if (instruction === "don't()") {
      enabled = false; 
    } else if (enabled && match[1] && match[2]) {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      totalSum += x * y;
    }
  });

  return totalSum;
}

fs.readFile('corruptedMemory.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  const result = calculateSum(data);
  console.log("Suma total de multiplicaciones habilitadas:", result);
});

