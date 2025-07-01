module.exports = {
  default: {
    require: [
      "features/step-definitions/**/*.ts", // pastikan path ini benar
    ],
    requireModule: ["ts-node/register"],
    format: ["progress", "json:reports/cucumber-report.json"],
    paths: ["features/**/*.feature"],
    parallel: 0,
    // publishQuiet: true // ⬅️ Nonaktifkan output link ke cucumber cloud
    timeout: 20000,
  },
};
