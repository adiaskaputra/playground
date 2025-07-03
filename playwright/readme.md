```
✅ Playwright — untuk automatisasi browser
✅ Cucumber.js — untuk menjalankan *.feature
✅ Gherkin — untuk menulis test-case behavior
✅ cucumber-html-reporter — untuk generate laporan hasil test
Tools tambahan: ts-node jika pakai TypeScript, dan dotenv kalau mau config/env.
```

```
✅ Test specific scenario
npx cucumber-js --name "User opens an expired link"
npx cucumber-js --name "User opens an invalid link"
npx cucumber-js --name "User opens a valid landing link"
npx cucumber-js --name "User opens a valid waiting link"
```
```
root
│
├── features/
│   ├── example.feature
│   └── step-definitions/
│       └── example.steps.ts
│
├── tests/
│   └── world.ts
│
├── tsconfig.json
├── cucumber.js
└── .env
```
