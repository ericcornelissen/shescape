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
