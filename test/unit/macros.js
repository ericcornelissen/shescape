/**
 * @overview Contains AVA test macros for unit tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

/**
 * The escape macro tests the behaviour of the function returned by
 * `getEscapeFunction` of the provided platform for the specified shell.
 *
 * Note: this macro *cannot* be used to test the behaviour of
 * `getEscapeFunction` for unsupported shells.
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.expected The expected escaped string.
 * @param {Object} args.input The string to be escaped.
 * @param {Object} args.interpolation Is interpolation enabled when escaping.
 * @param {Object} args.platform The platform module (e.g. import of `win.js`).
 * @param {Object} args.shellName The name of the shell to test.
 */
export const escape = test.macro({
  exec(t, { expected, input, interpolation, platform, shellName }) {
    const escapeFn = platform.getEscapeFunction(shellName);
    const actual = escapeFn(input, interpolation);
    t.is(actual, expected);
  },
  title(_, { expected, input, interpolation, shellName }) {
    input = input.replace(/\u{0}/gu, "\\x00");
    interpolation = interpolation ? "interpolation" : "no interpolation";

    return `escape argument for ${shellName} (${interpolation}): '${input}' -> '${expected}'`;
  },
});

/**
 * The quote macro tests the behaviour of the function returned by
 * `getQuoteFunction` of the provided platform for the specified shell.
 *
 * Note: this macro *cannot* be used to test the behaviour of `getQuoteFunction`
 * for unsupported shells.
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.platform The platform module (e.g. import of `win.js`).
 * @param {Object} args.quoteChar The character expected to be used for quoting.
 * @param {Object} args.shellName The name of the shell to test.
 */
export const quote = test.macro({
  exec(t, { platform, quoteChar, shellName }) {
    const input = "foobar";
    const expected = `${quoteChar}${input}${quoteChar}`;

    const quoteFn = platform.getQuoteFunction(shellName);
    const actual = quoteFn(input);
    t.is(actual, expected);
  },
  title(_, { shellName }) {
    return `quote argument for ${shellName}`;
  },
});
