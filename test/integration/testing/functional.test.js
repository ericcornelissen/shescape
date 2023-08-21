/**
 * @overview Contains integration tests for the testing implementation of
 * shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import * as shescape from "shescape";
import { shescape as stubscape } from "shescape/testing";

testProp(
  "escape (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    try {
      result = shescape.escape(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escape(arg, options);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "escapeAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    try {
      result = shescape.escapeAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(args, options);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quote (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored, stubErrored;

    try {
      result = shescape.quote(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quote(arg, options);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quoteAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored, stubErrored;

    try {
      result = shescape.quoteAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(args, options);
    } catch (_) {
      stubErrored = true;
    }

    t.is(errored, stubErrored);
    t.is(typeof result, typeof stubResult);
  },
);
