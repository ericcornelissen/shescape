/**
 * @overview Contains unit tests for the `isArray` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { isArray } from "../../../src/internal/reflection.js";

testProp("arrays", [fc.array(fc.anything())], (t, value) => {
  const result = isArray(value);
  t.true(result);
});

testProp(
  "non-arrays",
  [fc.anything().filter((value) => !Array.isArray(value))],
  (t, value) => {
    const result = isArray(value);
    t.false(result);
  },
);
