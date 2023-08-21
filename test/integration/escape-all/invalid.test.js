/**
 * @overview Contains integration tests for invalid use of `shescape.escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "../_.js";

import { escapeAll } from "shescape";

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => escapeAll([value], options), { instanceOf: TypeError });
    t.throws(() => escapeAll(value, options), { instanceOf: TypeError });
  }
});

test(macros.prototypePollution, (_, payload) => {
  escapeAll(["a"], payload);
});
