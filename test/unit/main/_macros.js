/**
 * @overview Provides AVA test macros for `./src/main.js` unit tests.
 * @license Unlicense
 */

import test from "ava";
import sinon from "sinon";

/**
 * The escapeSuccess macro tests how a specific argument is escaped.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.expected The value that is expected to be escaped.
 * @param {Function} args.fn The function to do the escaping.
 * @param {Object} args.process The input argument.
 */
export const escapeSuccess = test.macro({
  exec(t, { expected, fn, input }) {
    t.context.args.arg = input;

    fn(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        expected,
        sinon.match.any,
        sinon.match.any
      )
    );
  },
  title(_, { input }) {
    return `escaping ${input}`;
  },
});

/**
 * The escapeTypeError macro tests that a specific argument results in a
 * {@link TypeError}.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Object} args.expected The value that is expected to be escaped.
 * @param {Function} args.fn The function to do the escaping.
 * @param {Object} args.process The input argument.
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

export { prototypePollution } from "../../_macros.cjs";
