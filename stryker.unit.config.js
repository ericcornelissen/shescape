// Check out StrykerJS at: https://stryker-mutator.io/

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["src/**/*.js"],
  commandRunner: {
    command: "npm run test:unit",
  },
  incremental: false,
  incrementalFile: ".cache/stryker-incremental-unit.json",
  timeoutMS: 10000,
  reporters: ["clear-text", "html", "progress"],
  htmlReporter: {
    fileName: "_reports/mutation/unit.html",
  },
  thresholds: {
    high: 100,
    low: 100,
    break: 100,
  },
  tempDirName: ".temp/stryker-unit",
  cleanTempDir: true,
};
