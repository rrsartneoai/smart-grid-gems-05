
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add or update test scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:ci": "vitest run --coverage",
  "test:ui": "vitest --ui",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
};

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Package.json scripts updated successfully.');
