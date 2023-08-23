/**
 * @overview Contains integration test for the CommonJS version of
 * `shescape.quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { quoteAll } from "shescape";
import { quoteAll as quoteAllCjs } from "../../../index.cjs";

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = quoteAll(args, options);
    const resultCjs = quoteAllCjs(args, options);
    t.deepEqual(resultEsm, resultCjs);
  },
);
