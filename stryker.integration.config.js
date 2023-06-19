// Check out StrykerJS at: https://stryker-mutator.io/

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["index.js"],
  commandRunner: {
    command: "npm run test:integration",
  },
  incremental: false,
  incrementalFile: ".cache/stryker-incremental-integration.json",
  timeoutMS: 10000,
  reporters: ["clear-text", "html", "progress"],
  htmlReporter: {
    fileName: "_reports/mutation/integration.html",
  },
  thresholds: {
    high: 100,
    low: 100,
    break: 100,
  },
  tempDirName: ".temp/stryker-integration",
  cleanTempDir: true,
};
