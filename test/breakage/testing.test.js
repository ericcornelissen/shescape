/**
 * @overview Contains breakage tests for the shescape testing module.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Stubscape, Throwscape } from "shescape/testing";
import {
  Shescape as Previoustub,
  Throwscape as Previousthrow,
} from "shescape-previous/testing";

testProp(
  "Stubscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let stubscape, previoustub;
    let errored, previousErrored;

    try {
      stubscape = new Stubscape(options);
    } catch {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
    } catch {
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
    } catch {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.escape(arg);
    } catch {
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
    } catch {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.escapeAll(args);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Stubscape#quote",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let stubscape, previoustub;
    let result, previousResult;
    let errored, previousErrored;

    try {
      stubscape = new Stubscape(options);
      result = stubscape.quote(arg);
    } catch {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.quote(arg);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
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
    } catch {
      errored = true;
    }

    try {
      previoustub = new Previoustub(options);
      previousResult = previoustub.quoteAll(args);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let throwscape, previousthrow;
    let errored, previousErrored;

    try {
      throwscape = new Throwscape(options);
    } catch {
      errored = true;
    }

    try {
      previousthrow = new Previousthrow(options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
  },
);
