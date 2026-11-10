/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the C shell (csh).
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";
import { TextDecoder } from "node:util";

import * as fc from "fast-check";

import * as csh from "../../../src/internal/unix/csh.js";

const textDecoder = new TextDecoder("utf-8", { fatal: true });

suite("csh", () => {
  test("characters with 0xA0 when utf-8 encoded", () => {
    fc.assert(
      fc.property(
        fc
          .string()
          .chain((str) => fc.tuple(fc.constant(str), fc.nat(str.length))),
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
        ([baseString, insertIndex], testCharacter) => {
          const testStr =
            baseString.slice(0, insertIndex) +
            testCharacter +
            baseString.slice(insertIndex);

          const escapeFn = csh.getEscapeFunction();
          const result = escapeFn(testStr);
          assert.ok(result.includes(`'${testCharacter}'`));
        },
      ),
    );
  });
});
