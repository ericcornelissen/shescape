/**
 * @overview Contains integration tests for `Shescape#escape` for the BusyBox
 * shell.
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binBusyBox);

runTest(`input is escaped for ${constants.binBusyBox}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binBusyBox)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
