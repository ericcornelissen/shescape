// Configuration file for StrykerJS (https://stryker-mutator.io/)

export default {
  coverageAnalysis: "perTest",
  inPlace: false,
  mutate: ["src/internal/**/*.js"],
  testRunner: "tap",
  tap: {
    testFiles: ["test/unit/**/*.test.js"],
    forceBail: false,
    nodeArgs: [
      "node_modules/ava/entrypoints/cli.mjs",
      "--tap",
      "--node-arguments='-r {{hookFile}}'",
    ],
  },
  incremental: true,
  incrementalFile: ".cache/stryker-incremental-unit.json",
  timeoutMS: 10_000,
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
