/**
 * @overview Contains integration tests for `Shescape#escape` for the Windows
 * Command Prompt (with extension).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

runTest(`input is escaped for ${constants.binCmd}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binCmd)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
