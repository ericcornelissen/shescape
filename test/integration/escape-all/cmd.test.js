/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the Windows
 * Command Prompt (without extension).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binCmdNoExt);

runTest(`input is escaped for ${constants.binCmdNoExt}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binCmdNoExt)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
