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
  "Stubscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let stubscape, previoustub;
    let errored, previousErrored;

    try {
      stubscape = new Stubscape(options);
    } catch (_) {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
  },
);

testProp(
  "Stubscape#escape",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let stubscape, previoustub;
    let result, previousResult;
    let errored, previousErrored;

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

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Stubscape#escapeAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let stubscape, previoustub;
    let result, previousResult;
    let errored, previousErrored;

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

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

// TODO: unskip upon release 2.0.1/2.1.0. It's currently skipped because the
// implementation was incorrect in 2.0.0 and has been fixed since (in 4f03fd8).
testProp.skip(
  "Stubscape#quote",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let stubscape, previoustub;
    let result, previousResult;
    let errored, previousErrored;

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

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
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
    let stubscape, previoustub;
    let result, previousResult;
    let errored, previousErrored;

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

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

// TODO: unskip upon release 2.0.1/2.1.0. It's currently skipped because the
// `Throwscape` class was not yet release in 2.0.0 (added in 4f03fd8).
testProp.skip(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let throwscape, previousthrow;
    let errored, previousErrored;

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
