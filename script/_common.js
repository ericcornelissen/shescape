/**
 * @overview Provide common utilities for scripts.
 * @license MIT-0
 */

import cp from "node:child_process";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const npmCmd = isWindows() ? "npm.cmd" : "npm";

export const argv = process.argv.slice(2);

export const projectRoot = path.resolve(import.meta.dirname, "..");

export function isWindows() {
  return os.platform() === "win32";
}

export function npm(argv) {
  return cp.spawn(npmCmd, argv, {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true,
  });
}

export function npmSync(argv) {
  return cp.spawnSync(npmCmd, argv, {
    cwd: projectRoot,
    encoding: "utf8",
    shell: true,
  });
}
