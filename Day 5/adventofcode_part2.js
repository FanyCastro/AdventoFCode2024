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

function sortUpdate(update, rules) {
    // Topological sort using the rules
    const graph = new Map();
    const inDegree = new Map();

    for (const page of update) {
        graph.set(page, []);
        inDegree.set(page, 0);
    }

    for (const [x, y] of rules) {
        if (graph.has(x) && graph.has(y)) {
            graph.get(x).push(y);
            inDegree.set(y, inDegree.get(y) + 1);
        }
    }

    const queue = [];
    for (const [page, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(page);
    }

    const sorted = [];
    while (queue.length > 0) {
        const current = queue.shift();
        sorted.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        }
    }

    return sorted;
}

function sumMiddlePagesPartTwo(input) {
    const { rules, updates } = parseInput(input);

    let total = 0;

    for (const update of updates) {
        if (!isUpdateValid(update, rules)) {
            const sortedUpdate = sortUpdate(update, rules);
            total += getMiddlePage(sortedUpdate);
        }
    }

    return total;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return;
    }
  
    const result = sumMiddlePagesPartTwo(data);
    console.log("Suma de las páginas centrales (Parte 2):", result);
});
