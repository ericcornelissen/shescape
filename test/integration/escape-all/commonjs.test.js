/**
 * @overview Contains integration test for the CommonJS version of
 * `Shescape#escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";

import { Shescape as ShescapeCjs } from "../../../src/modules/index.cjs";
import { arbitrary } from "../_.js";

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.escapeAll(args);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.escapeAll(args);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
