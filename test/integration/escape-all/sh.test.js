/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the Bourne
 * shell.
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binSh);

runTest(`input is escaped for ${constants.binSh}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binSh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
