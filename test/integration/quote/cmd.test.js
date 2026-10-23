/**
 * @overview Contains integration tests for `Shescape#quote` for the Windows
 * Command Prompt (without extension).
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const shell = constants.binCmdNoExt;

suite(shell, () => {
  test("quote input", { skip: common.skip(shell) }, () => {
    for (const scenario of generate.quoteExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.quote(input);
      assert.equal(result, expected);
    }
  });
});
