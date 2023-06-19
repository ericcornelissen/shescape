/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "./_.js";

import { quote as quoteEsm } from "../../index.js";
import { quote as quoteCjs } from "../../index.cjs";

const cases = [
  { quote: quoteCjs, type: "cjs" },
  { quote: quoteEsm, type: "esm" },
];

for (const { quote, type } of cases) {
  test(`input is quoted (${type})`, (t) => {
    for (const { expected, input, shell } of macros.getQuoteExamples()) {
      const result = quote(input, { flagProtection: false, shell });
      t.is(result, expected);
    }
  });

  test(`flag is escaped (${type})`, (t) => {
    for (const { expected, input, shell } of macros.getQuoteFlagExamples()) {
      const result = quote(input, { flagProtection: true, shell });
      t.is(result, expected);
    }
  });

  testProp(
    `return value (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = quote(arg, options);
      t.is(typeof result, "string");
      t.regex(result, /^(?<q>["']).*\k<q>$/u);
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    for (const { value } of constants.illegalArguments) {
      t.throws(() => quote(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    quote("a", payload);
  });
}

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = quoteEsm(arg, options);
    const resultCjs = quoteCjs(arg, options);
    t.is(resultEsm, resultCjs);
  }
);
