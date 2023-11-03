/**
 * @overview Contains helpers to detect non-own property access.
 * @license MIT
 */

import assert from "node:assert/strict";

/**
 * A store for non-own property accesses by proxy.
 */
const pollutionState = new Map();

/**
 * Check whether or not a value is nil (`null` or `undefined`).
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `value` is nil, `false` otherwise.
 */
function isNil(value) {
  return value === null || value === undefined;
}

/**
 * Check whether or not a value is a primitive value.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `value` is primitive, `false` otherwise.
 */
function isPrimitive(value) {
  return typeof value === "number" || typeof value === "string";
}

/**
 * Check whether or not a value can be wrapped by a `Proxy`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `value` is proxyable, `false` otherwise.
 */
function isProxyable(value) {
  return !(isNil(value) || isPrimitive(value));
}

/**
 * Wrap the provided target in in order to monitor it for access to properties
 * not present on the target.
 *
 * @param {any} target The value to wrap.
 * @returns {any} The wrapped value (or original if wrapping isn't possible).
 */
export function wrap(target) {
  if (!isProxyable(target)) {
    return target;
  }

  const nonOwnAccesses = new Set();
  const proxy = new Proxy(target, {
    get(target, property, _proxy) {
      if (!Object.hasOwn(target, property)) {
        nonOwnAccesses.add(property);
      }

      // Return normal lookup to ensure normal test execution.
      return target[property];
    },
  });

  pollutionState.set(proxy, nonOwnAccesses);
  return proxy;
}

/**
 * Check if non-own property access was detected on the given wrapped object.
 *
 * @param {any} wrapped A `wrap`ped value.
 * @throws {Error} If non-own property access was detected.
 */
export function check(wrapped) {
  if (!isProxyable(wrapped)) {
    return;
  }

  assert.ok(pollutionState.has(wrapped), "target not found");
  const nonOwnAccesses = pollutionState.get(wrapped);

  // Remove the proxy from the state so re-use of it does not result in errors
  // from one test to affect other tests. (Also just to reduce memory usage.)
  pollutionState.delete(wrapped);

  const actual = nonOwnAccesses.size;
  const expected = 0;
  const propertiesList = Array.from(nonOwnAccesses.values()).join(", ");

  assert.equal(
    actual,
    expected,
    `Non0own access to ${actual} property(s) detected: ${propertiesList}`,
  );
}
