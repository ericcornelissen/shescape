/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the Bourne-again shell (Bash).
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/unix/bash.js";
import * as upd from "../../../src/internal/unix/bash.js";

const numRuns = 5_000_000;

testProp(
  "escape functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = upd.getEscapeFunction();
    const oldFn = old.getEscapeFunction();

    const got = updFn(arg).replace(/(?<=[:=])(\\~)(?!\\?[\s+\-/0:=]|$)/gu, "~");
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

    const [updEscape, updQuote] = updFn;
    const [oldEscape, oldQuote] = oldFn;

    const got = updQuote(updEscape(arg));
    const want = oldQuote(oldEscape(arg));
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
