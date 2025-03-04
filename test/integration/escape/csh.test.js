/**
 * @overview Contains integration tests for `Shescape#escape` for the C shell
 * (csh).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binCsh);

runTest(`input is escaped for ${constants.binCsh}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binCsh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
