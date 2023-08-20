/**
 * @overview Contains integration tests for `shescape.quote` for Windows
 * PowerShell.
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quote } from "shescape";

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
      const result = quote(input, options);
      t.is(result, expected);
    }
  });
}
