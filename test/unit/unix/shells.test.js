/**
 * @overview Contains unit tests for all Unix shells-specific implementation.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as zsh from "../../../src/internal/unix/zsh.js";

import { constants, fixtures, utilities } from "./_.js";

const shells = {
  [constants.binBash]: bash,
  [constants.binBusyBox]: busybox,
  [constants.binCsh]: csh,
  [constants.binDash]: dash,
  [constants.binZsh]: zsh,
};

suite("unix shell", () => {
  for (const [shellName, shellExports] of Object.entries(shells)) {
    const escapeFixtures = Object.values(fixtures.escape[shellName]).flat();
    const quoteFixtures = Object.values(fixtures.quote[shellName]).flat();

    for (const { input, expected } of escapeFixtures) {
      test(`escape '${utilities.escapeControlCharacters(input)}' for ${shellName}`, () => {
        const escapeFn = shellExports.getEscapeFunction();
        const actual = escapeFn(input);
        assert.equal(actual, expected);
      });
    }

    test(`${shellName} escape function return type`, () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const escapeFn = shellExports.getEscapeFunction();
          const result = escapeFn(arg);
          assert.equal(typeof result, "string");
        }),
      );
    });

    test(`escape function for ${shellName} is stateless`, () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const escapeFn = shellExports.getEscapeFunction();
          const result1 = escapeFn(arg);
          const result2 = escapeFn(arg);
          assert.equal(result1, result2);
        }),
      );
    });

    test(`escape performance for ${shellName}`, () => {
      fc.assert(
        fc.property(fc.string({ size: "xlarge" }), (arg) => {
          const escapeFn = shellExports.getEscapeFunction();

          const startTime = performance.now();
          try {
            escapeFn(arg);
          } catch {
            // Not concerned with functional correctness
          }
          const endTime = performance.now();

          assert.ok(endTime - startTime < 50);
        }),
      );
    });

    for (const { input, expected } of quoteFixtures) {
      test(`quote '${utilities.escapeControlCharacters(input)}' for ${shellName}`, () => {
        const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
        const actual = quoteFn(escapeFn(input));
        assert.equal(actual, expected);
      });
    }

    test(`${shellName} quote function return type`, () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
          const intermediate = escapeFn(arg);
          assert.equal(typeof intermediate, "string");
          const result = quoteFn(intermediate);
          assert.equal(typeof result, "string");
        }),
      );
    });

    test(`quote function for ${shellName} is stateless`, () => {
      fc.assert(
        fc.property(fc.string(), (arg) => {
          const [escapeFn, quoteFn] = shellExports.getQuoteFunction();
          const intermediate1 = escapeFn(arg);
          const intermediate2 = escapeFn(arg);
          assert.equal(intermediate1, intermediate2);

          const result1 = quoteFn(intermediate1);
          const result2 = quoteFn(intermediate2);
          assert.equal(result1, result2);
        }),
      );
    });

    test(`quote performance for ${shellName}`, () => {
      fc.assert(
        fc.property(fc.string({ size: "xlarge" }), (arg) => {
          const [escapeFn, quoteFn] = shellExports.getQuoteFunction();

          const startTime = performance.now();
          try {
            quoteFn(escapeFn(arg));
          } catch {
            // Not concerned with functional correctness
          }
          const endTime = performance.now();

          assert.ok(endTime - startTime < 50);
        }),
      );
    });
  }
});
