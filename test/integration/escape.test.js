/**
 * @overview Contains integration tests for `shescape.escape`.
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
  // TODO test(type, macros.escapeSuccess, { escape: shescape.escape });
  // TODO test(type, macros.escapeFlags, { escape });

  testProp(
    `return values (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const shescape = new Shescape(options);
      const result = shescape.escape(arg);
      t.is(typeof result, "string");
    }
  );

  test(`invalid arguments (${type})`, (t) => {
    const shescape = new Shescape();
    for (const { value } of constants.illegalArguments) {
      t.throws(() => shescape.escape(value));
    }
  });

  test(type, macros.prototypePollution, (_, payload) => {
    const shescape = new Shescape(payload);
    shescape.escape("a");
  });
}

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const shescapeEsm = new ShescapeEsm(options);
    const shescapeCjs = new ShescapeCjs(options);
    const resultEsm = shescapeEsm.escape(arg);
    const resultCjs = shescapeCjs.escape(arg);
    t.is(resultEsm, resultCjs);
  }
);
