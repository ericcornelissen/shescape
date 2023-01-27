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
const testOptions = [
  undefined,
  ...[false, true, ...systemShells].map((shell) => ({ shell })),
];

for (const arg of testArgs) {
  for (const options of testOptions) {
    test(macros.exec, { arg, options });
    test(macros.exec, { arg, options: { ...options, interpolation: true } });
    test(macros.execSync, { arg, options });
    test(macros.execFile, { arg, options });
    test(macros.execFileSync, { arg, options });
    test(macros.fork, { arg, options });
    test(macros.spawn, { arg, options });
    test(macros.spawnSync, { arg, options });
  }
}
