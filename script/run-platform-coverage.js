/**
 * @overview Run coverage commands for the current platform.
 * @license MIT-0
 */

import process from "node:process";

import * as common from "./_common.js";

const testType = common.argv[0];
const platform = common.isWindows() ? "win" : "unix";

if (!testType) {
  console.log("Usage: 'node script/run-platform-coverage.js <TEST-TYPE>'");
  process.exit(1);
}

try {
  common.exec(`npm run coverage:${testType}:${platform}`);
} catch {
  process.exit(1);
}
