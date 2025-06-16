/**
 * @overview Provide common utilities for scripts.
 * @license MIT-0
 */

import cp from "node:child_process";
import os from "node:os";
import path from "node:path";
import process from "node:process";

export const argv = process.argv.slice(2);

export const projectRoot = path.resolve(import.meta.dirname, "..");

export function isWindows() {
  return os.platform() === "win32";
}

export function exec(command) {
  return cp.execSync(command, {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

export function execPipe(command) {
  return cp.execSync(command, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
}
