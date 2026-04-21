/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the Debian Almquist shell (Dash).
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/unix/dash.js";
import * as upd from "../../../src/internal/unix/dash.js";

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

    const [updEscape, updQuote] = updFn;
    const [oldEscape, oldQuote] = oldFn;

    const got = updQuote(updEscape(arg));
    const want = oldQuote(oldEscape(arg));
    t.is(got, want);
  },
  { numRuns },
);
