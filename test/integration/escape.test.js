/**
 * @overview Contains integration tests for `Shescape#escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate, macros } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

test("input is escaped", (t) => {
  for (const { expected, input, options } of generate.escapeExamples()) {
    const shescape = new Shescape(options);
    const result = shescape.escape(input);
    t.is(result, expected);
  }
});

testProp(
  "return values",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const shescape = new Shescape(options);
    const result = shescape.escape(arg);
    t.is(typeof result, "string");
  },
);

test("invalid arguments", (t) => {
  const shescape = new Shescape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.escape(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  const shescape = new Shescape();
  shescape.escape("a", payload);
});

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const shescapeEsm = new Shescape(options);
    const shescapeCjs = new ShescapeCjs(options);
    const resultEsm = shescapeEsm.escape(arg);
    const resultCjs = shescapeCjs.escape(arg);
    t.is(resultEsm, resultCjs);
  },
);
