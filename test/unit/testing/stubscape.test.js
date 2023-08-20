/**
 * @overview Contains unit tests for the simple test stub of shescape.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants } from "./_.js";

import { Shescape as Stubscape } from "../../../testing.js";

testProp(
  "escape valid arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.escape(arg);
    t.is(typeof result, "string");
  },
);

test("escape invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    const stubscape = new Stubscape();
    t.throws(() => stubscape.escape(value), { instanceOf: TypeError });
  }
});

testProp(
  "escapeAll valid arguments",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.escapeAll(args);
    t.assert(Array.isArray(result));
    t.assert(result.every((arg) => typeof arg === "string"));
  },
);

testProp(
  "escapeAll non-array arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.escapeAll(arg), { instanceOf: TypeError });
  },
);

test("escapeAll invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.escapeAll([value]), { instanceOf: TypeError });
  }
});

testProp(
  "quote valid arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.quote(arg);
    t.is(typeof result, "string");
  },
);

test("quote invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quote(value), { instanceOf: TypeError });
  }
});

testProp(
  "quoteAll valid arguments",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const stubscape = new Stubscape(options);
    const result = stubscape.quoteAll(args);
    t.assert(Array.isArray(result));
    t.assert(result.every((arg) => typeof arg === "string"));
  },
);

testProp(
  "quoteAll non-array arguments",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const stubscape = new Stubscape(options);
    t.throws(() => stubscape.quoteAll(arg), { instanceOf: TypeError });
  },
);

test("quoteAll invalid arguments", (t) => {
  const stubscape = new Stubscape();
  for (const { value } of constants.illegalArguments) {
    t.throws(() => stubscape.quoteAll([value]), { instanceOf: TypeError });
  }
});
