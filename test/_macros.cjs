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
 * Determine whether or not a function is a constructor.
 *
 * @param {Function} subject The function to test.
 * @returns {boolean} `true` if it is a constructor, `false` otherwise.
 */
const isConstructor = (subject) => {
  const handler = {
    construct() {
      return handler;
    },
  };

  try {
    return !!new new Proxy(subject, handler)();
  } catch (_) {
    return false;
  }
};

/**
 * The poisoning macro tests that the provided function is not affected by
 * poisoning of globals (properties of `globalThis`, recursively).
 *
 * NOTE: If this macro passes your function is not necessarily unaffected if
 * poisoning happens prior to the code being imported.
 *
 * #### Options.
 *
 * - `ignore`: An array of fully qualified names to ignore. This allows you to
 * ignore certain globals; this can be used in case the affected code is outside
 * of your direct control.
 *
 * @example
 * test(macros.poisoning, (t) => {
 *   functionUnderTest(t.context.someValue);
 * });
 * @param {object} t The AVA test object.
 * @param {Function} fn The function to test poisoning on.
 * @param {object} opts Configuration options. See the "Options" section.
 */
module.exports.poisoning = test.macro({
  exec(t, fn, opts = {}) {
    // Helpers
    const captureGlobals = (targetObject, targetName, seen = new Set()) => {
      const result = [];
      for (const instanceName of objectGetOwnPropertyNames(targetObject)) {
        if (seen.has(instanceName)) {
          continue;
        }
        seen.add(instanceName);

        const instance = targetObject[instanceName];
        if (instance === null || instance === undefined) {
          continue;
        }

        result.push(...captureGlobals(instance, instanceName, seen));
        result.push({
          name: instanceName,
          parentObject: targetObject,
          parentName: targetName,
        });
      }
      return result;
    };
    const poison = (globalData) => {
      const illegalKeys = ["arguments", "caller", "callee"];
      const poisonedData = [];
      for (const { name, parentObject, parentName } of globalData) {
        const fullyQualifiedName = `${parentName}.${name}`;
        if (opts.ignore?.includes(fullyQualifiedName)) {
          continue;
        }

        const instance = parentObject[name];
        if (typeof instance === "function" && !isConstructor(instance)) {
          let called = false;
          const spy = (...args) => {
            called = true;
            return instance(...args);
          };

          for (const instanceKey of objectGetOwnPropertyNames(instance)) {
            if (!illegalKeys.includes(instanceKey)) {
              spy[instanceKey] = instance[instanceKey];
            }
          }

          parentObject[name] = spy;

          poisonedData.push({
            check: () => {
              t.false(
                called,
                `Function is vulnerable to poisoning of '${fullyQualifiedName}'`
              );
            },
            restore: () => {
              parentObject[name] = instance;
            },
          });
        }
      }
      return poisonedData;
    };

    // The test
    const globalData = captureGlobals(globalThis, "globalThis");
    const poisonedData = poison(globalData);

    try {
      fn(t);
      poisonedData.forEach(({ check }) => check());
    } catch (error) {
      t.fail(`function crashed unexpectedly with:\n${error}`);
    } finally {
      poisonedData.forEach(({ restore }) => restore());
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
