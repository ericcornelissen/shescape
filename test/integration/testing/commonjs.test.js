/**
 * @overview Contains integration tests for the CommonJS version of the testing
 * implementation of Shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { Shescape as Stubscape } from "shescape/testing";
import { Shescape as StubscapeCjs } from "../../../testing.cjs";

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
