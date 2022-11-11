/**
 * @overview Contains integration tests for `shescape.escapeAll`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, macros } from "./_.js";

import { escapeAll as escapeAllEsm } from "../../index.js";
import { escapeAll as escapeAllCjs } from "../../index.cjs";

const cases = [
  { escapeAll: escapeAllCjs, type: "cjs" },
  { escapeAll: escapeAllEsm, type: "esm" },
];

for (const { escapeAll, type } of cases) {
  test(type, macros.escapeAllSuccess, { escapeAll });
  test(type, macros.escapeAllNonArray, { escapeAll });
  test(type, macros.escapeAllFailure, { escapeAll });

  testProp(
    `return values (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = escapeAll(args, options);
      for (const entry of result) {
        t.is(typeof entry, "string");
      }

      t.pass(); // in case `result.length === 0`
    }
  );

  testProp(
    `return size (${type})`,
    [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
    (t, args, options) => {
      const result = escapeAll(args, options);
      t.is(result.length, args.length);
    }
  );

  testProp(
    `non-array input (${type})`,
    [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
    (t, arg, options) => {
      const result = escapeAll(arg, options);
      t.is(result.length, 1);

      const entry = result[0];
      t.is(typeof entry, "string");
    }
  );

  test(type, macros.prototypePollution, (_, payload) => {
    escapeAll(["a"], payload);
  });
}
