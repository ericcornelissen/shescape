/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license Unlicense
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
  testProp(
    `return value (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = quote(arg, options);
      t.is(typeof result, "string");
      t.regex(result, /^(?<q>["']).*\k<q>$/u);
    }
  );

  testProp(
    `metamorphic return value (${type})`,
    [
      arbitrary.shescapeArg(),
      arbitrary.alphanumeric(),
      arbitrary.shescapeOptions(),
    ],
    (t, arg, str, options) => {
      const r1 = quote(arg, options);

      const r2 = quote(`${str}${arg}`, options);
      t.is(`${r1.substring(0, 1)}${str}${r1.substring(1)}`, r2);

      const r3 = quote(`${arg}${str}`, options);
      t.is(
        `${r1.substring(0, r1.length - 1)}${str}${r1.substring(r1.length - 1)}`,
        r3
      );
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    for (const { value } of constants.illegalArguments) {
      t.throws(() => quote(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    quote(["a"], payload);
  });
}
