/**
 * @overview Contains breakage tests for the `Shescape` class.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as Previouscape } from "shescape-previous";

testProp(
  "Shescape#escape",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let result, previousResult, errored, previousErrored;
    let shescape, previouscape;

    try {
      shescape = new Shescape(options);
      result = shescape.escape(arg);
    } catch (_) {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.escape(arg);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
  "Shescape#escapeAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let result, previousResult, errored, previousErrored;
    let shescape, previouscape;

    try {
      shescape = new Shescape(options);
      result = shescape.escapeAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.escapeAll(args);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
  "Shescape#quote",
  [arbitrary.shescapeOptions(), fc.anything()],
  (t, options, arg) => {
    let result, previousResult, errored, previousErrored;
    let shescape, previouscape;

    try {
      shescape = new Shescape(options);
      result = shescape.quote(arg);
    } catch (_) {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.quote(arg);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);

testProp(
  "Shescape#quoteAll",
  [
    arbitrary.shescapeOptions(),
    fc.oneof(fc.anything(), fc.array(fc.anything())),
  ],
  (t, options, args) => {
    let result, previousResult, errored, previousErrored;
    let shescape, previouscape;

    try {
      shescape = new Shescape(options);
      result = shescape.quoteAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      previouscape = new Previouscape(options);
      previousResult = previouscape.quoteAll(args);
    } catch (_) {
      previousErrored = true;
    }

    t.is(errored, previousErrored);
    t.is(typeof result, typeof previousResult);
  },
);
