/**
 * @overview Contains integration tests for `shescape.escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate, macros } from "./_.js";

import { escape as escapeEsm } from "../../index.js";
import { escape as escapeCjs } from "../../index.cjs";

const cases = [
  { escape: escapeCjs, type: "cjs" },
  { escape: escapeEsm, type: "esm" },
];

for (const { escape, type } of cases) {
  test(`input is escaped, interpolation off (${type})`, (t) => {
    for (const { expected, input, shell } of generate.escapeExamples(false)) {
      const result = escape(input, {
        flagProtection: false,
        interpolation: false,
        shell,
      });
      t.is(result, expected);
    }
  });

  test(`input is escaped, interpolation on (${type})`, (t) => {
    for (const { expected, input, shell } of generate.escapeExamples(true)) {
      const result = escape(input, {
        flagProtection: false,
        interpolation: true,
        shell,
      });
      t.is(result, expected);
    }
  });

  test(`flag is escaped (${type})`, (t) => {
    for (const { expected, input, shell } of generate.escapeFlagExamples()) {
      const result = escape(input, { flagProtection: true, shell });
      t.is(result, expected);
    }
  });

  testProp(
    `return values (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = escape(arg, options);
      t.is(typeof result, "string");
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    for (const { value } of constants.illegalArguments) {
      t.throws(() => escape(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    escape("a", payload);
  });
}

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = escapeEsm(arg, options);
    const resultCjs = escapeCjs(arg, options);
    t.is(resultEsm, resultCjs);
  }
);
