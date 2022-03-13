/**
 * @overview Contains AVA test macros for unit tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

export const escape = test.macro({
  exec(t, { actual, expected }) {
    t.is(actual, expected);
  },
  title(_, { shell, interpolation, input, expected }) {
    if (expected === undefined) {
      expected = input;
    }

    input = input.replace(/\u{0}/gu, "\\x00");

    const note = interpolation ? "with interpolation" : "without interpolation";

    return `${shell} ${note}: '${input}' -> '${expected}'`;
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
 * @param {Object} args.platform The platform module (e.g. `win.js`).
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
