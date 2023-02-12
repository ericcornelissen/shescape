/**
 * @overview Provides instances of shescape for testing purposes.
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
 * Checks if a value is a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is a string, `false` otherwise.
 */
function isString(value) {
  return typeof value === typeofString;
}

/**
 * Checks if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is stringable, `false` otherwise.
 */
function isStringable(value) {
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
 * @param {Array | any} x The value to convert to an array if necessary.
 * @returns {Array} An array containing `x` or `x` itself.
 */
function toArrayIfNecessary(x) {
  return Array.isArray(x) ? x : [x];
}

/**
 * A simple replacement for shescape that has the same input-output profile as
 * the real shescape implementation.
 *
 * In particular:
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Converts non-array inputs to to single-item arrays where necessary.
 */
export const shescape = {
  escape: (arg, _options) => {
    if (!isStringable(arg)) {
      throw new TypeError(typeError);
    } else {
      return arg.toString();
    }
  },
  escapeAll: (args, _options) => {
    args = toArrayIfNecessary(args);
    return args.map(shescape.escape);
  },
  quote: (arg, _options) => shescape.escape(arg),
  quoteAll: (args, _options) => shescape.escapeAll(args),
};
