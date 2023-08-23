/**
 * @overview Provide common utilities for scripts.
 * @license MIT
 */

import cp from "node:child_process";
import os from "node:os";

export function isWindows() {
  return os.platform() === "win32";
}

export function npmRun(argv) {
  const npm = isWindows() ? "npm.cmd" : "npm";
  const options = {
    stdio: "inherit",
  };

  return cp.spawn(npm, argv, options);
}

export function npmRunSync(argv) {
  const npm = isWindows() ? "npm.cmd" : "npm";
  const options = {
    encoding: "utf-8",
  };

  return cp.spawnSync(npm, argv, options);
}
