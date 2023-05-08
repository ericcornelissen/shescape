/**
 * @overview Contains integration tests for `shescape.escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, macros } from "./_.js";

import { Shescape as ShescapeEsm } from "../../experimental.js";
import { Shescape as ShescapeCjs } from "../../experimental.cjs";
import { escape as escapeEsm } from "../../index.js";
import { escape as escapeCjs } from "../../index.cjs";

const cases = [
  { escape: escapeCjs, type: "cjs" },
  { escape: escapeEsm, type: "esm" },
];

for (const { escape, type } of cases) {
  test(type, macros.escapeSuccess, { escape });

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
  `existing v. experimental (esm)`,
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const experimentalShescape = new ShescapeEsm(options);

    const resultExisting = escapeEsm(arg, options);
    const resultExperimental = experimentalShescape.escape(arg);
    t.is(resultExisting, resultExperimental);
  }
);

testProp(
  `existing v. experimental (cjs)`,
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const experimentalShescape = new ShescapeCjs(options);

    const resultExisting = escapeCjs(arg, options);
    const resultExperimental = experimentalShescape.escape(arg);
    t.is(resultExisting, resultExperimental);
  }
);
