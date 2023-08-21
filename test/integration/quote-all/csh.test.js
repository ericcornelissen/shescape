/**
 * @overview Contains integration tests for `shescape.quoteAll` for the C shell
 * (csh).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { quoteAll } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binCsh}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binCsh)) {
    const { expected, input, options } = scenario;
    const result = quoteAll([input], options);
    t.deepEqual(result, [expected]);
  }
});
