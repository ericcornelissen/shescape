/**
 * @overview Contains integration tests for `Shescape#quoteAll` for Windows
 * PowerShell (with extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binPowerShell}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binPowerShell)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quoteAll([input]);
    t.deepEqual(result, [expected]);
  }
});
