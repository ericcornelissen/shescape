/**
 * @overview Contains integration tests for the CommonJS version of the testing
 * implementations of Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { Shescape as Stubscape, Throwscape } from "shescape/testing";
import {
  Shescape as StubscapeCjs,
  Throwscape as ThrowscapeCjs,
} from "../../../testing.cjs";

testProp(
  "Stubscape#escape (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.escape(arg);
    const resultCjs = stubscapeCjs.escape(arg);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "Stubscape#escapeAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.escapeAll(args);
    const resultCjs = stubscapeCjs.escapeAll(args);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "Stubscape#quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let resultEsm, resultCjs, erroredEsm, erroredCjs;

    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    try {
      resultEsm = stubscape.quote(arg);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      resultCjs = stubscapeCjs.quote(arg);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "Stubscape#quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let resultEsm, resultCjs, erroredEsm, erroredCjs;

    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    try {
      resultEsm = stubscape.quoteAll(args);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      resultCjs = stubscapeCjs.quoteAll(args);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "Throwscape#constructor (esm === cjs)",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let errorEsm, errorCjs;

    try {
      new Throwscape(options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      new ThrowscapeCjs(options);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(errorEsm, errorCjs);
  },
);
