/**
 * @overview Contains integration tests for `shescape.quote` for the Windows
 * Command Prompt (with extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quote } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binCmd}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binCmd)) {
    const { expected, input, options } = scenario;
    const result = quote(input, options);
    t.is(result, expected);
  }
});
