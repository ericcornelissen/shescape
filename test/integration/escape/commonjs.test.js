/**
 * @overview Contains integration tests for the CommonJS version of
 * `shescape.escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { escape } from "shescape";
import { escape as escapeCjs } from "../../../index.cjs";

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = escape(arg, options);
    const resultCjs = escapeCjs(arg, options);
    t.is(resultEsm, resultCjs);
  },
);
