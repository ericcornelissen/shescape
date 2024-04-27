/**
 * @overview Contains integration tests for the CommonJS version of the testing
 * utilities provided with Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import {
  injectionStrings,
  Failscape,
  Stubscape,
  Throwscape,
} from "shescape/testing";
import {
  injectionStrings as injectionStringsCjs,
  Failscape as FailscapeCjs,
  Stubscape as StubscapeCjs,
  Throwscape as ThrowscapeCjs,
} from "../../../src/modules/testing.cjs";

test("injection strings", (t) => {
  for (const injectionStringCjs of injectionStringsCjs) {
    t.true(injectionStrings.includes(injectionStringCjs));
  }

  for (const injectionString of injectionStrings) {
    t.true(injectionStringsCjs.includes(injectionString));
  }
});

testProp(
  "Failscape#escape (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const failscape = new Failscape(options);
    const failscapeCjs = new FailscapeCjs(options);

    let erroredEsm, erroredCjs;
    try {
      failscape.escape(arg);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      failscapeCjs.escape(arg);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
  },
);

testProp(
  "Failscape#escapeAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const failscape = new Failscape(options);
    const failscapeCjs = new FailscapeCjs(options);

    let erroredEsm, erroredCjs;
    try {
      failscape.escapeAll(args);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      failscapeCjs.escapeAll(args);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
  },
);

testProp(
  "Failscape#quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const failscape = new Failscape(options);
    const failscapeCjs = new FailscapeCjs(options);

    let erroredEsm, erroredCjs;
    try {
      failscape.quote(arg);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      failscapeCjs.quote(arg);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
  },
);

testProp(
  "Failscape#quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const failscape = new Failscape(options);
    const failscapeCjs = new FailscapeCjs(options);

    let erroredEsm, erroredCjs;
    try {
      failscape.quoteAll(args);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      failscapeCjs.quoteAll(args);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
  },
);

testProp(
  "Stubscape#escape (esm === cjs)",
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
  "Stubscape#escapeAll (esm === cjs)",
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
  "Stubscape#quote (esm === cjs)",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let resultEsm, resultCjs, erroredEsm, erroredCjs;

    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    try {
      resultEsm = stubscape.quote(arg);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      resultCjs = stubscapeCjs.quote(arg);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "Stubscape#quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let resultEsm, resultCjs, erroredEsm, erroredCjs;

    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    try {
      resultEsm = stubscape.quoteAll(args);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      resultCjs = stubscapeCjs.quoteAll(args);
    } catch (_) {
      erroredCjs = true;
    }

    t.is(erroredEsm, erroredCjs);
    t.deepEqual(resultEsm, resultCjs);
  },
);

testProp(
  "Throwscape#constructor (esm === cjs)",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let erroredEsm, erroredCjs;

    try {
      new Throwscape(options);
    } catch (_) {
      erroredEsm = true;
    }

    try {
      new ThrowscapeCjs(options);
    } catch (_) {
      erroredCjs = true;
    }

    t.deepEqual(erroredEsm, erroredCjs);
  },
);
