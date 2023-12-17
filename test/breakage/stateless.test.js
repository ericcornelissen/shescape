/**
 * @overview Contains breakage tests for the stateless shescape variant.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as shescape from "shescape/stateless";

// TODO: import after release 2.1.0. It's currently commented because the API
// has not yet been released.
//import * as previouscape from "shescape-previous/stateless";

// TODO: unskip after release 2.1.0. It's currently skipped because the API has
// not yet been released.
testProp.skip(
  "shescape.escape",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.escape(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      previousResult = previouscape.escape(arg, options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip after release 2.1.0. It's currently skipped because the API has
// not yet been released.
testProp.skip(
  "shescape.escapeAll",
  [
    fc.oneof(fc.anything(), fc.array(fc.anything())),
    arbitrary.shescapeOptions(),
  ],
  (t, args, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.escapeAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      previousResult = previouscape.escapeAll(args, options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip after release 2.1.0. It's currently skipped because the API has
// not yet been released.
testProp.skip(
  "shescape.quote",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.quote(arg, options);
    } catch (_) {
      errored = true;
    }

    try {
      previousResult = previouscape.quote(arg, options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

// TODO: unskip after release 2.1.0. It's currently skipped because the API has
// not yet been released.
testProp.skip(
  "shescape.quoteAll",
  [
    fc.oneof(fc.anything(), fc.array(fc.anything())),
    arbitrary.shescapeOptions(),
  ],
  (t, args, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.quoteAll(args, options);
    } catch (_) {
      errored = true;
    }

    try {
      previousResult = previouscape.quoteAll(args, options);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);
