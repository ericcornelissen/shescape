/**
 * @overview Contains integration tests for `Shescape#escape` for the Windows
 * Command Prompt (without extension).
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const shell = constants.binCmdNoExt;

suite(shell, () => {
  test("escape inputs", { skip: common.skip(shell) }, () => {
    for (const scenario of generate.escapeExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.escape(input);
      assert.equal(result, expected);
    }
  });
});
