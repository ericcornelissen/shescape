/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * no shell on Unix.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/unix/no-shell.js";
import * as nosh from "../../../src/internal/unix/no-shell.js";

const numRuns = 5_000_000;

testProp(
  "escape functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = nosh.getEscapeFunction();
    const oldFn = old.getEscapeFunction();

    const got = updFn(arg);
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "flag protection functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = nosh.getFlagProtectionFunction();
    const oldFn = old.getFlagProtectionFunction();

    const got = updFn(arg);
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);

testProp("quote function", [fc.string()], (t, arg) => {
  const expected = {
    instanceOf: Error,
    message: "Quoting is not supported when no shell is used",
  };

  const [escapeFn, quoteFn] = nosh.getQuoteFunction();
  t.throws(() => escapeFn(arg), expected);
  t.throws(() => quoteFn(arg), expected);
});
