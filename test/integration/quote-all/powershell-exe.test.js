/**
 * @overview Contains integration tests for `shescape.quoteAll` for Windows
 * PowerShell.
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quoteAll } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

const shells = [
  constants.binPowerShell,
  constants.binPowerShellCapsExt,
  constants.binPowerShellNoExt,
];

for (const shell of shells) {
  runTest(`input is escaped for ${shell}`, (t) => {
    for (const scenario of generate.quoteExamples(shell)) {
      const { expected, input, options } = scenario;
      const result = quoteAll([input], options);
      t.deepEqual(result, [expected]);
    }
  });
}
