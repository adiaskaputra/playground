module.exports = {
  default: {
    require: [
      'features/step-definitions/**/*.ts', // Path ke step definition
    ],
    requireModule: ['ts-node/register'],   // Jalankan TS tanpa compile manual
    format: [
      'progress',                          // CLI output
      'json:reports/cucumber-report.json'  // Export ke JSON (misal untuk html-report)
    ],
    paths: ['features/**/*.feature'],      // Path ke .feature files
    parallel: 0,                            // Non-parallel (jika perlu nanti bisa diubah)
    publishQuiet: true,                    // Supaya tidak spam link cucumber.io
    timeout: 20000                         // Timeout tiap step
  }
}
