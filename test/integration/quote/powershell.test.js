/**
 * @overview Contains integration tests for `Shescape#quote` for Windows
 * PowerShell (without extension).
 * @license MIT
 */

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const runTest = common.getTestFn(constants.binPowerShellNoExt);

runTest(`input is escaped for ${constants.binPowerShellNoExt}`, (t) => {
  for (const scenario of generate.quoteExamples(constants.binPowerShellNoExt)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.quote(input);
    t.is(result, expected);
  }
});
