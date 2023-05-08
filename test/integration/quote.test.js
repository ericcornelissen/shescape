/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "./_.js";

import { Shescape as ShescapeEsm } from "../../experimental.js";
import { Shescape as ShescapeCjs } from "../../experimental.cjs";
import { quote as quoteEsm } from "../../index.js";
import { quote as quoteCjs } from "../../index.cjs";

const cases = [
  { quote: quoteCjs, type: "cjs" },
  { quote: quoteEsm, type: "esm" },
];

for (const { quote, type } of cases) {
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

testProp(
  `existing v. experimental (esm)`,
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const experimentalShescape = new ShescapeEsm(options);

    const resultExisting = quoteEsm(arg, options);
    const resultExperimental = experimentalShescape.quote(arg);
    t.is(resultExisting, resultExperimental);
  }
);

testProp(
  `existing v. experimental (cjs)`,
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const experimentalShescape = new ShescapeCjs(options);

    const resultExisting = quoteCjs(arg, options);
    const resultExperimental = experimentalShescape.quote(arg);
    t.is(resultExisting, resultExperimental);
  }
);
