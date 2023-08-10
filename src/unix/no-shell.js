/**
 * @overview Provides functionality for shell-less escaping on Unix systems.
 * @license MPL-2.0
 */

/**
 * The error message for use of quoting functionality.
 *
 * @constant
 * @type {string}
 */
const unsupportedError = "Quoting is not supported when no shell is used";

/**
 * Escape an argument for shell-less use.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  return arg.replace(/[\0\u0008\u001B\u009B]/gu, "").replace(/\r(?!\n)/gu, "");
}

/**
 * Returns a function to escape arguments for shell-less use.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
}

/**
 * Returns the provided value.
 *
 * @throws {Error} Always.
 */
function unsupported() {
  throw new Error(unsupportedError);
}

/**
 * Returns a pair of functions that will indicate this operation is unsupported.
 *
 * @returns {Function[]} A pair of functions.
 */
export function getQuoteFunction() {
  return [unsupported, unsupported];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for Unix systems.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
