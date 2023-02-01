/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package.
 * @license Unlicense
 */

import test from "ava";

import { constants, macros } from "./_.js";

const systemShells = constants.isWindows
  ? constants.shellsWindows
  : constants.shellsUnix;

const testArgs = ["&& ls", "' ls", '" ls'];
const testShells = [false, true, ...systemShells];

for (const arg of testArgs) {
  test(macros.fork, { arg });

  for (const shell of testShells) {
    test(macros.exec, { arg, shell });
    test(macros.execSync, { arg, shell });
    test(macros.execFile, { arg, shell });
    test(macros.execFileSync, { arg, shell });
    test(macros.spawn, { arg, shell });
    test(macros.spawnSync, { arg, shell });
  }
}
