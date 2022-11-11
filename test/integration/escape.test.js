/**
 * @overview Contains integration tests for `shescape.escape`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, macros } from "./_.js";

import { escape as escapeEsm } from "../../index.js";
import { escape as escapeCjs } from "../../index.cjs";

const cases = [
  { escape: escapeCjs, type: "cjs" },
  { escape: escapeEsm, type: "esm" },
];

for (const { escape, type } of cases) {
  test(type, macros.escapeSuccess, { escape });
  test(type, macros.escapeFailure, { escape });

  testProp(
    `return values (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = escape(arg, options);
      t.is(typeof result, "string");
    }
  );

  test(type, macros.prototypePollution, (_, payload) => {
    escape(["a"], payload);
  });
}
