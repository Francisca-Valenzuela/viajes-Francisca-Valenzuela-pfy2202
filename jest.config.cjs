module.exports = {
  testEnvironment: "jest-fixed-jsdom",
  testEnvironmentOptions: { customExportConditions: [""] },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: { "\\.(css|svg|png)$": "identity-obj-proxy" },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/setupTests.js",
    "!src/mocks/browser.js",
    "!src/**/*.test.{js,jsx}",
  ],
  coverageThreshold: { global: { statements: 50, functions: 50, lines: 50 } },
};