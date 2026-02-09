/**
 * @overview Contains unit tests for the `ensureArray` function.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { ensureArray } from "../../../src/internal/reflection.js";

import { constants } from "./_.js";

testProp("arrays", [fc.array(fc.anything())], (t, value) => {
  t.notThrows(() => ensureArray(value));
});

for (const { description, value } of constants.illegalArgumentLists) {
  test(description, (t) => {
    t.throws(() => ensureArray(value), {
      instanceOf: TypeError,
      message: "Shescape requires argument lists to be an array",
    });
  });
}
