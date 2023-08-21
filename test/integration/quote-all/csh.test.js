/**
 * @overview Contains integration tests for `Shescape#quoteAll` for the C shell
 * (csh).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binCsh}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binCsh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quoteAll([input]);
    t.deepEqual(result, [expected]);
  }
});
