// Configuration file for StrykerJS (https://stryker-mutator.io/)

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["src/*.js"],
  testRunner: "tap",
  tap: {
    forceBail: true,
    testFiles: ["test/integration/**/*.test.js"],
  },
  incremental: true,
  incrementalFile: ".cache/stryker-incremental-integration.json",
  timeoutMS: 10_000,
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
