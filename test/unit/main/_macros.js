/**
 * @overview Provides AVA test macros for `./src/main.js` unit tests.
 * @license Unlicense
 */

import test from "ava";

/**
 * The escapeTypeError macro tests that a specific argument results in a
 * {@link TypeError}.
 *
 * @param {object} args The arguments for this macro.
 * @param {Function} args.fn The function to do the escaping.
 * @param {string} args.input The input argument.
 */
export const escapeTypeError = test.macro({
  exec(t, { fn, input }) {
    t.context.args.arg = input;

    t.throws(() => fn(t.context.args, t.context.deps), {
      instanceOf: TypeError,
      message:
        "Shescape requires strings or values that can be converted into a string using .toString()",
    });
  },
  title(providedTitle, { input }) {
    if (providedTitle) {
      return `escaping when ${providedTitle}`;
    } else {
      return `escaping ${input}`;
    }
  },
});

export { prototypePollution } from "../../_macros.js";
