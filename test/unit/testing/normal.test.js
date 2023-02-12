/**
 * @overview Contains unit tests for the functionality to get helpers functions
 * for a given platform.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants } from "./_.js";

import { shescape as stubscape } from "../../../src/testing.js";

testProp(
  "escape valid arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = stubscape.escape(arg, options);
    t.is(typeof result, "string");
  }
);

test("escape invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escape(value));
  }
});

testProp(
  "escapeAll valid arguments",
  [
    fc.oneof(arbitrary.shescapeArg(), fc.array(arbitrary.shescapeArg())),
    arbitrary.shescapeOptions(),
  ],
  (t, args, options) => {
    const result = stubscape.escapeAll(args, options);
    t.assert(Array.isArray(result));
    t.assert(result.every((x) => typeof x === "string"));
  }
);

test("escapeAll invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escapeAll([value]));
    t.throws(() => stubscape.escapeAll(value));
  }
});

testProp(
  "quote valid arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = stubscape.quote(arg, options);
    t.is(typeof result, "string");
  }
);

test("quote invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quote(value));
  }
});

testProp(
  "quoteAll valid arguments",
  [
    fc.oneof(arbitrary.shescapeArg(), fc.array(arbitrary.shescapeArg())),
    arbitrary.shescapeOptions(),
  ],
  (t, args, options) => {
    const result = stubscape.quoteAll(args, options);
    t.assert(Array.isArray(result));
    t.assert(result.every((x) => typeof x === "string"));
  }
);

test("quoteAll invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quoteAll([value]));
    t.throws(() => stubscape.quoteAll(value));
  }
});
