/**
 * @overview Contains differential tests for the migration form standard regular
 * expressions to linear-time regular expressions in PoewrShell.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/win/powershell.js";
import * as upd from "../../../src/internal/win/powershell.js";

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
  { numRuns: 1_000_000 },
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
  { numRuns: 1_000_000 },
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
  { numRuns: 1_000_000 },
);
