/**
 * @overview Provides AVA test macros.
 * @license Unlicense
 */

import test from "ava";

/**
 * The prototypePollution macro tests that the provided function is not
 * vulnerable to prototype pollution.
 *
 * @example
 * test(macros.prototypePollution, (t, payload) => {
 *   functionUnderTest(t.context.someValue, payload);
 * });
 * @param {object} t The AVA test object.
 * @param {Function} fn The function to test prototype pollution on.
 */
export const prototypePollution = test.macro({
  exec(t, fn) {
    const key = "role";
    const value = "admin";

    const emptyObject = {};
    t.not(emptyObject[key], value, "__proto__ is already polluted");

    const rawPayload = `{"__proto__":{"${key}":"${value}"}}`;
    const payload = JSON.parse(rawPayload);

    fn(t, payload);

    t.not(emptyObject[key], value, "__proto__ was polluted");
  },
  title(providedTitle) {
    let title = "prototype pollution";
    if (providedTitle) {
      title += ` (${providedTitle})`;
    }

    return title;
  },
});
