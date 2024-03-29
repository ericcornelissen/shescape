/**
 * @overview Contains unit tests for the `isString` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { isString } from "../../../src/internal/reflection.js";

testProp("strings", [fc.string()], (t, value) => {
  const result = isString(value);
  t.true(result);
});

testProp(
  "non-strings",
  [fc.anything().filter((value) => typeof value !== "string")],
  (t, value) => {
    const result = isString(value);
    t.false(result);
  },
);
