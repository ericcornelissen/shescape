/**
 * @overview Contains integration tests for `shescape.quote` for Windows
 * PowerShell.
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quote } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binPowerShell}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binPowerShell)) {
    const { expected, input, options } = scenario;
    const result = quote(input, options);
    t.is(result, expected);
  }
});
