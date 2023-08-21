/**
 * @overview Contains integration tests for invalid use of `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "../_.js";

import { quote } from "shescape";

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => quote(value, options), { instanceOf: TypeError });
  }
});

test(macros.prototypePollution, (_, payload) => {
  quote("a", payload);
});
