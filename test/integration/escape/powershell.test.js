/**
 * @overview Contains integration tests for `shescape.escape` for Windows
 * PowerShell (without extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escape } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binPowerShellNoExt}`, (t) => {
  for (const scenario of generate.escapeExamples(
    constants.binPowerShellNoExt,
  )) {
    const { expected, input, options } = scenario;
    const result = escape(input, options);
    t.is(result, expected);
  }
});
