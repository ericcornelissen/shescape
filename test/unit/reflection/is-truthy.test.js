/**
 * @overview Contains unit tests for the `isTruthy` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { isTruthy } from "../../../src/reflection.js";

testProp(
  "truthy values",
  [fc.anything().filter((value) => !!value)],
  (t, value) => {
    const result = isTruthy(value);
    t.true(result);
  },
);

testProp("falsy values", [fc.falsy()], (t, value) => {
  const result = isTruthy(value);
  t.false(result);
});
