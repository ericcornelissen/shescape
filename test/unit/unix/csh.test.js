/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the C shell (csh).
 * @license MIT
 */

import { TextDecoder } from "node:util";

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import * as old from "../../../node_modules/shescape-previous/src/internal/unix/csh.js";
import * as csh from "../../../src/internal/unix/csh.js";

const numRuns = 5_000_000;
const textDecoder = new TextDecoder("utf-8", { fatal: true });

testProp(
  "escape functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = csh.getEscapeFunction();
    const oldFn = old.getEscapeFunction();

    const got = updFn(arg).replace(/\\!$/gu, "!");
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "quote functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = csh.getQuoteFunction();
    const oldFn = old.getQuoteFunction();

    const [updEscape, updQuote] = updFn;
    const [oldEscape, oldQuote] = oldFn;

    const got = updQuote(updEscape(arg).replace(/(?<!\\)\\!$/gu, "!"));
    const want = oldQuote(oldEscape(arg));
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "flag protection functionality is unchanged",
  [fc.string()],
  (t, arg) => {
    const updFn = csh.getFlagProtectionFunction();
    const oldFn = old.getFlagProtectionFunction();

    const got = updFn(arg);
    const want = oldFn(arg);
    t.is(got, want);
  },
  { numRuns },
);

testProp(
  "characters with 0xA0 when utf-8 encoded",
  [
    fc.string().chain((str) => fc.tuple(fc.constant(str), fc.nat(str.length))),
    fc
      .uint8Array({ minLength: 1, maxLength: 2 })
      .chain((str) => fc.tuple(fc.constant(str), fc.nat(str.length)))
      .map(([uint8Array, insertIndex]) => {
        try {
          const utf8EncodedCharacter = new Uint8Array([
            ...uint8Array.slice(0, insertIndex),
            0xa0,
            ...uint8Array.slice(insertIndex),
          ]);
          return textDecoder.decode(utf8EncodedCharacter);
        } catch {
          return null;
        }
      })
      .filter((str) => str?.length === 1),
  ],
  (t, [baseString, insertIndex], testCharacter) => {
    const testStr =
      baseString.slice(0, insertIndex) +
      testCharacter +
      baseString.slice(insertIndex);

    const escapeFn = csh.getEscapeFunction();
    const result = escapeFn(testStr);
    t.assert(result.includes(`'${testCharacter}'`));
  },
);
