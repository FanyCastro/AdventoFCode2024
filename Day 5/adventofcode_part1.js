const fs = require('fs');

function parseInput(input) {
    const [rulesSection, updatesSection] = input.trim().split("\n\n");

    const rules = rulesSection.split("\n").map(line => {
        const [x, y] = line.split('|').map(Number);
        return [x, y];
    });

    const updates = updatesSection.split("\n").map(update => update.split(',').map(Number));

    return { rules, updates };
}

function isUpdateValid(update, rules) {
    const position = new Map(update.map((page, index) => [page, index]));
    for (const [x, y] of rules) {
        if (position.has(x) && position.has(y)) {
            if (position.get(x) > position.get(y)) {
                return false;
            }
        }
    }
    return true;
}

function getMiddlePage(update) {
    const midIndex = Math.floor(update.length / 2);
    return update[midIndex];
}

function sumMiddlePages(input) {
    const { rules, updates } = parseInput(input);

    let total = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            total += getMiddlePage(update);
        }
    }

    return total;
}


fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }
  
    const result = sumMiddlePages(data);
    console.log("Suma de las páginas centrales:", result);
});

