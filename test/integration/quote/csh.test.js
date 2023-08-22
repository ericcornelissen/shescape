/**
 * @overview Contains integration tests for `Shescape#quote` for the C shell
 * (csh).
 * @license MIT
 */

import { common, constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = common.getTestFn(constants.binCsh);

runTest(`input is escaped for ${constants.binCsh}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binCsh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quote(input);
    t.is(result, expected);
  }
});
