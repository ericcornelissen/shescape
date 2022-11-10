/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, macros } from "./_.js";

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
    t.throws(() => quote(undefined));
    t.throws(() => quote(null));
    t.throws(() => quote({ toString: null }));
    t.throws(() => quote({ toString: () => null }));
  });

  test(type, macros.prototypePollution, (_, payload) => {
    quote(["a"], payload);
  });
}
