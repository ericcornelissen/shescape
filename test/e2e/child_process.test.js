/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

const testArgs = ["&& ls", "' ls", '" ls'];

for (const arg of testArgs) {
  test(macros.exec, { arg });
  test(macros.exec, { arg, options: { shell: true } });

  test(macros.execSync, { arg });
  test(macros.execSync, { arg, options: { shell: true } });

  test(macros.execFile, { arg });
  test(macros.execFile, { arg, options: { shell: true } });

  test(macros.execFileSync, { arg });
  test(macros.execFileSync, { arg, options: { shell: true } });

  test(macros.fork, { arg });

  test(macros.spawn, { arg });
  test(macros.spawn, { arg, options: { shell: true } });

  test(macros.spawnSync, { arg });
  test(macros.spawnSync, { arg, options: { shell: true } });
}
