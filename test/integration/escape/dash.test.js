/**
 * @overview Contains integration tests for `Shescape#escape` for the Debian
 * Almquist shell (Dash).
 * @license MIT
 */

import { common, constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = common.getTestFn(constants.binDash);

runTest(`input is escaped for ${constants.binDash}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binDash)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
