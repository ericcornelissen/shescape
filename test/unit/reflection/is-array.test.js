/**
 * @overview Contains unit tests for the `isArray` function.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { isArray } from "../../../src/internal/reflection.js";

suite("isArray", () => {
  test("arrays", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (value) => {
        const result = isArray(value);
        assert.equal(result, true);
      }),
    );
  });

  test("non-arrays", () => {
    fc.assert(
      fc.property(
        fc.anything().filter((value) => !Array.isArray(value)),
        (value) => {
          const result = isArray(value);
          assert.equal(result, false);
        },
      ),
    );
  });
});
