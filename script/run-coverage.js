/**
 * Usage: `node script/run-coverage.js <TEST-TYPE>`.
 *
 * @overview Run coverage commands for the current platform.
 * @license MIT
 */

import * as common from "./_common.js";

main(process.argv.slice(2));

function main(argv) {
  const testType = getTestType(argv);
  const platformId = getPlatformId();
  common.npmRun(["run", `coverage:${testType}:${platformId}`]);
}

function getTestType(argv) {
  return argv[0];
}

function getPlatformId() {
  if (common.isWindows()) {
    return "win";
  } else {
    return "unix";
  }
}
