/**
 * @overview Contains integration tests for the CommonJS version of the testing
 * implementation of shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { shescape as stubscape } from "shescape/testing";
import { shescape as stubscapeCjs } from "../../../testing.cjs";

testProp(
  "escape (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = stubscape.escape(arg, options);
    const resultCjs = stubscapeCjs.escape(arg, options);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "escapeAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = stubscape.escapeAll(args, options);
    const resultCjs = stubscapeCjs.escapeAll(args, options);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = stubscape.quote(arg, options);
    const resultCjs = stubscapeCjs.quote(arg, options);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = stubscape.quoteAll(args, options);
    const resultCjs = stubscapeCjs.quoteAll(args, options);
    t.deepEqual(resultEsm, resultCjs);
  },
);
