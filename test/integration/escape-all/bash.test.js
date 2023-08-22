/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the
 * Bourne-again shell (Bash).
 * @license MIT
 */

import { common, constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = common.getTestFn(constants.binBash);

runTest(`input is escaped for ${constants.binBash}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binBash)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
