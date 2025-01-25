module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["*/**/**/*.{ts,tsx,js}"],
  coveragePathIgnorePatterns: [
    "migrations",
    "coverage",
    "tailwind.config.js",
    "setupTests.ts",
    "reportWebVitals.ts",
    "react-app-env.d.ts",
    "postcss.config.js",
    "global.d.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.css$": "jest-transform-css",
  },
  transformIgnorePatterns: ["/node_modules/(?!(sequelize|uuid)/)"],
};
