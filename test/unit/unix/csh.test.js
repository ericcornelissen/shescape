/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the C shell.
 * @license Unlicense
 */

import { TextDecoder } from "node:util";

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { constants } from "./_.js";

import * as unix from "../../../src/unix.js";

const textDecoder = new TextDecoder("utf-8", { fatal: true });

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

    const escapeFn = unix.getEscapeFunction(constants.binCsh);
    const result = escapeFn(testStr, {
      interpolation: true,
      quoted: false,
    });
    t.assert(result.includes(`'${testCharacter}'`));
  }
);
