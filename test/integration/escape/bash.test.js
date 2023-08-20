/**
 * @overview Contains integration tests for `shescape.escape` for the
 * Bourne-again shell (Bash).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escape as escape } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binBash}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binBash)) {
    const { expected, input, options } = scenario;
    const result = escape(input, options);
    t.is(result, expected);
  }
});
