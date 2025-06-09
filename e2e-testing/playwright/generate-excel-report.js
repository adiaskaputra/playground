const fs = require('fs');
const XLSX = require('xlsx');

const jsonReportPath = 'reports/cucumber-report.json';
const excelOutputPath = 'reports/cucumber-report.xlsx';

// Baca JSON hasil Cucumber
const jsonData = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));

// Ambil data scenario + step
let data = [];

jsonData.forEach((feature) => {
  const featureName = feature.name;

  feature.elements.forEach((scenario) => {
    const scenarioName = scenario.name;
    const steps = scenario.steps.map((step) => {
      return {
        Feature: featureName,
        Scenario: scenarioName,
        Step: `${step.keyword} ${step.name}`,
        Status: step.result.status,
        Duration: (step.result.duration / 1e9).toFixed(2) + 's', // ns ➜ s
      };
    });

    data.push(...steps);
  });
});

// Buat worksheet & workbook
const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Cucumber Report');

// Tulis ke file
XLSX.writeFile(workbook, excelOutputPath);

console.log(`✅ Excel report generated at ${excelOutputPath}`);
