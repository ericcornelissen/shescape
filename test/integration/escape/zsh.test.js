/**
 * @overview Contains integration tests for `shescape.escape` for the Z shell
 * (Zsh).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escape as escape } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binZsh}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binZsh)) {
    const { expected, input, options } = scenario;
    const result = escape(input, options);
    t.is(result, expected);
  }
});
