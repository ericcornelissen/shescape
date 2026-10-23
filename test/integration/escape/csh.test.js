/**
 * @overview Contains integration tests for `Shescape#escape` for the C shell
 * (csh).
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const shell = constants.binCsh;

suite(shell, () => {
  test("escape input", { skip: common.skip(shell) }, () => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.escape(input);
      assert.equal(result, expected);
    }
  });
});
