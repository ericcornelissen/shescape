/**
 * @overview Contains breakage tests for the stateless shescape variant.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as shescape from "shescape/stateless";
import * as previouscape from "shescape-previous/stateless";

testProp(
  "shescape.escape",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.escape(arg, options);
    } catch {
      errored = true;
    }

    try {
      previousResult = previouscape.escape(arg, options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
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
    } catch {
      errored = true;
    }

    try {
      previousResult = previouscape.escapeAll(args, options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
  "shescape.quote",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, errored;
    let previousResult, previousErrored;

    try {
      result = shescape.quote(arg, options);
    } catch {
      errored = true;
    }

    try {
      previousResult = previouscape.quote(arg, options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
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
    } catch {
      errored = true;
    }

    try {
      previousResult = previouscape.quoteAll(args, options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);
