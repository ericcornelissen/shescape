/**
 * @overview Contains breakage tests for the shescape testing module.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Shescape as Stubscape, Throwscape } from "shescape/testing";
import { Shescape as Previoustub } from "shescape-previous/testing";

testProp(
  "Stubscape#escape",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let result, previousResult, errored, previousErrored;
    let stubscape, previoustub;

    try {
      stubscape = new Stubscape(options);
      result = stubscape.escape(arg);
    } catch (_) {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.escape(arg);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
  "Stubscape#escapeAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let result, previousResult, errored, previousErrored;
    let stubscape, previoustub;

    try {
      stubscape = new Stubscape(options);
      result = stubscape.escapeAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.escapeAll(args);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip upon release 2.0.1/2.1.0. It's currently skipped because the
// implementation was incorrect in 2.0.0 and has been fixed since (in 4f03fd8).
testProp.skip(
  "Stubscape#quote",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let result, previousResult, errored, previousErrored;
    let stubscape, previoustub;

    try {
      stubscape = new Stubscape(options);
      result = stubscape.quote(arg);
    } catch (_) {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.quote(arg);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip upon release 2.0.1/2.1.0. It's currently skipped because the
// implementation was incorrect in 2.0.0 and has been fixed since (in 4f03fd8).
testProp.skip(
  "Stubscape#quoteAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let result, previousResult, errored, previousErrored;
    let stubscape, previoustub;

    try {
      stubscape = new Stubscape(options);
      result = stubscape.quoteAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.quoteAll(args);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip upon release 2.0.1/2.1.0. It's currently skipped because the
// `Throwscape` class was not yet release in 2.0.0 (added in 4f03fd8).
testProp.skip(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let errored, previousErrored;
    let throwscape, previousthrow;

    try {
      throwscape = new Throwscape(options);
    } catch (_) {
      errored = true;
    }

    try {
      previousthrow = new Previousthrow(options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
  },
);
