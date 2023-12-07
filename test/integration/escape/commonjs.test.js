/**
 * @overview Contains integration tests for the CommonJS version of
 * `Shescape#escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../../index.cjs";

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.escape(arg);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.escape(arg);
    } catch (error) {
      errorCjs = error;
    }

    t.is(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
