/**
 * @overview Contains integration tests for `Shescape#escapeAll` for no shell.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { generate } from "../_.js";

const shell = false;

suite(shell, () => {
  test("escape inputs", () => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.escapeAll([input]);
      assert.deepEqual(result, [expected]);
    }
  });
});
