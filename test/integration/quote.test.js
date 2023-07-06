/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate, macros } from "./_.js";

import { quote as quote } from "../../index.js";
import { quote as quoteCjs } from "../../index.cjs";

test("input is quoted", (t) => {
  for (const { expected, input, options } of generate.quoteExamples()) {
    const result = quote(input, options);
    t.is(result, expected);
  }
});

testProp(
  "return value",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = quote(arg, options);
    t.is(typeof result, "string");
  },
);

test("invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => quote(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  quote("a", payload);
});

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = quote(arg, options);
    const resultCjs = quoteCjs(arg, options);
    t.is(resultEsm, resultCjs);
  },
);
