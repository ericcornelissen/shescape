/**
 * @overview Provides functionality for the Z shell (Zsh).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in Zsh.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  return arg
    .replace(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replace(/\n/gu, " ")
    .replace(/\\/gu, "\\\\")
    .replace(/(?<=^|\s)([#=~])/gu, "\\$1")
    .replace(/(["$&'()*;<>?[\]`{|}])/gu, "\\$1")
    .replace(/([\t ])/gu, "\\$1");
}

/**
 * Returns a function to escape arguments for use in Zsh for the given use case.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
}

/**
 * Escape an argument for use in Zsh when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r(?!\n)/gu, "")
    .replace(/'/gu, "'\\''");
}

/**
 * Quotes an argument for use in Zsh.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in Zsh.
 *
 * @returns {Function[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems for Zsh.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for Zsh.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
