/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the BusyBox shell.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/unix/busybox.js";
import * as upd from "../../../src/internal/unix/busybox.js";

const numRuns = 5_000_000;

testProp(
  "escape functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = upd.getEscapeFunction();
    const oldFn = old.getEscapeFunction();

    const got = updFn(arg);
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "quote functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = upd.getQuoteFunction();
    const oldFn = old.getQuoteFunction();

    const got = updFn[0](updFn[1](arg));
    const want = oldFn[0](oldFn[1](arg));
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "flag protection functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = upd.getFlagProtectionFunction();
    const oldFn = old.getFlagProtectionFunction();

    const got = updFn(arg);
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);
