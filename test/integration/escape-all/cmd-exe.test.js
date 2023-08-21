/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the Windows
 * Command Prompt (with extension).
 * @license MIT
 */

import { common, constants, generate } from "../_.js";

import { Shescape } from "shescape";

const runTest = common.getTestFn(constants.binCmd);

runTest(`input is escaped for ${constants.binCmd}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binCmd)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
