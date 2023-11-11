/**
 * @overview Contains unit tests for the `hasOwn` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { hasOwn } from "../../../src/reflection.js";

testProp("not present", [fc.object(), fc.string()], (t, object, property) => {
  const actual = hasOwn(object, property);
  const expected = Object.hasOwn(object, property);
  t.is(actual, expected);
});

testProp(
  "present",
  [fc.object(), fc.string(), fc.string()],
  (t, object, property, value) => {
    object[property] = value;

    const actual = hasOwn(object, property);
    const expected = Object.hasOwn(object, property);
    t.is(actual, expected);
  },
);
