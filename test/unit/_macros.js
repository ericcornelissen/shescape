/**
 * @overview Provides AVA test macros for unit tests.
 * @license MIT
 */

import { performance } from "node:perf_hooks";

import test from "ava";
import fc from "fast-check";

import { escapeControlCharacters } from "./_utilities.js";

/**
 * The duration macro tests the provided function executed within the given time
 * limit.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this function.
 * @param {fc.Arbitrary[]} args.arbitraries The arbitraries to test with.
 * @param {number} args.maxMillis The maximum duration in milliseconds.
 * @param {Function} args.setup A function to setup the function to test.
 */
export const duration = test.macro({
  exec(t, { arbitraries, maxMillis, setup }) {
    fc.assert(
      fc.property(...arbitraries, (...args) => {
        const fn = setup();

        const startTime = performance.now();
        try {
          fn(...args);
        } catch {
          // Not concerned with functional correctness
        }
        const endTime = performance.now();

        t.true(endTime - startTime < maxMillis);
      }),
    );
  },
});

/**
 * The escape macro tests the behavior of the function returned by the provided
 * `getEscapeFunction`.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this function.
 * @param {string} args.expected The expected escaped string.
 * @param {Function} args.getEscapeFunction The escape function builder to test.
 * @param {string} args.input The string to be escaped.
 * @param {string} args.shellName The name of the shell to test.
 */
export const escape = test.macro({
  exec(t, { expected, getEscapeFunction, input }) {
    const escapeFn = getEscapeFunction();
    const actual = escapeFn(input);
    t.is(actual, expected);
  },
  title(_, { input, shellName }) {
    input = escapeControlCharacters(input);
    return `escape '${input}' for ${shellName}`;
  },
});

/**
 * The flag macro tests the behavior of the function returned by the provided
 * `getFlagFunction`.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this function.
 * @param {string} args.expected The expected escaped string.
 * @param {Function} args.getFlagFunction The flag function builder.
 * @param {string} args.input The string to be escaped.
 */
export const flag = test.macro({
  exec(t, { expected, getFlagFunction, input }) {
    const flagFn = getFlagFunction();
    const actual = flagFn(input);
    t.deepEqual(actual, expected);
  },
  title(_, { input }) {
    input = escapeControlCharacters(input);
    return `flag protection of '${input}'`;
  },
});

/**
 * The quote macro tests the behavior of the functions returned by the provided
 * `getQuoteFunction`.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this function.
 * @param {string} args.expected The expected quoted string.
 * @param {Function} args.getQuoteFunction The quote function builder to test.
 * @param {string} args.input The string to be quoted.
 * @param {object} args.platform The platform module (e.g. import of `win.js`).
 * @param {string} args.shellName The name of the shell to test.
 */
export const quote = test.macro({
  exec(t, { expected, input, getQuoteFunction }) {
    const [escapeFn, quoteFn] = getQuoteFunction();
    const actual = quoteFn(escapeFn(input));
    t.is(actual, expected);
  },
  title(_, { input, shellName }) {
    input = escapeControlCharacters(input);
    return `quote '${input}' for ${shellName}`;
  },
});
