/**
 * @overview Contains integration tests for `Shescape#quoteAll` for the Z shell
 * (Zsh).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binZsh);

runTest(`input is escaped for ${constants.binZsh}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binZsh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quoteAll([input]);
    t.deepEqual(result, [expected]);
  }
});
