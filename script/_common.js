/**
 * @overview Provide common utilities for scripts.
 * @license MIT
 */

import cp from "node:child_process";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import url from "node:url";

const npm = isWindows() ? "npm.cmd" : "npm";

const projectRoot = path.resolve(
  path.dirname(url.fileURLToPath(new URL(import.meta.url))),
  "..",
);

export const argv = process.argv.slice(2);

export function isWindows() {
  return os.platform() === "win32";
}

export function npmRun(argv) {
  return cp.spawn(npm, argv, {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

export function npmRunSync(argv) {
  return cp.spawnSync(npm, argv, {
    cwd: projectRoot,
    encoding: "utf-8",
  });
}

export function projectPath(...paths) {
  return path.resolve(projectRoot, ...paths);
}
