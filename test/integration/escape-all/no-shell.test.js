/**
 * @overview Contains integration tests for `Shescape#escapeAll` for no shell.
 * @license MIT
 */

import test from "ava";

import { constants, generate } from "../_.js";

import { Shescape } from "shescape";

test(`input is escaped for ${constants.binBash}`, (t) => {
  for (const scenario of generate.escapeExamples(false)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
    t.deepEqual(result, [expected]);
  }
});
