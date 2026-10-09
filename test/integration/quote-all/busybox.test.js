/**
 * @overview Contains integration tests for `Shescape#quoteAll` for the BusyBox
 * shell.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import { Shescape } from "shescape";

import { common, constants, generate } from "../_.js";

const shell = constants.binBusyBox;

suite(shell, () => {
  test("quote inputs", { skip: common.skip(shell) }, () => {
    for (const scenario of generate.quoteExamples(shell)) {
      const { expected, input, options } = scenario;
      const shescape = new Shescape(options);
      const result = shescape.quoteAll([input]);
      assert.deepEqual(result, [expected]);
    }
  });
});
