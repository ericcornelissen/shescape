/**
 * @overview Provides AVA test macros.
 * @license Unlicense
 */

const test = require("ava");

const objectAssignBackup = Object.assign;
const objectCreateBackup = Object.create;

/**
 * The poisoning macro tests that the provided function is not vulnerable to
 * poisining of globals (values of `window`, `global`, or `globalThis`).
 *
 * The macro covers these globals:
 * - `Object.assign`.
 * - `Object.create`.
 *
 * NOTE: If this macro passes your function is not necessarily safe if the
 * poisining happens prior to the file (of the function being tested) being
 * imported.
 *
 * @example
 * test(macros.poisoning, (t) => {
 *   functionUnderTest(t.context.someValue);
 * });
 * @param {object} t The AVA test object.
 * @param {Function} fn The function to test poisoning on.
 */
module.exports.poisoning = test.macro({
  exec(t, fn) {
    let objectAssignCalled = false;
    let objectCreateCalled = false;

    const poisen = () => {
      Object.assign = (...args) => {
        objectAssignCalled = true;
        return objectAssignBackup(...args);
      };
      Object.create = (...args) => {
        objectCreateCalled = true;
        return objectCreateBackup(...args);
      };
    };
    const check = () => {
      const msg = (fn) => `Function is vulnerable to poisening of '${fn}'`;
      /* eslint-disable ava/assertion-arguments */
      t.false(objectAssignCalled, msg("Object.assign"));
      t.false(objectCreateCalled, msg("Object.create"));
      /* eslint-enable ava/assertion-arguments */
    };
    const restore = () => {
      Object.assign = objectAssignBackup;
      Object.create = objectCreateBackup;
    };

    try {
      poisen();
      fn(t);
      check();
    } catch (error) {
      t.fail(`function crashed unexpectedly with:\n${error}`);
    } finally {
      restore();
    }
  },
  title(providedTitle) {
    let title = "poisoning";
    if (providedTitle) {
      title += ` (${providedTitle})`;
    }

    return title;
  },
});

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
