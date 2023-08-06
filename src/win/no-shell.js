/**
 * @overview Provides functionality for shell-less escaping on Windows systems.
 * @license MPL-2.0
 */

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
 * @param {any} v A value.
 * @returns {any} The (first) argument.
 */
function id(v) {
  return v;
}

/**
 * Returns a pair of functions to escape and quote arguments for shell-less use.
 *
 * @returns {Function[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [id, id];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Windows systems.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^(?:-+|\/+)/gu, "");
}

/**
 * Returns a function to protect against flag injection for Windows systems.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
