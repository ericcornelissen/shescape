/**
 * @overview Contains breakage tests for the `Shescape` class.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";
import { Shescape as Previouscape } from "shescape-previous";

import { arbitrary } from "./_.js";

testProp(
  "Shescape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let errored, previousErrored;

    try {
      // eslint-disable-next-line no-new
      new Shescape(options);
    } catch {
      errored = true;
    }

    try {
      // eslint-disable-next-line no-new
      new Previouscape(options);
    } catch {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
  },
);

testProp(
  "Shescape#escape",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let shescape, previouscape;
    let result, previousResult;
    let errored, previousErrored;

    try {
      shescape = new Shescape(options);
      result = shescape.escape(arg);
    } catch {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.escape(arg);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Shescape#escapeAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let shescape, previouscape;
    let result, previousResult;
    let errored, previousErrored;

    try {
      shescape = new Shescape(options);
      result = shescape.escapeAll(args);
    } catch {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.escapeAll(args);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Shescape#quote",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let shescape, previouscape;
    let result, previousResult;
    let errored, previousErrored;

    try {
      shescape = new Shescape(options);
      result = shescape.quote(arg);
    } catch {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.quote(arg);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);

testProp(
  "Shescape#quoteAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let shescape, previouscape;
    let result, previousResult;
    let errored, previousErrored;

    try {
      shescape = new Shescape(options);
      result = shescape.quoteAll(args);
    } catch {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.quoteAll(args);
    } catch {
      previousErrored = true;
    }

    t.is(typeof result, typeof previousResult);
    t.is(errored, previousErrored);
  },
);
