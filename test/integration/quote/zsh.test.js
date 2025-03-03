/**
 * @overview Contains integration tests for `Shescape#quote` for the Z shell
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
    const result = shescape.quote(input);
    t.is(result, expected);
  }
});
