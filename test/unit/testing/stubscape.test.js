/**
 * @overview Contains unit tests for the simple test stub of shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants } from "./_.js";

import { shescape as stubscape } from "../../../testing.js";

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
    t.throws(() => stubscape.escape(value), { instanceOf: TypeError });
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
    t.assert(result.every((arg) => typeof arg === "string"));
  }
);

test("escapeAll invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escapeAll([value]), { instanceOf: TypeError });
    t.throws(() => stubscape.escapeAll(value), { instanceOf: TypeError });
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
    t.throws(() => stubscape.quote(value), { instanceOf: TypeError });
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
    t.assert(result.every((arg) => typeof arg === "string"));
  }
);

test("quoteAll invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quoteAll([value]), { instanceOf: TypeError });
    t.throws(() => stubscape.quoteAll(value), { instanceOf: TypeError });
  }
});
