const fs = require('fs');

function isSafeReport(levels) {
    let isIncreasing = null; 
    
    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
  
      // Difference within the valid range
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        return false; 
      }
  
      // Increasing or decreasing
      if (isIncreasing === null) {
        isIncreasing = diff > 0;
      } else if (isIncreasing !== (diff > 0)) {
        return false; 
      }
    }
    
    return true; 
}

function isSafeWithDampener(levels) {
    // Try removing each level
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafeReport(modifiedLevels)) {
        return true; 
      }
    }
    
    return false;
  }

fs.readFile('unusualData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const reports = data.trim().split('\n');
    // const safeReportsCount = reports.filter(isSafeReport).length;


    let safeReportsCount = 0;
    reports.forEach(report => {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(levels) || isSafeWithDampener(levels)) {
            safeReportsCount++;
        }
    });

    console.log("Number of safe reports:", safeReportsCount);
});
