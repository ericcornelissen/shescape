/**
 * @overview Contains integration tests for `Shescape#escapeAll` for the C shell
 * (csh).
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const shell = constants.binCsh;

suite(shell, () => {
  test("escape inputs", { skip: common.skip(shell) }, () => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.escapeAll([input]);
      assert.deepEqual(result, [expected]);
    }
  });
});
