/**
 * @overview Contains integration tests for the CommonJS version of the
 * stateless version of Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import * as shescape from "shescape/stateless";

import * as shescapeCjs from "../../../src/modules/stateless.cjs";
import { arbitrary } from "../_.js";

testProp(
  "shescape.escape (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let resultEsm, errorEsm;
    let resultCjs, errorCjs;

    try {
      resultEsm = shescape.escape(arg, options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      resultCjs = shescapeCjs.escape(arg, options);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(errorEsm, errorCjs);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "shescape.escapeAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let resultEsm, errorEsm;
    let resultCjs, errorCjs;

    try {
      resultEsm = shescape.escapeAll(args, options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      resultCjs = shescapeCjs.escapeAll(args, options);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(errorEsm, errorCjs);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "shescape.quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let resultEsm, errorEsm;
    let resultCjs, errorCjs;

    try {
      resultEsm = shescape.quote(arg, options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      resultCjs = shescapeCjs.quote(arg, options);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(errorEsm, errorCjs);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "shescape.quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let resultEsm, errorEsm;
    let resultCjs, errorCjs;

    try {
      resultEsm = shescape.quoteAll(args, options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      resultCjs = shescapeCjs.quoteAll(args, options);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(errorEsm, errorCjs);
    t.deepEqual(resultEsm, resultCjs);
  },
);
