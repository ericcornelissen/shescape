/**
 * @overview Contains integration tests for the stateless version of Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";
import * as shescape from "shescape/stateless";

import { arbitrary } from "../_.js";

testProp(
  "shescape.escape",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let actual, actualError;
    let expected, expectedError;

    try {
      actual = shescape.escape(arg, options);
    } catch (error) {
      actualError = error;
    }

    try {
      const shescape = new Shescape(options);
      expected = shescape.escape(arg);
    } catch (error) {
      expectedError = error;
    }

    t.is(actual, expected);
    t.deepEqual(actualError, expectedError);
  },
);

testProp(
  "shescape.escapeAll",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let actual, actualError;
    let expected, expectedError;

    try {
      actual = shescape.escapeAll(arg, options);
    } catch (error) {
      actualError = error;
    }

    try {
      const shescape = new Shescape(options);
      expected = shescape.escapeAll(arg);
    } catch (error) {
      expectedError = error;
    }

    t.deepEqual(actual, expected);
    t.deepEqual(actualError, expectedError);
  },
);

testProp(
  "shescape.quote",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let actual, actualError;
    let expected, expectedError;

    try {
      actual = shescape.quote(arg, options);
    } catch (error) {
      actualError = error;
    }

    try {
      const shescape = new Shescape(options);
      expected = shescape.quote(arg);
    } catch (error) {
      expectedError = error;
    }

    t.is(actual, expected);
    t.deepEqual(actualError, expectedError);
  },
);

testProp(
  "shescape.quoteAll",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let actual, actualError;
    let expected, expectedError;

    try {
      actual = shescape.quoteAll(arg, options);
    } catch (error) {
      actualError = error;
    }

    try {
      const shescape = new Shescape(options);
      expected = shescape.quoteAll(arg);
    } catch (error) {
      expectedError = error;
    }

    t.deepEqual(actual, expected);
    t.deepEqual(actualError, expectedError);
  },
);
