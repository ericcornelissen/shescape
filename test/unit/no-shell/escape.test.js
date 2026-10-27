/**
 * @overview Contains unit tests for the escaping functionality of no shell.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import * as nosh from "../../../src/internal/no-shell.js";

import { fixtures, utilities } from "./_.js";

const escapeFixtures = Object.values(fixtures.escape).flat();

suite("escape", () => {
  for (const { input, expected } of escapeFixtures) {
    test(utilities.escapeControlCharacters(input), () => {
      const fn = nosh.getEscapeFunction();
      const actual = fn(input);
      assert.equal(actual, expected);
    });
  }

  test("return type", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const escapeFn = nosh.getEscapeFunction();
        const result = escapeFn(arg);
        assert.equal(typeof result, "string");
      }),
    );
  });

  test("is stateless", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const escapeFn = nosh.getEscapeFunction();
        const result1 = escapeFn(arg);
        const result2 = escapeFn(arg);
        assert.equal(result1, result2);
      }),
    );
  });

  test("performance", () => {
    fc.assert(
      fc.property(fc.string({ size: "xlarge" }), (arg) => {
        const escape = nosh.getEscapeFunction();

        const startTime = performance.now();
        escape(arg);
        const endTime = performance.now();

        assert.ok(endTime - startTime < 50);
      }),
    );
  });
});
