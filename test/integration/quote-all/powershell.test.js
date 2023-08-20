/**
 * @overview Contains integration tests for `shescape.quoteAll` for Windows
 * PowerShell (with extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quoteAll } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binPowerShellNoExt}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binPowerShellNoExt)) {
    const { expected, input, options } = scenario;
    const result = quoteAll([input], options);
    t.deepEqual(result, [expected]);
  }
});
