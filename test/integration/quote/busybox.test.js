/**
 * @overview Contains integration tests for `Shescape#quote` for the BusyBox
 * shell.
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binBusyBox);

runTest(`input is escaped for ${constants.binBusyBox}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binBusyBox)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quote(input);
    t.is(result, expected);
  }
});
