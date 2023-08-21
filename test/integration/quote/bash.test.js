/**
 * @overview Contains integration tests for `Shescape#quote` for the
 * Bourne-again shell (Bash).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binBash}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binBash)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quote(input);
    t.is(result, expected);
  }
});
