/**
 * @overview Provides reflection functionality.
 * @license MPL-2.0
 */

/**
 * The error message for non-array values.
 *
 * @constant
 * @type {string}
 */
const typeErrorArray = "Shescape requires argument lists to be an array";

/**
 * The error message for non-stringable values.
 *
 * @constant
 * @type {string}
 */
const typeErrorString =
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
 * Check if the given object has the given property as an own property.
 *
 * This custom function is used over `Object.hasOwn` because that isn't
 * available in all supported Node.js versions.
 *
 * @param {object} object The object of interest.
 * @param {string} property The property of interest.
 * @returns {boolean} `true` if property is an own-property, `false` otherwise.
 */
export function hasOwn(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

/**
 * Checks if a value can be converted into a string and converts it if possible.
 *
 * @param {unknown} value The value of interest.
 * @returns {string | null} If possible the string of `value`, otherwise `null`.
 */
function maybeToString(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value.toString !== typeofFunction) {
    return null;
  }

  const maybeStr = value.toString();
  if (!isString(maybeStr)) {
    return null;
  }

  return maybeStr;
}

/**
 * Convert a value into a string if that is possible.
 *
 * @param {unknown} value The value to convert into a string.
 * @returns {string} The `value` as a string.
 * @throws {TypeError} The `value` is not stringable.
 */
export function checkedToString(value) {
  if (isString(value)) {
    return value;
  }

  const maybeStr = maybeToString(value);
  if (maybeStr === null) {
    throw new TypeError(typeErrorString);
  }

  return maybeStr;
}

/**
 * Ensures a value is an array.
 *
 * @param {unknown} value The value of interest.
 * @throws {TypeError} The `value` is not an array.
 */
export function ensureArray(value) {
  if (!isArray(value)) {
    throw new TypeError(typeErrorArray);
  }
}

/**
 * Checks if a value is a string.
 *
 * @param {unknown} value The value of interest.
 * @returns {boolean} `true` if `value` is a string, `false` otherwise.
 */
export function isString(value) {
  return typeof value === typeofString;
}

/**
 * Checks if a value is an array.
 *
 * @param {unknown} value The value of interest.
 * @throws {TypeError} The `value` is not an array.
 */
export const isArray = Array.isArray;
