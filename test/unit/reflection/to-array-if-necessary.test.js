/**
 * @overview Contains unit tests for the `toArrayIfNecessary` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { toArrayIfNecessary } from "../../../src/reflection.js";

testProp("arrays", [fc.array(fc.anything())], (t, value) => {
  const result = toArrayIfNecessary(value);
  t.is(result, value);
});

testProp(
  "non-arrays",
  [fc.anything().filter((value) => !Array.isArray(value))],
  (t, value) => {
    const result = toArrayIfNecessary(value);
    t.deepEqual(result, [value]);
  }
);
