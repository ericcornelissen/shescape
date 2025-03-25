/**
 * @overview Contains integration tests for `Shescape#quoteAll` for the Windows
 * Command Prompt (with extension).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binCmd);

runTest(`input is escaped for ${constants.binCmd}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binCmd)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quoteAll([input]);
    t.deepEqual(result, [expected]);
  }
});
