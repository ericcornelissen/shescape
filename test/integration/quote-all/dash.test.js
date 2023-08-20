/**
 * @overview Contains integration tests for `shescape.quoteAll` for the Debian
 * Almquist shell (Dash).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quoteAll } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binDash}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binDash)) {
    const { expected, input, options } = scenario;
    const result = quoteAll([input], options);
    t.deepEqual(result, [expected]);
  }
});
