/**
 * @overview Provides reflection functionality.
 * @license MPL-2.0
 */

/**
 * The error message for incorrect parameter types.
 *
 * @constant
 * @type {string}
 */
const typeError =
  "Shescape requires strings or values that can be converted into a string using .toString()";

/**
 * The `typeof` value of functions.
 *
 * @constant
 * @type {string}
 */
const typeofFunction = "function";

/**
 * The `typeof` value of strings.
 *
 * @constant
 * @type {string}
 */
const typeofString = "string";

/**
 * Checks if a value can be converted into a string and converts it if possible.
 *
 * @param {any} value The value of interest.
 * @returns {string|null} The `.toString()` if it's a string, otherwise `null`.
 */
function maybeToString(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value.toString !== typeofFunction) {
    return null;
  }

  const maybeStr = value.toString();
  if (isString(maybeStr)) {
    return maybeStr;
  } else {
    return null;
  }
}

/**
 * Convert a value into a string if that is possible.
 *
 * @param {any} value The value to convert into a string.
 * @returns {string} The `value` as a string.
 * @throws {TypeError} The `value` is not stringable.
 */
export function checkedToString(value) {
  if (isString(value)) {
    return value;
  }

  const maybeStr = maybeToString(value);
  if (maybeStr === null) {
    throw new TypeError(typeError);
  }

  return maybeStr;
}

/**
 * Checks if a value is a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is a string, `false` otherwise.
 */
export function isString(value) {
  return typeof value === typeofString;
}

/**
 * Checks if a value is truthy.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is truthy, `false` otherwise.
 */
export function isTruthy(value) {
  return !!value === true;
}

/**
 * Converts the provided value into an array if it is not already an array and
 * returns the array.
 *
 * @param {Array | any} value The value to convert to an array if necessary.
 * @returns {Array} An array containing `value` or `value` itself.
 */
export function toArrayIfNecessary(value) {
  return Array.isArray(value) ? value : [value];
}
