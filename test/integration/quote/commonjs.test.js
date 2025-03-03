/**
 * @overview Contains integration tests for the CommonJS version of
 * `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import { Shescape } from "shescape";

import { arbitrary } from "../_.js";
import { Shescape as ShescapeCjs } from "../../../src/modules/index.cjs";

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.quote(arg);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.quote(arg);
    } catch (error) {
      errorCjs = error;
    }

    t.is(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
