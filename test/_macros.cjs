/**
 * @overview Provides AVA test macros.
 * @license Unlicense
 */

const test = require("ava");

/**
 * A (safe) reference to the `Object.getOwnPropertyNames` function.
 *
 * @constant
 * @type {Function}
 */
const objectGetOwnPropertyNames = Object.getOwnPropertyNames;

/**
 * The poisoning macro tests that the provided function is not vulnerable to
 * poisoning of globals (values of `JSON`, `Object`, `Math`, etc.).
 *
 * The macro covers these globals:
 * - Functions of `JSON`.
 * - Functions of `Map`.
 * - Functions of `Math`.
 * - Functions of `Object`.
 * - Functions of `Set`.
 *
 * NOTE: If this macro passes your function is not necessarily safe if poisoning
 * happens prior to the file (of the function being tested) being imported.
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
    const poisen = (targets) => {
      const result = [];
      for (const { name, targetObject } of targets) {
        for (const key of objectGetOwnPropertyNames(targetObject)) {
          const backup = targetObject[key];
          if (typeof backup !== "function") {
            continue;
          }

          let called = false;
          const spy = (...args) => {
            called = true;
            return backup(...args);
          };

          result.push({
            // For checking
            name: `${name}.${key}`,
            wasCalled: () => called,

            // For restoring
            backup,
            key,
            targetObject,
          });

          targetObject[key] = spy;
        }
      }

      return result;
    };
    const check = (poisoned) => {
      for (const { wasCalled, name } of poisoned) {
        t.false(
          wasCalled(),
          `Function is vulnerable to poisoning of '${name}'`
        );
      }
    };
    const restore = (poisoned) => {
      for (const { targetObject, key, backup } of poisoned) {
        targetObject[key] = backup;
      }
    };

    const poisonedData = poisen([
      { name: "JSON", targetObject: JSON },
      { name: "Map", targetObject: Map },
      { name: "Math", targetObject: Math },
      { name: "Object", targetObject: Object },
      { name: "Set", targetObject: Set },
    ]);

    try {
      fn(t);
      check(poisonedData);
    } catch (error) {
      t.fail(`function crashed unexpectedly with:\n${error}`);
    } finally {
      restore(poisonedData);
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
