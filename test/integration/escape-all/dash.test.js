/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the Debian
 * Almquist shell (Dash).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binDash);

runTest(`input is escaped for ${constants.binDash}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binDash)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
