/**
 * @overview Run coverage commands for the current platform.
 * @license MIT
 */

import cp from "node:child_process";
import os from "node:os";

main(process.argv.slice(2));

function main(argv) {
  const npm = isWindows() ? "npm.cmd" : "npm";

  const testType = getTestType(argv);
  const platformId = getPlatformId();

  cp.spawn(npm, ["run", `coverage:${testType}:${platformId}`], {
    stdio: "inherit",
  });
}

function getTestType(argv) {
  return argv[0];
}

function getPlatformId() {
  if (isWindows()) {
    return "win";
  } else {
    return "unix";
  }
}

function isWindows() {
  return os.platform() === "win32";
}
