/**
 * @overview Provides AVA test macros.
 * @license Unlicense
 */

const test = require("ava");

/**
 * The prototypePollution macro tests that the provided function is not
 * vulnerable to prototype pollution.
 *
 * @param {Object} args The arguments for this macro.
 * @param {Function} args.fn The function to do the escaping.
 */
module.exports.prototypePollution = test.macro({
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
