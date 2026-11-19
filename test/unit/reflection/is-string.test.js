/**
 * @overview Contains unit tests for the `isString` function.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { isString } from "../../../src/internal/reflection.js";

suite("isString", () => {
  test("strings", () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const result = isString(value);
        assert.equal(result, true);
      }),
    );
  });

  test("non-arrays", () => {
    fc.assert(
      fc.property(
        fc.anything().filter((value) => typeof value !== "string"),
        (value) => {
          const result = isString(value);
          assert.equal(result, false);
        },
      ),
    );
  });
});
