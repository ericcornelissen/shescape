/**
 * @overview Contains integration tests for `Shescape#escape` for no shell.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { generate } from "../_.js";

const shell = false;

suite("no shell", () => {
  test("escape inputs", () => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.escape(input);
      assert.equal(result, expected);
    }
  });
});
