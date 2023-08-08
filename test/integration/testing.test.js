/**
 * @overview Contains integration tests for the testing implementation of
 * Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as Stubscape } from "shescape/testing";
import { Shescape as StubscapeCjs } from "../../testing.cjs";

testProp(
  "escape (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      t.pass();
      return;
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escape(arg);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escape(arg);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "escapeAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      t.pass();
      return;
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.escapeAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.escapeAll(args);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quote (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let result, stubResult, errored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      t.pass();
      return;
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quote(arg);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quote(arg);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "quoteAll (stubscape ~ shescape)",
  [fc.anything(), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let result, stubResult, errored;

    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      t.pass();
      return;
    }

    const stubscape = new Stubscape(options);

    try {
      result = shescape.quoteAll(args);
    } catch (_) {
      errored = true;
    }

    try {
      stubResult = stubscape.quoteAll(args);
    } catch (_) {
      t.true(errored);
    }

    t.is(typeof result, typeof stubResult);
  },
);

testProp(
  "escape (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.escape(arg);
    const resultCjs = stubscapeCjs.escape(arg);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "escapeAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.escapeAll(args);
    const resultCjs = stubscapeCjs.escapeAll(args);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.quote(arg);
    const resultCjs = stubscapeCjs.quote(arg);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.quoteAll(args);
    const resultCjs = stubscapeCjs.quoteAll(args);
    t.deepEqual(resultEsm, resultCjs);
  },
);
