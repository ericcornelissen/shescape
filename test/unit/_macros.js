/**
 * @overview Provides AVA test macros for unit tests.
 * @license MIT
 */

import { performance } from "node:perf_hooks";

import test from "ava";
import fc from "fast-check";

/**
 * Transforms a string by replacing control characters with Unicode point codes
 * (e.g. `\u{0000}`) or common text shorthands (e.g. `\t`).
 *
 * @param {string} string The string to escape control characters on.
 * @returns {string} The transformed string.
 */
function escapeControlCharacters(string) {
  return string
    .replaceAll(/ {2}/gu, "_{2}")
    .replaceAll("\0", "\\u{0000}")
    .replaceAll("\t", "\\t")
    .replaceAll("\n", "\\n")
    .replaceAll("\v", "\\v")
    .replaceAll("\f", "\\f")
    .replaceAll("\r", "\\r")
    .replaceAll("\u0008", "\\u{0008}")
    .replaceAll("\u001B", "\\u{001B}")
    .replaceAll("\u0085", "\\u{0085}")
    .replaceAll("\u009B", "\\u{009B}")
    .replaceAll("\u00A0", "\\u{00A0}")
    .replaceAll("\u1680", "\\u{1680}")
    .replaceAll("\u2000", "\\u{2000}")
    .replaceAll("\u2001", "\\u{2001}")
    .replaceAll("\u2002", "\\u{2002}")
    .replaceAll("\u2003", "\\u{2003}")
    .replaceAll("\u2004", "\\u{2004}")
    .replaceAll("\u2005", "\\u{2005}")
    .replaceAll("\u2006", "\\u{2006}")
    .replaceAll("\u2007", "\\u{2007}")
    .replaceAll("\u2008", "\\u{2008}")
    .replaceAll("\u2009", "\\u{2009}")
    .replaceAll("\u200A", "\\u{200A}")
    .replaceAll("\u2028", "\\u{2028}")
    .replaceAll("\u2029", "\\u{2029}")
    .replaceAll("\u202F", "\\u{202F}")
    .replaceAll("\u205F", "\\u{205F}")
    .replaceAll("\u3000", "\\u{3000}")
    .replaceAll("\uFEFF", "\\u{FEFF}");
}

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
