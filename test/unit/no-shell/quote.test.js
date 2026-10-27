/**
 * @overview Contains unit tests for the quoting functionality of no shell.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import * as nosh from "../../../src/internal/no-shell.js";

suite("quote", () => {
  suite("termination", () => {
    const expected = {
      name: "Error",
      message: "Quoting is not supported when no shell is used",
    };

    test("escape", () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const [escapeFn] = nosh.getQuoteFunction();
          assert.throws(() => {
            escapeFn(arg);
          }, expected);
        }),
      );
    });

    test("quote", () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const [, quoteFn] = nosh.getQuoteFunction();
          assert.throws(() => {
            quoteFn(arg);
          }, expected);
        }),
      );
    });
  });
});
