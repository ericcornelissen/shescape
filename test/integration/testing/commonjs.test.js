/**
 * @overview Contains integration tests for the CommonJS version of the testing
 * implementation of Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { Shescape as Stubscape } from "shescape/testing";
import { Shescape as StubscapeCjs, Throwscape } from "../../../testing.cjs";

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
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.quote(arg);
    const resultCjs = stubscapeCjs.quote(arg);
    t.is(resultEsm, resultCjs);
  },
);

testProp(
  "Stubscape#quoteAll (esm === cjs)",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const stubscapeCjs = new StubscapeCjs(options);

    const resultEsm = stubscape.quoteAll(args);
    const resultCjs = stubscapeCjs.quoteAll(args);
    t.deepEqual(resultEsm, resultCjs);
  },
);

test("throwscape (cjs)", (t) => {
  t.throws(() => new Throwscape(options), { instanceOf: Error });
});
