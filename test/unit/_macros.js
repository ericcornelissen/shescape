/**
 * @overview Provides AVA test macros for unit tests.
 * @license Unlicense
 */

import test from "ava";

/**
 * The escape macro tests the behaviour of the function returned by
 * `getEscapeFunction` of the provided platform for the specified shell.
 *
 * Note: this macro *cannot* be used to test the behaviour of
 * `getEscapeFunction` for unsupported shells.
 *
 * @param {Object} t The AVA test object.
 * @param {Object} args The arguments for this function.
 * @param {Object} args.expected The expected escaped string.
 * @param {Object} args.input The string to be escaped.
 * @param {Object} args.interpolation Is interpolation enabled when escaping.
 * @param {Object} args.platform The platform module (e.g. import of `win.js`).
 * @param {Object} args.quoted Is `input` going to be quoted.
 * @param {Object} args.shellName The name of the shell to test.
 */
export const escape = test.macro({
  exec(t, { expected, input, interpolation, platform, quoted, shellName }) {
    const escapeFn = platform.getEscapeFunction(shellName);
    const actual = escapeFn(input, interpolation, quoted);
    t.is(actual, expected);
  },
  title(_, { input, interpolation, quoted, shellName }) {
    input = input.replace(/\u{0}/gu, "\\x00").replace(/\t/g, "\\t");
    interpolation = interpolation ? "interpolation" : "no interpolation";
    quoted = quoted ? "quoted" : "not quoted";

    return `escape '${input}' for ${shellName} (${interpolation}, ${quoted})`;
  },
});

/**
 * The quote macro tests the behaviour of the function returned by
 * `getQuoteFunction` of the provided platform for the specified shell.
 *
 * Note: this macro *cannot* be used to test the behaviour of `getQuoteFunction`
 * for unsupported shells.
 *
 * @param {Object} t The AVA test object.
 * @param {Object} args The arguments for this function.
 * @param {Object} args.expected The expected quoted string.
 * @param {Object} args.input The string to be quoted.
 * @param {Object} args.platform The platform module (e.g. import of `win.js`).
 * @param {Object} args.shellName The name of the shell to test.
 */
export const quote = test.macro({
  exec(t, { expected, input, platform, shellName }) {
    const quoteFn = platform.getQuoteFunction(shellName);
    const actual = quoteFn(input);
    t.is(actual, expected);
  },
  title(_, { input, shellName }) {
    return `quote '${input}' for ${shellName}`;
  },
});

/**
 * The unsupportedShell macro tests the behaviour of the `getEscapeFunction` and
 * `getQuoteFunction` functions for unsupported shells.
 *
 * @param {Object} t The AVA test object.
 * @param {Object} args The arguments for this function.
 * @param {Object} args.fn A `getEscapeFunction` or `getQuoteFunction` implementation.
 */
export const unsupportedShell = test.macro({
  exec(t, { fn }) {
    const result = fn("not a valid shell name");
    t.is(result, null);
  },
  title() {
    return "the shell is not supported";
  },
});
