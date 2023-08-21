/**
 * @overview Contains integration tests for `shescape.quote` for Windows
 * PowerShell (without extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quote } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binPowerShellNoExt}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binPowerShellNoExt)) {
    const { expected, input, options } = scenario;
    const result = quote(input, options);
    t.is(result, expected);
  }
});
