/**
 * @overview Contains integration test for the CommonJS version of
 * `shescape.escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { escapeAll } from "shescape";
import { escapeAll as escapeAllCjs } from "../../../index.cjs";

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = escapeAll(args, options);
    const resultCjs = escapeAllCjs(args, options);
    t.deepEqual(resultEsm, resultCjs);
  },
);
