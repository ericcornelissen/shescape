/**
 * @overview Contains integration tests for `shescape.quoteAll`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, macros } from "./_.js";

import { quoteAll as quoteAllEsm } from "../../index.js";
import { quoteAll as quoteAllCjs } from "../../index.cjs";

const cases = [
  { quoteAll: quoteAllCjs, type: "cjs" },
  { quoteAll: quoteAllEsm, type: "esm" },
];

for (const { quoteAll, type } of cases) {
  testProp(
    `return values (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = quoteAll(args, options);
      for (const entry of result) {
        t.is(typeof entry, "string");
        t.regex(entry, /^(?<q>["']).*\k<q>$/u);
      }

      t.pass(); // in case `result.length === 0`
    }
  );

  testProp(
    `return size (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = quoteAll(args, options);
      t.is(result.length, args.length);
    }
  );

  testProp(
    `non-array input (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = quoteAll(arg, options);
      t.is(result.length, 1);

      const entry = result[0];
      t.is(typeof entry, "string");
      t.regex(entry, /^(?<q>["']).*\k<q>$/u);
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    for (const { value } of constants.illegalArguments) {
      t.throws(() => quoteAll([value]));
      t.throws(() => quoteAll(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    quoteAll(["a"], payload);
  });
}
