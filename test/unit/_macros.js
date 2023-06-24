/**
 * @overview Provides AVA test macros for unit tests.
 * @license MIT
 */

import test from "ava";

/**
 * Transforms a string by replacing control characters with unicode point codes
 * (e.g. `\u{0000}`) or common text shorthands (e.g. `\t`).
 *
 * @param {string} string The string to escape control characters on.
 * @returns {string} The transformed string.
 */
function escapeControlCharacters(string) {
  return string
    .replace(/ {2}/gu, "_{2}")
    .replace(/\0/gu, "\\u{0000}")
    .replace(/\t/gu, "\\t")
    .replace(/\n/gu, "\\n")
    .replace(/\v/gu, "\\v")
    .replace(/\f/gu, "\\f")
    .replace(/\r/gu, "\\r")
    .replace(/\u0008/gu, "\\u{0008}")
    .replace(/\u001B/gu, "\\u{001B}")
    .replace(/\u0085/gu, "\\u{0085}")
    .replace(/\u009B/gu, "\\u{009B}")
    .replace(/\u00A0/gu, "\\u{00A0}")
    .replace(/\u1680/gu, "\\u{1680}")
    .replace(/\u2000/gu, "\\u{2000}")
    .replace(/\u2001/gu, "\\u{2001}")
    .replace(/\u2002/gu, "\\u{2002}")
    .replace(/\u2003/gu, "\\u{2003}")
    .replace(/\u2004/gu, "\\u{2004}")
    .replace(/\u2005/gu, "\\u{2005}")
    .replace(/\u2006/gu, "\\u{2006}")
    .replace(/\u2007/gu, "\\u{2007}")
    .replace(/\u2008/gu, "\\u{2008}")
    .replace(/\u2009/gu, "\\u{2009}")
    .replace(/\u200A/gu, "\\u{200A}")
    .replace(/\u2028/gu, "\\u{2028}")
    .replace(/\u2029/gu, "\\u{2029}")
    .replace(/\u202F/gu, "\\u{202F}")
    .replace(/\u205F/gu, "\\u{205F}")
    .replace(/\u3000/gu, "\\u{3000}")
    .replace(/\uFEFF/gu, "\\u{FEFF}");
}

/**
 * The escape macro tests the behaviour of the function returned by the provided
 * `getEscapeFunction`.
 *
 * @param {object} t The AVA test object.
 * @param {object} args The arguments for this function.
 * @param {string} args.expected The expected escaped string.
 * @param {Function} args.getEscapeFunction The escape function builder to test.
 * @param {string} args.input The string to be escaped.
 * @param {boolean} args.interpolation Is interpolation enabled when escaping.
 * @param {string} args.shellName The name of the shell to test.
 */
export const escape = test.macro({
  exec(t, { expected, getEscapeFunction, input, interpolation }) {
    const escapeFn = getEscapeFunction({ interpolation });
    const actual = escapeFn(input);
    t.is(actual, expected);
  },
  title(_, { input, interpolation, shellName }) {
    input = escapeControlCharacters(input);
    interpolation = interpolation ? "interpolation" : "no interpolation";

    return `escape '${input}' for ${shellName} (${interpolation})`;
  },
});

/**
 * The quote macro tests the behaviour of the function returned by the provided
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
