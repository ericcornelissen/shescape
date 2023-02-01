/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package.
 * @license Unlicense
 */

import test from "ava";
import isCI from "is-ci";
import which from "which";

import { constants, macros } from "./_.js";

const systemShells = constants.isWindows
  ? constants.shellsWindows
  : constants.shellsUnix;

const testArgs = ["&& ls", "' ls", '" ls'];
const testShells = [false, true, ...systemShells];

for (const arg of testArgs) {
  test(macros.fork, { arg });

  for (const shell of testShells) {
    let runTest;
    try {
      if (!isCI && typeof shell === "string") {
        which.sync(shell);
      }

      runTest = test;
    } catch (_) {
      runTest = test.skip;
    }

    runTest(macros.exec, { arg, shell });
    runTest(macros.execSync, { arg, shell });
    runTest(macros.execFile, { arg, shell });
    runTest(macros.execFileSync, { arg, shell });
    runTest(macros.spawn, { arg, shell });
    runTest(macros.spawnSync, { arg, shell });
  }
}
