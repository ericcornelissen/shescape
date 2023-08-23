/**
 * @overview Contains integration tests for `shescape.escape` for the C shell
 * (csh).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escape } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binCsh}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binCsh)) {
    const { expected, input, options } = scenario;
    const result = escape(input, options);
    t.is(result, expected);
  }
});
