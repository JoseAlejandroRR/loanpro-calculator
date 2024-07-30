const { NODE_ENV} = process.env;

const debugMode = process.env.NODE_ENV === "automation"

const config = {
  testEnvironment: "allure-jest/node",
  "reporters": [
    "default",
    [
      "jest-stare",
      {
        "resultDir": "_reporting/jest-stare",
        "reportTitle": "Calculator Unit Test",
        "coverageLink": "../../_reporting/coverage/lcov-report/index.html",
        "hidePassing": !debugMode,
        "hidePending": !debugMode,
        "hideTodo": !debugMode,
        "hideFailing": false,
      }
    ]
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/utils/",
    "/__tests__/starterSetup.ts"
  ],
  //coverageProvider: "v8",
  collectCoverage: true,
  coverageDirectory: './_reporting/coverage',
  globalSetup: './src/__tests__/starterSetup.ts',
};

module.exports = config;