/**
 * @overview Provides functionality for the Windows Command Prompt.
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in CMD.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  return arg
    .replace(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replace(/\n/gu, " ")
    .replace(/(?<!\\)(\\*)"/gu, '$1$1\\"')
    .replace(/(["%&<>^|])/gu, "^$1");
}

/**
 * Returns a function to escape arguments for use in CMD for the given use case.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
}

/**
 * Escape an argument for use in CMD when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  return escapeArg(arg).replace(/(?<!\\)(\\*)([\t ])/gu, "$1$1$2");
}

/**
 * Quotes an argument for use in CMD.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return arg.replace(/([\t ]+)/gu, '"$1"');
}

/**
 * Returns a pair of functions to escape and quote arguments for use in CMD.
 *
 * @returns {Function[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Windows systems for CMD.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^(?:-+|\/+)/gu, "");
}

/**
 * Returns a function to protect against flag injection for CMD.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
