/**
 * @overview Contains integration tests for the testing implementation of
 * shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as shescape from "shescape";
import { shescape as stubscape } from "shescape/testing";
import { shescape as stubscapeCjs } from "../../testing.cjs";

testProp(
  "escape (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.escape(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escape(arg, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "escapeAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.escapeAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(args, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quote (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.quote(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quote(arg, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quoteAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.quoteAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(args, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

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
