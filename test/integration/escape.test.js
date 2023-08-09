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
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const result = shescape.escape(arg);
    t.is(typeof result, "string");
  },
);

test("invalid arguments", (t) => {
  const shescape = new Shescape({ shell: false });
  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.escape(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  const shescape = new Shescape({ shell: false });
  shescape.escape("a", payload);
});

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescapeEsm, errorEsm;
    let shescapeCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
    } catch (error) {
      errorCjs = error;
    }

    if (errorEsm) {
      t.deepEqual(errorEsm, errorCjs);
    } else {
      const resultEsm = shescapeEsm.escape(arg);
      const resultCjs = shescapeCjs.escape(arg);
      t.is(resultEsm, resultCjs);
    }
  },
);
