/**
 * @overview Contains unit tests for the `ensureArray` function.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { ensureArray } from "../../../src/internal/reflection.js";

import { constants } from "./_.js";

suite("ensureArray", () => {
  test("arrays", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (value) => {
        assert.doesNotThrow(() => ensureArray(value));
      }),
    );
  });

  for (const { description, value } of constants.illegalArgumentLists) {
    test(description, () => {
      assert.throws(
        () => {
          ensureArray(value);
        },
        {
          name: "TypeError",
          message: "Shescape requires argument lists to be an array",
        },
      );
    });
  }
});
