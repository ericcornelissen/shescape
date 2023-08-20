/**
 * @overview Contains integration tests for `shescape.escapeAll` for the Windows
 * Command Prompt.
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escapeAll } from "shescape";

const runTest = constants.isWindows ? test : test.skip;

const shells = [
  constants.binCmd,
  constants.binCmdCapsExt,
  constants.binCmdNoExt,
];

for (const shell of shells) {
  runTest(`input is escaped for ${shell}`, (t) => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const result = escapeAll([input], options);
      t.deepEqual(result, [expected]);
    }
  });
}
