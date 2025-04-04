/**
 * @overview Contains integration tests for `Shescape#escape` for no shell.
 * @license MIT
 */

import test from "ava";
import { Shescape } from "shescape";

import { generate } from "../_.js";

test(`input is escaped for no shell`, (t) => {
  for (const scenario of generate.escapeExamples(false)) {
    const { expected, input, options } = scenario;
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});
