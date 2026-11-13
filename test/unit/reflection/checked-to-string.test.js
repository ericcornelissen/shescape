/* eslint-disable no-extend-native */

/**
 * @overview Contains unit tests for the `checkedToString` function.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { checkedToString } from "../../../src/internal/reflection.js";

import { arbitrary, constants } from "./_.js";

suite("checkedToString", () => {
  test("strings", () => {
    fc.assert(
      fc.property(fc.string(), (value) => {
        const result = checkedToString(value);
        assert.equal(result, value);
      }),
    );
  });

  test("string.prototype.toString does not return a string", () => {
    const stringToStringBackup = String.prototype.toString;
    String.prototype.toString = () => null;

    const result = checkedToString("");

    String.prototype.toString = stringToStringBackup;

    assert.equal(result, "");
  });

  test("stringable values", () => {
    fc.assert(
      fc.property(arbitrary.shescapeArg(), (value) => {
        const result = checkedToString(value);
        assert.equal(result, value.toString());
      }),
    );
  });

  for (const { description, value } of constants.illegalArguments) {
    test(description, () => {
      assert.throws(
        () => {
          checkedToString(value);
        },
        {
          name: "TypeError",
          message:
            "Shescape requires strings or values that can be converted into a string using .toString()",
        },
      );
    });
  }
});
