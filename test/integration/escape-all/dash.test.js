/**
 * @overview Contains integration tests for `shescape.escapeAll` for the Debian
 * Almquist shell (Dash).
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { escapeAll } from "shescape";

const runTest = constants.isWindows ? test.skip : test;

runTest(`input is escaped for ${constants.binDash}`, (t) => {
  for (const scenario of generate.escapeExamples(constants.binDash)) {
    const { expected, input, options } = scenario;
    const result = escapeAll([input], options);
    t.deepEqual(result, [expected]);
  }
});
