/* eslint-disable no-extend-native */

/**
 * @overview Contains unit tests for the `checkedToString` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants } from "./_.js";

import { checkedToString } from "../../../src/internal/reflection.js";

testProp("strings", [fc.string()], (t, value) => {
  const result = checkedToString(value);
  t.is(result, value);
});

test("string.prototype.toString does not return a string", (t) => {
  const stringToStringBackup = String.prototype.toString;
  String.prototype.toString = () => null;

  const result = checkedToString("");
  t.is(result, "");

  String.prototype.toString = stringToStringBackup;
});

testProp("stringable values", [arbitrary.shescapeArg()], (t, value) => {
  const result = checkedToString(value);
  t.is(result, value.toString());
});

for (const { description, value } of constants.illegalArguments) {
  test(description, (t) => {
    t.throws(() => checkedToString(value), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  });
}
