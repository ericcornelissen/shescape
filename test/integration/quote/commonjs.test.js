/**
 * @overview Contains integration tests for the CommonJS version of
 * `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { quote } from "shescape";
import { quote as quoteCjs } from "../../../index.cjs";

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = quote(arg, options);
    const resultCjs = quoteCjs(arg, options);
    t.is(resultEsm, resultCjs);
  },
);
