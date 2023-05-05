/**
 * @overview Contains unit tests for the C shell (csh) functionality.
 * @license MIT
 */

import { TextDecoder } from "node:util";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { constants, fixtures, macros } from "./_.js";

import * as csh from "../../../src/unix/csh.js";

const shellName = constants.binCsh;
const textDecoder = new TextDecoder("utf-8", { fatal: true });

{
  const cases = Object.values(fixtures.escape[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.noInterpolation,
      input,
      getEscapeFunction: csh.getEscapeFunction,
      interpolation: false,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.interpolation,
      input,
      getEscapeFunction: csh.getEscapeFunction,
      interpolation: true,
      quoted: false,
      shellName,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escapeNew, {
      expected: expected.quoted || expected.noInterpolation,
      input,
      getEscapeFunction: csh.getEscapeFunction,
      interpolation: false,
      quoted: true,
      shellName,
    });
  });
}

{
  const cases = Object.values(fixtures.quote[shellName]).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.quoteNew, {
      expected: expected.notEscaped,
      input,
      getQuoteFunction: csh.getQuoteFunction,
      shellName,
    });
  });
}

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
        } catch (_) {
          return null;
        }
      })
      .filter((x) => x?.length === 1),
  ],
  (t, [baseString, insertIndex], testCharacter) => {
    const testStr =
      baseString.substring(0, insertIndex) +
      testCharacter +
      baseString.substring(insertIndex);

    const escapeFn = csh.getEscapeFunction({
      interpolation: true,
      quoted: false,
    });
    const result = escapeFn(testStr);

    t.assert(result.includes(`'${testCharacter}'`));
  }
);

fixtures.redos().forEach((s, i) => {
  test(`${shellName}, ReDoS #${i}`, (t) => {
    const escape = csh.getEscapeFunction({
      interpolation: true,
      quoted: false,
    });
    escape(s);
    t.pass();
  });
});
