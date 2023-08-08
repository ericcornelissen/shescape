/**
 * @overview Contains unit tests for the `isNil` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { isNil } from "../../../src/reflection.js";

test("null", (t) => {
  const result = isNil(null);
  t.true(result);
});

test("undefined", (t) => {
  const result = isNil(undefined);
  t.true(result);
});

testProp(
  "non-nil",
  [fc.anything().filter((value) => value !== null && value !== undefined)],
  (t, value) => {
    const result = isNil(value);
    t.false(result);
  },
);
