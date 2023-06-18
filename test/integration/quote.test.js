/**
 * @overview Contains integration tests for `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "./_.js";

import { Shescape as ShescapeEsm } from "../../index.js";
import { Shescape as ShescapeCjs } from "../../index.cjs";

const cases = [
  { Shescape: ShescapeCjs, type: "cjs" },
  { Shescape: ShescapeEsm, type: "esm" },
];

for (const { Shescape, type } of cases) {
  testProp(
    `return value (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const shescape = new Shescape(options);
      const result = shescape.quote(arg);
      t.is(typeof result, "string");
      t.regex(result, /^(?<q>["']).*\k<q>$/u);
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    const shescape = new Shescape();
    for (const { value } of constants.illegalArguments) {
      t.throws(() => shescape.quote(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    const shescape = new Shescape(payload);
    shescape.quote("a");
  });
}

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const shescapeEsm = new ShescapeEsm(options);
    const shescapeCjs = new ShescapeCjs(options);
    const resultEsm = shescapeEsm.quote(arg);
    const resultCjs = shescapeCjs.quote(arg);
    t.is(resultEsm, resultCjs);
  }
);
