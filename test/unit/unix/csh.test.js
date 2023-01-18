/**
 * @overview Contains (additional) unit tests for the escaping functionality for
 * the C shell.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import utf8 from "utf8";

import { constants } from "./_.js";

import * as unix from "../../../src/unix.js";

const stringInsert = (str, insertIndex, subStr) =>
  str.substring(0, insertIndex) + subStr + str.substring(insertIndex /* end */);

const withRandomIndex = (str) => fc.tuple(fc.constant(str), fc.nat(str.length));

testProp(
  "characters with 0xA0 when utf-8 encoded",
  [
    fc.string().chain(withRandomIndex),
    fc
      .string16bits({ minLength: 1, maxLength: 2 })
      .chain(withRandomIndex)
      .map(([string16bits, insertIndex]) => {
        try {
          return utf8.decode(stringInsert(string16bits, insertIndex, "\u00A0"));
        } catch (_) {
          return null;
        }
      })
      .filter((x) => x?.length === 1),
  ],
  (t, [baseString, insertIndex], testChar) => {
    const escapeFn = unix.getEscapeFunction(constants.binCsh);
    const testStr = stringInsert(baseString, insertIndex, testChar);

    const result = escapeFn(testStr, {
      interpolation: true,
      quoted: false,
    });
    t.assert(result.includes(`'${testChar}'`));
  }
);
