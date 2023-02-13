/**
 * @overview Provides reflection functionality.
 * @license MPL-2.0
 */

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
 * Checks if a value is a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is a string, `false` otherwise.
 */
export function isString(value) {
  return typeof value === typeofString;
}

/**
 * Checks if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is stringable, `false` otherwise.
 */
export function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value.toString !== typeofFunction) {
    return false;
  }

  const str = value.toString();
  return isString(str);
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
