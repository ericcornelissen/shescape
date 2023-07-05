/**
 * @overview Contains integration tests for the testing implementation of
 * shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as shescape from "../../index.js";
import { shescape as stubscape } from "../../testing.js";

testProp(
  "escape",
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
  }
);

testProp(
  "escapeAll",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.escapeAll(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(arg, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  }
);

testProp(
  "quote",
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
  }
);

testProp(
  "quoteAll",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    try {
      result = shescape.quoteAll(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(arg, options);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  }
);
