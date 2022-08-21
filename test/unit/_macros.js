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
    input = input
      .replace(/\0/gu, "\\u{0000}")
      .replace(/\t/gu, "\\t")
      .replace(/\n/gu, "\\n")
      .replace(/\v/gu, "\\v")
      .replace(/\f/gu, "\\f")
      .replace(/\r/gu, "\\r")
      .replace(/\u0085/gu, "\\u{0085}")
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
