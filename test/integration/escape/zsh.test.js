/**
 * @overview Contains integration tests for `Shescape#escape` for the Z shell
 * (Zsh).
 * @license MIT
 */

import { common, constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = common.getTestFn(constants.binZsh);

runTest(`input is escaped for ${constants.binZsh}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binZsh)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
